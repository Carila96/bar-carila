import { JP_RARITY_V19_ROWS, validateJpRarityV19Rows } from '../src/drink-master-v1.9-research.mjs';

const rejected = [
  'Penicillin','Gold Rush','Boulevardier','Black Manhattan','New York Sour',
  'Whisky Tonic','Whisky Rickey','Whisky Buck','Cognac Highball'
];

const errors = validateJpRarityV19Rows();
const names = new Set(JP_RARITY_V19_ROWS.map(([name]) => name.toLowerCase()));
for (const name of rejected) {
  if (names.has(name.toLowerCase())) errors.push(`${name}: rejected non-canonical population contamination`);
}

if (errors.length) {
  console.error('BarCarila v1.9 validation failed:');
  for (const error of errors) console.error(`- ${error}`);
  process.exitCode = 1;
} else {
  console.log(`BarCarila v1.9 research rows OK: ${JP_RARITY_V19_ROWS.length} rows`);
}
