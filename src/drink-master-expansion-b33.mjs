export const DRINK_MASTER_EXPANSION_B33_EVIDENCE_VERSION='jp-rarity-expansion-2026-09-09-b33';
export const DRINK_MASTER_EXPANSION_B33_EVALUATED_AT='2026-09-09';
const JP1='https://www.hotpepper.jp/strJ003365641/drink/';
const JP2='https://www.hotpepper.jp/strJ003474302/drink/';
const JP3='https://www.hotpepper.jp/strJ004678153/drink/';
const label=r=>r>=75?'かなり珍しい':r>=55?'珍しい':r>=35?'やや珍しい':'定番寄り';
const methodFor=ings=>ings.some(([n])=>/champagne|ginger ale|soda water/i.test(n))?'炭酸材料以外を氷で十分に冷却してグラスへ注ぎ、最後に炭酸材料を加えて軽くステアする。':ings.some(([n])=>/juice|milk|egg|sugar|grenadine|syrup|pineapple|orange/i.test(n))?'全材料を氷と十分にシェイクし、冷やした適切なグラスへストレインする。':'全材料を氷と十分にステアし、冷やした適切なグラスへストレインする。';
const special=/Hercules|Swedish Punch|Caperitif|Jamaica ginger|Orange gin|Kummel|Parfait Amour|Creme de noyaux/i;
const d=(masterKey,nameJa,baseSpirit,availability,ingredients,page,aliases=[])=>({masterKey,nameJa,aliases,category:'cocktail',baseSpirit,drinkKind:'cocktail',availability,rarity:100-availability,rarityLabel:label(100-availability),confidence:.84,rarityReason:`1930 Savoy Cocktail Bookの原典スキャンで実在・標準名称・代表構成を確認。${ingredients.some(([n])=>special.test(n))?'歴史的または専門性の高い副材料を含むため、':''}主要酒材は日本国内で調達可能だが、名称認知度と常備酒材には店差があり、一般BARでの即時提供可能性は限定される。`,shortDescription:`${masterKey}は1930 Savoy Cocktail Bookに収録されるクラシックカクテル。`,orderHint:'名称で通じない場合は主要材料とSavoy系クラシックである旨を添えると確実。',imageQuery:`${masterKey} cocktail`,recipe:{ingredients:ingredients.map(([name,amount])=>({name,amount})),method:methodFor(ingredients)},evidence:[{type:'historical_primary_reference',title:`1930 Savoy Cocktail Book — p.${page}: ${masterKey}`,url:`https://euvs-vintage-cocktail-books.cld.bz/1930-The-Savoy-Cocktail-Book/${page}`,note:'1930年刊行The Savoy Cocktail Bookのデジタル原典スキャンで実在・標準名称・代表レシピを確認。'},{type:'jp_bar_reference',title:'Japanese full-service bar current menu coverage',url:JP1,note:'日本国内BARで主要スピリッツ、ベルモット、果汁、一般リキュール等の現行提供環境を確認。'},{type:'jp_bar_reference',title:'Japanese specialist bar current menu coverage',url:JP2,note:'日本国内でアブサン、シャルトリューズ、キルシュ等を扱う専門BARの現行提供環境を確認。'},{type:'jp_bar_reference',title:'Japanese classic cocktail bar current menu coverage',url:JP3,note:'日本国内BARでクラシックカクテル用酒材を提供する環境を補助確認。'}]});
export const DRINK_MASTER_EXPANSION_B33_CANDIDATES=[
d("Harrovian Cocktail","ハロヴィアン","gin",32,[["Dry gin","60ml"],["Orange juice","5ml"],["Lemon juice","1 dash"],["Angostura bitters","1 dash"]],81),
d("Harry's Cocktail","ハリーズ・カクテル","gin",25,[["Gin","40ml"],["Sweet vermouth","20ml"],["Absinthe","1 dash"],["Fresh mint","2 sprigs"]],81),
d("Harry's Pick-Me-Up Cocktail","ハリーズ・ピック・ミー・アップ","brandy",28,[["Brandy","45ml"],["Lemon juice","22.5ml"],["Grenadine","5ml"],["Champagne","top"]],81),
d("Harvard Cocktail","ハーバード","brandy",30,[["Brandy","30ml"],["Sweet vermouth","30ml"],["Simple syrup","1 dash"],["Angostura bitters","2 dashes"]],81),
d("Hasty Cocktail","ヘイスティ","gin",20,[["Dry gin","45ml"],["Dry vermouth","15ml"],["Grenadine","4 dashes"],["Absinthe","1 dash"]],81),
d("Havana Cocktail","ハバナ","gin",24,[["Dry gin","30ml"],["Swedish Punch","15ml"],["Apricot brandy","15ml"],["Lemon juice","1 dash"]],82),
d("Hawaiian Cocktail","ハワイアン","gin",32,[["Gin","40ml"],["Orange juice","20ml"],["Curaçao","10ml"]],82),
d("Health Cocktail","ヘルス","brandy",12,[["Brandy","30ml"],["Hercules","30ml"]],82),
d("Hell Cocktail","ヘル・カクテル","brandy",18,[["Cognac","30ml"],["Green creme de menthe","30ml"],["Cayenne pepper","1 pinch"]],82),
d("Hesitation Cocktail","ヘジテーション","whisky",18,[["Canadian whisky","15ml"],["Swedish Punch","45ml"],["Lemon juice","1 dash"]],82),
d("Hoffman House Cocktail","ホフマン・ハウス","gin",34,[["Plymouth gin","40ml"],["Dry vermouth","20ml"],["Orange bitters","2 dashes"]],83),
d("Holland House Cocktail","ホランド・ハウス","gin",28,[["Dry gin","40ml"],["Dry vermouth","20ml"],["Maraschino liqueur","4 dashes"],["Lemon juice","7.5ml"],["Pineapple","1 slice"]],83),
d("Homestead Cocktail","ホームステッド","gin",32,[["Dry gin","40ml"],["Sweet vermouth","20ml"],["Orange","1 slice"]],83),
d("Honolulu Cocktail No. 1","ホノルル No.1","gin",26,[["Dry gin","60ml"],["Orange juice","1 dash"],["Pineapple juice","1 dash"],["Lemon juice","1 dash"],["Angostura bitters","1 dash"],["Powdered sugar","1 pinch"]],83),
d("Honolulu Cocktail No. 2","ホノルル No.2","gin",20,[["Gin","20ml"],["Maraschino liqueur","20ml"],["Benedictine","20ml"]],83),
d("Hoop La Cocktail","フープ・ラ","brandy",35,[["Brandy","15ml"],["Cointreau","15ml"],["Kina Lillet","15ml"],["Lemon juice","15ml"]],84),
d("Hoots Mon Cocktail","フーツ・モン","whisky",26,[["Scotch whisky","30ml"],["Sweet vermouth","15ml"],["Kina Lillet","15ml"]],84),
d("Hop Toad Cocktail","ホップ・トード","brandy",24,[["Apricot brandy","45ml"],["Lemon juice","15ml"]],84),
d("Hot Deck Cocktail","ホット・デック","whisky",18,[["Canadian whisky","45ml"],["Sweet vermouth","15ml"],["Jamaica ginger","1 dash"]],84),
d("Houla-Houla Cocktail","フーラ・フーラ","gin",30,[["Dry gin","45ml"],["Orange juice","15ml"],["Curaçao","1 dash"]],84),
d("I.B.F. Pick-Me-Up Cocktail","I.B.F.ピック・ミー・アップ","brandy",18,[["Brandy","30ml"],["Fernet-Branca","3 dashes"],["Curaçao","3 dashes"],["Champagne","top"]],85),
d("Ichbien Cocktail","イッヒビーン","brandy",16,[["Brandy","45ml"],["Orange curaçao","15ml"],["Milk","30ml"],["Egg yolk","1"]],85),
d("Ideal Cocktail","アイディアル","gin",32,[["Dry gin","40ml"],["Sweet vermouth","20ml"],["Maraschino liqueur","3 dashes"],["Grapefruit juice","15ml"]],85),
d("Imperial Cocktail","インペリアル・カクテル","gin",30,[["Dry gin","30ml"],["Dry vermouth","30ml"],["Maraschino liqueur","1 dash"],["Angostura bitters","1 dash"]],86),
d("Inca Cocktail","インカ","gin",22,[["Gin","15ml"],["Sherry","15ml"],["Dry vermouth","15ml"],["Sweet vermouth","15ml"],["Orgeat syrup","1 dash"],["Orange bitters","1 dash"]],86),
d("Ink Street Cocktail","インク・ストリート","whisky",28,[["Canadian whisky","20ml"],["Orange juice","20ml"],["Lemon juice","20ml"]],86),
d("Irish Cocktail","アイリッシュ・カクテル","whisky",22,[["Irish whisky","60ml"],["Absinthe","2 dashes"],["Curaçao","2 dashes"],["Maraschino liqueur","1 dash"],["Angostura bitters","1 dash"]],87),
d("Jabberwock Cocktail","ジャバーウォック","gin",18,[["Dry gin","20ml"],["Dry sherry","20ml"],["Caperitif","20ml"],["Orange bitters","2 dashes"]],87),
d("Jack Kearns Cocktail No. 1","ジャック・カーンズ No.1","gin",28,[["Dry gin","30ml"],["Bacardi rum","30ml"],["Lemon juice","1 dash"],["Simple syrup","1 dash"]],88),
d("Jack Kearns Cocktail No. 2","ジャック・カーンズ No.2","gin",28,[["Dry gin","30ml"],["Bacardi rum","30ml"],["Lemon juice","1 dash"],["Simple syrup","1 dash"]],88),
d("Jack Pine Cocktail","ジャック・パイン","gin",28,[["Dry gin","40ml"],["Dry vermouth","20ml"],["Orange juice","7.5ml"],["Pineapple","1 slice"]],88),
d("Jackson Cocktail","ジャクソン","gin",18,[["Dubonnet","40ml"],["Orange gin","20ml"],["Orange bitters","2 dashes"]],88),
d("Jack Withers Cocktail","ジャック・ウィザーズ","gin",30,[["Dry gin","20ml"],["Dry vermouth","20ml"],["Sweet vermouth","20ml"],["Orange juice","15ml"]],88),
d("Jewel Cocktail","ジュエル","gin",24,[["Gin","20ml"],["Green Chartreuse","20ml"],["Sweet vermouth","20ml"],["Orange bitters","1 dash"]],89),
d("Jeyplak Cocktail","ジェイプラック","gin",26,[["Dry gin","40ml"],["Sweet vermouth","20ml"],["Absinthe","1 dash"]],89),
d("Jimmy Blanc Cocktail","ジミー・ブラン","gin",22,[["Dry gin","40ml"],["Kina Lillet","20ml"],["Dubonnet","3 dashes"]],89),
d("Joburg Cocktail","ヨハネスブルグ","rum",16,[["Bacardi rum","30ml"],["Caperitif","30ml"],["Orange bitters","4 dashes"]],89),
d("Jockey Club Cocktail","ジョッキー・クラブ","gin",26,[["Dry gin","60ml"],["Lemon juice","4 dashes"],["Creme de noyaux","2 dashes"],["Orange bitters","1 dash"],["Angostura bitters","1 dash"]],89),
d("Johnnie Mack Cocktail","ジョニー・マック","gin",18,[["Sloe gin","30ml"],["Orange curaçao","30ml"],["Absinthe","3 dashes"]],90),
d("John Wood Cocktail","ジョン・ウッド","whisky",16,[["Irish whisky","20ml"],["Sweet vermouth","40ml"],["Lemon juice","20ml"],["Kummel","10ml"],["Angostura bitters","1 dash"]],90),
d("J.O.S. Cocktail","J.O.S.カクテル","gin",24,[["Dry gin","20ml"],["Dry vermouth","20ml"],["Sweet vermouth","20ml"],["Brandy","1 dash"],["Lemon juice","1 dash"],["Orange bitters","1 dash"]],90),
d("Journalist Cocktail","ジャーナリスト","gin",26,[["Dry gin","40ml"],["Dry vermouth","10ml"],["Sweet vermouth","10ml"],["Curaçao","2 dashes"],["Lemon juice","2 dashes"],["Angostura bitters","1 dash"]],90),
d("The Judge Jr. Cocktail","ジャッジ・ジュニア","gin",20,[["Gin","30ml"],["Bacardi rum","30ml"],["Lemon juice","7.5ml"],["Powdered sugar","1 tsp"],["Grenadine","1 dash"]],91),
d("Judgette Cocktail","ジャジェット","brandy",22,[["Peach brandy","15ml"],["Gin","30ml"],["Dry vermouth","15ml"],["Lime juice","1 dash"]],91),
d("Jupiter Cocktail","ジュピター","gin",24,[["Dry gin","30ml"],["Dry vermouth","15ml"],["Parfait Amour","5ml"],["Orange juice","5ml"]],91),
d("K.C.B. Cocktail","K.C.B.カクテル","gin",20,[["Dry gin","45ml"],["Kirsch","15ml"],["Apricot brandy","1 dash"],["Lemon juice","1 dash"]],91),
d("Kicker Cocktail","キッカー","rum",24,[["Bacardi rum","40ml"],["Calvados","20ml"],["Sweet vermouth","2 dashes"]],92),
d("Kina Cocktail","キナ・カクテル","gin",25,[["Dry gin","30ml"],["Kina Lillet","30ml"]],92),
d("King Cole Cocktail","キング・コール","whisky",30,[["Rye or Canadian whisky","60ml"],["Simple syrup","2 dashes"],["Fernet-Branca","1 dash"]],92),
d("Knicker Bocker Cocktail","ニッカー・ボッカー","gin",28,[["Dry gin","40ml"],["Dry vermouth","20ml"],["Sweet vermouth","1 dash"]],92)
];
