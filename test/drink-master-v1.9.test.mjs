import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { JP_RARITY_V19_ROWS, validateJpRarityV19Rows } from '../src/drink-master-v1.9-research.mjs';
import { JP_RARITY_V19_SEED_ROWS, normalizeDrinkV19Key } from '../src/drink-master-v1.9-master.mjs';
import { enrichV19Response } from '../src/worker-v1.9.mjs';

test('final-pass override rows are internally consistent', () => {
  assert.deepEqual(validateJpRarityV19Rows(JP_RARITY_V19_ROWS), []);
});

test('v1.9 seed rows are normalized-unique and arithmetically valid', () => {
  const keys = JP_RARITY_V19_SEED_ROWS.map(([name]) => normalizeDrinkV19Key(name));
  assert.equal(new Set(keys).size, keys.length);
  for (const [name, availability, rarity, confidence] of JP_RARITY_V19_SEED_ROWS) {
    assert.equal(rarity, 100 - availability, name);
    assert.ok(availability >= 0 && availability <= 100, name);
    assert.ok(confidence >= 0 && confidence <= 1, name);
  }
});

test('legacy v1.8 plus v1.9 produce exactly 400 fixed runtime keys', async () => {
  const source = await readFile(new URL('../src/worker.mjs', import.meta.url), 'utf8');
  const match = source.match(/const DRINK_MASTER_SEED = (\[\[.*?\]\]);\nconst DRINK_COPY_SEED/s);
  assert.ok(match, 'DRINK_MASTER_SEED must remain extractable for coverage validation');
  const merged = new Map();
  for (const row of JSON.parse(match[1])) merged.set(normalizeDrinkV19Key(row[0]), row);
  for (const row of JP_RARITY_V19_SEED_ROWS) merged.set(normalizeDrinkV19Key(row[0]), row);
  assert.equal(merged.size, 400);
});

test('v1.9 response enrichment uses canonical masterKey', async () => {
  const payload = {
    content: [{ type: 'text', text: JSON.stringify({ type: 'recommendation', drink: { name: 'カジノ', masterKey: 'Casino' } }) }]
  };
  const response = new Response(JSON.stringify(payload), { headers: { 'content-type': 'application/json' } });
  const enriched = await enrichV19Response(response);
  const data = await enriched.json();
  const parsed = JSON.parse(data.content[0].text);
  assert.equal(parsed.drink.rarity, 50);
  assert.equal(parsed.drink.masterSource, 'd1');
  assert.equal(parsed.drink.evidenceVersion, 'jp-rarity-v1.9');
});

test('runtime entry wires v1.9 D1 seed before delegating to existing Worker', async () => {
  const source = await readFile(new URL('../src/worker-v1.9.mjs', import.meta.url), 'utf8');
  assert.match(source, /JP_RARITY_V19_SEED_ROWS/);
  assert.match(source, /ensureV19Seed\(env\)/);
  assert.match(source, /baseWorker\.fetch\(effectiveRequest, env, context\)/);
  assert.match(source, /protect_jp_rarity_v19/);
  assert.match(source, /masterKey/);
  assert.match(source, /jp-rarity-v1\.9/);
});
