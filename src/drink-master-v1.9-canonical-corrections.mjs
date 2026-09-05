// Canonical corrections derived from a fresh visual audit of 『カクテル完全バイブル』 index pp.6–22.
// Purpose: remove previously invented/non-index rows, correct misread names, restore confirmed omissions,
// and split same-name/different-recipe entries that cannot safely share a name-only key.

export const JP_RARITY_V19_REMOVE_KEYS = new Set([
  'Brandy Daisy',
  'Brandy Fizz',
  'Brandy Flip',
  'Brandy Milk Punch',
  'Brandy Cassis',
  'Acapulco', // replaced by category-aware Rum / Tequila identities below
]);

export const JP_RARITY_V19_RENAMES = new Map([
  ['Satan','Zaza'],
  ['Three Mirrors','Three Millers'],
]);

// Confirmed index omissions / identity splits. Scores are evidence-weighted and intentionally conservative
// where direct current-menu evidence is weak.
export const JP_RARITY_V19_CONFIRMED_ADDITIONS = [
  ['Trentaine',28,72,0.80],
  ['La Festa',24,76,0.84],
  ['Opera Martini',38,62,0.82],
  ["King's Valley",66,34,0.94],
  ['Acapulco (Rum)',58,42,0.88],
  ['Acapulco (Tequila)',42,58,0.82],
];

export const JP_RARITY_V19_CANONICAL_JA_NAMES = new Map([
  ['Zaza','ザザ'],
  ['Three Millers','スリー・ミラーズ'],
  ['Trentaine','トランタン'],
  ['La Festa','ラ・フェスタ'],
  ['Opera Martini','オペラ・マティーニ'],
  ["King's Valley",'キングス・バレイ'],
  ['Acapulco (Rum)','アカプルコ'],
  ['Acapulco (Tequila)','アカプルコ'],
]);

export const JP_RARITY_V19_BASE_SPIRITS = new Map([
  ['Acapulco (Rum)','rum'],
  ['Acapulco (Tequila)','tequila'],
]);

// No unresolved identity collision is allowed in a Ready PR. Add future collisions here and make CI fail
// until they are split into explicit canonical identities.
export const JP_RARITY_V19_KNOWN_IDENTITY_COLLISIONS = [];
