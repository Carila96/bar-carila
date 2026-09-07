import test from 'node:test';
import assert from 'node:assert/strict';
import { BOOK_INDEX_V19_ROWS } from '../src/drink-master-v1.9-book-index.mjs';
import { normalizeDrinkV19Key } from '../src/drink-master-v1.9-master.mjs';
import {
  DRINK_MASTER_EXPANSION_B01,
  DRINK_MASTER_EXPANSION_B01_ALIAS_ENTRIES,
  DRINK_MASTER_EXPANSION_B01_EVIDENCE_VERSION,
} from '../src/drink-master-expansion-b01.mjs';

test('expansion batch 01 is additive and does not duplicate the audited 400-book index', () => {
  assert.equal(DRINK_MASTER_EXPANSION_B01.length, 6);
  const bookKeys = new Set(BOOK_INDEX_V19_ROWS.map(({ name }) => normalizeDrinkV19Key(name)));
  const expansionKeys = DRINK_MASTER_EXPANSION_B01.map((drink) => normalizeDrinkV19Key(drink.masterKey));
  assert.equal(new Set(expansionKeys).size, expansionKeys.length);
  for (const key of expansionKeys) assert.equal(bookKeys.has(key), false, `duplicate initial master key: ${key}`);
});

test('expansion batch 01 has complete rarity, recipe, alias, and evidence fields', () => {
  const aliasKeys = new Set();
  for (const drink of DRINK_MASTER_EXPANSION_B01) {
    assert.ok(drink.masterKey);
    assert.ok(drink.nameJa);
    assert.equal(drink.availability + drink.rarity, 100);
    assert.ok(Number.isInteger(drink.availability));
    assert.ok(Number.isInteger(drink.rarity));
    assert.ok(drink.confidence >= 0.7 && drink.confidence <= 1);
    assert.ok(drink.shortDescription.length > 0);
    assert.ok(drink.orderHint.length > 0);
    assert.ok(drink.recipe?.ingredients?.length >= 3);
    assert.ok(drink.recipe?.method);
    assert.ok(drink.evidence?.length >= 3);
    assert.ok(drink.evidence.some((item) => item.type === 'international_professional_reference'));
    assert.ok(drink.evidence.some((item) => item.type.startsWith('jp_')));
    for (const item of drink.evidence) assert.match(item.url, /^https:\/\//);
  }
  for (const [alias, masterKey] of DRINK_MASTER_EXPANSION_B01_ALIAS_ENTRIES) {
    const key = normalizeDrinkV19Key(alias);
    const signature = `${key}=>${normalizeDrinkV19Key(masterKey)}`;
    assert.equal(aliasKeys.has(signature), false, `duplicate alias mapping: ${signature}`);
    aliasKeys.add(signature);
  }
  assert.equal(DRINK_MASTER_EXPANSION_B01_EVIDENCE_VERSION, 'jp-rarity-expansion-2026-09-08-b01');
});

test('runtime is wired to seed and read the additive expansion layer', async () => {
  const source = await import('node:fs/promises').then(({ readFile }) => readFile(new URL('../src/worker-v1.9.mjs', import.meta.url), 'utf8'));
  assert.match(source, /DRINK_MASTER_EXPANSION_B01/);
  assert.match(source, /seedExpansionB01/);
  assert.match(source, /hasExpansionB01Seed/);
  assert.match(source, /ACCEPTED_EVIDENCE_VERSIONS/);
});
