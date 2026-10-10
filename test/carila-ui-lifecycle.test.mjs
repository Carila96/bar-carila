import test from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import { readFile } from 'node:fs/promises';

async function harness(options = {}) {
  class Element {
    listeners = {}; children = []; style = { setProperty() {} }; disabled = false; hidden = false; value = ''; scrollHeight = 80;
    classList = { add() {}, remove() {}, toggle() {} };
    attributes = {}; textContent = '';
    addEventListener(name, fn) { this.listeners[name] = fn; }
    append(...items) { this.children.push(...items); }
    replaceChildren(...items) { this.children = items; }
    setAttribute(k, v) { this.attributes[k] = v; }
    getAttribute(k) { return this.attributes[k]; }
    querySelector() { return this; }
    pause() {} remove() {} focus() {} showModal() {} close() {}
    requestSubmit() { this.listeners.submit?.({ preventDefault() {} }); }
  }
  const elements = new Map(); const get = id => { if (!elements.has(id)) elements.set(id, new Element()); return elements.get(id); };
  const timers = new Map(); let nextTimer = 1; const peers = []; const tracks = [];
  class Peer {
    connectionState = 'new';
    channel = new Element();
    constructor() { peers.push(this); this.channel.readyState = 'open'; this.channel.sent = []; this.channel.send = x => this.channel.sent.push(JSON.parse(x)); }
    createDataChannel() { return this.channel; }
    addTrack() {} async createOffer() { return { sdp: 'offer' }; } async setLocalDescription() {} async setRemoteDescription() {}
    close() { this.connectionState = 'closed'; this.onconnectionstatechange?.(); }
    connect() { this.connectionState = 'connected'; this.onconnectionstatechange(); this.channel.listeners.open(); }
  }
  const memorySource = await readFile(new URL('../public/carila/assets/js/memory/session-memory.js', import.meta.url), 'utf8');
  const { SessionMemory } = await import(`data:text/javascript;base64,${Buffer.from(memorySource).toString('base64')}`);
  const stream = () => { const track = { stopped: false, stop() { this.stopped = true; } }; tracks.push(track); return { getTracks: () => [track] }; };
  const windowEvents = {};
  const context = vm.createContext({
    SessionMemory, UI_CONFIG: { greeting: 'greeting', starters: [], imagePath: 'image', apiPath: '/api/carila-chat' }, formatCarilaText: x => x,
    document: { getElementById: get, querySelector: get, createElement: () => new Element(), createTextNode: text => ({ textContent: text }), body: new Element() },
    navigator: { mediaDevices: { getUserMedia: options.media || (async () => stream()) } }, RTCPeerConnection: Peer,
    window: { addEventListener: (k, fn) => windowEvents[k] = fn }, location: { reload() {} },
    getComputedStyle: () => ({ maxHeight: '174px' }), requestAnimationFrame: fn => fn(),
    setTimeout: (fn, ms) => { const id = nextTimer++; timers.set(id, { fn, ms }); return id; }, clearTimeout: id => timers.delete(id),
    fetch: options.fetch || (async () => new Response('answer')), AbortController, AbortSignal, console: { error() {} },
  });
  const source = await readFile(new URL('../public/carila/assets/js/carila.js', import.meta.url), 'utf8');
  vm.runInContext(source.replace(/^import .*;\n/gm, ''), context);
  return { get, peers, tracks, timers, stream, windowEvents, run: code => vm.runInContext(code, context), fire(ms) { const item = [...timers].find(([, t]) => t.ms === ms); assert.ok(item, `timer ${ms}`); timers.delete(item[0]); item[1].fn(); } };
}

test('voice greeting, transcripts, five minute cap, cleanup, and restart work with simulated WebRTC', async () => {
  const h = await harness(); await h.run('startVoice()'); const peer = h.peers[0]; peer.connect();
  assert.equal(h.get('messageInput').disabled, true); assert.match(peer.channel.sent[0].response.instructions, /必ず日本語/);
  peer.channel.listeners.message({ data: JSON.stringify({ type: 'conversation.item.input_audio_transcription.completed', item_id: '1', transcript: 'こんにちは' }) });
  peer.channel.listeners.message({ data: JSON.stringify({ type: 'response.output_audio_transcript.done', transcript: '<img onerror=x>' }) });
  assert.equal(h.get('voiceTranscriptList').children.length, 2);
  assert.equal(h.get('carilaTurn').textContent, '<img onerror=x>');
  peer.onconnectionstatechange(); assert.equal([...h.timers.values()].filter(t => t.ms === 300000).length, 1);
  h.fire(300000); assert.match(h.get('voiceStatus').textContent, /5分/); assert.ok(h.tracks[0].stopped); assert.equal(h.timers.size, 0); assert.equal(h.get('messageInput').disabled, false);
  await h.run('startVoice()'); h.peers[1].connect(); h.windowEvents.pagehide(); assert.ok(h.tracks[1].stopped); assert.equal(h.timers.size, 0);
  peer.channel.listeners.message({ data: JSON.stringify({ type: 'response.output_audio_transcript.done', transcript: 'stale' }) }); assert.notEqual(h.get('carilaTurn').textContent, 'stale');
});

test('late microphone permission after pagehide cannot resurrect voice', async () => {
  let resolveMedia; const h = await harness({ media: () => new Promise(resolve => resolveMedia = resolve) });
  const pending = h.run('startVoice()'); h.windowEvents.pagehide(); resolveMedia(h.stream()); await pending;
  assert.equal(h.peers.length, 0); assert.ok(h.tracks[0].stopped); assert.equal(h.timers.size, 0);
});

test('connection timeout and realtime errors release UI and microphone', async () => {
  const h = await harness(); await h.run('startVoice()'); h.fire(30000); assert.ok(h.tracks[0].stopped); assert.equal(h.get('voiceButton').disabled, false);
  await h.run('startVoice()'); h.peers[1].connect(); h.peers[1].channel.listeners.message({ data: JSON.stringify({ type: 'error', error: {} }) });
  assert.match(h.get('voiceStatus').textContent, /エラー/); assert.ok(h.tracks[1].stopped); assert.equal(h.timers.size, 0);
});

test('429 and usage guard 503 are understandable and leave voice UI retryable', async () => {
  for (const [status, code, message] of [[429, 'CARILA_TRIAL_LIMIT_REACHED', /本日/], [503, 'CARILA_USAGE_GUARD_UNAVAILABLE', /一時的/]]) {
    const h = await harness({ fetch: async () => Response.json({ code }, { status }) }); await h.run('startVoice()');
    assert.match(h.get('voiceStatus').textContent, message); assert.equal(h.get('voiceButton').disabled, false); assert.ok(h.tracks[0].stopped); assert.equal(h.timers.size, 0);
  }
});

test('Enter is newline, IME never submits, modified Enter submits; API failure can be retried', async () => {
  let calls = 0; const bodies = [];
  const h = await harness({ fetch: async (_, init) => { calls++; bodies.push(JSON.parse(init.body)); return calls === 1 ? Response.json({ error: 'offline' }, { status: 502 }) : Response.json({ reply: 'reply' }); } });
  let submits = 0; h.get('chatForm').requestSubmit = () => submits++;
  const key = h.get('messageInput').listeners.keydown;
  key({ key: 'Enter', isComposing: false, preventDefault() {} }); key({ key: 'Enter', ctrlKey: true, isComposing: true, preventDefault() {} }); assert.equal(submits, 0);
  key({ key: 'Enter', ctrlKey: true, isComposing: false, preventDefault() {} }); assert.equal(submits, 1);
  await h.run("send('first')"); assert.match(h.get('status').textContent, /もう一度/); await h.run("send('retry')");
  assert.equal(calls, 2); assert.equal(bodies[1].messages.length, 1); assert.equal(h.get('carilaTurn').textContent, 'reply'); assert.equal(h.get('sendButton').disabled, false);
});
