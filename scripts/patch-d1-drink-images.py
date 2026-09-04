from pathlib import Path

path = Path('src/worker.mjs')
s = path.read_text()

insert_after = "const ALLOWED_MODELS = new Set(['claude-sonnet-4-6', 'claude-haiku-4-5-20251001']);\n"
addition = r'''
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
'''
if addition.strip() not in s:
    if insert_after not in s:
        raise SystemExit('model constants insertion point not found')
    s = s.replace(insert_after, insert_after + addition, 1)

old = r'''async function drinkImage(request, env, context) {
  if (request.method !== 'GET') return json({ error: 'Method not allowed' }, 405, { allow: 'GET' });
  if (!env.UNSPLASH_ACCESS_KEY) return missingSecret('UNSPLASH_ACCESS_KEY');
  const url = new URL(request.url);
  const name = url.searchParams.get('name');
  const query = url.searchParams.get('query');
  if (!name && !query) return json({ error: 'name or query required' }, 400);

  const cache = caches.default;
  const normalize = (value) => (value || '').trim().toLowerCase().replace(/[・\s.\-]/g, '');
  const cacheIdentity = normalize(name) || normalize(query);
  const cacheUrl = new URL('/api/drink-image', url.origin);
  cacheUrl.searchParams.set('key', cacheIdentity);
  const cacheKey = new Request(cacheUrl.toString(), { method: 'GET' });
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
  const photo = data.results?.[0];
  const rawUrl = photo?.urls?.regular;
  const imageUrl = rawUrl ? `${rawUrl.split('?')[0]}?w=800&auto=format&fit=crop` : null;
  const ttl = imageUrl ? 31536000 : 2592000;
  const response = json({
    url: imageUrl,
    photoId: photo?.id || '',
    photographer: photo?.user?.name || '',
    photographerUrl: photo?.user?.links?.html || '',
  }, 200, { 'cache-control': `public, max-age=${ttl}, stale-while-revalidate=604800` });
  context.waitUntil(cache.put(cacheKey, response.clone()));
  return response;
}'''
new = r'''async function drinkImage(request, env, context) {
  if (request.method !== 'GET') return json({ error: 'Method not allowed' }, 405, { allow: 'GET' });
  const url = new URL(request.url);
  const name = url.searchParams.get('name');
  const query = url.searchParams.get('query');
  if (!name && !query) return json({ error: 'name or query required' }, 400);

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
}'''
if old not in s:
    raise SystemExit('drinkImage block not found')
s = s.replace(old, new, 1)
path.write_text(s)

test_path = Path('test/worker.test.mjs')
t = test_path.read_text()
t += r'''

test('drink image worker uses D1 as durable shared cache before Unsplash', async () => {
  const source = await readFile(new URL('../src/worker.mjs', import.meta.url), 'utf8');
  assert.match(source, /CREATE TABLE IF NOT EXISTS drink_images/);
  assert.match(source, /readDrinkImageFromD1\(env, cacheIdentity, context\)/);
  assert.match(source, /saveDrinkImageToD1\(env, \{/);
  assert.match(source, /ON CONFLICT\(cache_key\) DO UPDATE SET/);
  assert.match(source, /use_count = drink_images\.use_count \+ 1/);
});

test('Worker App contract declares the managed D1 drink image database', async () => {
  const contract = JSON.parse(await readFile(new URL('../carila-worker-app.json', import.meta.url), 'utf8'));
  assert.deepEqual(contract.d1Databases, [{ binding: 'DRINK_DB', name: 'bar-carila-drink-images' }]);
});
'''
test_path.write_text(t)
