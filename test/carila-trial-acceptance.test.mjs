import test from 'node:test';
import assert from 'node:assert/strict';
import { DatabaseSync } from 'node:sqlite';
import { readFile } from 'node:fs/promises';
import worker from '../src/worker-carila-realtime.mjs';

const context = { waitUntil(p) { Promise.resolve(p).catch(() => {}); } };
class SqliteD1 {
  sql = [];
  database = new DatabaseSync(':memory:');
  prepare(sql) {
    this.sql.push(sql);
    const db = this.database;
    return { args: [], bind(...args) { this.args = args; return this; },
      async run() { return db.prepare(sql).run(...this.args); },
      async first() { return db.prepare(sql).get(...this.args) || null; },
    };
  }
}
const cookie = 'bar_carila_client=11111111-1111-4111-8111-111111111111';
const request = (voice = false, cookieValue = cookie) => new Request(`https://bar.example/api/${voice ? 'carila-realtime-session' : 'carila-chat'}`, {
  method: 'POST', headers: { cookie: cookieValue, 'content-type': voice ? 'application/sdp' : 'application/json' },
  body: voice ? 'v=0\r\noffer' : JSON.stringify({ messages: [{ role: 'user', content: 'こんばんは' }] }),
});

test('real SQL counters allow 20 text turns and 2 voice sessions, blocking all excess upstream calls', async () => {
  const db = new SqliteD1();
  const env = { DRINK_DB: db, ANTHROPIC_API_KEY: 'mock', OPENAI_API_KEY: 'mock' };
  const oldFetch = globalThis.fetch;
  const calls = { text: 0, voice: 0 };
  globalThis.fetch = async url => {
    const voice = String(url).includes('openai'); calls[voice ? 'voice' : 'text']++;
    return voice ? new Response('v=0\r\nanswer') : Response.json({ content: [{ type: 'text', text: 'こんばんは。' }] });
  };
  try {
    for (let i = 1; i <= 20; i++) { const r = await worker.fetch(request(), env, context); assert.equal(r.status, 200); assert.equal(r.headers.get('x-carila-trial-remaining'), String(20 - i)); }
    const blocked = await worker.fetch(request(), env, context); assert.equal(blocked.status, 429); assert.ok(Number(blocked.headers.get('retry-after')) > 0);
    for (let i = 0; i < 2; i++) assert.equal((await worker.fetch(request(true), env, context)).status, 200);
    assert.equal((await worker.fetch(request(true), env, context)).status, 429);
    assert.deepEqual(calls, { text: 20, voice: 2 });
    assert.equal(db.sql.filter(s => /CREATE TABLE/.test(s)).length, 1);
    assert.ok(db.sql.every(s => /carila_usage_daily/.test(s)));
    assert.deepEqual({ ...db.database.prepare('SELECT text_turns, voice_sessions FROM carila_usage_daily').get() }, { text_turns: 20, voice_sessions: 2 });
  } finally { globalThis.fetch = oldFetch; db.database.close(); }
});

test('JST midnight uses a new day row and retry-after stops at that boundary', async () => {
  const db = new SqliteD1(); const env = { DRINK_DB: db, OPENAI_API_KEY: 'mock' };
  const oldFetch = globalThis.fetch; const oldNow = Date.now;
  globalThis.fetch = async () => new Response('answer');
  try {
    Date.now = () => Date.parse('2026-10-10T14:59:59Z');
    await worker.fetch(request(true), env, context); await worker.fetch(request(true), env, context);
    const blocked = await worker.fetch(request(true), env, context); assert.equal(blocked.status, 429); assert.equal(blocked.headers.get('retry-after'), '1');
    Date.now = () => Date.parse('2026-10-10T15:00:00Z');
    assert.equal((await worker.fetch(request(true), env, context)).status, 200);
    assert.deepEqual(db.database.prepare('SELECT usage_date, voice_sessions FROM carila_usage_daily ORDER BY usage_date').all().map(r => ({ ...r })), [{ usage_date: '2026-10-10', voice_sessions: 2 }, { usage_date: '2026-10-11', voice_sessions: 1 }]);
  } finally { Date.now = oldNow; globalThis.fetch = oldFetch; db.database.close(); }
});

test('usage guard fails closed on setup and counter failure; a separate binding initializes independently', async () => {
  const oldFetch = globalThis.fetch; let calls = 0; globalThis.fetch = async () => { calls++; return new Response('answer'); };
  try {
    for (const DRINK_DB of [undefined, { prepare() { throw Error('offline'); } }, { prepare() { return { run: async () => ({}), bind() { return this; }, first: async () => { throw Error('counter failure'); } }; } }]) {
      const r = await worker.fetch(request(true), { DRINK_DB, OPENAI_API_KEY: 'mock' }, context);
      assert.equal(r.status, 503); assert.equal((await r.json()).code, 'CARILA_USAGE_GUARD_UNAVAILABLE');
    }
    assert.equal(calls, 0);
    const db = new SqliteD1(); assert.equal((await worker.fetch(request(true), { DRINK_DB: db, OPENAI_API_KEY: 'mock' }, context)).status, 200); db.database.close();
  } finally { globalThis.fetch = oldFetch; }
});

test('invalid methods/payloads do not touch D1; malformed cookie is replaced safely', async () => {
  const db = new SqliteD1(); const env = { DRINK_DB: db, OPENAI_API_KEY: 'mock', ANTHROPIC_API_KEY: 'mock' };
  for (const [path, init, expected] of [
    ['carila-chat', {}, 405], ['carila-realtime-session', {}, 405],
    ['carila-chat', { method: 'POST', body: '{}' }, 400],
    ['carila-realtime-session', { method: 'POST', body: 'bad' }, 415],
    ['carila-realtime-session', { method: 'POST', headers: { 'content-type': 'application/sdp' }, body: '' }, 400],
  ]) assert.equal((await worker.fetch(new Request(`https://bar.example/api/${path}`, init), env, context)).status, expected);
  assert.equal(db.sql.length, 0);
  const oldFetch = globalThis.fetch; globalThis.fetch = async () => new Response('answer');
  try { const r = await worker.fetch(request(true, 'bar_carila_client=%ZZ'), env, context); assert.equal(r.status, 200); assert.match(r.headers.get('set-cookie'), /HttpOnly; Secure; SameSite=Lax/); }
  finally { globalThis.fetch = oldFetch; db.database.close(); }
});

test('normal recommendation endpoint stays outside trial and preserves open recommendation', async () => {
  const oldFetch = globalThis.fetch; globalThis.fetch = async () => Response.json({ content: [{ type: 'text', text: JSON.stringify({ type: 'recommendation', drink: { name: 'Unlisted Test Drink' } }) }] });
  try {
    const r = await worker.fetch(new Request('https://bar.example/api/chat', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ model: 'claude-sonnet-4-6', max_tokens: 100, messages: [{ role: 'user', content: 'test' }] }) }), { ANTHROPIC_API_KEY: 'mock' }, context);
    assert.equal(r.status, 200); assert.equal(r.headers.get('x-carila-trial-limit'), null); assert.match(await r.text(), /Unlisted Test Drink/);
  } finally { globalThis.fetch = oldFetch; }
});

test('conversation payload handles repeated speakers, long histories, and preserves literal HTML history', async () => {
  const source = await readFile(new URL('../public/carila/assets/js/memory/session-memory.js', import.meta.url), 'utf8');
  const { SessionMemory } = await import(`data:text/javascript;base64,${Buffer.from(source).toString('base64')}`);
  const m = new SessionMemory(); m.add('assistant', 'greeting'); m.add('user', '<img onerror=alert(1)>'); m.add('user', 'retry'); m.add('assistant', 'reply'); m.add('assistant', 'voice greeting'); m.add('user', 'next');
  assert.deepEqual(m.conversation().map(x => x.role), ['user', 'assistant', 'user']); assert.equal(m.history()[1].content, '<img onerror=alert(1)>');
  for (let i = 0; i < 50; i++) { m.add('assistant', 'reply'); m.add('user', 'turn'); }
  assert.ok(m.conversation().length <= 39); assert.equal(m.conversation()[0].role, 'user'); assert.equal(m.conversation().at(-1).role, 'user');
});
