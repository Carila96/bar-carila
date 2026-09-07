import test from 'node:test';
import assert from 'node:assert/strict';
import { BOOK_INDEX_V19_ROWS } from '../src/drink-master-v1.9-book-index.mjs';
import { normalizeDrinkV19Key } from '../src/drink-master-v1.9-master.mjs';
import { DRINK_MASTER_EXPANSION_B01 } from '../src/drink-master-expansion-b01.mjs';
import { DRINK_MASTER_EXPANSION_B02 } from '../src/drink-master-expansion-b02.mjs';
import { DRINK_MASTER_EXPANSION_B03 } from '../src/drink-master-expansion-b03.mjs';
import { DRINK_MASTER_EXPANSION_B04 } from '../src/drink-master-expansion-b04.mjs';
import { DRINK_MASTER_EXPANSION_B05, DRINK_MASTER_EXPANSION_B05_ALIAS_ENTRIES, DRINK_MASTER_EXPANSION_B05_EVIDENCE_VERSION } from '../src/drink-master-expansion-b05.mjs';

const PRIOR_EXPANSIONS = [DRINK_MASTER_EXPANSION_B01, DRINK_MASTER_EXPANSION_B02, DRINK_MASTER_EXPANSION_B03, DRINK_MASTER_EXPANSION_B04];

test('expansion batch 05 is additive and does not duplicate the initial 400 or prior batches', () => {
  assert.equal(DRINK_MASTER_EXPANSION_B05.length, 5);
  const occupied = new Set([
    ...BOOK_INDEX_V19_ROWS.map(({ name }) => normalizeDrinkV19Key(name)),
    ...PRIOR_EXPANSIONS.flatMap((batch) => batch.map((drink) => normalizeDrinkV19Key(drink.masterKey))),
  ]);
  const keys = DRINK_MASTER_EXPANSION_B05.map((drink) => normalizeDrinkV19Key(drink.masterKey));
  assert.equal(new Set(keys).size, keys.length);
  for (const key of keys) assert.equal(occupied.has(key), false, `duplicate known master key: ${key}`);
});

test('expansion batch 05 does not collide with normalized names or aliases already known', () => {
  const occupiedAliases = new Map();
  for (const { name } of BOOK_INDEX_V19_ROWS) occupiedAliases.set(normalizeDrinkV19Key(name), normalizeDrinkV19Key(name));
  for (const batch of PRIOR_EXPANSIONS) {
    for (const drink of batch) {
      const target = normalizeDrinkV19Key(drink.masterKey);
      for (const alias of [drink.masterKey, drink.nameJa, ...(drink.aliases || [])]) occupiedAliases.set(normalizeDrinkV19Key(alias), target);
    }
  }
  for (const drink of DRINK_MASTER_EXPANSION_B05) {
    const target = normalizeDrinkV19Key(drink.masterKey);
    for (const alias of [drink.masterKey, drink.nameJa, ...(drink.aliases || [])]) {
      const normalized = normalizeDrinkV19Key(alias);
      assert.equal(occupiedAliases.has(normalized), false, `cross-batch alias collision: ${normalized}=>${target}`);
    }
  }
});

test('expansion batch 05 has complete normalized aliases, recipes, rarity and evidence', () => {
  const aliasKeys = new Set();
  for (const drink of DRINK_MASTER_EXPANSION_B05) {
    assert.ok(drink.masterKey && drink.nameJa);
    assert.equal(drink.availability + drink.rarity, 100);
    assert.ok(Number.isInteger(drink.availability) && Number.isInteger(drink.rarity));
    assert.ok(drink.confidence >= 0.7 && drink.confidence <= 1);
    assert.ok(drink.shortDescription.length > 0 && drink.orderHint.length > 0);
    assert.ok(drink.recipe?.ingredients?.length >= 3 && drink.recipe?.method);
    assert.ok(drink.evidence?.length >= 3);
    assert.ok(drink.evidence.some((item) => item.type === 'international_professional_reference'));
    assert.ok(drink.evidence.some((item) => item.type.startsWith('jp_')));
    for (const item of drink.evidence) assert.match(item.url, /^https:\/\//);
  }
  for (const [alias, masterKey] of DRINK_MASTER_EXPANSION_B05_ALIAS_ENTRIES) {
    const signature = `${normalizeDrinkV19Key(alias)}=>${normalizeDrinkV19Key(masterKey)}`;
    assert.equal(aliasKeys.has(signature), false, `duplicate alias mapping: ${signature}`);
    aliasKeys.add(signature);
  }
  assert.equal(DRINK_MASTER_EXPANSION_B05_EVIDENCE_VERSION, 'jp-rarity-expansion-2026-09-08-b05');
});

test('runtime is wired to seed and read batch 05', async () => {
  const source = await import('node:fs/promises').then(({ readFile }) => readFile(new URL('../src/worker-v1.9.mjs', import.meta.url), 'utf8'));
  assert.match(source, /DRINK_MASTER_EXPANSION_B05/);
  assert.match(source, /seedExpansionB05/);
  assert.match(source, /hasExpansionB05Seed/);
  assert.match(source, /DRINK_MASTER_EXPANSION_B05_EVIDENCE_VERSION/);
});
