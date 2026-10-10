import test from 'node:test';
import assert from 'node:assert/strict';
import worker from '../src/worker-carila-realtime.mjs';

const context = { waitUntil(promise) { Promise.resolve(promise).catch(() => {}); } };

function noD1() {
  return {
    prepare() {
      throw new Error('non-chat request touched DRINK_DB');
    },
  };
}

test('static asset requests bypass drink-master D1 maintenance', async () => {
  const response = await worker.fetch(
    new Request('https://bar.example/assets/app.js'),
    {
      DRINK_DB: noD1(),
      ASSETS: { fetch: async () => new Response('asset-body', { status: 200 }) },
    },
    context,
  );
  assert.equal(response.status, 200);
  assert.equal(await response.text(), 'asset-body');
});

test('health requests bypass drink-master D1 maintenance', async () => {
  const response = await worker.fetch(
    new Request('https://bar.example/health'),
    {
      DRINK_DB: noD1(),
      ASSETS: { fetch: async () => new Response('asset') },
    },
    context,
  );
  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { status: 'ok', service: 'bar-carila' });
});

test('drink metadata endpoint issues only indexed point reads, never master initialization', async () => {
  const calls = [];
  const db = { prepare(sql) {
    calls.push(sql);
    assert.match(sql, /^SELECT/i);
    assert.doesNotMatch(sql, /COUNT\(/i);
    return { bind() { return this; }, async first() { return { id: 1, name_ja: 'ネグローニ', japan_rarity_score: 24 }; } };
  } };
  const r = await worker.fetch(new Request('https://bar.example/api/drink-meta?name=Negroni'), { DRINK_DB: db }, context);
  assert.equal(r.status, 200);
  assert.equal(calls.length, 1);
  assert.match(calls[0], /WHERE canonical_key = \?/);
});
