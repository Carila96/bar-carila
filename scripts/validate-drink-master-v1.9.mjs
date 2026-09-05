import { JP_RARITY_V19_SEED_ROWS, normalizeDrinkV19Key } from '../src/drink-master-v1.9-master.mjs';
import { BOOK_INDEX_V19_ROWS, BOOK_INDEX_V19_COUNTS } from '../src/drink-master-v1.9-book-index.mjs';

const errors = [];
const expected = new Map();
for (const { category, name } of BOOK_INDEX_V19_ROWS) {
  const key = normalizeDrinkV19Key(name);
  if (expected.has(key)) errors.push(`book source duplicate normalized key: ${name}`);
  expected.set(key, { category, name });
}

const actual = new Map();
for (const row of JP_RARITY_V19_SEED_ROWS) {
  const [name, availability, rarity, confidence] = row;
  const key = normalizeDrinkV19Key(name);
  if (actual.has(key)) errors.push(`runtime duplicate normalized key: ${name}`);
  actual.set(key, row);
  if (!name) errors.push('empty name');
  if (availability + rarity !== 100) errors.push(`${name}: rarity mismatch`);
  if (!Number.isInteger(availability) || availability < 0 || availability > 100) errors.push(`${name}: availability out of range`);
  if (!Number.isInteger(rarity) || rarity < 0 || rarity > 100) errors.push(`${name}: rarity out of range`);
  if (typeof confidence !== 'number' || confidence < 0 || confidence > 1) errors.push(`${name}: confidence out of range`);
}

const missing = [...expected.entries()].filter(([key]) => !actual.has(key)).map(([, v]) => `${v.category}:${v.name}`);
const extras = [...actual.entries()].filter(([key]) => !expected.has(key)).map(([, row]) => row[0]);

if (missing.length) errors.push(`missing exact book-index rows (${missing.length}): ${missing.join(' | ')}`);
if (extras.length) errors.push(`non-book runtime rows (${extras.length}): ${extras.join(' | ')}`);
if (BOOK_INDEX_V19_ROWS.length !== 400) errors.push(`book source expected 400, got ${BOOK_INDEX_V19_ROWS.length}`);
if (actual.size !== 400) errors.push(`v1.9 canonical seed expected 400, got ${actual.size}`);

if (errors.length) {
  console.error('BarCarila v1.9 validation failed:');
  console.error(`Book counts: ${JSON.stringify(BOOK_INDEX_V19_COUNTS)}`);
  for (const error of errors) console.error(`- ${error}`);
  process.exitCode = 1;
} else {
  console.log(`BarCarila v1.9 exact canonical gate OK: ${actual.size}/${BOOK_INDEX_V19_ROWS.length} book-index identities match exactly`);
}
