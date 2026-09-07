export const DRINK_MASTER_EXPANSION_B06_EVIDENCE_VERSION = 'jp-rarity-expansion-2026-09-08-b06';
export const DRINK_MASTER_EXPANSION_B06_EVALUATED_AT = '2026-09-08';

export const DRINK_MASTER_EXPANSION_B06 = [
  {
    masterKey: 'Enzoni', nameJa: 'エンゾーニ', aliases: [],
    category: 'cocktail', baseSpirit: 'gin', drinkKind: 'cocktail', availability: 34, rarity: 66, rarityLabel: '珍しい', confidence: 0.92,
    rarityReason: '2000年代のモダンクラシックとして国際的に定着し、横浜の現行BARで実提供も確認できる。ジン、カンパリ、レモン、糖は一般的だが、生の白葡萄を常備する必要があり一般BARでは店差が大きい。',
    shortDescription: 'ジンとカンパリの苦味にレモンと白葡萄の果実味を重ねる、ネグローニとサワーの中間的なモダンクラシック。',
    orderHint: '「白葡萄をマドルするジンとカンパリのエンゾーニ」と伝えると意図が通じやすい。',
    imageQuery: 'Enzoni cocktail gin Campari green grapes lemon',
    recipe: { ingredients: [{name:'London Dry Gin',amount:'30ml'},{name:'Campari',amount:'30ml'},{name:'Fresh Lemon Juice',amount:'20ml'},{name:'Rich Sugar Syrup',amount:'15ml'},{name:'Green Grapes',amount:'5 grapes'}], method:'葡萄をシェーカー内でマドルし、他の材料と氷を加えてシェイクし、氷を入れたロックグラスへファインストレインする。' },
    evidence: [
      {type:'international_professional_reference',title:'Enzoni – Difford’s Guide',url:'https://www.diffordsguide.com/cocktails/recipe/5591/enzoni',note:'Vincenzo Errico考案の来歴とジン、カンパリ、レモン、糖、白葡萄の代表構成を確認。'},
      {type:'jp_bar_reference',title:'Enzoni – Bar Super Nova',url:'https://ameblo.jp/barsupernova/entry-12928982669.html',note:'横浜の現行BARでEnzoniの実提供と主要材料を確認。'},
      {type:'jp_material_reference',title:'Campari Japan product information',url:'https://www.ctspiritsjapan.co.jp/brands/campari/',note:'主要材料Campariの国内正規流通を補助確認。'}
    ]
  },
  {
    masterKey: 'Breakfast Martini', nameJa: 'ブレックファースト・マティーニ', aliases: [],
    category: 'cocktail', baseSpirit: 'gin', drinkKind: 'cocktail', availability: 41, rarity: 59, rarityLabel: '珍しい', confidence: 0.90,
    rarityReason: '1990年代以降のモダンクラシックとして国際的に定着し、国内BARの現行メニュー掲載も確認できる。ジン、オレンジリキュール、レモンは一般的だが、オレンジマーマレードをカクテル用に扱う運用が提供店を選ぶ。',
    shortDescription: 'ジン、オレンジリキュール、レモンにマーマレードを溶かし込む、柑橘の甘苦さが特徴のモダンクラシック。',
    orderHint: '「Salvatore Calabreseの、オレンジマーマレードを使うブレックファースト・マティーニ」と伝えると確実。',
    imageQuery: 'Breakfast Martini gin orange marmalade lemon cocktail',
    recipe: { ingredients: [{name:'London Dry Gin',amount:'50ml'},{name:'Cointreau or Triple Sec',amount:'15ml'},{name:'Fresh Lemon Juice',amount:'15ml'},{name:'Orange Marmalade',amount:'1 bar spoon'}], method:'マーマレードをジンに溶かし、残りの材料と氷を加えてシェイクし、冷やしたカクテルグラスへファインストレインする。' },
    evidence: [
      {type:'international_professional_reference',title:'Breakfast Martini – Difford’s Guide',url:'https://www.diffordsguide.com/cocktails/recipe/322/breakfast-martini',note:'Salvatore Calabrese考案の来歴と代表レシピを確認。'},
      {type:'jp_bar_reference',title:'Drink – Bar Ofen',url:'https://bar-ofen.com/drink/',note:'横浜の現行BARメニューでBreakfast Martiniの提供を確認。'},
      {type:'international_distillery_reference',title:'Breakfast Martini – Warner’s Distillery',url:'https://www.warnersdistillery.com/blogs/recipes/breakfast-martini',note:'ジン、トリプルセック、レモン、マーマレードの標準的構成を補助確認。'}
    ]
  },
  {
    masterKey: 'Chartreuse Swizzle', nameJa: 'シャルトリューズ・スウィズル', aliases: [],
    category: 'cocktail', baseSpirit: 'liqueur', drinkKind: 'cocktail', availability: 22, rarity: 78, rarityLabel: 'かなり珍しい', confidence: 0.90,
    rarityReason: 'IBA公式カクテルとして国際的に確立している一方、日本の一般BARではGreen ChartreuseとFalernumの同時常備、パイナップルジュース、クラッシュアイス運用が必要で成立店が限られる。両リキュール自体は国内流通を確認できる。',
    shortDescription: 'Green Chartreuse、Falernum、パイナップル、ライムをクラッシュアイスで仕上げる、濃密なハーブ香のスウィズル。',
    orderHint: '「IBAの、Green ChartreuseとFalernumを使うChartreuse Swizzle」と確認すると確実。',
    imageQuery: 'Chartreuse Swizzle green chartreuse falernum pineapple lime mint',
    recipe: { ingredients: [{name:'Green Chartreuse',amount:'45ml'},{name:'Fresh Pineapple Juice',amount:'30ml'},{name:'Fresh Lime Juice',amount:'22.5ml'},{name:'Falernum',amount:'15ml'}], method:'背の高いグラスに材料とペブルアイスを入れてスウィズルし、さらに氷を足してミントとナツメグを添える。' },
    evidence: [
      {type:'international_professional_reference',title:'Chartreuse Swizzle – International Bartenders Association',url:'https://iba-world.com/iba-cocktail/chartreuse-swizzle/',note:'IBA公式レシピとしてGreen Chartreuse、パイナップル、ライム、Falernumの比率と手順を確認。'},
      {type:'jp_material_reference',title:'Chartreuse Vert – Wine Shop Fujii',url:'https://wineshop-fujii.com/hard-liquor/liqueur/7143/',note:'Green Chartreuseの日本国内流通を確認。'},
      {type:'jp_material_reference',title:'Velvet Falernum – Cave d’Orange',url:'https://www.shiraki.co.jp/products/detail/1336',note:'Velvet Falernumの日本国内流通実績を確認し、特殊材料としての入手性を評価。'}
    ]
  }
];

export const DRINK_MASTER_EXPANSION_B06_SEED_ROWS = DRINK_MASTER_EXPANSION_B06.map((drink) => [drink.masterKey, drink.availability, drink.rarity, drink.confidence]);
export const DRINK_MASTER_EXPANSION_B06_ALIAS_ENTRIES = DRINK_MASTER_EXPANSION_B06.flatMap((drink) => [drink.nameJa, ...drink.aliases].map((alias) => [alias, drink.masterKey]));
