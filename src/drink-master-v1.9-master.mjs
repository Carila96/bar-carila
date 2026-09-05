import { JP_RARITY_V19_SUPPLEMENTAL, normalizeDrinkV19Key } from './drink-master-v1.9-supplemental.mjs';
import { JP_RARITY_V19_GAP, JP_RARITY_V19_GAP_JA_NAMES } from './drink-master-v1.9-gap.mjs';
import {
  JP_RARITY_V19_REMOVE_KEYS,
  JP_RARITY_V19_RENAMES,
  JP_RARITY_V19_CONFIRMED_ADDITIONS,
  JP_RARITY_V19_CANONICAL_JA_NAMES,
  JP_RARITY_V19_BASE_SPIRITS,
  JP_RARITY_V19_KNOWN_IDENTITY_COLLISIONS,
} from './drink-master-v1.9-canonical-corrections.mjs';

const removed = new Set([...JP_RARITY_V19_REMOVE_KEYS].map(normalizeDrinkV19Key));
const renamed = new Map([...JP_RARITY_V19_RENAMES].map(([from, to]) => [normalizeDrinkV19Key(from), to]));
const merged = new Map();

function applyRow(row) {
  const sourceName = row[0];
  const sourceKey = normalizeDrinkV19Key(sourceName);
  if (removed.has(sourceKey)) return;
  const canonicalName = renamed.get(sourceKey) || sourceName;
  const normalized = [canonicalName, ...row.slice(1)];
  merged.set(normalizeDrinkV19Key(canonicalName), normalized);
}

for (const row of JP_RARITY_V19_SUPPLEMENTAL) applyRow(row);
for (const row of JP_RARITY_V19_GAP) applyRow(row);
for (const row of JP_RARITY_V19_CONFIRMED_ADDITIONS) applyRow(row);

export const JP_RARITY_V19_SEED_ROWS = [...merged.values()];
export const JP_RARITY_V19_JA_NAMES = new Map([
  ...[...JP_RARITY_V19_GAP_JA_NAMES].map(([english, japanese]) => [normalizeDrinkV19Key(english), japanese]),
  ...[...JP_RARITY_V19_CANONICAL_JA_NAMES].map(([english, japanese]) => [normalizeDrinkV19Key(english), japanese]),
]);
export const JP_RARITY_V19_BASE_SPIRIT_BY_KEY = new Map(
  [...JP_RARITY_V19_BASE_SPIRITS].map(([english, base]) => [normalizeDrinkV19Key(english), base])
);
export { normalizeDrinkV19Key, JP_RARITY_V19_KNOWN_IDENTITY_COLLISIONS };
