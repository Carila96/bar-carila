export const DRINK_MASTER_EXPANSION_B05_EVIDENCE_VERSION = 'jp-rarity-expansion-2026-09-08-b05';
export const DRINK_MASTER_EXPANSION_B05_EVALUATED_AT = '2026-09-08';

export const DRINK_MASTER_EXPANSION_B05 = [
  {
    masterKey: 'Gin Basil Smash', nameJa: 'ジン・バジル・スマッシュ', aliases: ['Gin Basil Smash','Gin Pesto'],
    category: 'cocktail', baseSpirit: 'gin', drinkKind: 'cocktail', availability: 60, rarity: 40, rarityLabel: 'やや珍しい', confidence: 0.94,
    rarityReason: '21世紀のモダンクラシックとして国内業界媒体で定着が確認でき、国内BARの現行メニュー掲載も複数確認できる。ジン・レモン・糖は一般的だが、十分量のフレッシュバジル常備が提供可否を左右する。',
    shortDescription: 'ジン、レモン、糖にたっぷりの生バジルを合わせる、鮮烈な緑色とハーブ香が特徴のモダンクラシック。',
    orderHint: '「フレッシュバジルを使うジン・バジル・スマッシュ」と頼めば意図が伝わりやすい。',
    imageQuery: 'Gin Basil Smash cocktail fresh basil gin lemon',
    recipe: { ingredients: [{name:'London Dry Gin',amount:'60ml'},{name:'Fresh Lemon Juice',amount:'22.5ml'},{name:'Rich Sugar Syrup',amount:'10ml'},{name:'Fresh Basil Leaves',amount:'10-12 leaves'}], method:'バジルをシェーカー内でマドルし、他の材料と氷を加えて強くシェイクし、ファインストレインして冷やしたグラスへ注ぐ。' },
    evidence: [
      {type:'international_professional_reference',title:'Gin Basil Smash – Difford’s Guide',url:'https://www.diffordsguide.com/cocktails/recipe/3282/gin-basil-smash',note:'2008年Jörg Meyer考案の来歴と代表構成を確認。'},
      {type:'jp_bar_reference',title:'Bar Amami drink menu',url:'https://r.gnavi.co.jp/e5580ram0000/menu2/',note:'国内BARの現行メニューでフレッシュバジル使用のジンバジルスマッシュ提供を確認。'},
      {type:'jp_industry_reference',title:'Gin Basil Smash – DRINK PLANET',url:'https://www.drinkplanet.jp/cocktail_todays/view/799/',note:'国内バー業界媒体で「21世紀の新定番」として認知・発祥を確認。'}
    ]
  },
  {
    masterKey: 'White Negroni', nameJa: 'ホワイト・ネグローニ', aliases: ['White Negroni'],
    category: 'cocktail', baseSpirit: 'gin', drinkKind: 'cocktail', availability: 42, rarity: 58, rarityLabel: '珍しい', confidence: 0.91,
    rarityReason: '国内銀座BARで提供実績があり業界媒体でも独立したカクテルとして確認できる。ジンは一般的だが、Suze等のゲンチアナ系リキュールとLillet Blancの同時常備に店差が大きい。',
    shortDescription: 'ジン、Suze、Lillet Blancを合わせ、ネグローニの苦味をより淡色でドライに再構成したモダンクラシック。',
    orderHint: '「SuzeとLillet Blancを使うホワイト・ネグローニ」と補足するとレシピの取り違えを避けやすい。',
    imageQuery: 'White Negroni cocktail gin Suze Lillet grapefruit twist',
    recipe: { ingredients: [{name:'London Dry Gin',amount:'30ml'},{name:'Suze or Gentian Liqueur',amount:'30ml'},{name:'Lillet Blanc',amount:'30ml'}], method:'全材料を氷とともにステアし、氷を入れたオールドファッションドグラスへ注いでグレープフルーツピールを添える。' },
    evidence: [
      {type:'international_professional_reference',title:'White Negroni – Difford’s Guide',url:'https://www.diffordsguide.com/cocktails/recipe/3420/white-negroni',note:'Wayne Collinsが2001年に考案した来歴と等量構成を確認。'},
      {type:'jp_bar_reference',title:'BAR AVANTI（東京・銀座） – BAR & it',url:'https://and-it.jp/cocktail/avanti/',note:'東京・銀座のBARでホワイトネグローニ提供実績を確認。'},
      {type:'jp_industry_reference',title:'White Negroni – DRINK PLANET',url:'https://www.drinkplanet.jp/cocktail_todays/view/218',note:'国内バー業界媒体で独立したカクテルとして掲載を確認。'}
    ]
  },
  {
    masterKey: 'Division Bell', nameJa: 'ディヴィジョン・ベル', aliases: ['Division Bell'],
    category: 'cocktail', baseSpirit: 'mezcal', drinkKind: 'cocktail', availability: 33, rarity: 67, rarityLabel: '珍しい', confidence: 0.93,
    rarityReason: '国際的に確立した2009年のモダンクラシックで国内BARでの実提供も確認できるが、メスカルとマラスキーノの常備、名称認知の双方で一般的な日本のBARでは店差が大きい。',
    shortDescription: 'メスカル、アペロール、マラスキーノ、ライムを合わせる、スモーキーでビターシトラスな現代クラシック。',
    orderHint: '「Phil Wardの、メスカルとアペロールを使うディヴィジョン・ベル」と伝えると確実。',
    imageQuery: 'Division Bell cocktail mezcal Aperol maraschino lime grapefruit',
    recipe: { ingredients: [{name:'Mezcal',amount:'30ml'},{name:'Aperol',amount:'22.5ml'},{name:'Maraschino Liqueur',amount:'15ml'},{name:'Fresh Lime Juice',amount:'22.5ml'}], method:'全材料を氷とともにシェイクし、冷やしたクープへストレインしてグレープフルーツピールを添える。' },
    evidence: [
      {type:'international_professional_reference',title:'Division Bell – Difford’s Guide',url:'https://www.diffordsguide.com/cocktails/recipe/3634/division-bell',note:'Phil Wardが2009年Mayahuelで考案した来歴と代表構成を確認。'},
      {type:'jp_bar_reference',title:'Division Bell – Bar Super Nova',url:'https://ameblo.jp/barsupernova/entry-12792083417.html',note:'横浜のBARによるModern Classic Cocktail企画で実提供・構成を確認。'},
      {type:'international_recipe_reference',title:'Division Bell – Garnish',url:'https://www.garnishdrinks.com/cocktail/division-bell',note:'メスカル、アペロール、マラスキーノ、ライムの代表構成を補助確認。'}
    ]
  },
  {
    masterKey: 'Oaxaca Old Fashioned', nameJa: 'オアハカ・オールド・ファッションド', aliases: ['Oaxaca Old Fashioned','Oaxacan Old Fashioned','オアハカン・オールド・ファッションド'],
    category: 'cocktail', baseSpirit: 'tequila-mezcal', drinkKind: 'cocktail', availability: 45, rarity: 55, rarityLabel: 'やや珍しい', confidence: 0.94,
    rarityReason: '世界的なモダンクラシックとして確立し、国内メスカル専門性の高い店舗で現行提供を確認できる。レポサドテキーラ、メスカル、アガベ、ビターズは専門BARでは揃う一方、一般BARではメスカル常備に店差がある。',
    shortDescription: 'レポサドテキーラとメスカルをアガベ、ビターズでまとめる、スモーキーなオールドファッションドの現代版。',
    orderHint: '「Phil Wardの、テキーラとメスカルを使うオアハカ・オールド・ファッションド」と伝えると確実。',
    imageQuery: 'Oaxaca Old Fashioned tequila mezcal agave orange peel cocktail',
    recipe: { ingredients: [{name:'Reposado Tequila',amount:'45ml'},{name:'Mezcal',amount:'15ml'},{name:'Agave Nectar',amount:'1 bar spoon'},{name:'Angostura Bitters',amount:'2 dashes'}], method:'ロックグラスに材料と大きな氷を入れて十分にステアし、オレンジピールの香りを移して飾る。' },
    evidence: [
      {type:'international_professional_reference',title:'Oaxaca Old Fashioned – Liquor.com',url:'https://www.liquor.com/recipes/oaxacan-old-fashioned/',note:'Phil Wardが2007年Death & Co.で考案した来歴と代表レシピを確認。'},
      {type:'jp_bar_reference',title:'Colmena drink menu – 食べログ',url:'https://tabelog.com/tokyo/A1303/A130301/13269540/dtlmenu/drink/',note:'東京・渋谷のメキシコ料理／バー系店舗の現行メニューでOAXACAN OLD FASHIONED提供を確認。'},
      {type:'jp_industry_reference',title:'Oaxaca Old Fashioned – Cocktail Culture Note',url:'https://note.com/jjj621118/n/n9a3698618f3a',note:'日本語の専門解説で成立年、考案者、主要材料とモダンクラシックとしての位置づけを補助確認。'}
    ]
  },
  {
    masterKey: 'Yellow Bird', nameJa: 'イエロー・バード', aliases: ['Yellow Bird'],
    category: 'cocktail', baseSpirit: 'rum', drinkKind: 'cocktail', availability: 37, rarity: 63, rarityLabel: '珍しい', confidence: 0.86,
    rarityReason: '国際的に確立したラムカクテルで国内日本語資料でも長く認知される一方、国内では複数レシピが流通し、IBA系のGalliano・Triple Sec版を指定した場合はGalliano常備が提供上の主な制約になる。',
    shortDescription: 'ホワイトラム、Galliano、Triple Sec、ライムをシェイクする、ハーブと柑橘が重なる明るいカリビアンカクテル。',
    orderHint: 'レシピ違いが多いため「GallianoとTriple Sec、ライムを使うIBA系のイエロー・バード」と伝えると確実。',
    imageQuery: 'Yellow Bird cocktail white rum Galliano triple sec lime',
    recipe: { ingredients: [{name:'White Rum',amount:'30ml'},{name:'Galliano',amount:'15ml'},{name:'Triple Sec',amount:'15ml'},{name:'Fresh Lime Juice',amount:'15ml'}], method:'全材料を氷とともにシェイクし、冷やしたカクテルグラスへストレインする。' },
    evidence: [
      {type:'international_professional_reference',title:'Yellow Bird – Jigger & Joy (IBA recipe)',url:'https://jiggerandjoy.com/drinks/yellow-bird',note:'IBA系のホワイトラム、Galliano、Triple Sec、ライム構成を確認。'},
      {type:'jp_recipe_reference',title:'イエロー・バード – カクテルのレシピ',url:'https://cocktail-sound.com/recipe/rum/yellow-bird.htm',note:'国内日本語資料で名称定着と複数レシピが存在する点を確認。'},
      {type:'international_reference',title:'Yellow Bird cocktail – Wikipedia references overview',url:'https://en.wikipedia.org/wiki/Yellow_bird_(cocktail)',note:'IBA掲載歴とカリビアンカクテルとしての広い認知を補助確認。'}
    ]
  }
];

export const DRINK_MASTER_EXPANSION_B05_SEED_ROWS = DRINK_MASTER_EXPANSION_B05.map((drink) => [drink.masterKey, drink.availability, drink.rarity, drink.confidence]);
export const DRINK_MASTER_EXPANSION_B05_ALIAS_ENTRIES = DRINK_MASTER_EXPANSION_B05.flatMap((drink) => [drink.nameJa, ...drink.aliases].map((alias) => [alias, drink.masterKey]));
