import test from 'node:test';
import assert from 'node:assert/strict';
import { createReadOnlyMasterDb } from '../src/worker-carila-realtime.mjs';

function makeDb() {
  const calls = [];
  return {
    calls,
    prepare(sql) {
      calls.push(sql);
      return {
        bind() { return this; },
        async first() { return { canonical_key: 'ginandtonic' }; },
        async run() { return { success: true }; },
        async all() { return { results: [] }; },
      };
    },
  };
}

test('runtime master gate suppresses request-time seed COUNT and writes', async () => {
  const db = makeDb();
  const runtime = createReadOnlyMasterDb(db);

  const count = await runtime.prepare('SELECT COUNT(*) AS count FROM drinks WHERE evidence_version = ?').bind('v1').first();
  assert.equal(count.count, Number.MAX_SAFE_INTEGER);
  await runtime.prepare('CREATE TABLE IF NOT EXISTS drinks (id INTEGER)').run();
  await runtime.prepare('INSERT INTO drinks (canonical_key) VALUES (?)').bind('x').run();
  await runtime.prepare("UPDATE drinks SET updated_at = datetime('now') WHERE canonical_key = ?").bind('x').run();
  const seedId = await runtime.prepare('SELECT id FROM drinks WHERE canonical_key = ? LIMIT 1').bind('x').first();

  assert.equal(seedId, null);
  assert.equal(db.calls.length, 0);
});

test('runtime master gate preserves indexed read-only drink lookup', async () => {
  const db = makeDb();
  const runtime = createReadOnlyMasterDb(db);
  const row = await runtime.prepare('SELECT canonical_key, japan_rarity_score FROM drinks WHERE canonical_key = ? LIMIT 1').bind('ginandtonic').first();

  assert.equal(row.canonical_key, 'ginandtonic');
  assert.equal(db.calls.length, 1);
  assert.match(db.calls[0], /japan_rarity_score/);
});

test('runtime master gate does not suppress image persistence SQL outside master tables', async () => {
  const db = makeDb();
  const runtime = createReadOnlyMasterDb(db);
  await runtime.prepare('UPDATE drink_images SET use_count = use_count + 1 WHERE cache_key = ?').bind('x').run();
  assert.equal(db.calls.length, 1);
  assert.match(db.calls[0], /drink_images/);
});
