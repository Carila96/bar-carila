export const DRINK_MASTER_EXPANSION_B04_EVIDENCE_VERSION = 'jp-rarity-expansion-2026-09-08-b04';
export const DRINK_MASTER_EXPANSION_B04_EVALUATED_AT = '2026-09-08';

export const DRINK_MASTER_EXPANSION_B04 = [
  {
    masterKey: 'Mary Pickford',
    nameJa: 'メアリー・ピックフォード',
    aliases: ['Mary Pickford'],
    category: 'cocktail',
    baseSpirit: 'rum',
    drinkKind: 'cocktail',
    availability: 52,
    rarity: 48,
    rarityLabel: 'やや珍しい',
    confidence: 0.9,
    rarityReason: 'IBA公認のクラシックで国内BARの現行メニュー掲載も確認でき、ラム・パイナップル・グレナデンは一般的。一方でマラスキーノ常備と名称認知には店差がある。',
    shortDescription: 'ホワイトラム、パイナップル、マラスキーノ、グレナデンを合わせる華やかなクラシック。',
    orderHint: '「ラムとパイナップルのメアリー・ピックフォード」と補足すると伝わりやすい。',
    imageQuery: 'Mary Pickford cocktail rum pineapple maraschino grenadine',
    recipe: { ingredients: [
      { name: 'White Rum', amount: '45ml' }, { name: 'Fresh Pineapple Juice', amount: '45ml' },
      { name: 'Maraschino Luxardo', amount: '7.5ml' }, { name: 'Grenadine Syrup', amount: '5ml' },
    ], method: '全材料を氷とともによくシェイクし、冷やしたカクテルグラスへストレインする。' },
    evidence: [
      { type: 'international_professional_reference', title: 'Mary Pickford – IBA', url: 'https://iba-world.com/iba-cocktail/mary-pickford/', note: 'IBA公式レシピで実在性・標準構成を確認。' },
      { type: 'jp_bar_reference', title: 'Bar hohshin MENU', url: 'https://bar.hohshin.net/menu/', note: '国内BARの現行メニューでメアリーピックフォード提供を確認。' },
      { type: 'jp_bar_reference', title: 'Bar Shake Drip – メアリー・ピックフォード', url: 'https://ameblo.jp/barshakedrip/entry-12949096229.html', note: '広島のBARで現行提供されるクラシックとして確認。' },
    ],
  },
  {
    masterKey: 'Between the Sheets',
    nameJa: 'ビトウィーン・ザ・シーツ',
    aliases: ['Between the Sheets'],
    category: 'cocktail', baseSpirit: 'cognac-rum', drinkKind: 'cocktail',
    availability: 50, rarity: 50, rarityLabel: 'やや珍しい', confidence: 0.9,
    rarityReason: 'IBA公認で国内BARのIBAメニューにも掲載され、コニャック・ホワイトラム・トリプルセック・柑橘という材料も専門BARでは一般的。名称注文の定着は最上位定番より低い。',
    shortDescription: 'コニャック、ホワイトラム、トリプルセック、レモンを合わせる力強いクラシック。',
    orderHint: 'サイドカー系のクラシックとして、コニャックとラムを使う一杯と伝えると確実。',
    imageQuery: 'Between the Sheets cocktail cognac rum triple sec',
    recipe: { ingredients: [
      { name: 'White Rum', amount: '30ml' }, { name: 'Cognac', amount: '30ml' },
      { name: 'Triple Sec', amount: '30ml' }, { name: 'Fresh Lemon Juice', amount: '20ml' },
    ], method: '全材料を氷とともにシェイクし、冷やしたカクテルグラスへストレインする。' },
    evidence: [
      { type: 'international_professional_reference', title: 'Between the Sheets – IBA', url: 'https://iba-world.com/iba-cocktail/between-the-sheets/', note: 'IBA公式レシピで実在性・標準構成を確認。' },
      { type: 'jp_bar_reference', title: 'Bar domingo IBA cocktail menu', url: 'https://r.gnavi.co.jp/2p1ujyer0000/menu2/', note: '国内BARのIBA公認カクテルメニューで現行掲載を確認。' },
      { type: 'jp_bar_reference', title: 'BAR DECE – ビトウィーン・ザ・シーツ', url: 'https://dece.tokyo/blog/1774', note: '東京のBARによる提供・レシピ文脈を確認。' },
    ],
  },
  {
    masterKey: 'Blood and Sand',
    nameJa: 'ブラッド・アンド・サンド',
    aliases: ['Blood and Sand', 'Blood & Sand'],
    category: 'cocktail', baseSpirit: 'scotch', drinkKind: 'cocktail',
    availability: 46, rarity: 54, rarityLabel: 'やや珍しい', confidence: 0.88,
    rarityReason: '国内のオーセンティックBARで現行提供を複数確認でき、スコッチ・スイートベルモット・オレンジは一般的。ただしチェリーリキュール常備と名称認知で店差がある。',
    shortDescription: 'スコッチ、チェリーリキュール、スイートベルモット、オレンジを等分で合わせる古典。',
    orderHint: 'チェリーリキュールを使うスコッチベースのクラシックとして確認すると伝わりやすい。',
    imageQuery: 'Blood and Sand cocktail scotch cherry orange vermouth',
    recipe: { ingredients: [
      { name: 'Blended Scotch Whisky', amount: '22.5ml' }, { name: 'Cherry Liqueur', amount: '22.5ml' },
      { name: 'Sweet Vermouth', amount: '22.5ml' }, { name: 'Fresh Orange Juice', amount: '22.5ml' },
    ], method: '全材料を氷とともにシェイクし、冷やしたクープまたはカクテルグラスへストレインする。' },
    evidence: [
      { type: 'international_professional_reference', title: 'Blood and Sand – Difford’s Guide', url: 'https://www.diffordsguide.com/cocktails/recipe/556/blood-and-sand-diffords-recipe', note: '国際的なプロ向け資料でクラシックの実在性、基本構成、歴史を確認。' },
      { type: 'jp_bar_reference', title: 'BAR WHITE OAK – ブラッド・アンド・サンド', url: 'https://whiteoak-bar.com/cocktail/20230920182148/', note: '銀座のオーセンティックBARで現行提供を確認。' },
      { type: 'jp_bar_reference', title: 'Bar Zolddich – Blood and Sand', url: 'https://bar-zolddich.com/archives/8336', note: '国内BARで等分構成の現行提供例を確認。' },
    ],
  },
  {
    masterKey: 'Bobby Burns',
    nameJa: 'ボビー・バーンズ',
    aliases: ['Bobby Burns', 'Robert Burns'],
    category: 'cocktail', baseSpirit: 'scotch', drinkKind: 'cocktail',
    availability: 40, rarity: 60, rarityLabel: '珍しい', confidence: 0.86,
    rarityReason: '国内BARでクラシックとして実提供例を確認でき、スコッチとスイートベルモットは一般的だが、ベネディクティン常備と名称認知が一般BARでは制約になる。',
    shortDescription: 'スコッチとスイートベルモットにベネディクティンを加える、芳香豊かなクラシック。',
    orderHint: 'ロブ・ロイにベネディクティンを加える系統のクラシックとして確認すると通じやすい。',
    imageQuery: 'Bobby Burns cocktail scotch vermouth Benedictine lemon',
    recipe: { ingredients: [
      { name: 'Blended Scotch Whisky', amount: '45ml' }, { name: 'Sweet Vermouth', amount: '45ml' },
      { name: 'Benedictine D.O.M.', amount: '7.5ml' },
    ], method: '全材料を氷とともにステアし、冷やしたクープへストレインしてレモンピールを香らせる。' },
    evidence: [
      { type: 'international_professional_reference', title: 'Bobby Burns – Difford’s Guide', url: 'https://www.diffordsguide.com/cocktails/recipe/280/bobby-burns-craddocks-recipe', note: 'Savoy由来の代表レシピと歴史をプロ向け資料で確認。' },
      { type: 'jp_bar_reference', title: 'Bar foxy – ボビー・バーンズ', url: 'https://bar-foxy.com/2022/10/bobby_burns/', note: '国内BARでスコッチ、ベルモット、ベネディクティンの実提供例を確認。' },
      { type: 'jp_recipe_reference', title: 'Jazz＆Cocktail – ボビー・バーンズ', url: 'https://jazzandcocktail.com/bobby-burns/', note: '日本語レシピ資料で国内向け名称・構成認知を補助確認。' },
    ],
  },
  {
    masterKey: "Horse's Neck",
    nameJa: 'ホーセズ・ネック',
    aliases: ["Horse's Neck", 'Horses Neck'],
    category: 'cocktail', baseSpirit: 'cognac', drinkKind: 'cocktail',
    availability: 58, rarity: 42, rarityLabel: 'やや珍しい', confidence: 0.9,
    rarityReason: 'IBA公認で日本の古い標準カクテル文献にも収載され、コニャックとジンジャーエールは一般的。長いレモンピールの調製と名称注文の頻度で定番群より店差がある。',
    shortDescription: 'コニャックをジンジャーエールで伸ばし、長い螺旋のレモンピールを飾るクラシックハイボール。',
    orderHint: '長いレモンピールを使うブランデーのホーセズ・ネックと伝えると確実。',
    imageQuery: "Horse's Neck cocktail cognac ginger ale lemon spiral",
    recipe: { ingredients: [
      { name: 'Cognac', amount: '40ml' }, { name: 'Ginger Ale', amount: '120ml' },
      { name: 'Angostura Bitters', amount: '1 dash optional' }, { name: 'Lemon Peel', amount: '1 long spiral' },
    ], method: '氷を入れたハイボールグラスへコニャックとジンジャーエールを注いで軽くステアし、好みでビターズを加え長いレモンピールを飾る。' },
    evidence: [
      { type: 'international_professional_reference', title: 'Horse’s Neck – IBA', url: 'https://iba-world.com/iba-cocktail/horses-neck/', note: 'IBA公式レシピで実在性・標準構成を確認。' },
      { type: 'jp_professional_reference', title: '老舗BAR講座 – ホーセズ・ネック', url: 'https://bar-school.com/cocktail-recipe/brandy/horsesneck.html', note: '創業60年の国内BAR講座で標準レシピと国内認知を確認。' },
      { type: 'jp_historical_reference', title: 'Bar UK – Horse’s Neck 日本初出資料', url: 'https://plaza.rakuten.co.jp/pianobarez/diary/201703110001/', note: '1907年・1936年の日本側文献への収載が紹介され、長期の国内認知を補助確認。' },
    ],
  },
];

export const DRINK_MASTER_EXPANSION_B04_SEED_ROWS = DRINK_MASTER_EXPANSION_B04.map((drink) => [drink.masterKey, drink.availability, drink.rarity, drink.confidence]);
export const DRINK_MASTER_EXPANSION_B04_ALIAS_ENTRIES = DRINK_MASTER_EXPANSION_B04.flatMap((drink) => [drink.nameJa, ...drink.aliases].map((alias) => [alias, drink.masterKey]));
