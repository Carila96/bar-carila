import { JP_RARITY_V19_SUPPLEMENTAL, normalizeDrinkV19Key } from './drink-master-v1.9-supplemental.mjs';
import { JP_RARITY_V19_GAP, JP_RARITY_V19_GAP_JA_NAMES } from './drink-master-v1.9-gap.mjs';

const merged = new Map();
for (const row of JP_RARITY_V19_SUPPLEMENTAL) merged.set(normalizeDrinkV19Key(row[0]), row);
for (const row of JP_RARITY_V19_GAP) merged.set(normalizeDrinkV19Key(row[0]), row);

export const JP_RARITY_V19_SEED_ROWS = [...merged.values()];
export const JP_RARITY_V19_JA_NAMES = new Map(
  [...JP_RARITY_V19_GAP_JA_NAMES].map(([english, japanese]) => [normalizeDrinkV19Key(english), japanese])
);
export { normalizeDrinkV19Key };
