export const DRINK_MASTER_EXPANSION_B39_EVIDENCE_VERSION='jp-rarity-expansion-2026-09-09-b39';
export const DRINK_MASTER_EXPANSION_B39_EVALUATED_AT='2026-09-09';
const JP1='https://www.hotpepper.jp/strJ003365641/drink/';
const JP2='https://www.hotpepper.jp/strJ003474302/drink/';
const JP3='https://www.hotpepper.jp/strJ004678153/drink/';
const SAVOY='https://fliphtml5.com/poevi/rnbd/';
const label=r=>r>=75?'かなり珍しい':r>=55?'珍しい':r>=35?'やや珍しい':'定番寄り';
const special=/Pernod|Absinthe|Swedish Punch|Chartreuse|Benedictine|Bénédictine|Fernet|Apricot Brandy|Kummel|Anisette|Maraschino|Dubonnet|Hercules/i;
const methodFor=ings=>ings.some(([n])=>/soda|syphon/i.test(n))?'炭酸以外を氷で十分に冷却し、グラスへ注いで最後に炭酸を加え軽くステアする。':ings.some(([n])=>/juice|egg|cream|syrup|sugar|grenadine|ice cream/i.test(n))?'全材料を氷と十分にシェイクし、冷やしたグラスへストレインする。':'全材料を氷と十分にステアし、冷やしたグラスへストレインする。';
const d=(masterKey,nameJa,baseSpirit,availability,ingredients,page,aliases=[])=>({masterKey,nameJa,aliases,category:'cocktail',baseSpirit,drinkKind:'cocktail',availability,rarity:100-availability,rarityLabel:label(100-availability),confidence:.81,rarityReason:`1930 Savoy Cocktail Book系原典で実在・名称・代表構成を確認。${ingredients.some(([n])=>special.test(n))?'専門性の高い副材料を含むため、':''}主要材料は日本国内で調達可能だが、名称認知度と常備酒材には店差があり、日本の一般BARでの即時提供可能性は限定される。`,shortDescription:`${masterKey}はSavoy Cocktail Bookに収録されるクラシックカクテル。`,orderHint:'名称で通じない場合は主要材料とSavoy系クラシックである旨を添えると確実。',imageQuery:`${masterKey} cocktail`,recipe:{ingredients:ingredients.map(([name,amount])=>({name,amount})),method:methodFor(ingredients)},evidence:[{type:'historical_primary_reference',title:`The Savoy Cocktail Book — p.${page}: ${masterKey}`,url:SAVOY,note:'Savoy原典デジタル版の該当ページで実在・名称・代表レシピを確認。'},{type:'historical_secondary_reference',title:'The 1930 Savoy Cocktail Book Database',url:'https://savoycocktaildatabase.com/cocktail-index/',note:'Savoy収録名の索引照合と表記確認に使用。'},{type:'jp_bar_reference',title:'Japanese full-service bar current menu coverage',url:JP1,note:'日本国内BARで主要スピリッツ、ベルモット、果汁、一般リキュール等の現行提供環境を確認。'},{type:'jp_bar_reference',title:'Japanese specialist bar current menu coverage',url:JP2,note:'日本国内でアブサン、シャルトリューズ、キルシュ等を扱う専門BARの現行提供環境を確認。'},{type:'jp_bar_reference',title:'Japanese classic cocktail bar current menu coverage',url:JP3,note:'日本国内BARでクラシックカクテル用酒材を提供する環境を補助確認。'}]});
export const DRINK_MASTER_EXPANSION_B39_CANDIDATES=[
d('Washington Cocktail','ワシントン','brandy',20,[['Brandy','20ml'],['French Vermouth','40ml'],['Angostura Bitters','2 dashes'],['Simple Syrup','2 dashes']],171),
d('Waterbury Cocktail','ウォーターベリー','brandy',16,[['Brandy','45ml'],['Lemon or Lime Juice','15ml'],['Powdered Sugar','1/2 tsp'],['Grenadine','2 dashes'],['Egg White','1']],171),
d('Wax Cocktail','ワックス','gin',22,[['Gin','60ml'],['Orange Bitters','3 dashes']],171),
d('Webster Cocktail','ウェブスター','gin',20,[['Gin','30ml'],['French Vermouth','15ml'],['Apricot Brandy','7.5ml'],['Lime Juice','7.5ml']],171),
d('Wedding Belle Cocktail','ウェディング・ベル','gin',19,[['Orange Juice','10ml'],['Cherry Brandy','10ml'],['Dry Gin','20ml'],['Dubonnet','20ml']],171),
d('Weesuer Special Cocktail','ウィーザー・スペシャル','gin',14,[['Pernod','4 dashes'],['French Vermouth','15ml'],['Italian Vermouth','15ml'],['Orange Curaçao','15ml'],['Dry Gin','15ml']],172,['Weesuer Special']),
d('Welcome Stranger Cocktail','ウェルカム・ストレンジャー','brandy',18,[['Grenadine','10ml'],['Lemon Juice','10ml'],['Orange Juice','10ml'],['Gin','10ml'],['Swedish Punch','10ml'],['Brandy','10ml']],172,['Welcome Stranger']),
d('Wembley Cocktail No. 1','ウェンブリー No.1','gin',18,[['Apricot Brandy','1 dash'],['Calvados','2 dashes'],['French Vermouth','20ml'],['Dry Gin','40ml']],172,['Wembley No. 1']),
d('Wembley Cocktail No. 2','ウェンブリー No.2','whisky',18,[['Scotch Whisky','20ml'],['French Vermouth','20ml'],['Pineapple Juice','20ml']],172,['Wembley No. 2']),
d('Westbrook Cocktail','ウェストブルック','gin',15,[['Gin','35ml'],['Italian Vermouth','15ml'],['Whisky','10ml'],['Castor Sugar','small amount']],172,['Westbrook']),
d('Western Rose Cocktail','ウェスタン・ローズ','gin',19,[['Lemon Juice','1 dash'],['French Vermouth','15ml'],['Apricot Brandy','15ml'],['Dry Gin','30ml']],173,['Western Rose']),
d('West Indian Cocktail','ウェスト・インディアン','gin',18,[['Sugar','1 tsp'],['Angostura Bitters','4 dashes'],['Lemon Juice','1 tsp'],['Gin','60ml']],173,['West Indian']),
d('Which Way Cocktail','ウィッチ・ウェイ','brandy',13,[['Pernod','20ml'],['Anisette','20ml'],['Brandy','20ml']],173,['Which Way']),
d('Whip Cocktail','ウィップ','brandy',16,[['Pernod','1 dash'],['Curaçao','3 dashes'],['French Vermouth','15ml'],['Italian Vermouth','15ml'],['Brandy','30ml']],173,['Whip']),
d('Whisky Cocktail','ウイスキー・カクテル','whisky',40,[['Canadian Whisky','60ml'],['Angostura Bitters','1 dash'],['Simple Syrup','4 dashes']],173),
d('Whisky Special Cocktail','ウイスキー・スペシャル','whisky',15,[['Whisky','35ml'],['French Vermouth','20ml'],['Orange Juice','5ml'],['Nutmeg','pinch']],174,['Whisky Special']),
d('Whisper Cocktail','ウィスパー','whisky',16,[['Whisky','20ml'],['French Vermouth','20ml'],['Italian Vermouth','20ml']],174,['Whisper']),
d('Whist Cocktail','ウィスト','brandy',15,[['Rum','15ml'],['Italian Vermouth','15ml'],['Calvados','30ml']],174,['Whist']),
d('White Baby Cocktail','ホワイト・ベイビー','gin',19,[['Gin','30ml'],['Cointreau','15ml'],['Lemon Syrup','15ml']],174,['White Baby']),
d('White Cargo Cocktail','ホワイト・カーゴ','gin',28,[['Vanilla Ice Cream','30ml'],['Gin','30ml']],175,['White Cargo']),
d('White Cocktail','ホワイト・カクテル','gin',18,[['Dry Gin','60ml'],['Anisette','2 tsp'],['Orange Bitters','2 dashes']],175),
d('White Lady Cocktail','ホワイト・レディ','gin',65,[['Lemon Juice','15ml'],['Cointreau','15ml'],['Dry Gin','30ml']],175,['White Lady']),
d('White Lily Cocktail','ホワイト・リリー','gin',23,[['Cointreau','20ml'],['Rum','20ml'],['Gin','20ml'],['Pernod','1 dash']],176,['White Lily']),
d('White Plush Cocktail','ホワイト・プラッシュ','gin',17,[['Dry Gin','45ml'],['Maraschino','15ml'],['Milk','120ml']],176,['White Plush']),
d('White Rose Cocktail','ホワイト・ローズ','gin',26,[['Orange Juice','10ml'],['Lemon or Lime Juice','10ml'],['Egg White','1'],['Maraschino','15ml'],['Dry Gin','25ml']],176,['White Rose']),
d('White Wings Cocktail','ホワイト・ウィングス','gin',20,[['White Crème de Menthe','20ml'],['Dry Gin','40ml']],176,['White Wings']),
d('Whizz-Doodle Cocktail','ウィズ・ドゥードル','whisky',15,[['Scotch Whisky','15ml'],['Sweet Cream','15ml'],['Crème de Cacao','15ml'],['Dry Gin','15ml']],176,['Whizz Doodle']),
d('Whizz-Bang Cocktail','ウィズ・バング','whisky',17,[['Pernod','2 dashes'],['Grenadine','2 dashes'],['Orange Bitters','2 dashes'],['French Vermouth','20ml'],['Scotch Whisky','40ml']],177,['Whizz Bang']),
d("Widow's Dream Cocktail",'ウィドウズ・ドリーム','liqueur',12,[['Egg','1'],['Bénédictine','30ml'],['Cream','top']],177,["Widow's Dream"]),
d("Widow's Kiss Cocktail",'ウィドウズ・キス','brandy',24,[['Angostura Bitters','1 dash'],['Chartreuse','15ml'],['Bénédictine','15ml'],['Calvados','30ml']],177,["Widow's Kiss"]),
d('Willie Smith Cocktail','ウィリー・スミス','brandy',15,[['Lemon Juice','1 dash'],['Maraschino','20ml'],['Brandy','40ml']],177,['Willie Smith']),
d('Will Rogers Cocktail','ウィル・ロジャース','gin',18,[['Orange Juice','15ml'],['French Vermouth','15ml'],['Plymouth Gin','30ml'],['Curaçao','4 dashes']],177,['Will Rogers']),
d('Windy Corner Cocktail','ウィンディ・コーナー','brandy',13,[['Blackberry Brandy','60ml'],['Nutmeg','pinch']],177,['Windy Corner']),
d('Wow Cocktail','ワウ','brandy',12,[['Rum','15ml'],['Hercules','15ml'],['Calvados','15ml'],['Brandy','15ml']],178,['Wow']),
d('Wyoming Swing Cocktail','ワイオミング・スイング','vermouth',18,[['Orange Juice','15ml'],['Powdered Sugar','1/2 tsp'],['French Vermouth','30ml'],['Italian Vermouth','30ml'],['Soda Water','top']],178,['Wyoming Swing']),
d('Xanthia Cocktail','ザンシア','gin',25,[['Cherry Brandy','20ml'],['Yellow Chartreuse','20ml'],['Dry Gin','20ml']],178,['Xanthia']),
d('Xeres Cocktail','ヘレス','sherry',20,[['Orange Bitters','1 dash'],['Peach Bitters','1 dash'],['Sherry','60ml']],178,['Xeres']),
d('X.Y.Z. Cocktail','エックス・ワイ・ゼット','rum',30,[['Lemon Juice','15ml'],['Cointreau','15ml'],['Rum','30ml']],178,['XYZ Cocktail','X Y Z Cocktail']),
d('Yale Cocktail','イェール','gin',30,[['Orange Bitters','3 dashes'],['Angostura Bitters','1 dash'],['Dry Gin','60ml'],['Soda Water','splash']],179,['Yale']),
d('Yellow Daisy Cocktail','イエロー・デイジー','gin',24,[['Gin','24ml'],['French Vermouth','24ml'],['Grand Marnier','12ml'],['Pernod','1 dash']],179,['Yellow Daisy']),
d('Yellow Parrot Cocktail','イエロー・パロット','liqueur',14,[['Pernod','20ml'],['Yellow Chartreuse','20ml'],['Apricot Brandy','20ml']],179,['Yellow Parrot']),
d('Yellow Rattler Cocktail','イエロー・ラトラー','gin',17,[['Orange Juice','15ml'],['French Vermouth','15ml'],['Italian Vermouth','15ml'],['Dry Gin','15ml']],179,['Yellow Rattler']),
d('Yodel Cocktail','ヨーデル','liqueur',14,[['Orange Juice','30ml'],['Fernet Branca','30ml'],['Soda Water','top']],180,['Yodel']),
d('Yokohama Cocktail','ヨコハマ','gin',35,[['Pernod','1 dash'],['Grenadine','10ml'],['Vodka','10ml'],['Orange Juice','20ml'],['Dry Gin','20ml']],180,['Yokohama']),
d('Yolanda Cocktail','ヨランダ','brandy',15,[['Grenadine','1 dash'],['Pernod','1 dash'],['Dry Gin','15ml'],['Italian Vermouth','30ml'],['Brandy','15ml']],180,['Yolanda']),
d('York Special Cocktail','ヨーク・スペシャル','vermouth',16,[['Orange Bitters','4 dashes'],['Maraschino','15ml'],['French Vermouth','45ml']],180,['York Special']),
d('Young Man Cocktail','ヤング・マン','brandy',18,[['Angostura Bitters','1 dash'],['Curaçao','2 dashes'],['Italian Vermouth','15ml'],['Brandy','45ml']],180,['Young Man']),
d('Zanzibar Cocktail','ザンジバル','gin',13,[['Lemon Juice','15ml'],['Gin','15ml'],['French Vermouth','30ml'],['Sugar Syrup','1 dessertspoon']],181,['Zanzibar']),
d('Zaza Cocktail','ザザ','gin',28,[['Dubonnet','30ml'],['Dry Gin','30ml']],181,['Zaza'])
];
