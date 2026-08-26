const ANTHROPIC_ENDPOINT = 'https://api.anthropic.com/v1/messages';
const UNSPLASH_ENDPOINT = 'https://api.unsplash.com/search/photos';
const ALLOWED_MODELS = new Set(['claude-sonnet-4-20250514']);

const json = (body, status = 200, headers = {}) => new Response(JSON.stringify(body), {
  status,
  headers: { 'content-type': 'application/json; charset=utf-8', ...headers },
});

function missingSecret(name) {
  return json({ error: 'Service is not configured', code: `MISSING_${name}` }, 503);
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
  if (!body || !ALLOWED_MODELS.has(body.model) || !Array.isArray(body.messages)) {
    return json({ error: 'Invalid Anthropic Messages request' }, 400);
  }

  const upstream = await fetch(ANTHROPIC_ENDPOINT, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'x-api-key': env.ANTHROPIC_API_KEY,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify(body),
  });
  return new Response(upstream.body, {
    status: upstream.status,
    headers: { 'content-type': upstream.headers.get('content-type') || 'application/json' },
  });
}

async function drinkImage(request, env, context) {
  if (request.method !== 'GET') return json({ error: 'Method not allowed' }, 405, { allow: 'GET' });
  if (!env.UNSPLASH_ACCESS_KEY) return missingSecret('UNSPLASH_ACCESS_KEY');
  const url = new URL(request.url);
  const name = url.searchParams.get('name');
  const query = url.searchParams.get('query');
  if (!name && !query) return json({ error: 'name or query required' }, 400);

  const cache = caches.default;
  const cacheKey = new Request(url.toString(), { method: 'GET' });
  const cached = await cache.match(cacheKey);
  if (cached) return cached;

  const params = new URLSearchParams({
    query: query || `${name} cocktail drink`,
    per_page: '3',
    orientation: 'landscape',
  });
  const upstream = await fetch(`${UNSPLASH_ENDPOINT}?${params}`, {
    headers: { authorization: `Client-ID ${env.UNSPLASH_ACCESS_KEY}` },
  });
  if (!upstream.ok) return json({ error: 'Image service unavailable' }, 502);

  const data = await upstream.json();
  const rawUrl = data.results?.[0]?.urls?.regular;
  const imageUrl = rawUrl ? `${rawUrl.split('?')[0]}?w=800&auto=format&fit=crop` : null;
  const response = json({ url: imageUrl }, 200, { 'cache-control': 'public, max-age=86400' });
  context.waitUntil(cache.put(cacheKey, response.clone()));
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
      if (pathname === '/api/drink-image') return await drinkImage(request, env, context);
      if (pathname.startsWith('/api/')) return json({ error: 'Not found' }, 404);
      return env.ASSETS.fetch(request);
    } catch (error) {
      console.error('Worker request failed', error);
      return json({ error: 'Internal server error' }, 500);
    }
  },
};
