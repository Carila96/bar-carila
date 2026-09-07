export const DRINK_MASTER_EXPANSION_B04_EVIDENCE_VERSION = 'jp-rarity-expansion-2026-09-08-b04';
export const DRINK_MASTER_EXPANSION_B04_EVALUATED_AT = '2026-09-08';

export const DRINK_MASTER_EXPANSION_B04 = [
  {
    masterKey: 'Monkey Gland', nameJa: 'モンキー・グランド', aliases: ['Monkey Gland'],
    category: 'cocktail', baseSpirit: 'gin', drinkKind: 'cocktail', availability: 38, rarity: 62, rarityLabel: '珍しい', confidence: 0.88,
    rarityReason: 'IBA公認で国内BARの現行IBAメニュー掲載を確認できる一方、アブサン常備と名称認知に店差が大きく、一般的な日本のBARでの注文成立率は定番より低い。',
    shortDescription: 'ジンとオレンジにグレナデンの甘み、アブサンのアニス香を重ねる1920年代のクラシック。',
    orderHint: '「ジン、オレンジ、グレナデンにアブサンを使うモンキー・グランド」と補足すると伝わりやすい。',
    imageQuery: 'Monkey Gland cocktail gin orange absinthe grenadine',
    recipe: { ingredients: [{name:'Dry Gin',amount:'45ml'},{name:'Fresh Orange Juice',amount:'45ml'},{name:'Absinthe',amount:'1 tablespoon'},{name:'Grenadine Syrup',amount:'1 tablespoon'}], method:'全材料を氷とともにシェイクし、冷やしたカクテルグラスへストレインする。' },
    evidence: [
      {type:'international_professional_reference',title:'Monkey Gland – IBA',url:'https://iba-world.com/iba-cocktail/monkey-gland/',note:'IBA公式レシピで実在性・標準構成を確認。'},
      {type:'jp_bar_reference',title:'Bar domingo IBA cocktail menu',url:'https://r.gnavi.co.jp/2p1ujyer0000/menu2/',note:'国内BARの現行IBAメニューでモンキー・グランド提供を確認。'},
      {type:'international_professional_reference',title:'Monkey Gland – Difford’s Guide',url:'https://www.diffordsguide.com/cocktails/recipe/1349/monkey-gland',note:'国際的プロ向け資料で歴史と代表構成を補助確認。'}
    ]
  },
  {
    masterKey: 'Illegal', nameJa: 'イリーガル', aliases: ['Illegal'],
    category: 'cocktail', baseSpirit: 'mezcal-rum', drinkKind: 'cocktail', availability: 30, rarity: 70, rarityLabel: '珍しい', confidence: 0.9,
    rarityReason: 'IBA公認で国内BARの現行メニュー掲載を確認できるが、メスカル、オーバープルーフ・ジャマイカラム、ファレルナム、マラスキーノを同時に要し、一般BARでは材料常備率が低い。',
    shortDescription: 'メスカルと高濃度ジャマイカラムにファレルナム、マラスキーノ、ライムを重ねる複雑なサワー。',
    orderHint: 'メスカルを軸にファレルナムとマラスキーノを使うIBAのイリーガルと伝えると確実。',
    imageQuery: 'Illegal cocktail mezcal rum falernum maraschino lime',
    recipe: { ingredients: [{name:'Espadin Mezcal',amount:'30ml'},{name:'Jamaica Overproof White Rum',amount:'15ml'},{name:'Falernum',amount:'15ml'},{name:'Maraschino Luxardo',amount:'1 bar spoon'},{name:'Fresh Lime Juice',amount:'22.5ml'},{name:'Simple Syrup',amount:'15ml'},{name:'Egg White',amount:'few drops optional'}], method:'全材料を氷とともに強くシェイクし、冷やしたカクテルグラスへストレインする。' },
    evidence: [
      {type:'international_professional_reference',title:'Illegal – IBA',url:'https://iba-world.com/iba-cocktail/illegal/',note:'IBA公式レシピで実在性・標準構成を確認。'},
      {type:'jp_bar_reference',title:'Bar domingo IBA cocktail menu',url:'https://r.gnavi.co.jp/2p1ujyer0000/menu2/',note:'国内BARの現行IBAメニューでイリーガル提供を確認。'},
      {type:'international_professional_reference',title:'Illegal Margarita – Difford’s Guide',url:'https://www.diffordsguide.com/cocktails/recipe/17623/illegal-margarita',note:'プロ向け資料で代表構成を補助確認。'}
    ]
  },
  {
    masterKey: 'Naked and Famous', nameJa: 'ネイキッド・アンド・フェイマス', aliases: ['Naked and Famous','Naked & Famous'],
    category: 'cocktail', baseSpirit: 'mezcal', drinkKind: 'cocktail', availability: 36, rarity: 64, rarityLabel: '珍しい', confidence: 0.92,
    rarityReason: 'IBA公認で国内BARの現行メニューにも掲載される現代クラシックだが、メスカルとイエローシャルトリューズの双方を必要とし、一般的な日本のBARでは材料常備に店差がある。',
    shortDescription: 'メスカル、イエローシャルトリューズ、アペロール、ライムを等量で合わせるスモーキーな現代クラシック。',
    orderHint: 'メスカルとイエローシャルトリューズを等量で使うネイキッド・アンド・フェイマスと伝えると確実。',
    imageQuery: 'Naked and Famous cocktail mezcal Chartreuse Aperol lime',
    recipe: { ingredients: [{name:'Mezcal',amount:'22.5ml'},{name:'Yellow Chartreuse',amount:'22.5ml'},{name:'Aperol',amount:'22.5ml'},{name:'Fresh Lime Juice',amount:'22.5ml'}], method:'全材料を氷とともにシェイクし、冷やしたカクテルグラスへストレインする。' },
    evidence: [
      {type:'international_professional_reference',title:'Naked and Famous – IBA',url:'https://iba-world.com/iba-cocktail/naked-and-famous/',note:'IBA公式レシピで実在性・標準構成を確認。'},
      {type:'jp_bar_reference',title:'Bar domingo IBA cocktail menu',url:'https://r.gnavi.co.jp/2p1ujyer0000/menu2/',note:'国内BARの現行IBAメニューでネイキッド・アンド・フェイマス提供を確認。'},
      {type:'international_professional_reference',title:'Naked & Famous – Difford’s Guide',url:'https://www.diffordsguide.com/cocktails/recipe/3640/naked-and-famous',note:'国際的プロ向け資料で成立史と代表構成を補助確認。'}
    ]
  },
  {
    masterKey: 'Old Cuban', nameJa: 'オールド・キューバン', aliases: ['Old Cuban'],
    category: 'cocktail', baseSpirit: 'aged-rum', drinkKind: 'cocktail', availability: 44, rarity: 56, rarityLabel: 'やや珍しい', confidence: 0.92,
    rarityReason: 'IBA公認で国内BARの現行メニュー掲載も確認でき、熟成ラム、ライム、ミント、ビターズは比較的揃えやすい。スパークリングワイン常備と仕込み運用のため定番群より提供店は限られる。',
    shortDescription: '熟成ラム、ライム、ミント、ビターズをシェイクし、ブリュットの泡で仕上げる華やかな現代クラシック。',
    orderHint: '熟成ラムとミントを使い、最後にシャンパンかプロセッコで仕上げるオールド・キューバンと伝えると確実。',
    imageQuery: 'Old Cuban cocktail aged rum mint champagne lime',
    recipe: { ingredients: [{name:'Mint Leaves',amount:'6-8 leaves'},{name:'Aged Rum',amount:'45ml'},{name:'Fresh Lime Juice',amount:'22.5ml'},{name:'Simple Syrup',amount:'30ml'},{name:'Angostura Bitters',amount:'2 dashes'},{name:'Brut Champagne or Prosecco',amount:'60ml'}], method:'スパークリングワイン以外を氷とともにシェイクして冷やしたグラスへストレインし、ブリュットの泡を注いでミントを飾る。' },
    evidence: [
      {type:'international_professional_reference',title:'Old Cuban – IBA',url:'https://iba-world.com/iba-cocktail/old-cuban/',note:'IBA公式レシピで実在性・標準構成を確認。'},
      {type:'jp_bar_reference',title:'Bar domingo IBA cocktail menu',url:'https://r.gnavi.co.jp/2p1ujyer0000/menu2/',note:'国内BARの現行IBAメニューでオールド・キューバン提供を確認。'},
      {type:'international_brand_reference',title:'Old Cuban – BACARDÍ',url:'https://www.bacardi.com/rum-cocktails/old-cuban/',note:'ラムブランド公式レシピで現代クラシックとしての構成を補助確認。'}
    ]
  },
  {
    masterKey: 'Tipperary', nameJa: 'ティペラリー', aliases: ['Tipperary'],
    category: 'cocktail', baseSpirit: 'irish-whiskey', drinkKind: 'cocktail', availability: 35, rarity: 65, rarityLabel: '珍しい', confidence: 0.9,
    rarityReason: 'IBA公認で国内BARの現行メニュー掲載を確認でき、アイリッシュウイスキーとスイートベルモットは一般的。一方グリーンシャルトリューズ常備と名称認知が一般BARでの制約になる。',
    shortDescription: 'アイリッシュウイスキー、スイートベルモット、グリーンシャルトリューズをステアする芳香豊かなクラシック。',
    orderHint: 'アイリッシュウイスキーとグリーンシャルトリューズを使うティペラリーと伝えると通じやすい。',
    imageQuery: 'Tipperary cocktail Irish whiskey vermouth green Chartreuse',
    recipe: { ingredients: [{name:'Irish Whiskey',amount:'50ml'},{name:'Sweet Red Vermouth',amount:'25ml'},{name:'Green Chartreuse',amount:'15ml'},{name:'Angostura Bitters',amount:'2 dashes'}], method:'全材料を氷とともにステアし、冷やしたカクテルグラスへストレインしてオレンジを添える。' },
    evidence: [
      {type:'international_professional_reference',title:'Tipperary – IBA',url:'https://iba-world.com/iba-cocktail/tipperary/',note:'IBA公式レシピで実在性・標準構成を確認。'},
      {type:'jp_bar_reference',title:'Bar domingo IBA cocktail menu',url:'https://r.gnavi.co.jp/2p1ujyer0000/menu2/',note:'国内BARの現行IBAメニューでティペラリー提供を確認。'},
      {type:'international_professional_reference',title:'Tipperary – Liquor.com',url:'https://www.liquor.com/recipes/tipperary/',note:'国際的カクテル資料で歴史と代表構成を補助確認。'}
    ]
  }
];

export const DRINK_MASTER_EXPANSION_B04_SEED_ROWS = DRINK_MASTER_EXPANSION_B04.map((drink) => [drink.masterKey, drink.availability, drink.rarity, drink.confidence]);
export const DRINK_MASTER_EXPANSION_B04_ALIAS_ENTRIES = DRINK_MASTER_EXPANSION_B04.flatMap((drink) => [drink.nameJa, ...drink.aliases].map((alias) => [alias, drink.masterKey]));
