export const DRINK_MASTER_EXPANSION_B07_EVIDENCE_VERSION = 'jp-rarity-expansion-2026-09-08-b07';
export const DRINK_MASTER_EXPANSION_B07_EVALUATED_AT = '2026-09-08';

export const DRINK_MASTER_EXPANSION_B07 = [
  {
    masterKey: 'Pegu Club', nameJa: 'ペグ・クラブ', aliases: ['Pegu Club Cocktail','ペグ・クラブ・カクテル'],
    category: 'cocktail', baseSpirit: 'gin', drinkKind: 'cocktail', availability: 42, rarity: 58, rarityLabel: '珍しい', confidence: 0.92,
    rarityReason: '1920年代から記録される確立したクラシックで、日本の専門BARで現行提供例と国内バーテンダーによる解説を確認できる。ジン、オレンジキュラソー、ライム、ビターズで再現可能だが、一般BARでの名称定着は定番群より低い。',
    shortDescription: 'ジンとオレンジキュラソー、ライムに2種のビターズを重ねる、香りと苦味の立体感があるクラシック。',
    orderHint: '「ジン、オレンジキュラソー、ライム、アンゴスチュラとオレンジビターズのペグ・クラブ」と伝えると確実。',
    imageQuery: 'Pegu Club cocktail gin curacao lime bitters coupe',
    recipe: { ingredients: [{name:'London Dry Gin',amount:'45ml'},{name:'Orange Curaçao',amount:'15ml'},{name:'Fresh Lime Juice',amount:'7.5ml'},{name:'Angostura Bitters',amount:'1 dash'},{name:'Orange Bitters',amount:'1 dash'}], method:'全材料を氷とともにシェイクし、冷やしたカクテルグラスへファインストレインする。' },
    evidence: [
      {type:'international_professional_reference',title:"Pegu Club Cocktail – Difford’s Guide",url:'https://www.diffordsguide.com/cocktails/recipe/2728/pegu-club-cocktail-diffords-recipe',note:'1920年代からの来歴とジン、キュラソー、ライム、アンゴスチュラ、オレンジビターズの代表構成を確認。'},
      {type:'jp_bar_reference',title:'ペグ・クラブ – 神楽坂 Bar Leaf',url:'https://barleaf2020.com/pegu-club-cocktail/',note:'東京都内の現行BARによる実提供と主要材料、クラシックとしての扱いを確認。'},
      {type:'jp_professional_reference',title:'Pegu club – Bar BenFiddich 鹿山博康',url:'https://note.com/benfiddich/n/nfbd9f00f302b',note:'日本の著名バーテンダーによる歴史的レシピと国内での認知度に関する解説を確認。'}
    ]
  },
  {
    masterKey: 'Gin Gin Mule', nameJa: 'ジン・ジン・ミュール', aliases: [],
    category: 'cocktail', baseSpirit: 'gin', drinkKind: 'cocktail', availability: 38, rarity: 62, rarityLabel: '珍しい', confidence: 0.86,
    rarityReason: 'Audrey Saunders由来のモダンクラシックとして国際的に確立し、日本語の業界媒体でも紹介されている。ジン、ライム、ミント、ジンジャービアは国内調達可能だが、生ミント常備と名称認知の点で一般BARでは店差が大きい。',
    shortDescription: 'ジン、ライム、ミント、ジンジャービアを合わせる、モヒートとモスコミュールの長所を重ねた爽快なロングカクテル。',
    orderHint: '「Audrey Saundersの、ジンとミント、ライム、ジンジャービアを使うGin Gin Mule」と伝えると通じやすい。',
    imageQuery: 'Gin Gin Mule gin mint lime ginger beer cocktail',
    recipe: { ingredients: [{name:'London Dry Gin',amount:'60ml'},{name:'Fresh Lime Juice',amount:'15ml'},{name:'Sugar Syrup',amount:'7.5ml'},{name:'Fresh Mint Leaves',amount:'10-12 leaves'},{name:'Ginger Beer',amount:'75ml'}], method:'ジン、ライム、糖、ミントを氷とシェイクしてグラスへ注ぎ、ジンジャービアで満たしてミントを飾る。' },
    evidence: [
      {type:'international_professional_reference',title:"Gin Gin Mule – Difford’s Guide",url:'https://www.diffordsguide.com/cocktails/recipe/843/gin-gin-mule',note:'Audrey Saunders由来の来歴とジン、ライム、ミント、ジンジャービアを軸とする代表構成を確認。'},
      {type:'jp_professional_reference',title:'Gin Gin Mule – DRINK PLANET',url:'https://www.drinkplanet.jp/cocktail_todays/view/194',note:'日本語のバーテンダー業界媒体でGin Gin Muleが独立した既知カクテルとして掲載されていることを確認。'},
      {type:'jp_material_reference',title:'Fever-Tree Japan',url:'https://www.fevertree.jp/',note:'主要ミキサーであるプレミアム・ジンジャービアの日本国内公式流通を確認。'}
    ]
  },
  {
    masterKey: 'Saturn', nameJa: 'サターン', aliases: ['Saturn Cocktail','サターン・カクテル'],
    category: 'cocktail', baseSpirit: 'gin', drinkKind: 'cocktail', availability: 18, rarity: 82, rarityLabel: 'かなり珍しい', confidence: 0.84,
    rarityReason: '1969年のIBA World Championship優勝作として歴史的に確立したトロピカル系ジンカクテル。日本ではファレナム、オルジェ、パッションフルーツシロップはいずれも調達可能だが、複数の特殊材料を同時常備する必要があり一般BARでの成立性は低い。',
    shortDescription: 'ジンにファレナム、オルジェ、パッションフルーツ、レモンを重ねる、華やかで複層的なトロピカルクラシック。',
    orderHint: '「1969年のPopo Galsiniの、ジン・ファレナム・オルジェ・パッションフルーツのSaturn」と確認すると確実。',
    imageQuery: 'Saturn cocktail gin falernum orgeat passion fruit lemon',
    recipe: { ingredients: [{name:'London Dry Gin',amount:'45ml'},{name:'Falernum',amount:'7.5ml'},{name:'Orgeat Syrup',amount:'7.5ml'},{name:'Passion Fruit Syrup',amount:'7.5ml'},{name:'Fresh Lemon Juice',amount:'22.5ml'}], method:'全材料をクラッシュアイスとブレンド、または十分にシェイクし、冷やしたグラスへ注いでレモンピールとチェリーを飾る。' },
    evidence: [
      {type:'international_professional_reference',title:"Saturn – Difford’s Guide",url:'https://www.diffordsguide.com/cocktails/recipe/4885/saturn',note:'José “Popo” Galsini考案、1969年IBA World Championship優勝の来歴と主要構成を確認。'},
      {type:'jp_material_reference',title:'Orgeat Syrup – Giffard Japan',url:'https://www.giffard.jp/catalog/orgeat-syrup/',note:'特殊材料オルジェシロップの日本国内公式流通を確認。'},
      {type:'jp_material_reference',title:'KIBITOSO Falernum – BOSO Rhum',url:'https://rhumboso.stores.jp/items/66e6938f24c2f47a3b2c9fba',note:'特殊材料ファレナムが国内で製造・流通していることを確認。'},
      {type:'jp_material_reference',title:'MONIN Passion Fruit Syrup – ASKUL',url:'https://www.askul.co.jp/p/HU94808/',note:'パッションフルーツシロップの国内業務流通を確認。'}
    ]
  }
];

export const DRINK_MASTER_EXPANSION_B07_SEED_ROWS = DRINK_MASTER_EXPANSION_B07.map((drink) => [drink.masterKey, drink.availability, drink.rarity, drink.confidence]);
export const DRINK_MASTER_EXPANSION_B07_ALIAS_ENTRIES = DRINK_MASTER_EXPANSION_B07.flatMap((drink) => [drink.nameJa, ...drink.aliases].map((alias) => [alias, drink.masterKey]));
