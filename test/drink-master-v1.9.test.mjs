import test from 'node:test';
import assert from 'node:assert/strict';
import { JP_RARITY_V19_ROWS, validateJpRarityV19Rows } from '../src/drink-master-v1.9-research.mjs';

test('v1.9 research rows are internally consistent', () => {
  assert.equal(validateJpRarityV19Rows(JP_RARITY_V19_ROWS).length, 0);
});

test('v1.9 research rows contain no duplicate normalized keys', () => {
  const normalize = (value) => String(value || '').trim().toLowerCase().replace(/[・\s.\-_]/g, '');
  const keys = JP_RARITY_V19_ROWS.map(([name]) => normalize(name));
  assert.equal(new Set(keys).size, keys.length);
});

test('v1.9 research rows keep rarity as 100 - availability', () => {
  for (const [name, availability, rarity] of JP_RARITY_V19_ROWS) {
    assert.equal(rarity, 100 - availability, name);
  }
});
