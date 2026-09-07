export const DRINK_MASTER_EXPANSION_B08_EVIDENCE_VERSION = 'jp-rarity-expansion-2026-09-08-b08';
export const DRINK_MASTER_EXPANSION_B08_EVALUATED_AT = '2026-09-08';

export const DRINK_MASTER_EXPANSION_B08 = [
  {
    masterKey: "Queen's Park Swizzle", nameJa: 'クイーンズ・パーク・スウィズル', aliases: [],
    category: 'cocktail', baseSpirit: 'rum', drinkKind: 'cocktail', availability: 28, rarity: 72, rarityLabel: 'かなり珍しい', confidence: 0.86,
    rarityReason: 'トリニダードのQueen’s Park Hotelに由来する確立したラム・クラシック。デメララ系ラム、ライム、ミント、アンゴスチュラで再現でき、主要材料は国内調達可能だが、名称定着とスウィズル技法、クラッシュアイス運用の点で一般BARでは店差が大きい。',
    shortDescription: 'ラム、ライム、ミント、糖、アンゴスチュラをクラッシュアイスでスウィズルする、香り高く冷涼なトリニダード・クラシック。',
    orderHint: '「デメララ系ラム、ライム、ミント、アンゴスチュラのQueen’s Park Swizzle」と伝えると確認しやすい。',
    imageQuery: 'Queens Park Swizzle rum mint lime bitters crushed ice',
    recipe: { ingredients: [{name:'Demerara or Aged Rum',amount:'60ml'},{name:'Fresh Lime Juice',amount:'22.5ml'},{name:'Demerara Syrup',amount:'15ml'},{name:'Fresh Mint Leaves',amount:'8 leaves'},{name:'Angostura Bitters',amount:'2-4 dashes'}], method:'グラス内でミントを軽く香らせ、他材料とクラッシュアイスを加えて十分にスウィズルし、ミントを飾る。' },
    evidence: [
      {type:'international_professional_reference',title:"Queen's Park Swizzle – Difford’s Guide",url:'https://www.diffordsguide.com/cocktails/recipe/2740/queens-park-swizzle',note:'Queen’s Park Hotel由来の来歴とラム、ライム、糖、ミント、アンゴスチュラを使う代表構成を確認。'},
      {type:'jp_material_reference',title:'エルドラド デメララ 15年 – ビック酒販',url:'https://www.biccamera.com/bc/item/12845394/',note:'デメララ系ラムが日本国内の大手酒販流通に存在することを確認。'},
      {type:'jp_material_reference',title:'アンゴスチュラ アロマティックビターズ – 日本国内流通確認',url:'https://www.suntory.co.jp/wnb/products/0000000022/0000000158.html',note:'主要副材料アンゴスチュラ・ビターズの国内流通を確認するための国内商品情報。'}
    ]
  },
  {
    masterKey: 'Suffering Bastard', nameJa: 'サファリング・バスタード', aliases: ['Suffering Bastard Cocktail'],
    category: 'cocktail', baseSpirit: 'gin', drinkKind: 'cocktail', availability: 32, rarity: 68, rarityLabel: '珍しい', confidence: 0.88,
    rarityReason: '1942年にカイロのShepheard’s HotelでJoe Scialomが考案した確立済みクラシック。ジン、ブランデー系、ライム、アンゴスチュラ、ジンジャービアで再現でき、材料は国内調達可能だが、日本の一般BARでは名称認知が低く店差が大きい。',
    shortDescription: 'ジンとブランデーにライム、ビターズ、ジンジャービアを合わせる、スパイシーで爽快な戦時期生まれのロングカクテル。',
    orderHint: '「Joe Scialomの、ジンとブランデー、ライム、アンゴスチュラ、ジンジャービアのSuffering Bastard」と伝えると確実。',
    imageQuery: 'Suffering Bastard cocktail gin brandy ginger beer lime',
    recipe: { ingredients: [{name:'London Dry Gin',amount:'30ml'},{name:'Cognac or Brandy',amount:'30ml'},{name:'Fresh Lime Juice',amount:'15ml'},{name:'Angostura Bitters',amount:'2 dashes'},{name:'Ginger Beer',amount:'top up'}], method:'ジン、ブランデー、ライム、ビターズを氷とシェイクして氷入りグラスへ注ぎ、ジンジャービアで満たす。' },
    evidence: [
      {type:'international_professional_reference',title:'Suffering Bastard – Difford’s Guide',url:'https://www.diffordsguide.com/cocktails/recipe/2588/suffering-bastard',note:'Joe Scialom、1942年Shepheard’s Hotelの来歴とジン、コニャック、ライム、ビターズ、ジンジャービアの代表構成を確認。'},
      {type:'jp_professional_reference',title:'サファリング・バスタード – Sorso Scelto Stasera',url:'https://sorso-scelto-stasera.com/',note:'日本語圏で独立したクラシックカクテルとして紹介・レシピ解説されていることを確認。'},
      {type:'jp_material_reference',title:'FEVER-TREE PREMIUM GINGER BEER – &SPIRITS',url:'https://shop.andspirits.com/en/products/fever-tree-premium-ginger-beer-%E3%83%95%E3%82%A3%E3%83%BC%E3%83%90%E3%83%BC%E3%83%84%E3%83%AA%E3%83%BC-%E3%83%97%E3%83%AC%E3%83%9F%E3%82%A2%E3%83%A0-%E3%82%B8%E3%83%B3%E3%82%B8%E3%83%A3%E3%83%BC%E3%83%93%E3%82%A2',note:'主要ミキサーであるジンジャービアの日本国内販売を確認。'}
    ]
  },
  {
    masterKey: 'Toronto', nameJa: 'トロント', aliases: ['Toronto Cocktail','トロント・カクテル'],
    category: 'cocktail', baseSpirit: 'whisky', drinkKind: 'cocktail', availability: 30, rarity: 70, rarityLabel: '珍しい', confidence: 0.87,
    rarityReason: '1920年代まで遡るライ／カナディアンウイスキーとフェルネット・ブランカのクラシック。フェルネット・ブランカは日本で正規流通し材料面では成立するが、苦味の強い構成と名称認知の低さから一般BARでの即時提供は店差が大きい。',
    shortDescription: 'ライウイスキーの厚みにフェルネット・ブランカの強い苦味とハーブ香、糖とビターズを重ねるドライなクラシック。',
    orderHint: '「ライウイスキー、フェルネット・ブランカ、糖、アンゴスチュラのToronto」と材料も添えて確認すると確実。',
    imageQuery: 'Toronto cocktail rye whiskey Fernet Branca orange twist',
    recipe: { ingredients: [{name:'Rye Whiskey',amount:'60ml'},{name:'Fernet-Branca',amount:'7.5ml'},{name:'Sugar Syrup',amount:'7.5ml'},{name:'Angostura Bitters',amount:'1 dash'}], method:'全材料を氷と十分にステアし、冷やしたカクテルグラスへ注いでオレンジピールを香らせる。' },
    evidence: [
      {type:'international_professional_reference',title:'Toronto – Difford’s Guide',url:'https://www.diffordsguide.com/cocktails/recipe/3442/toronto',note:'1922年のFernet CocktailからTorontoへ至る来歴とウイスキー、フェルネット、糖、ビターズを軸とする代表構成を確認。'},
      {type:'jp_material_reference',title:'フェルネット ブランカ – Whisk-e',url:'https://whisk-e.co.jp/products/fernetbranca/',note:'主要特殊材料フェルネット・ブランカの日本国内公式流通とカクテル用途を確認。'},
      {type:'jp_material_reference',title:'フェルネット ブランカ – 信濃屋',url:'https://www.shinanoya-tokyo.jp/view/item/000000011555',note:'日本国内の専門酒販でフェルネット・ブランカが購入可能であることを確認。'}
    ]
  }
];

export const DRINK_MASTER_EXPANSION_B08_SEED_ROWS = DRINK_MASTER_EXPANSION_B08.map((drink) => [drink.masterKey, drink.availability, drink.rarity, drink.confidence]);
export const DRINK_MASTER_EXPANSION_B08_ALIAS_ENTRIES = DRINK_MASTER_EXPANSION_B08.flatMap((drink) => [drink.nameJa, ...drink.aliases].map((alias) => [alias, drink.masterKey]));
