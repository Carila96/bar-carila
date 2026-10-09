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
