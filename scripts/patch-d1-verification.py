from pathlib import Path

worker = Path('src/worker.mjs')
s = worker.read_text(encoding='utf-8')

s = s.replace("function drinkImagePayload(row) {\n  return {\n    url: row?.image_url || null,\n    photoId: row?.photo_id || '',\n    photographer: row?.photographer || '',\n    photographerUrl: row?.photographer_url || '',\n  };\n}", "function drinkImagePayload(row, source = '') {\n  return {\n    url: row?.image_url || null,\n    photoId: row?.photo_id || '',\n    photographer: row?.photographer || '',\n    photographerUrl: row?.photographer_url || '',\n    ...(source ? { source } : {}),\n  };\n}")

s = s.replace("  return drinkImagePayload(row);", "  return drinkImagePayload(row, 'd1');")

s = s.replace("  const cached = await cache.match(cacheKey);\n  if (cached) return cached;", "  const cached = await cache.match(cacheKey);\n  if (cached) {\n    const body = await cached.clone().json().catch(() => null);\n    if (body && typeof body === 'object') return json({ ...body, source: body.source || 'cloudflare-cache' }, cached.status, { 'cache-control': cached.headers.get('cache-control') || 'public, max-age=31536000' });\n    return cached;\n  }")

s = s.replace("  const payload = {\n    url: imageUrl,\n    photoId: photo?.id || '',\n    photographer: photo?.user?.name || '',\n    photographerUrl: photo?.user?.links?.html || '',\n  };", "  const payload = {\n    url: imageUrl,\n    photoId: photo?.id || '',\n    photographer: photo?.user?.name || '',\n    photographerUrl: photo?.user?.links?.html || '',\n    source: 'unsplash',\n  };")

worker.write_text(s, encoding='utf-8')

# Add focused tests in a separate file to avoid disturbing the large existing suite.
test = Path('test/d1-verification.test.mjs')
test.write_text(r'''import test from 'node:test';
import assert from 'node:assert/strict';
import worker from '../src/worker.mjs';

function makeD1(row = null) {
  const calls = [];
  return {
    calls,
    prepare(sql) {
      return {
        bind(...args) {
          return {
            async first() { calls.push(['first', sql, args]); return row; },
            async run() { calls.push(['run', sql, args]); return { success: true }; },
          };
        },
        async run() { calls.push(['run', sql, []]); return { success: true }; },
      };
    },
  };
}

const context = { waitUntil(p) { Promise.resolve(p).catch(() => {}); } };
const envBase = { ASSETS: { fetch: () => new Response('asset') } };

test('drink image response explicitly reports D1 when permanent storage hits', async () => {
  const originalCaches = globalThis.caches;
  const originalFetch = globalThis.fetch;
  globalThis.caches = { default: { match: async () => undefined, put: async () => {} } };
  globalThis.fetch = async () => { throw new Error('Unsplash must not be called on a D1 hit'); };
  const db = makeD1({
    image_url: 'https://images.unsplash.com/example', photo_id: 'p1',
    photographer: 'Tester', photographer_url: 'https://unsplash.com/@tester',
  });
  try {
    const response = await worker.fetch(new Request('https://preview.example/api/drink-image?name=D1OnlyVerificationDrink'), { ...envBase, DRINK_DB: db }, context);
    assert.equal(response.status, 200);
    const body = await response.json();
    assert.equal(body.source, 'd1');
    assert.equal(body.photoId, 'p1');
  } finally {
    globalThis.caches = originalCaches;
    globalThis.fetch = originalFetch;
  }
});

test('drink image response reports Unsplash on miss and persists the result into D1', async () => {
  const originalCaches = globalThis.caches;
  const originalFetch = globalThis.fetch;
  globalThis.caches = { default: { match: async () => undefined, put: async () => {} } };
  const db = makeD1(null);
  globalThis.fetch = async (url) => {
    assert.match(String(url), /api\.unsplash\.com\/search\/photos/);
    return Response.json({ results: [{
      id: 'fresh-photo', urls: { regular: 'https://images.unsplash.com/fresh?x=1' },
      user: { name: 'Fresh Photographer', links: { html: 'https://unsplash.com/@fresh' } },
    }] });
  };
  try {
    const response = await worker.fetch(new Request('https://preview.example/api/drink-image?name=FreshVerificationDrink'), { ...envBase, DRINK_DB: db, UNSPLASH_ACCESS_KEY: 'test-key' }, context);
    const body = await response.json();
    assert.equal(body.source, 'unsplash');
    assert.equal(body.photoId, 'fresh-photo');
    await new Promise((resolve) => setTimeout(resolve, 0));
    assert.ok(db.calls.some(([kind, sql]) => kind === 'run' && /INSERT INTO drink_images/.test(sql)));
  } finally {
    globalThis.caches = originalCaches;
    globalThis.fetch = originalFetch;
  }
});
''', encoding='utf-8')
