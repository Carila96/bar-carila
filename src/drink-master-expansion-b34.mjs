export const DRINK_MASTER_EXPANSION_B34_EVIDENCE_VERSION='jp-rarity-expansion-2026-09-09-b34';
export const DRINK_MASTER_EXPANSION_B34_EVALUATED_AT='2026-09-09';
const JP1='https://www.hotpepper.jp/strJ003365641/drink/';
const JP2='https://www.hotpepper.jp/strJ003474302/drink/';
const JP3='https://www.hotpepper.jp/strJ004678153/drink/';
const label=r=>r>=75?'かなり珍しい':r>=55?'珍しい':r>=35?'やや珍しい':'定番寄り';
const methodFor=ings=>ings.some(([n])=>/ginger ale|lemonade|beer|soda/i.test(n))?'炭酸材料以外を氷で十分に冷却してグラスへ注ぎ、最後に炭酸材料を加えて軽くステアする。':ings.some(([n])=>/juice|cream|egg|sugar|grenadine|syrup|pineapple|orange|lime|lemon/i.test(n))?'全材料を氷と十分にシェイクし、冷やした適切なグラスへストレインする。':'全材料を氷と十分にステアし、冷やした適切なグラスへストレインする。';
const special=/Swedish Punch|Pricota|Kola Tonic|Absinthe|Creme de Noyau|Orange-flower|Clove Syrup|Caperitif/i;
const d=(masterKey,nameJa,baseSpirit,availability,ingredients,page,aliases=[])=>({masterKey,nameJa,aliases,category:'cocktail',baseSpirit,drinkKind:'cocktail',availability,rarity:100-availability,rarityLabel:label(100-availability),confidence:.83,rarityReason:`1930 Savoy Cocktail Bookの原典スキャンで実在・標準名称・代表構成を確認。${ingredients.some(([n])=>special.test(n))?'歴史的または専門性の高い副材料を含むため、':''}主要酒材は日本国内で調達可能だが、名称認知度と常備酒材には店差があり、一般BARでの即時提供可能性は限定される。`,shortDescription:`${masterKey}は1930 Savoy Cocktail Bookに収録されるクラシックカクテル。`,orderHint:'名称で通じない場合は主要材料とSavoy系クラシックである旨を添えると確実。',imageQuery:`${masterKey} cocktail`,recipe:{ingredients:ingredients.map(([name,amount])=>({name,amount})),method:methodFor(ingredients)},evidence:[{type:'historical_primary_reference',title:`1930 Savoy Cocktail Book — p.${page}: ${masterKey}`,url:`https://euvs-vintage-cocktail-books.cld.bz/1930-The-Savoy-Cocktail-Book/${page}`,note:'1930年刊行The Savoy Cocktail Bookのデジタル原典スキャンで実在・標準名称・代表レシピを確認。'},{type:'jp_bar_reference',title:'Japanese full-service bar current menu coverage',url:JP1,note:'日本国内BARで主要スピリッツ、ベルモット、果汁、一般リキュール等の現行提供環境を確認。'},{type:'jp_bar_reference',title:'Japanese specialist bar current menu coverage',url:JP2,note:'日本国内でアブサン、シャルトリューズ、キルシュ等を扱う専門BARの現行提供環境を確認。'},{type:'jp_bar_reference',title:'Japanese classic cocktail bar current menu coverage',url:JP3,note:'日本国内BARでクラシックカクテル用酒材を提供する環境を補助確認。'}]});
export const DRINK_MASTER_EXPANSION_B34_CANDIDATES=[
d("Knicker Bocker Special Cocktail","ニッカー・ボッカー・スペシャル","rum",24,[["Raspberry syrup","1 tsp"],["Lemon juice","1 tsp"],["Orange juice","1 tsp"],["Pineapple","1 chunk"],["Rum","45ml"],["Curaçao","2 dashes"]],93),
d("Kola Tonic Cocktail","コーラ・トニック","gin",15,[["Dry gin","40ml"],["Kola tonic","20ml"],["Orange bitters","2 dashes"]],93),
d("Kup's Indispensable Cocktail","クップス・インディスペンサブル","gin",18,[["Absinthe","1 dash"],["Sweet vermouth","20ml"],["Dry vermouth","20ml"],["Dry gin","20ml"]],93),
d("Ladies' Cocktail","レディース・カクテル","whisky",18,[["Absinthe","2 dashes"],["Anisette","2 dashes"],["Angostura bitters","2 dashes"],["Canadian whisky","60ml"]],93),
d("Lasky Cocktail","ラスキー","gin",16,[["Grape juice","7.5ml"],["Swedish Punch","7.5ml"],["Dry gin","45ml"]],94),
d("Lawhill Cocktail","ローヒル","whisky",24,[["Canadian whisky","30ml"],["Grand Marnier","30ml"]],94),
d("Leap-Frog Cocktail","リープ・フロッグ","gin",32,[["Gin","45ml"],["Lemon juice","15ml"],["Ginger ale","top"]],94),
d("Leap Year Cocktail","リープ・イヤー","gin",30,[["Gin","40ml"],["Sweet vermouth","20ml"],["Lemon juice","1 dash"]],94),
d("Leave It To Me Cocktail No. 2","リーブ・イット・トゥ・ミー No.2","gin",20,[["Raspberry syrup","1 tsp"],["Lemon juice","1 tsp"],["Maraschino liqueur","1 dash"],["Dry gin","45ml"]],95),
d("Lemon Pie Cocktail","レモン・パイ","whisky",28,[["Scotch whisky","45ml"],["Lemonade","1 bottle"]],95),
d("L.G. Cocktail","L.G.カクテル","whisky",22,[["Scotch whisky","45ml"],["Beer","45ml chaser"]],95),
d("Liberty Cocktail","リバティ","rum",30,[["Simple syrup","1 dash"],["Bacardi rum","40ml"],["Applejack","20ml"]],95),
d("Lily Cocktail","リリー","gin",20,[["Lemon juice","1 dash"],["Dry gin","40ml"],["Creme de Noyau","20ml"]],95),
d("Charlie Lindbergh Cocktail","チャーリー・リンドバーグ","gin",22,[["Orange juice","2 dashes"],["Apricot liqueur","2 dashes"],["Kina Lillet","30ml"],["Plymouth gin","30ml"]],96),
d("Linstead Cocktail","リンステッド","whisky",18,[["Whisky","90ml"],["Sweetened pineapple juice","90ml"],["Absinthe bitters","1 dash"]],96),
d("Little Princess Cocktail","リトル・プリンセス","rum",28,[["Sweet vermouth","30ml"],["Bacardi rum","30ml"]],96),
d("London Cocktail","ロンドン","gin",30,[["Orange bitters","2 dashes"],["Simple syrup","2 dashes"],["Absinthe","2 dashes"],["Dry gin","60ml"]],97),
d("London Buck Cocktail","ロンドン・バック","gin",34,[["Dry gin","45ml"],["Lemon juice","15ml"],["Ginger ale","top"]],97),
d("Lone Tree Cocktail","ローン・ツリー","gin",28,[["Orange bitters","2 dashes"],["Sweet vermouth","15ml"],["Dry vermouth","15ml"],["Dry gin","30ml"]],97),
d("Lord Suffolk Cocktail","ロード・サフォーク","gin",22,[["Sweet vermouth","15ml"],["Cointreau","15ml"],["Dry gin","22.5ml"],["Maraschino liqueur","7.5ml"]],97),
d("Loud Speaker Cocktail","ラウド・スピーカー","gin",24,[["Lemon juice","7.5ml"],["Cointreau","7.5ml"],["Dry gin","30ml"],["Brandy","15ml"]],98),
d("Lutkins Special Cocktail","ラトキンス・スペシャル","gin",24,[["Orange juice","2 dashes"],["Apricot brandy","2 dashes"],["Dry vermouth","30ml"],["Dry gin","30ml"]],98),
d("Macaroni Cocktail","マカロニ","vermouth",14,[["Sweet vermouth","30ml"],["Absinthe","30ml"]],98),
d("McClelland Cocktail","マクレランド","gin",20,[["Absinthe","1 dash"],["Curaçao","30ml"],["Sloe gin","30ml"]],98),
d("Magnolia Blossom Cocktail","マグノリア・ブロッサム","gin",28,[["Lemon juice","15ml"],["Cream","15ml"],["Gin","30ml"],["Grenadine","1 dash"]],99),
d("Mah-Jongg Cocktail","マージャン","gin",26,[["Cointreau","15ml"],["Bacardi rum","22.5ml"],["Dry gin","22.5ml"]],99),
d("Maiden's Blush Cocktail No. 1","メイデンズ・ブラッシュ No.1","gin",24,[["Lemon juice","1 dash"],["Orange curaçao","4 dashes"],["Grenadine","4 dashes"],["Dry gin","60ml"]],99),
d("Maiden's Blush Cocktail No. 2","メイデンズ・ブラッシュ No.2","gin",16,[["Absinthe","30ml"],["Dry gin","30ml"],["Grenadine","1 tsp"]],99),
d("Maiden's Prayer Cocktail No. 1","メイデンズ・プレイヤー No.1","gin",30,[["Orange juice","7.5ml"],["Lemon juice","7.5ml"],["Cointreau","7.5ml"],["Dry gin","37.5ml"]],99),
d("Marguerite Cocktail","マルグリット","gin",32,[["Orange bitters","1 dash"],["Dry vermouth","20ml"],["Dry gin","40ml"]],101),
d("Marmalade Cocktail","マーマレード","gin",30,[["Orange marmalade","2 dessertspoons"],["Lemon juice","30ml"],["Gin","120ml"]],102),
d("Marny Cocktail","マーニー","gin",32,[["Grand Marnier","15ml"],["Dry gin","45ml"]],102),
d("Martinez Cocktail","マルティネス","gin",34,[["Gin","30ml"],["Dry vermouth","30ml"],["Orange bitters","1 tsp"],["Curaçao or Maraschino","2 tsp"]],102),
d("The Marvel Cocktail","ザ・マーベル","rum",18,[["Jamaica rum","45ml"],["Lemon syrup","7.5ml"],["Grenadine","7.5ml"]],103),
d("Mary Pickford Cocktail","メアリー・ピックフォード","rum",38,[["Bacardi rum","30ml"],["Pineapple juice","30ml"],["Grenadine","1 tsp"],["Maraschino liqueur","6 drops"]],103),
d("Mayfair Cocktail","メイフェア","gin",22,[["Clove syrup","1 dash"],["Apricot brandy","15ml"],["Orange juice","15ml"],["Dry gin","30ml"]],103),
d("Melba Cocktail","メルバ","rum",18,[["Grenadine","2 dashes"],["Absinthe","2 dashes"],["Lemon or lime juice","15ml"],["Bacardi rum","30ml"],["Swedish Punch","15ml"]],104),
d("Melon Cocktail","メロン","gin",26,[["Lemon juice","20ml"],["Maraschino liqueur","20ml"],["Gin","20ml"]],104),
d("Merry Widow Cocktail","メリー・ウィドウ","gin",24,[["Absinthe","2 dashes"],["Angostura bitters","2 dashes"],["Benedictine","2 dashes"],["Dry vermouth","20ml"],["Dry gin","40ml"]],104),
d("Mickie Walker Cocktail","ミッキー・ウォーカー","whisky",30,[["Grenadine","1 dash"],["Lemon juice","1 dash"],["Sweet vermouth","15ml"],["Scotch whisky","45ml"]],104),
d("Mikado Cocktail","ミカド","brandy",22,[["Angostura bitters","2 dashes"],["Creme de Noyau","2 dashes"],["Orgeat syrup","2 dashes"],["Curaçao","2 dashes"],["Brandy","60ml"]],105),
d("Millionaire Cocktail No. 1","ミリオネア No.1","rum",20,[["Lime juice","15ml"],["Grenadine","1 dash"],["Sloe gin","15ml"],["Apricot brandy","15ml"],["Jamaica rum","15ml"]],105),
d("Millionaire Cocktail No. 2","ミリオネア No.2","gin",15,[["Anisette","1 dash"],["Egg white","1"],["Absinthe","20ml"],["Dry gin","40ml"]],105),
d("Million Dollar Cocktail","ミリオン・ダラー","gin",34,[["Pineapple juice","1 tbsp"],["Grenadine","1 tsp"],["Egg white","1"],["Sweet vermouth","15ml"],["Plymouth gin","45ml"]],105),
d("Minnehaha Cocktail","ミネハハ","gin",24,[["Orange juice","15ml"],["Dry vermouth","15ml"],["Sweet vermouth","15ml"],["Dry gin","15ml"]],105),
d("Mint Cocktail","ミント・カクテル","gin",20,[["Fresh mint","several sprigs"],["White wine","90ml"],["White creme de menthe","30ml"],["Gin","60ml"]],106),
d("Mississippi Mule Cocktail","ミシシッピ・ミュール","gin",24,[["Dry gin","40ml"],["Lemon juice","7.5ml"],["Creme de Cassis","15ml"]],106),
d("Mr. Manhattan Cocktail","ミスター・マンハッタン","gin",18,[["Sugar","1 lump"],["Fresh mint","4 leaves"],["Lemon juice","1 dash"],["Orange juice","1 dash"],["Gin","60ml"]],106)
];
