// BarCarila Japan rarity v1.9 research data.
// WORKING BRANCH ONLY: this module is intentionally not wired into production yet.
// Scores are availability, rarity, confidence. rarity MUST equal 100 - availability.
// Source population: 『カクテル完全バイブル』 index.

export const JP_RARITY_V19_TAIL = [
  ['アディントン',56,44,0.88],
  ['アドニス',58,42,0.91],
  ['アメリカンレモネード',74,26,0.95],
  ['カーディナル',64,36,0.93],
  ['キール',90,10,0.99],
  ['キールロワイヤル',88,12,0.99],
  ['シャンパンカクテル',74,26,0.96],
  ['スプリッツァー',88,12,0.99],
  ['セレブレーション',54,46,0.94],
  ['バンブー',60,40,0.93],
  ['ベリーニ',86,14,0.99],
  ['ベルモットアンドカシス',64,36,0.94],
  ['ミモザ',90,10,0.99],
  ['ローズ',48,52,0.84],
  ['ワインクーラー',82,18,0.97],
  ['カンパリビア',78,22,0.97],
  ['シャンディガフ',96,4,0.99],
  ['ドッグズノーズ',72,28,0.94],
  ['ビアスプリッツァー',74,26,0.93],
  ['ビアモーニ',54,46,0.86],
  ['ブラックベルベット',62,38,0.91],
  ['ランチボックス',52,48,0.85],
  ['レッドアイ',94,6,0.99],
  ['レッドバード',54,46,0.87],
  ['サケティーニ',68,32,0.94],
  ['サムライ',56,44,0.88],
  ['サムライロック',78,22,0.97],
  ['撫子',38,62,0.88],
  ['薩摩小町',36,64,0.82],
  ['酎ティーニ',42,58,0.86],
  ['舞・乙女',48,52,0.94],
  ['青柳',34,66,0.80],
  ['ラストサムライ',38,62,0.82],
  ['アンファジーネーブル',86,14,0.98],
  ['サンセットピーチ',84,16,0.98],
  ['シャーリーテンプル',92,8,0.99],
  ['シンデレラ',92,8,0.99],
  ['スプリングブロッサム',70,30,0.95],
  ['フロリダ',82,18,0.98],
  ['ベリー2',40,60,0.80],
  ['ミルクシェイク',76,24,0.96],
  ['ラバーズドリーム',38,62,0.80],
  ['レモネード',94,6,0.99],
];

export const JP_RARITY_V19_RESOLVED = [
  ['ウイニングラン',54,46,0.90],
  ['アフリカンクイーン',54,46,0.90],
  ['アプリコットフィズ',68,32,0.95],
  ['イエローパロット',34,66,0.87],
  ['クールバナナ',56,44,0.93],
  ['グリーンエモーション',44,56,0.82],
  ['スイートメモリー',42,58,0.84],
  ['ストロベリーフィールド',50,50,0.86],
  ['ルビーフィズ',56,44,0.91],
  ['レディジョーカー',42,58,0.82],
  ['ロイヤルカルテット',34,66,0.91],
  ['エンジェルウイング',28,72,0.90],
  ['カカオフィズ',60,40,0.93],
  ['ホットイタリアン',44,56,0.86],
  ['イノセントラブ',42,58,0.84],
  ['イースターエッグ',34,66,0.82],
  ['ペシェグルト',34,66,0.84],
  ['マザーズタッチ',36,64,0.80],
  ['ユニオンジャック',28,72,0.86],
  ['レインボー',24,76,0.90],
];

export const JP_RARITY_V19_ROWS = [
  ...JP_RARITY_V19_TAIL,
  ...JP_RARITY_V19_RESOLVED,
];

export function validateJpRarityV19Rows(rows = JP_RARITY_V19_ROWS) {
  const seen = new Set();
  const errors = [];
  for (const [name, availability, rarity, confidence] of rows) {
    const key = String(name).trim().toLowerCase().replace(/[・\s.\-_]/g, '');
    if (!name) errors.push('empty name');
    if (availability + rarity !== 100) errors.push(`${name}: rarity mismatch`);
    if (availability < 0 || availability > 100) errors.push(`${name}: availability out of range`);
    if (confidence < 0 || confidence > 1) errors.push(`${name}: confidence out of range`);
    if (seen.has(key)) errors.push(`${name}: duplicate canonical key`);
    seen.add(key);
  }
  return errors;
}
