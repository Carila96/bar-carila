import { JP_RARITY_V19_SUPPLEMENTAL, normalizeDrinkV19Key } from './drink-master-v1.9-supplemental.mjs';
import { JP_RARITY_V19_GAP, JP_RARITY_V19_GAP_JA_NAMES } from './drink-master-v1.9-gap.mjs';
import { JP_RARITY_V19_BASE_CANONICAL } from './drink-master-v1.9-base-canonical.mjs';
import { JP_RARITY_V19_ROWS } from './drink-master-v1.9-research.mjs';
import { BOOK_INDEX_V19_ROWS } from './drink-master-v1.9-book-index.mjs';

const aliases = new Map([
  ['Satan','Zaza'],['Three Mirrors','Three Millers'],['Acapulco','Acapulco (Rum)'],
  ['アディントン','Addington'],['アドニス','Adonis'],['アメリカンレモネード','American Lemonade'],['カーディナル','Cardinal'],['キール','Kir'],['キールロワイヤル','Kir Royal'],['シャンパンカクテル','Champagne Cocktail'],['スプリッツァー','Spritzer'],['セレブレーション','Celebration'],['バンブー','Bamboo'],['ベリーニ','Bellini'],['ベルモットアンドカシス','Vermouth & Cassis'],['ミモザ','Mimosa'],['ローズ','Rose'],['ワインクーラー','Wine Cooler'],
  ['カンパリビア','Campari Beer'],['シャンディガフ','Shandy Gaff'],['ドッグズノーズ',"Dog's Nose"],['ビアスプリッツァー','Beer Spritzer'],['ビアモーニ','Beermoni'],['ブラックベルベット','Black Velvet'],['ランチボックス','Lunch Box'],['レッドアイ','Red Eye'],['レッドバード','Red Bird'],
  ['サケティーニ','Saketini'],['サムライ','Samurai'],['サムライロック','Samurai Rock'],['撫子','Nadeshiko'],['薩摩小町','Satsuma Komachi'],['酎ティーニ','Chutini'],['舞・乙女','Mai Otome'],['青柳','Aoyagi'],['ラストサムライ','Last Samurai'],
  ['アンファジーネーブル','Unfuzzy Navel'],['サンセットピーチ','Sunset Peach'],['シャーリーテンプル','Shirley Temple'],['シンデレラ','Cinderella'],['スプリングブロッサム','Spring Blossom'],['フロリダ','Florida'],['ベリー2','Berry 2'],['ミルクシェイク','Milk Shake'],['ラバーズドリーム',"Queen's Dream"],['レモネード','Lemonade'],
  ['ウイニングラン','Winning Run'],['アフリカンクイーン','African Queen'],['イエローパロット','Yellow Parrot'],['クールバナナ','Cool Banana'],['グリーンエモーション','Green Emotion'],['スイートメモリー','Sweet Memory'],['ストロベリーフィールド','Strawberry Field'],['ルビーフィズ','Ruby Fizz'],['レディジョーカー','Lady Joker'],['ロイヤルカルテット','Royal Quartet'],['エンジェルウイング','Angel Wing'],['カカオフィズ','Cacao Fizz'],['ホットイタリアン','Hot Italian'],['イノセントラブ','Innocent Love'],['イースターエッグ','Easter Egg'],['ペシェグルト','Pechagurt'],['マザーズタッチ',"Mother's Touch"],['ユニオンジャック','Union Jack']
]);

function canonicalize(name) {
  return aliases.get(name) || name;
}

const candidates = new Map();
function add(row) {
  const name = canonicalize(row[0]);
  candidates.set(normalizeDrinkV19Key(name), [name, ...row.slice(1)]);
}

// Old production scores first; newer research overrides them.
for (const row of JP_RARITY_V19_BASE_CANONICAL) add(row);
for (const row of JP_RARITY_V19_SUPPLEMENTAL) add(row);
for (const row of JP_RARITY_V19_ROWS) add(row);
for (const row of JP_RARITY_V19_GAP) add(row);

// Visually confirmed index corrections/additions with already researched scores.
for (const row of [
  ['Zaza',28,72,.66],['Three Millers',32,68,.76],['Trentaine',28,72,.80],['La Festa',24,76,.84],['Opera Martini',38,62,.82]
]) add(row);

// The source list is authoritative: extras in any research staging file are never emitted.
export const JP_RARITY_V19_SEED_ROWS = BOOK_INDEX_V19_ROWS
  .map(({ name }) => candidates.get(normalizeDrinkV19Key(name)))
  .filter(Boolean);

export const JP_RARITY_V19_MISSING_SCORE_ROWS = BOOK_INDEX_V19_ROWS
  .filter(({ name }) => !candidates.has(normalizeDrinkV19Key(name)))
  .map(({ category, name }) => ({ category, name }));

export const JP_RARITY_V19_JA_NAMES = new Map(
  [...JP_RARITY_V19_GAP_JA_NAMES].map(([english, japanese]) => [normalizeDrinkV19Key(english), japanese])
);

export const JP_RARITY_V19_BASE_SPIRIT_BY_KEY = new Map(
  BOOK_INDEX_V19_ROWS.map(({ category, name }) => [normalizeDrinkV19Key(name), category])
);

export { normalizeDrinkV19Key };
