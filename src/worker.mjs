import { CARILA_MAX_TOKENS, CARILA_MODEL, CARILA_SYSTEM_PROMPT } from './carila-personality.mjs';
const ANTHROPIC_ENDPOINT = 'https://api.anthropic.com/v1/messages';
const UNSPLASH_ENDPOINT = 'https://api.unsplash.com/search/photos';
const ALLOWED_MODELS = new Set(['claude-sonnet-4-6', 'claude-haiku-4-5-20251001']);

let drinkImageTableReady;
async function ensureDrinkImageTable(env) {
  if (!env.DRINK_DB) return false;
  if (!drinkImageTableReady) {
    drinkImageTableReady = env.DRINK_DB.prepare(`CREATE TABLE IF NOT EXISTS drink_images (
      cache_key TEXT PRIMARY KEY,
      display_name TEXT NOT NULL DEFAULT '',
      image_url TEXT NOT NULL DEFAULT '',
      photo_id TEXT NOT NULL DEFAULT '',
      photographer TEXT NOT NULL DEFAULT '',
      photographer_url TEXT NOT NULL DEFAULT '',
      search_query TEXT NOT NULL DEFAULT '',
      created_at TEXT NOT NULL,
      last_used_at TEXT NOT NULL,
      use_count INTEGER NOT NULL DEFAULT 1
    )`).run().then(() => true).catch((error) => {
      console.error('D1 drink image table setup failed', error);
      drinkImageTableReady = undefined;
      return false;
    });
  }
  return drinkImageTableReady;
}

function drinkImagePayload(row) {
  return {
    url: row?.image_url || null,
    photoId: row?.photo_id || '',
    photographer: row?.photographer || '',
    photographerUrl: row?.photographer_url || '',
  };
}

async function readDrinkImageFromD1(env, cacheIdentity, context) {
  if (!await ensureDrinkImageTable(env)) return null;
  const row = await env.DRINK_DB.prepare('SELECT image_url, photo_id, photographer, photographer_url FROM drink_images WHERE cache_key = ?')
    .bind(cacheIdentity).first();
  if (!row) return null;
  context.waitUntil(env.DRINK_DB.prepare("UPDATE drink_images SET last_used_at = datetime('now'), use_count = use_count + 1 WHERE cache_key = ?")
    .bind(cacheIdentity).run().catch((error) => console.error('D1 drink image usage update failed', error)));
  return drinkImagePayload(row);
}

async function saveDrinkImageToD1(env, record) {
  if (!await ensureDrinkImageTable(env)) return;
  await env.DRINK_DB.prepare(`INSERT INTO drink_images (
      cache_key, display_name, image_url, photo_id, photographer, photographer_url, search_query, created_at, last_used_at, use_count
    ) VALUES (?, ?, ?, ?, ?, ?, ?, datetime('now'), datetime('now'), 1)
    ON CONFLICT(cache_key) DO UPDATE SET
      display_name = excluded.display_name,
      image_url = excluded.image_url,
      photo_id = excluded.photo_id,
      photographer = excluded.photographer,
      photographer_url = excluded.photographer_url,
      search_query = excluded.search_query,
      last_used_at = datetime('now'),
      use_count = drink_images.use_count + 1`)
    .bind(record.cacheIdentity, record.name || '', record.url || '', record.photoId || '', record.photographer || '', record.photographerUrl || '', record.query || '')
    .run();
}

const json = (body, status = 200, headers = {}) => new Response(JSON.stringify(body), {
  status,
  headers: { 'content-type': 'application/json; charset=utf-8', ...headers },
});

function missingSecret(name) {
  return json({ error: 'Service is not configured', code: `MISSING_${name}` }, 503);
}

function diagnosticId() {
  return crypto.randomUUID();
}

function safeUpstreamError(body) {
  try {
    const parsed = JSON.parse(body);
    return {
      type: typeof parsed?.error?.type === 'string' ? parsed.error.type : 'unknown_error',
      message: typeof parsed?.error?.message === 'string'
        ? parsed.error.message.slice(0, 500)
        : 'No upstream error message',
    };
  } catch {
    return { type: 'invalid_response', message: 'Upstream returned a non-JSON error response' };
  }
}

function cacheStaticAsset(response, pathname) {
  if (!response.ok || response.status === 206) return response;
  const isLongLivedAsset = pathname.startsWith('/pandas/')
    || pathname.startsWith('/carila/assets/')
    || pathname.startsWith('/assets/')
    || /\.(?:png|jpe?g|webp|gif|svg|css|js)$/i.test(pathname);
  const isHtml = pathname === '/' || pathname.endsWith('.html') || pathname === '/carila/';
  if (!isLongLivedAsset && !isHtml) return response;

  const cached = new Response(response.body, response);
  cached.headers.delete('content-length');
  if (isLongLivedAsset) {
    cached.headers.set('cache-control', 'public, max-age=86400, stale-while-revalidate=604800');
  } else {
    cached.headers.set('cache-control', 'no-cache');
  }
  return cached;
}

function optimizeBarCarilaHtml(response) {
  if (typeof HTMLRewriter !== 'function') return response;

  const lazyPandaScript = `<script>(()=>{const load=(img)=>{if(!img||!img.dataset.src||img.getAttribute('src'))return;img.setAttribute('src',img.dataset.src);delete img.dataset.src;};document.querySelectorAll('.panda-img.active').forEach(load);const stage=document.getElementById('pandaStage');if(stage){new MutationObserver((records)=>{for(const record of records){const img=record.target;if(img.classList&&img.classList.contains('panda-img')&&img.classList.contains('active'))load(img);}}).observe(stage,{subtree:true,attributes:true,attributeFilter:['class']});}})();</script>`;

  return new HTMLRewriter()
    .on('img.panda-img', {
      element(element) {
        const id = element.getAttribute('id');
        const src = element.getAttribute('src');
        if (id === 'p-counter') {
          element.setAttribute('fetchpriority', 'high');
          element.setAttribute('decoding', 'async');
          return;
        }
        if (src) {
          element.setAttribute('data-src', src);
          element.removeAttribute('src');
          element.setAttribute('decoding', 'async');
        }
      },
    })
    .on('body', {
      element(element) {
        element.append(lazyPandaScript, { html: true });
      },
    })
    .transform(response);
}

async function chat(request, env) {
  if (request.method !== 'POST') return json({ error: 'Method not allowed' }, 405, { allow: 'POST' });
  if (!env.ANTHROPIC_API_KEY) return missingSecret('ANTHROPIC_API_KEY');

  let body;
  try {
    body = await request.json();
  } catch {
    return json({ error: 'Invalid JSON body' }, 400);
  }
  if (!body || !ALLOWED_MODELS.has(body.model) || !Number.isInteger(body.max_tokens)
    || body.max_tokens < 0 || !Array.isArray(body.messages) || body.messages.length === 0
    || (body.system !== undefined && typeof body.system !== 'string')) {
    return json({ error: 'Invalid Anthropic Messages request' }, 400);
  }

  const upstream = await fetch(ANTHROPIC_ENDPOINT, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'x-api-key': env.ANTHROPIC_API_KEY,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({ ...body, system: typeof body.system === 'string' && body.system ? [{ type: 'text', text: body.system, cache_control: { type: 'ephemeral' } }] : body.system }),
  });
  if (!upstream.ok) {
    const requestId = diagnosticId();
    const error = safeUpstreamError(await upstream.text());
    console.error('Anthropic Messages API failed', {
      requestId,
      status: upstream.status,
      type: error.type,
      message: error.message,
      upstreamRequestId: upstream.headers.get('request-id'),
    });
    return json({
      error: 'Chat service unavailable',
      code: `ANTHROPIC_${error.type.toUpperCase()}`,
      requestId,
    }, upstream.status);
  }

  return new Response(upstream.body, {
    status: upstream.status,
    headers: { 'content-type': upstream.headers.get('content-type') || 'application/json' },
  });
}

async function carilaChat(request, env) {
  if (request.method !== 'POST') return json({ error: 'Method not allowed' }, 405, { allow: 'POST' });
  if (!env.ANTHROPIC_API_KEY) return missingSecret('ANTHROPIC_API_KEY');

  let body;
  try { body = await request.json(); } catch { return json({ error: 'Invalid JSON body' }, 400); }
  const messages = body?.messages;
  const valid = Array.isArray(messages) && messages.length > 0 && messages.length <= 40
    && messages.every((message) => ['user', 'assistant'].includes(message?.role)
      && typeof message.content === 'string' && message.content.trim().length > 0
      && message.content.length <= 4000)
    && messages[0].role === 'user'
    && messages.every((message, index) => index === 0 || message.role !== messages[index - 1].role);
  if (!valid || messages.at(-1).role !== 'user') return json({ error: 'Invalid conversation' }, 400);

  const upstream = await fetch(ANTHROPIC_ENDPOINT, {
    method: 'POST',
    headers: {
      'content-type': 'application/json', 'x-api-key': env.ANTHROPIC_API_KEY,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: CARILA_MODEL, max_tokens: CARILA_MAX_TOKENS,
      system: CARILA_SYSTEM_PROMPT, messages,
    }),
  });
  if (!upstream.ok) {
    const requestId = diagnosticId();
    const error = safeUpstreamError(await upstream.text());
    console.error('Carila chat API failed', { requestId, status: upstream.status, type: error.type });
    return json({ error: 'Chat service unavailable', code: `ANTHROPIC_${error.type.toUpperCase()}`, requestId }, upstream.status);
  }
  const data = await upstream.json();
  const reply = data?.content?.find((item) => item.type === 'text')?.text?.trim();
  return reply ? json({ reply }) : json({ error: 'Invalid chat response' }, 502);
}

async function drinkImage(request, env, context) {
  if (request.method !== 'GET') return json({ error: 'Method not allowed' }, 405, { allow: 'GET' });
  const url = new URL(request.url);
  const name = url.searchParams.get('name');
  const query = url.searchParams.get('query');
  if (!name && !query) return json({ error: 'name or query required' }, 400);
  if (!env.UNSPLASH_ACCESS_KEY && !env.DRINK_DB) return missingSecret('UNSPLASH_ACCESS_KEY');

  const cache = caches.default;
  const normalize = (value) => (value || '').trim().toLowerCase().replace(/[・\s.\-]/g, '');
  const cacheIdentity = normalize(name) || normalize(query);
  const cacheUrl = new URL('/api/drink-image', url.origin);
  cacheUrl.searchParams.set('key', cacheIdentity);
  const cacheKey = new Request(cacheUrl.toString(), { method: 'GET' });
  const cached = await cache.match(cacheKey);
  if (cached) return cached;

  try {
    const stored = await readDrinkImageFromD1(env, cacheIdentity, context);
    if (stored) {
      const ttl = stored.url ? 31536000 : 2592000;
      const response = json(stored, 200, { 'cache-control': `public, max-age=${ttl}, stale-while-revalidate=604800` });
      context.waitUntil(cache.put(cacheKey, response.clone()));
      return response;
    }
  } catch (error) {
    console.error('D1 drink image lookup failed; falling back to Unsplash', error);
  }

  if (!env.UNSPLASH_ACCESS_KEY) return missingSecret('UNSPLASH_ACCESS_KEY');
  const searchQuery = query || `${name} cocktail drink`;
  const params = new URLSearchParams({
    query: searchQuery,
    per_page: '3',
    orientation: 'landscape',
  });
  const upstream = await fetch(`${UNSPLASH_ENDPOINT}?${params}`, {
    headers: { authorization: `Client-ID ${env.UNSPLASH_ACCESS_KEY}` },
  });
  if (!upstream.ok) return json({ error: 'Image service unavailable' }, 502);

  const data = await upstream.json();
  const photo = data.results?.[0];
  const rawUrl = photo?.urls?.regular;
  const imageUrl = rawUrl ? `${rawUrl.split('?')[0]}?w=800&auto=format&fit=crop` : null;
  const payload = {
    url: imageUrl,
    photoId: photo?.id || '',
    photographer: photo?.user?.name || '',
    photographerUrl: photo?.user?.links?.html || '',
  };
  const ttl = imageUrl ? 31536000 : 2592000;
  const response = json(payload, 200, { 'cache-control': `public, max-age=${ttl}, stale-while-revalidate=604800` });
  context.waitUntil(cache.put(cacheKey, response.clone()));
  context.waitUntil(saveDrinkImageToD1(env, {
    cacheIdentity, name: name || '', query: searchQuery, ...payload,
  }).catch((error) => console.error('D1 drink image save failed', error)));
  return response;
}

export default {
  async fetch(request, env, context) {
    const { pathname } = new URL(request.url);
    try {
      if (pathname === '/health') {
        if (request.method !== 'GET') return json({ error: 'Method not allowed' }, 405, { allow: 'GET' });
        return json({ status: 'ok', service: 'bar-carila' }, 200, { 'cache-control': 'no-store' });
      }
      if (pathname === '/api/chat') return await chat(request, env);
      if (pathname === '/api/carila-chat') return await carilaChat(request, env);
      if (pathname === '/api/drink-image') return await drinkImage(request, env, context);
      if (pathname.startsWith('/api/')) return json({ error: 'Not found' }, 404);
      if (pathname === '/carila') return Response.redirect(`${new URL(request.url).origin}/carila/`, 308);

      let response = await env.ASSETS.fetch(request);
      if (request.method === 'GET' && (pathname === '/' || pathname === '/index.html')) {
        response = optimizeBarCarilaHtml(response);
      }
      return cacheStaticAsset(response, pathname);
    } catch (error) {
      console.error('Worker request failed', error);
      return json({ error: 'Internal server error' }, 500);
    }
  },
};
