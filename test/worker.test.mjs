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

test('chat forwards a valid Messages API request with required headers', async () => {
  const originalFetch = globalThis.fetch;
  const requestBody = {
    model: 'claude-sonnet-4-20250514',
    max_tokens: 1100,
    system: 'You are a bartender.',
    messages: [{ role: 'user', content: 'Recommend a drink.' }],
  };
  globalThis.fetch = async (url, init) => {
    assert.equal(url, 'https://api.anthropic.com/v1/messages');
    assert.equal(init.method, 'POST');
    assert.equal(init.headers['content-type'], 'application/json');
    assert.equal(init.headers['anthropic-version'], '2023-06-01');
    assert.equal(init.headers['x-api-key'], 'bound-secret');
    assert.deepEqual(JSON.parse(init.body), requestBody);
    return Response.json({ content: [{ type: 'text', text: '{}'}] });
  };
  try {
    const response = await worker.fetch(new Request('https://preview.example/api/chat', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(requestBody),
    }), { ...env, ANTHROPIC_API_KEY: 'bound-secret' }, context);
    assert.equal(response.status, 200);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test('chat rejects requests missing required Messages API fields', async () => {
  const response = await worker.fetch(new Request('https://preview.example/api/chat', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ model: 'claude-sonnet-4-20250514', messages: [] }),
  }), { ...env, ANTHROPIC_API_KEY: 'bound-secret' }, context);
  assert.equal(response.status, 400);
});

test('chat sanitizes Anthropic errors while retaining safe diagnostics', async () => {
  const originalFetch = globalThis.fetch;
  const originalConsoleError = console.error;
  const logs = [];
  console.error = (...args) => logs.push(args);
  globalThis.fetch = async () => new Response(JSON.stringify({
    type: 'error', error: { type: 'authentication_error', message: 'invalid x-api-key' },
  }), { status: 401, headers: { 'request-id': 'req_upstream' } });
  try {
    const response = await worker.fetch(new Request('https://preview.example/api/chat', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514', max_tokens: 10, system: 'test',
        messages: [{ role: 'user', content: 'test' }],
      }),
    }), { ...env, ANTHROPIC_API_KEY: 'bound-secret' }, context);
    const body = await response.json();
    assert.equal(response.status, 401);
    assert.equal(body.code, 'ANTHROPIC_AUTHENTICATION_ERROR');
    assert.equal(typeof body.requestId, 'string');
    assert.equal(JSON.stringify(body).includes('invalid x-api-key'), false);
    assert.deepEqual(logs[0][1], {
      requestId: body.requestId, status: 401, type: 'authentication_error',
      message: 'invalid x-api-key', upstreamRequestId: 'req_upstream',
    });
    assert.equal(JSON.stringify(logs).includes('bound-secret'), false);
  } finally {
    globalThis.fetch = originalFetch;
    console.error = originalConsoleError;
  }
});

test('frontend localizes chat errors and reports safe diagnostics', async () => {
  const html = await readFile(new URL('../public/index.html', import.meta.url), 'utf8');
  assert.match(html, /chatError:'……少し調子が悪いようです。もう一度お試しください。'/);
  assert.match(html, /chatError:'…Something seems to be wrong right now. Please try again.'/);
  assert.match(html, /showMsg\(t\(\)\.chatError\)/);
  assert.match(html, /requestId=data&&data\.requestId/);
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
