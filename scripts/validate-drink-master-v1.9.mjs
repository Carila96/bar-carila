import fs from 'node:fs';
import { JP_RARITY_V19_SEED_ROWS, normalizeDrinkV19Key, JP_RARITY_V19_KNOWN_IDENTITY_COLLISIONS } from '../src/drink-master-v1.9-master.mjs';
import { JP_RARITY_V19_REMOVE_KEYS } from '../src/drink-master-v1.9-canonical-corrections.mjs';

const worker = fs.readFileSync(new URL('../src/worker.mjs', import.meta.url), 'utf8');
const match = worker.match(/const DRINK_MASTER_SEED = (\[\[.*?\]\]);\nconst DRINK_COPY_SEED/s);
if (!match) throw new Error('Could not extract DRINK_MASTER_SEED from src/worker.mjs');
const base = JSON.parse(match[1]);

const rejected = [
  'Penicillin','Gold Rush','Boulevardier','Black Manhattan','New York Sour',
  'Whisky Tonic','Whisky Rickey','Whisky Buck','Cognac Highball',
  ...JP_RARITY_V19_REMOVE_KEYS,
  'Satan','Three Mirrors','Acapulco'
];
const requiredCorrections = [
  'Zaza','Three Millers','Trentaine','La Festa','Opera Martini',"King's Valley",
  'Acapulco (Rum)','Acapulco (Tequila)'
];
const errors = [];
if (base.length !== 150) errors.push(`expected v1.8 base seed=150, got ${base.length}`);

// Runtime merged population: v1.8 rows that are not replaced by v1.9 plus the corrected v1.9 master.
const merged = new Map();
for (const [name, availability, rarity, label, confidence] of base) {
  merged.set(normalizeDrinkV19Key(name), [name, availability, rarity, confidence, 'base']);
}
for (const [name, availability, rarity, confidence] of JP_RARITY_V19_SEED_ROWS) {
  merged.set(normalizeDrinkV19Key(name), [name, availability, rarity, confidence, 'v1.9']);
}

for (const [name, availability, rarity, confidence] of merged.values()) {
  if (!name) errors.push('empty name');
  if (availability + rarity !== 100) errors.push(`${name}: rarity mismatch`);
  if (!Number.isInteger(availability) || availability < 0 || availability > 100) errors.push(`${name}: availability out of range`);
  if (!Number.isInteger(rarity) || rarity < 0 || rarity > 100) errors.push(`${name}: rarity out of range`);
  if (confidence < 0 || confidence > 1) errors.push(`${name}: confidence out of range`);
}
for (const name of rejected) {
  if (merged.has(normalizeDrinkV19Key(name))) errors.push(`${name}: rejected/non-canonical identity still present`);
}
for (const name of requiredCorrections) {
  if (!merged.has(normalizeDrinkV19Key(name))) errors.push(`${name}: confirmed book-index correction missing`);
}
if (JP_RARITY_V19_KNOWN_IDENTITY_COLLISIONS.length) {
  errors.push(`unresolved same-name/different-recipe collisions: ${JSON.stringify(JP_RARITY_V19_KNOWN_IDENTITY_COLLISIONS)}`);
}

// Count is a sanity check only. Canonical rejection/correction gates above are authoritative quality checks.
if (merged.size !== 400) errors.push(`canonical population sanity check expected 400, got ${merged.size}`);

if (errors.length) {
  console.error('BarCarila v1.9 validation failed:');
  for (const error of errors) console.error(`- ${error}`);
  process.exitCode = 1;
} else {
  console.log(`BarCarila v1.9 quality gate OK: ${merged.size} runtime identities; canonical corrections and collision checks passed`);
}
