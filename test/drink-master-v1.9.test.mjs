import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { JP_RARITY_V19_ROWS, validateJpRarityV19Rows } from '../src/drink-master-v1.9-research.mjs';
import { JP_RARITY_V19_SEED_ROWS, JP_RARITY_V19_JA_NAMES, JP_RARITY_V19_MISSING_SCORE_ROWS, normalizeDrinkV19Key } from '../src/drink-master-v1.9-master.mjs';
import { BOOK_INDEX_V19_ROWS } from '../src/drink-master-v1.9-book-index.mjs';
import { JP_RARITY_V19_GAP, JP_RARITY_V19_GAP_EVIDENCE } from '../src/drink-master-v1.9-gap.mjs';
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

test('the 14 previously missing rows retain documented evidence', () => {
  assert.equal(JP_RARITY_V19_GAP.length, 14);
  assert.equal(JP_RARITY_V19_GAP_EVIDENCE.size, 14);
  for (const [name] of JP_RARITY_V19_GAP) {
    const evidence = JP_RARITY_V19_GAP_EVIDENCE.get(name);
    assert.ok(evidence?.grade, `${name}: evidence grade missing`);
    assert.ok(evidence?.note, `${name}: evidence note missing`);
  }
});

test('v1.9 runtime population equals the exact book-index source', () => {
  assert.deepEqual(JP_RARITY_V19_MISSING_SCORE_ROWS, []);
  assert.equal(JP_RARITY_V19_SEED_ROWS.length, BOOK_INDEX_V19_ROWS.length);
  const expected = new Set(BOOK_INDEX_V19_ROWS.map(({ name }) => normalizeDrinkV19Key(name)));
  const actual = new Set(JP_RARITY_V19_SEED_ROWS.map(([name]) => normalizeDrinkV19Key(name)));
  assert.deepEqual(actual, expected);
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

test('runtime entry keeps English canonical identity separate from Japanese display name', async () => {
  const source = await readFile(new URL('../src/worker-v1.9.mjs', import.meta.url), 'utf8');
  assert.match(source, /JP_RARITY_V19_JA_NAMES/);
  assert.match(source, /const japaneseName = JP_RARITY_V19_JA_NAMES\.get\(key\) \|\| ''/);
  assert.match(source, /\.bind\(key, japaneseName, name,/);
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
