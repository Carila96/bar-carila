// Canonical corrections derived from a fresh visual audit of 『カクテル完全バイブル』 index pp.6–22.
// Purpose: remove previously invented/non-index rows, correct misread names, and add confirmed index omissions.

export const JP_RARITY_V19_REMOVE_KEYS = new Set([
  'Brandy Daisy',
  'Brandy Fizz',
  'Brandy Flip',
  'Brandy Milk Punch',
  'Brandy Cassis',
]);

export const JP_RARITY_V19_RENAMES = new Map([
  ['Satan','Zaza'],
  ['Three Mirrors','Three Millers'],
]);

// Newly confirmed index omissions. Scores are conservative and evidence-weighted; they are not count-fillers.
export const JP_RARITY_V19_CONFIRMED_ADDITIONS = [
  ['Trentaine',28,72,0.80],
  ['La Festa',24,76,0.84],
  ['Opera Martini',38,62,0.82],
  ["King's Valley",66,34,0.94],
];

export const JP_RARITY_V19_CANONICAL_JA_NAMES = new Map([
  ['Zaza','ザザ'],
  ['Three Millers','スリー・ミラーズ'],
  ['Trentaine','トランタン'],
  ['La Festa','ラ・フェスタ'],
  ['Opera Martini','オペラ・マティーニ'],
  ["King's Valley",'キングス・バレイ'],
]);

// Remaining visually-confirmed index issue that must be resolved before Ready:
// Acapulco appears in both Rum and Tequila sections as different recipes.
// Name-only canonical keys cannot safely represent both; category-aware identity is required.
export const JP_RARITY_V19_KNOWN_IDENTITY_COLLISIONS = [
  { name: 'Acapulco', variants: ['rum', 'tequila'] },
];
