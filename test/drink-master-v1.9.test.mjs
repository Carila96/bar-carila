import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { JP_RARITY_V19_ROWS, validateJpRarityV19Rows } from '../src/drink-master-v1.9-research.mjs';
import { JP_RARITY_V19_SEED_ROWS, JP_RARITY_V19_JA_NAMES, JP_RARITY_V19_MISSING_SCORE_ROWS, normalizeDrinkV19Key } from '../src/drink-master-v1.9-master.mjs';
import { BOOK_INDEX_V19_ROWS } from '../src/drink-master-v1.9-book-index.mjs';
import { JP_RARITY_V19_GAP, JP_RARITY_V19_GAP_EVIDENCE } from '../src/drink-master-v1.9-gap.mjs';
import { canonicalLookupKey, enrichV19Response } from '../src/worker-v1.9.mjs';

function fakeD1(rows) {
  return {
    prepare(sql) {
      return {
        bind(key) {
          return {
            async first() {
              if (!sql.includes('FROM drinks WHERE canonical_key')) return null;
              return rows.get(key) || null;
            }
          };
        }
      };
    }
  };
}

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

test('v1.9 response enrichment reads canonical masterKey from D1', async () => {
  const casinoKey = normalizeDrinkV19Key('Casino');
  const env = { DRINK_DB: fakeD1(new Map([[casinoKey, {
    canonical_key: casinoKey,
    japan_availability_score: 50,
    japan_rarity_score: 50,
    japan_rarity_label: 'やや珍しい',
    japan_rarity_confidence: 0.82,
    rarity_reason: 'D1固定テスト',
    evidence_version: 'jp-rarity-v1.9'
  }]])) };
  const payload = {
    content: [{ type: 'text', text: JSON.stringify({ type: 'recommendation', drink: { name: 'カジノ', masterKey: 'Casino' } }) }]
  };
  const response = new Response(JSON.stringify(payload), { headers: { 'content-type': 'application/json' } });
  const enriched = await enrichV19Response(response, env);
  const data = await enriched.json();
  const parsed = JSON.parse(data.content[0].text);
  assert.equal(parsed.drink.rarity, 50);
  assert.equal(parsed.drink.rarityReason, 'D1固定テスト');
  assert.equal(parsed.drink.masterSource, 'd1');
  assert.equal(parsed.drink.evidenceVersion, 'jp-rarity-v1.9');
});

test('Corpse Reviver No.2 display name resolves to the fixed Corpse Reviver D1 row', async () => {
  const corpseKey = normalizeDrinkV19Key('Corpse Reviver');
  assert.equal(canonicalLookupKey('Corpse Reviver No.2'), corpseKey);
  assert.equal(canonicalLookupKey('コープスリバイバー No.2'), corpseKey);
  const env = { DRINK_DB: fakeD1(new Map([[corpseKey, {
    canonical_key: corpseKey,
    japan_availability_score: 42,
    japan_rarity_score: 58,
    japan_rarity_label: '珍しい',
    japan_rarity_confidence: 0.89,
    rarity_reason: '国内提供例はあるが店差が大きい。',
    evidence_version: 'jp-rarity-v1.9'
  }]])) };
  const payload = {
    content: [{ type: 'text', text: JSON.stringify({ type: 'recommendation', drink: { name: 'コープスリバイバー No.2' } }) }]
  };
  const response = new Response(JSON.stringify(payload), { headers: { 'content-type': 'application/json' } });
  const enriched = await enrichV19Response(response, env);
  const data = await enriched.json();
  const parsed = JSON.parse(data.content[0].text);
  assert.equal(parsed.drink.rarity, 58);
  assert.equal(parsed.drink.masterSource, 'd1');
  assert.equal(parsed.drink.evidenceVersion, 'jp-rarity-v1.9');
});

test('runtime entry keeps English canonical identity separate from Japanese display name', async () => {
  const source = await readFile(new URL('../src/worker-v1.9.mjs', import.meta.url), 'utf8');
  assert.match(source, /JP_RARITY_V19_JA_NAMES/);
  assert.match(source, /const japaneseName = JP_RARITY_V19_JA_NAMES\.get\(key\) \|\| ''/);
  assert.match(source, /\.bind\(key, japaneseName, name,/);
});

test('runtime entry wires v1.9 D1 seed and D1 lookup before returning chat response', async () => {
  const source = await readFile(new URL('../src/worker-v1.9.mjs', import.meta.url), 'utf8');
  assert.match(source, /JP_RARITY_V19_SEED_ROWS/);
  assert.match(source, /ensureV19Seed\(env\)/);
  assert.match(source, /baseWorker\.fetch\(effectiveRequest, env, context\)/);
  assert.match(source, /protect_jp_rarity_v19/);
  assert.match(source, /readV19FromD1/);
  assert.match(source, /masterSource = 'd1'/);
  assert.match(source, /enrichV19Response\(response, env\)/);
  assert.match(source, /jp-rarity-v1\.9/);
});
