import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { JP_RARITY_V19_ROWS, normalizeJpRarityKey, validateJpRarityV19Rows } from '../src/drink-master-v1.9-research.mjs';

async function legacySeedNames() {
  const source = await readFile(new URL('../src/worker.mjs', import.meta.url), 'utf8');
  const match = source.match(/const DRINK_MASTER_SEED = (\[\[.*?\]\]);\nconst DRINK_COPY_SEED/s);
  assert.ok(match, 'DRINK_MASTER_SEED must remain extractable for coverage validation');
  return JSON.parse(match[1]).map(([name]) => name);
}

test('v1.9 rows are internally consistent and normalized-unique', () => {
  assert.deepEqual(validateJpRarityV19Rows(JP_RARITY_V19_ROWS), []);
  const keys = JP_RARITY_V19_ROWS.map(([name]) => normalizeJpRarityKey(name));
  assert.equal(new Set(keys).size, keys.length);
  assert.ok(JP_RARITY_V19_ROWS.length >= 300, `expected >=300 v1.9 rows, got ${JP_RARITY_V19_ROWS.length}`);
});

test('v1.9 rows keep rarity as 100 - availability', () => {
  for (const [name, availability, rarity] of JP_RARITY_V19_ROWS) {
    assert.equal(rarity, 100 - availability, name);
  }
});

test('legacy v1.8 plus v1.9 provide at least 400 fixed name keys', async () => {
  const all = [...await legacySeedNames(), ...JP_RARITY_V19_ROWS.map(([name]) => name)];
  const keys = new Set(all.map(normalizeJpRarityKey));
  assert.ok(keys.size >= 400, `expected >=400 fixed name keys, got ${keys.size}`);
});

test('runtime entry seeds v1.9 before delegating to the existing Worker', async () => {
  const source = await readFile(new URL('../src/worker-v1.9.mjs', import.meta.url), 'utf8');
  assert.match(source, /await seedV19\(env\)/);
  assert.match(source, /return baseWorker\.fetch\(request, env, ctx\)/);
  assert.match(source, /protect_jp_rarity_v19/);
  assert.match(source, /jp-rarity-v1\.9/);
});
