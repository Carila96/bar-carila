import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import worker from '../src/worker-carila-realtime.mjs';

const context = { waitUntil() {} };

test('realtime voice endpoint requires its server-side OpenAI secret', async () => {
  const response = await worker.fetch(new Request('https://preview.example/api/carila-realtime-session', {
    method: 'POST', headers: { 'content-type': 'application/sdp' }, body: 'v=0\r\n',
  }), {}, context);
  assert.equal(response.status, 503);
  assert.equal((await response.json()).code, 'MISSING_OPENAI_API_KEY');
});

test('realtime voice creates a server-authenticated WebRTC call with Carila personality', async () => {
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async (url, init) => {
    assert.equal(url, 'https://api.openai.com/v1/realtime/calls');
    assert.equal(init.method, 'POST');
    assert.equal(init.headers.authorization, 'Bearer server-secret');
    assert.ok(init.body instanceof FormData);
    assert.equal(init.body.get('sdp'), 'v=0\r\nmock-offer');
    const session = JSON.parse(init.body.get('session'));
    assert.equal(session.type, 'realtime');
    assert.equal(session.model, 'gpt-realtime-2.1');
    assert.deepEqual(session.output_modalities, ['audio']);
    assert.match(session.instructions, /バーテンダーと客/);
    assert.match(session.instructions, /相手が話し始めたら割り込み/);
    return new Response('v=0\r\nmock-answer', { status: 200, headers: { 'content-type': 'application/sdp' } });
  };
  try {
    const response = await worker.fetch(new Request('https://preview.example/api/carila-realtime-session', {
      method: 'POST', headers: { 'content-type': 'application/sdp' }, body: 'v=0\r\nmock-offer',
    }), { OPENAI_API_KEY: 'server-secret' }, context);
    assert.equal(response.status, 200);
    assert.equal(response.headers.get('content-type'), 'application/sdp');
    assert.equal(await response.text(), 'v=0\r\nmock-answer');
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test('Carila page exposes continuous WebRTC voice mode without push-to-talk', async () => {
  const [html, app, css, wrangler, manifest, realtimeWorker] = await Promise.all([
    readFile(new URL('../public/carila/index.html', import.meta.url), 'utf8'),
    readFile(new URL('../public/carila/assets/js/carila.js', import.meta.url), 'utf8'),
    readFile(new URL('../public/carila/assets/css/voice.css', import.meta.url), 'utf8'),
    readFile(new URL('../wrangler.jsonc', import.meta.url), 'utf8'),
    readFile(new URL('../carila-worker-app.json', import.meta.url), 'utf8'),
    readFile(new URL('../src/worker-carila-realtime.mjs', import.meta.url), 'utf8'),
  ]);
  assert.match(html, /id="voiceButton"/);
  assert.match(html, /一度始めれば、あとは普通に話しかけられます/);
  assert.match(app, /new RTCPeerConnection\(\)/);
  assert.match(app, /getUserMedia/);
  assert.match(app, /addTrack/);
  assert.match(app, /\/api\/carila-realtime-session/);
  assert.match(app, /途中でも話し始めれば割り込めます/);
  assert.doesNotMatch(app, /MediaRecorder/);
  assert.match(css, /voice-button\.is-active/);
  assert.match(wrangler, /worker-carila-realtime\.mjs/);
  assert.match(realtimeWorker, /worker-v1\.9-expansions\.mjs/);
  assert.match(realtimeWorker, /return appWorker\.fetch/);
  assert.match(manifest, /OPENAI_API_KEY/);
});
