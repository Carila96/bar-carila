import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import worker from '../src/worker.mjs';

const context = { waitUntil() {} };
const env = { ASSETS: { fetch: () => new Response('asset') } };

test('health is non-billable and does not require secrets', async () => {
  const originalFetch = globalThis.fetch;
  globalThis.fetch = () => { throw new Error('health called an upstream'); };
  try {
    const response = await worker.fetch(new Request('https://preview.example/health'), env, context);
    assert.equal(response.status, 200);
    assert.deepEqual(await response.json(), { status: 'ok', service: 'bar-carila' });
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test('chat fails safely when its secret is missing', async () => {
  const response = await worker.fetch(new Request('https://preview.example/api/chat', { method: 'POST' }), env, context);
  assert.equal(response.status, 503);
  assert.equal((await response.json()).code, 'MISSING_ANTHROPIC_API_KEY');
});

test('drink image fails safely when its secret is missing', async () => {
  const response = await worker.fetch(new Request('https://preview.example/api/drink-image?name=martini'), env, context);
  assert.equal(response.status, 503);
  assert.equal((await response.json()).code, 'MISSING_UNSPLASH_ACCESS_KEY');
});

test('unknown APIs do not fall through to static assets', async () => {
  const response = await worker.fetch(new Request('https://preview.example/api/nope'), env, context);
  assert.equal(response.status, 404);
});

test('static requests use the same-origin assets binding', async () => {
  const response = await worker.fetch(new Request('https://preview.example/'), env, context);
  assert.equal(await response.text(), 'asset');
});

test('CARILA WORKS manifest uses only schema 1.0 fields', async () => {
  const manifest = JSON.parse(await readFile(new URL('../carila-project.json', import.meta.url), 'utf8'));
  const fields = [
    'schemaVersion', 'id', 'title', 'description', 'briefPath', 'category',
    'repositoryUrl', 'previewUrl', 'productionUrl', 'subdomain', 'status',
    'releaseAdapterType', 'createdAt', 'updatedAt',
  ];
  assert.deepEqual(Object.keys(manifest), fields);
  assert.equal(manifest.schemaVersion, '1.0');
  assert.equal(manifest.releaseAdapterType, 'cloudflare-worker-app');
  assert.equal(manifest.subdomain, 'bar.carilaworks.com');
  assert.equal(Number.isNaN(Date.parse(manifest.createdAt)), false);
  assert.equal(Number.isNaN(Date.parse(manifest.updatedAt)), false);
});
