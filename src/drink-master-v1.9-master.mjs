import { JP_RARITY_V19_SUPPLEMENTAL, normalizeDrinkV19Key } from './drink-master-v1.9-supplemental.mjs';

// Canonical book-index rows that were still absent from the reconciled runtime master.
// Tuple shape: [name, availability, rarity, confidence].
export const JP_RARITY_V19_GAP_ROWS = [
  ['Opera',46,54,.82],
  ['J.A.G.',34,66,.72],
  ['Singapore Night',46,54,.82],
  ['Singapore Pink',42,58,.80],
  ['Smoky Martini',48,52,.84],
  ['Dirty Martini',68,32,.92],
  ['Texas Fizz',50,50,.84],
  ['Southern Breeze',44,56,.82],
  ['Zaza',48,52,.84],
  ['Beauty Spot',42,58,.82],
  ['Fallen Angel',44,56,.84],
  ['Princess Mary',58,42,.92],
  ['Angelo',40,60,.78],
  ['Old England',36,64,.76],
];

const merged = new Map();
for (const row of JP_RARITY_V19_SUPPLEMENTAL) merged.set(normalizeDrinkV19Key(row[0]), row);
for (const row of JP_RARITY_V19_GAP_ROWS) merged.set(normalizeDrinkV19Key(row[0]), row);

export const JP_RARITY_V19_SEED_ROWS = [...merged.values()];
export { normalizeDrinkV19Key };
