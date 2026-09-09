export const DRINK_MASTER_EXPANSION_B38_EVIDENCE_VERSION='jp-rarity-expansion-2026-09-09-b38';
export const DRINK_MASTER_EXPANSION_B38_EVALUATED_AT='2026-09-09';
const JP1='https://www.hotpepper.jp/strJ003365641/drink/';
const JP2='https://www.hotpepper.jp/strJ003474302/drink/';
const JP3='https://www.hotpepper.jp/strJ004678153/drink/';
const SAVOY_DB='https://savoycocktaildatabase.com/cocktail-index/';
const label=r=>r>=75?'かなり珍しい':r>=55?'珍しい':r>=35?'やや珍しい':'定番寄り';
const methodFor=(ings,layered=false,hot=false)=>hot?'卵と糖をよく合わせ、酒類を加えてから熱湯で満たし、必要に応じてナツメグを添える。':layered?'材料を比重の重い順に静かに重ね、層を保って仕上げる。':ings.some(([n])=>/soda water|champagne|ginger ale/i.test(n))?'炭酸材料以外を十分に冷却してグラスへ注ぎ、最後に炭酸材料を加えて軽くステアする。':ings.some(([n])=>/juice|egg|sugar|grenadine|syrup|cream|orange slice/i.test(n))?'全材料を氷と十分にシェイクし、冷やした適切なグラスへストレインする。':'全材料を氷と十分にステアし、冷やした適切なグラスへストレインする。';
const special=/Absinthe|Swedish Punch|Hercules|Caperitif|Forbidden Fruit|Parfait Amour|Green Chartreuse|Chartreuse|Apricot Brandy|Kirsch|Dubonnet/i;
const d=(masterKey,nameJa,baseSpirit,availability,ingredients,page,aliases=[],opts={})=>({masterKey,nameJa,aliases,category:'cocktail',baseSpirit,drinkKind:'cocktail',availability,rarity:100-availability,rarityLabel:label(100-availability),confidence:.81,rarityReason:`1930 Savoy Cocktail Book原典で実在・名称・代表構成を確認。${ingredients.some(([n])=>special.test(n))?'歴史的または専門性の高い副材料を含み、':''}主要酒材は日本国内で調達可能だが、名称認知度と常備酒材には店差があり、日本の一般BARでの即時提供可能性は限定される。`,shortDescription:`${masterKey}は1930 Savoy Cocktail Bookに収録されるクラシックカクテル。`,orderHint:'名称で通じない場合は主要材料とSavoy系クラシックである旨を添えると確実。',imageQuery:`${masterKey} cocktail`,recipe:{ingredients:ingredients.map(([name,amount])=>({name,amount})),method:methodFor(ingredients,opts.layered,opts.hot)},evidence:[{type:'historical_primary_reference',title:`1930 Savoy Cocktail Book — p.${page}: ${masterKey}`,url:`https://euvs-vintage-cocktail-books.cld.bz/1930-The-Savoy-Cocktail-Book/${page}`,note:'1930年刊行The Savoy Cocktail Bookのデジタル原典で実在・標準名称・代表レシピを確認。'},{type:'historical_secondary_reference',title:'The 1930 Savoy Cocktail Book Database',url:SAVOY_DB,note:'Savoy収録名の索引照合と表記確認に使用。'},{type:'jp_bar_reference',title:'Japanese full-service bar current menu coverage',url:JP1,note:'日本国内BARで主要スピリッツ、ベルモット、果汁、一般リキュール等の現行提供環境を確認。'},{type:'jp_bar_reference',title:'Japanese specialist bar current menu coverage',url:JP2,note:'日本国内でアブサン、シャルトリューズ、キルシュ等を扱う専門BARの現行提供環境を確認。'},{type:'jp_bar_reference',title:'Japanese classic cocktail bar current menu coverage',url:JP3,note:'日本国内BARでクラシックカクテル用酒材を提供する環境を補助確認。'}]});
export const DRINK_MASTER_EXPANSION_B38_CANDIDATES=[
d('Sweet Patootie Cocktail','スイート・パトゥーティー','gin',24,[['Orange Juice','15ml'],['Cointreau','15ml'],['Dry Gin','30ml']],158,['Sweet Patootie']),
d('Swizzles Cocktail','スウィズルズ','gin',31,[['Gin','60ml'],['Lime Juice','30ml'],['Sugar','1 tsp'],['Angostura Bitters','1 dash']],158,['Swizzles']),
d('Temptation Cocktail','テンプテーション','whisky',22,[['Canadian Club Whisky','60ml'],['Curaçao','2 dashes'],['Absinthe','2 dashes'],['Dubonnet','2 dashes']],159,['Temptation']),
d('Tempter Cocktail','テンプター','wine',20,[['Port Wine','30ml'],['Apricot Brandy','30ml']],159,['Tempter']),
d('Third Degree Cocktail','サード・ディグリー','gin',26,[['Plymouth Gin','40ml'],['Dry Vermouth','20ml'],['Absinthe','4 dashes']],159,['Third Degree']),
d('Third Rail Cocktail No. 1','サード・レール No.1','vermouth',18,[['Dry Vermouth','60ml'],['White Crème de Menthe','1 dash'],['Curaçao','1 dash']],159,['Third Rail No. 1']),
d('Third Rail Cocktail No. 2','サード・レール No.2','brandy',20,[['Bacardi Rum','20ml'],['Calvados or Apple Brandy','20ml'],['Brandy','20ml'],['Absinthe','1 dash']],159,['Third Rail No. 2']),
d('Thistle Cocktail','シスル','whisky',29,[['Scotch Whisky','30ml'],['Sweet Vermouth','30ml'],['Angostura Bitters','2 dashes']],160,['Thistle']),
d('Three Stripes Cocktail','スリー・ストライプス','gin',20,[['Dry Gin','40ml'],['Dry Vermouth','20ml'],['Orange','3 slices']],160,['Three Stripes']),
d('Thunder Cocktail','サンダー','brandy',19,[['Brandy','60ml'],['Egg Yolk','1'],['Gomme Syrup','1 tsp'],['Cayenne Pepper','pinch']],160,['Thunder']),
d('Thunder and Lightning Cocktail','サンダー・アンド・ライトニング','brandy',17,[['Brandy','60ml'],['Egg Yolk','1'],['Powdered Sugar','1 tsp'],['Cayenne Pepper','pinch']],160,['Thunder and Lightning']),
d('Thunder Clap Cocktail','サンダー・クラップ','other',14,[['Brandy','20ml'],['Gin','20ml'],['Whisky','20ml']],161,['Thunder Clap']),
d('Tinton Cocktail','ティントン','brandy',18,[['Port Wine','20ml'],['Applejack or Calvados','40ml']],161,['Tinton']),
d('Tipperary Cocktail No. 1','ティペラリー No.1','whisky',39,[['Irish Whisky','20ml'],['Sweet Vermouth','20ml'],['Green Chartreuse','20ml']],161,['Tipperary No. 1']),
d('T.N.T. Cocktail','T.N.T.','whisky',18,[['Canadian Club Whisky','40ml'],['Absinthe','20ml']],161,['TNT Cocktail','TNT']),
d("Toddy's Cocktail",'トディーズ・カクテル','other',28,[['Spirit of choice','60ml'],['Sugar','1 lump'],['Water','small amount']],161,["Toddy's"]),
d('Tom and Jerry','トム・アンド・ジェリー','brandy',48,[['Egg','1'],['Jamaica Rum','30ml'],['Brandy','30ml'],['Powdered Sugar','1 tbsp'],['Boiling Water','top']],162,[],{hot:true}),
d('Torpedo Cocktail','トーピード','brandy',18,[['Brandy','20ml'],['Calvados','40ml'],['Gin','1 dash']],162,['Torpedo']),
d('Transvaal Cocktail','トランスヴァール','gin',17,[['Gin','40ml'],['Caperitif','20ml'],['Orange Bitters','3 dashes']],162,['Transvaal']),
d('Trilby Cocktail No. 1','トリルビー No.1','gin',24,[['Dry Gin','40ml'],['Sweet Vermouth','20ml'],['Orange Bitters','3 dashes']],162,['Trilby No. 1']),
d('Trilby Cocktail No. 2','トリルビー No.2','whisky',16,[['Scotch Whisky','30ml'],['Sweet Vermouth','15ml'],['Parfait Amour','15ml'],['Absinthe','2 dashes'],['Orange Bitters','2 dashes']],163,['Trilby No. 2']),
d('Trinity Cocktail','トリニティ','gin',27,[['Dry Gin','20ml'],['Dry Vermouth','20ml'],['Sweet Vermouth','20ml']],163,['Trinity']),
d('Trocadero Cocktail','トロカデロ','vermouth',17,[['Dry Vermouth','30ml'],['Sweet Vermouth','30ml'],['Orange Bitters','1 dash'],['Grenadine','1 dash']],163,['Trocadero']),
d('Tropical Cocktail','トロピカル','vermouth',16,[['Dry Vermouth','30ml'],['Crème de Cacao','15ml'],['Maraschino Liqueur','15ml'],['Angostura Bitters','1 dash'],['Orange Bitters','1 dash']],163,['Tropical']),
d('Tulip Cocktail','チューリップ','brandy',20,[['Lemon Juice','15ml'],['Apricot Brandy','15ml'],['Sweet Vermouth','15ml'],['Calvados or Apple Brandy','15ml']],163,['Tulip']),
d('Turf Cocktail','ターフ','gin',24,[['Plymouth Gin','30ml'],['Dry Vermouth','30ml'],['Orange Bitters','2 dashes'],['Maraschino Liqueur','2 dashes'],['Absinthe','2 dashes']],164,['Turf']),
d('Tuxedo Cocktail No. 1','タキシード No.1','gin',46,[['Dry Gin','30ml'],['Dry Vermouth','30ml'],['Absinthe','2 dashes']],164,['Tuxedo No. 1']),
d('Tuxedo Cocktail No. 2','タキシード No.2','gin',37,[['Dry Gin','30ml'],['Dry Vermouth','30ml'],['Maraschino Liqueur','1 dash'],['Absinthe','1 dash'],['Orange Bitters','2 dashes']],164,['Tuxedo No. 2']),
d('Twin Six Cocktail','ツイン・シックス','gin',16,[['Dry Gin','30ml'],['Sweet Vermouth','20ml'],['Egg White','1'],['Orange Juice','4 dashes'],['Grenadine','1 dash']],164,['Twin Six']),
d('Ulanda Cocktail','ウランダ','gin',16,[['Dry Gin','40ml'],['Cointreau','20ml'],['Absinthe','1 dash']],165,['Ulanda']),
d('Union Jack','ユニオン・ジャック','liqueur',13,[['Grenadine','20ml'],['Maraschino Liqueur','20ml'],['Green Chartreuse','20ml']],165,[],{layered:true}),
d('Upstairs Cocktail','アップステアーズ','wine',24,[['Dubonnet','60ml'],['Lemon Juice','30ml'],['Soda Water','top']],165,['Upstairs']),
d('Up-to-Date Cocktail','アップ・トゥ・デート','whisky',22,[['Canadian Club Whisky','30ml'],['Sherry','30ml'],['Grand Marnier','2 dashes'],['Angostura Bitters','2 dashes']],165,['Up to Date Cocktail','Up-to-Date']),
d('Valencia Cocktail No. 1','ヴァレンシア No.1','liqueur',31,[['Apricot Brandy','40ml'],['Orange Juice','20ml'],['Orange Bitters','4 dashes']],165,['Valencia No. 1']),
d('Valencia Cocktail No. 2','ヴァレンシア No.2','wine',23,[['Apricot Brandy','40ml'],['Orange Juice','20ml'],['Orange Bitters','4 dashes'],['Champagne','top']],165,['Valencia No. 2']),
d('Vanderbilt Cocktail','ヴァンダービルト','brandy',19,[['Brandy','40ml'],['Cherry Brandy','20ml'],['Simple Syrup','3 dashes'],['Angostura Bitters','2 dashes']],166,['Vanderbilt']),
d('Van Dusen Cocktail','ヴァン・デューセン','gin',20,[['Dry Gin','40ml'],['Dry Vermouth','20ml'],['Grand Marnier','2 dashes']],166,['Van Dusen']),
d('Velocity Cocktail','ヴェロシティ','gin',21,[['Dry Gin','40ml'],['Sweet Vermouth','20ml'],['Orange','1 slice']],166,['Velocity']),
d('Vermouth Cocktail','ベルモット・カクテル','vermouth',43,[['Sweet or Dry Vermouth','60ml'],['Orange or Angostura Bitters','4 dashes']],167),
d('Vermouth and Cassis Cocktail','ベルモット・アンド・カシス','vermouth',35,[['Dry Vermouth','45ml'],['Crème de Cassis','15ml'],['Soda Water','top']],167,['Vermouth Cassis']),
d('Vermouth and Curaçao Cocktail','ベルモット・アンド・キュラソー','vermouth',28,[['Dry Vermouth','45ml'],['Curaçao','15ml'],['Soda Water','top']],167,['Vermouth Curacao Cocktail']),
d('Victory Cocktail','ヴィクトリー','absinthe',14,[['Grenadine','30ml'],['Absinthe','30ml'],['Soda Water','top']],167,['Victory']),
d('Vie Rose Cocktail','ヴィ・ローズ','gin',18,[['Dry Gin','30ml'],['Kirsch','15ml'],['Lemon Juice','10ml'],['Grenadine','5ml']],168,['Vie Rose']),
d('Virgin Cocktail','ヴァージン','gin',16,[['Dry Gin','20ml'],['Forbidden Fruit Liqueur','20ml'],['White Crème de Menthe','20ml']],168,['Virgin']),
d('Volstead Cocktail','ヴォルステッド','liqueur',13,[['Hercules','30ml'],['Orange Juice','20ml'],['Lime Juice','10ml']],168,['Volstead']),
d("Warday's Cocktail",'ウォーデイズ','gin',18,[['Dry Gin','20ml'],['Calvados or Apple Brandy','20ml'],['Sweet Vermouth','15ml'],['Chartreuse','1 tsp']],169,["Warday's"]),
d('Ward Eight Cocktail','ワード・エイト','whisky',52,[['Rye Whisky','30ml'],['Orange Juice','15ml'],['Lemon Juice','10ml'],['Grenadine','1 tsp']],169,['Ward Eight']),
d('Warden Cocktail','ウォーデン','gin',16,[['Dry Gin','20ml'],['Dry Vermouth','20ml'],['Hercules','20ml']],169,['Warden']),
d("Ward's Cocktail",'ウォーズ・カクテル','brandy',14,[['Chartreuse','30ml'],['Brandy','30ml']],169,["Ward's"],{layered:true}),
d('Waldorf Cocktail','ウォルドルフ','gin',19,[['Dry Gin','40ml'],['Swedish Punch','15ml'],['Lemon or Lime Juice','15ml']],169,['Waldorf'])
];
