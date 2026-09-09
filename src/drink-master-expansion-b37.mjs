export const DRINK_MASTER_EXPANSION_B37_EVIDENCE_VERSION='jp-rarity-expansion-2026-09-09-b37';
export const DRINK_MASTER_EXPANSION_B37_EVALUATED_AT='2026-09-09';
const JP1='https://www.hotpepper.jp/strJ003365641/drink/';
const JP2='https://www.hotpepper.jp/strJ003474302/drink/';
const JP3='https://www.hotpepper.jp/strJ004678153/drink/';
const SAVOY_DB='https://savoycocktaildatabase.com/cocktail-index/';
const label=r=>r>=75?'かなり珍しい':r>=55?'珍しい':r>=35?'やや珍しい':'定番寄り';
const methodFor=(ings,layered=false)=>layered?'材料を比重の重い順に静かに重ね、層を保って仕上げる。':ings.some(([n])=>/ginger ale|soda water|lemon soda|lemonade|champagne/i.test(n))?'炭酸材料以外を十分に冷却してグラスへ注ぎ、最後に炭酸材料を加えて軽くステアする。':ings.some(([n])=>/juice|cream|egg|sugar|grenadine|syrup|mint|pineapple/i.test(n))?'全材料を氷と十分にシェイクし、冷やした適切なグラスへストレインする。':'全材料を氷と十分にステアし、冷やした適切なグラスへストレインする。';
const special=/Caperitif|Kina Lillet|Absinthe|Swedish Punch|Kummel|Quinquina|Creme de Violette|Green Chartreuse|Benedictine|Sirop-de-citron/i;
const d=(masterKey,nameJa,baseSpirit,availability,ingredients,page,aliases=[],layered=false)=>({masterKey,nameJa,aliases,category:'cocktail',baseSpirit,drinkKind:'cocktail',availability,rarity:100-availability,rarityLabel:label(100-availability),confidence:.81,rarityReason:`1930 Savoy Cocktail Book原典で実在・名称・代表構成を確認。${ingredients.some(([n])=>special.test(n))?'歴史的または専門性の高い副材料を含み、':''}主要酒材は日本国内で調達可能だが、名称認知度と常備酒材には店差があり、日本の一般BARでの即時提供可能性は限定される。`,shortDescription:`${masterKey}は1930 Savoy Cocktail Bookに収録されるクラシックカクテル。`,orderHint:'名称で通じない場合は主要材料とSavoy系クラシックである旨を添えると確実。',imageQuery:`${masterKey} cocktail`,recipe:{ingredients:ingredients.map(([name,amount])=>({name,amount})),method:methodFor(ingredients,layered)},evidence:[{type:'historical_primary_reference',title:`1930 Savoy Cocktail Book — p.${page}: ${masterKey}`,url:`https://euvs-vintage-cocktail-books.cld.bz/1930-The-Savoy-Cocktail-Book/${page}`,note:'1930年刊行The Savoy Cocktail Bookのデジタル原典で実在・標準名称・代表レシピを確認。'},{type:'historical_secondary_reference',title:'The 1930 Savoy Cocktail Book Database',url:SAVOY_DB,note:'Savoy収録名の索引照合と表記確認に使用。'},{type:'jp_bar_reference',title:'Japanese full-service bar current menu coverage',url:JP1,note:'日本国内BARで主要スピリッツ、ベルモット、果汁、一般リキュール等の現行提供環境を確認。'},{type:'jp_bar_reference',title:'Japanese specialist bar current menu coverage',url:JP2,note:'日本国内でアブサン、シャルトリューズ、キルシュ等を扱う専門BARの現行提供環境を確認。'},{type:'jp_bar_reference',title:'Japanese classic cocktail bar current menu coverage',url:JP3,note:'日本国内BARでクラシックカクテル用酒材を提供する環境を補助確認。'}]});
export const DRINK_MASTER_EXPANSION_B37_CANDIDATES=[
d('Saucy Sue Cocktail','ソーシー・スー','brandy',19,[['Calvados','30ml'],['Brandy','30ml'],['Apricot Brandy','1 dash'],['Absinthe','1 dash']],141,['Saucy Sue']),
d('Saratoga Cocktail','サラトガ','brandy',28,[['Brandy','60ml'],['Maraschino Liqueur','2 dashes'],['Angostura Bitters','2 dashes'],['Pineapple','1/4 slice'],['Soda Water','top']],141),
d('Sand-Martin Cocktail','サンド・マーティン','gin',18,[['Dry Gin','30ml'],['Sweet Vermouth','30ml'],['Green Chartreuse','1 tsp']],141,['Sand Martin Cocktail']),
d('Savoy Hotel Cocktail','サヴォイ・ホテル・カクテル','brandy',19,[['Crème de Cacao','20ml'],['Bénédictine','20ml'],['Brandy','20ml']],142,[],true),
d('Savoy Hotel Special No. 1','サヴォイ・ホテル・スペシャル No.1','gin',17,[['Dry Gin','40ml'],['Dry Vermouth','20ml'],['Orange Bitters','2 dashes']],142),
d('Savoy Hotel Special No. 2','サヴォイ・ホテル・スペシャル No.2','gin',18,[['Plymouth Gin','40ml'],['Dry Vermouth','20ml'],['Dubonnet Rouge','2 dashes']],143),
d('Savoy Tango Cocktail','サヴォイ・タンゴ','brandy',23,[['Applejack or Calvados','30ml'],['Sloe Gin','30ml']],143,['Savoy Tango']),
d('Sazerac Cocktail','サゼラック','whisky',48,[['Rye Whiskey','60ml'],['Sugar','1 tsp'],['Peychaud’s Bitters','3 dashes'],['Absinthe','rinse']],143,['Sazerac']),
d('Scoff-Law Cocktail','スコフロー','whisky',32,[['Canadian Whisky','20ml'],['Dry Vermouth','20ml'],['Lemon Juice','10ml'],['Grenadine','10ml'],['Orange Bitters','1 dash']],143,['Scofflaw Cocktail','Scoff-Law']),
d('Self-Starter Cocktail','セルフ・スターター','gin',24,[['Dry Gin','30ml'],['Kina Lillet or Cocchi Americano','22.5ml'],['Apricot Brandy','7.5ml'],['Absinthe','2 dashes']],144,['Self Starter Cocktail']),
d('September Morn Cocktail','セプテンバー・モーン','rum',22,[['Bacardi Rum','60ml'],['Lime Juice','1/2 lime'],['Grenadine','1 tbsp'],['Egg White','1']],145,['September Morn']),
d('Seventh Heaven Cocktail No. 1','セブンス・ヘブン No.1','gin',16,[['Dry Gin','30ml'],['Caperitif','30ml'],['Maraschino Liqueur','2 dashes'],['Angostura Bitters','1 dash']],145,['Seventh Heaven No. 1']),
d('Seventh Heaven Cocktail No. 2','セブンス・ヘブン No.2','gin',26,[['Dry Gin','45ml'],['Maraschino Liqueur','15ml'],['Grapefruit Juice','1 tbsp'],['Fresh Mint','1 sprig']],145,['Seventh Heaven No. 2']),
d('Shamrock Cocktail','シャムロック','whisky',19,[['Irish Whiskey','30ml'],['Dry Vermouth','30ml'],['Green Chartreuse','3 dashes'],['Green Crème de Menthe','3 dashes']],146,['Shamrock']),
d('Sherry Cocktail','シェリー・カクテル','sherry',31,[['Sherry','60ml'],['Orange Bitters','4 dashes'],['Dry Vermouth','4 dashes']],146),
d('Sherry and Egg','シェリー・アンド・エッグ','sherry',18,[['Sherry','60ml'],['Whole Egg','1']],147),
d('Sherry Twist No. 1','シェリー・ツイスト No.1','sherry',16,[['Sherry','45ml'],['Brandy','15ml'],['Dry Vermouth','15ml'],['Cointreau','10ml'],['Lemon Juice','5ml'],['Cinnamon','pinch']],147),
d('Sidecar Cocktail','サイドカー','brandy',66,[['Brandy','30ml'],['Cointreau','15ml'],['Lemon Juice','15ml']],147,['Sidecar']),
d('Silver Bullet Cocktail','シルバー・ブレット','gin',28,[['Dry Gin','30ml'],['Kummel','15ml'],['Lemon Juice','15ml']],148,['Silver Bullet']),
d('Sleepy Head Cocktail','スリーピー・ヘッド','brandy',23,[['Brandy','45ml'],['Fresh Mint','4 leaves'],['Orange Peel','1 piece'],['Ginger Ale','top']],149,['Sleepy Head']),
d('Sloe Gin Cocktail','スロー・ジン・カクテル','gin',39,[['Sloe Gin','30ml'],['Dry Vermouth','15ml'],['Sweet Vermouth','15ml']],149),
d('Smiler Cocktail','スマイラー','gin',21,[['Dry Gin','30ml'],['Dry Vermouth','15ml'],['Sweet Vermouth','15ml'],['Orange Juice','1 dash'],['Angostura Bitters','1 dash']],149,['Smiler']),
d('Snicker Cocktail','スニッカー','gin',17,[['Dry Gin','40ml'],['Dry Vermouth','20ml'],['Egg White','1'],['Maraschino Liqueur','2 dashes'],['Simple Syrup','1 tsp'],['Orange Bitters','1 dash']],150,['Snicker']),
d('Snowball Cocktail','スノーボール・カクテル','gin',17,[['Dry Gin','12ml'],['Crème de Violette','12ml'],['White Crème de Menthe','12ml'],['Anisette','12ml'],['Sweet Cream','12ml']],150),
d('Soda Cocktail','ソーダ・カクテル','other',21,[['Sugar Cube','1'],['Angostura Bitters','4 dashes'],['Lemon Soda or Lemonade','top']],150,['Soda']),
d('Some Moth Cocktail','サム・モス','gin',16,[['Plymouth Gin','40ml'],['Dry Vermouth','20ml'],['Absinthe','1 dash'],['Pearl Onion','1']],150,['Some Moth']),
d('Sonora Cocktail','ソノラ','rum',20,[['Applejack or Calvados','30ml'],['Bacardi Rum','30ml'],['Apricot Brandy','2 dashes'],['Lemon Juice','1 dash']],151,['Sonora']),
d('So-So Cocktail','ソー・ソー','gin',17,[['Dry Gin','20ml'],['Sweet Vermouth','20ml'],['Calvados','10ml'],['Grenadine','10ml']],151,['So So Cocktail']),
d('Southern Gin Cocktail','サザン・ジン','gin',24,[['Dry Gin','60ml'],['Orange Curaçao','2 dashes'],['Orange Bitters','2 dashes']],152,['Southern Gin']),
d('South Side Cocktail','サウス・サイド','gin',55,[['Dry Gin','60ml'],['Lemon Juice','30ml'],['Powdered Sugar','1/2 tbsp'],['Fresh Mint','2 sprigs'],['Soda Water','top']],152,['South Side','Southside']),
d('Soyer-au-Champagne','ソワイエ・オー・シャンパーニュ','wine',14,[['Vanilla Ice Cream','1 liqueur glass'],['Maraschino Liqueur','2 dashes'],['Orange Curaçao','2 dashes'],['Brandy','2 dashes'],['Champagne','top']],152,['Soyer au Champagne']),
d('Spanish Town Cocktail','スパニッシュ・タウン','rum',18,[['Rum','60ml'],['Orange Curaçao','1 dessertspoon'],['Nutmeg','pinch']],152,['Spanish Town']),
d('Spencer Cocktail','スペンサー','gin',21,[['Dry Gin','45ml'],['Apricot Brandy','15ml'],['Orange Juice','1 dash'],['Angostura Bitters','1 dash']],153,['Spencer']),
d('Spion Kop Cocktail','スピオン・コップ','vermouth',14,[['Dry Vermouth','30ml'],['Caperitif','30ml']],153,['Spion Kop']),
d('Spring Cocktail','スプリング','gin',18,[['Dry Gin','36ml'],['Quinquina','12ml'],['Bénédictine','12ml'],['Bitters','1 dash'],['Olive','1']],153,['Spring']),
d('Spring Feeling Cocktail','スプリング・フィーリング','gin',28,[['Plymouth Gin','20ml'],['Green Chartreuse','20ml'],['Lemon Juice','20ml']],153,['Spring Feeling']),
d('Stars and Stripes Cocktail','スターズ・アンド・ストライプス','liqueur',16,[['Crème de Cassis','20ml'],['Maraschino Liqueur','20ml'],['Green Chartreuse','20ml']],154,['Stars and Stripes'],true),
d('Stinger Cocktail','スティンガー','brandy',58,[['Brandy','45ml'],['White Crème de Menthe','15ml']],154,['Stinger']),
d('Stone Fence Cocktail','ストーン・フェンス','whisky',36,[['Scotch Whisky','60ml'],['Angostura Bitters','2 dashes'],['Soda Water','top']],155,['Stone Fence']),
d('Straight Law Cocktail','ストレート・ロー','gin',18,[['Dry Gin','30ml'],['Dry Sherry','30ml']],155,['Straight Law']),
d("Strike's Off Cocktail",'ストライクス・オフ','gin',16,[['Dry Gin','30ml'],['Swedish Punch','15ml'],['Lime or Lemon Juice','15ml']],155,["Strike's Off"]),
d('Suisse Cocktail','スイス','absinthe',13,[['Absinthe','30ml'],['Anisette','4 dashes'],['Egg White','1'],['Powdered Sugar','to taste']],155,['Suisse']),
d('Summer Time Cocktail','サマー・タイム','gin',20,[['Dry Gin','45ml'],['Sirop-de-citron','15ml'],['Soda Water','top']],156,['Summer Time']),
d('Sunrise Cocktail','サンライズ・カクテル','liqueur',14,[['Grenadine','15ml'],['Crème de Violette','15ml'],['Yellow Chartreuse','15ml'],['Cointreau','15ml']],156,[],true),
d('Sunset Cocktail','サンセット・カクテル','gin',14,[['Dry Gin','45ml'],['Dry Vermouth','30ml'],['Dry White Wine','15ml'],['Brandy','1 dash'],['Kirsch','1 dash'],['Fruit Preserve','1 tsp']],156),
d('Sunshine Cocktail No. 1','サンシャイン No.1','gin',21,[['Dry Gin','40ml'],['Sweet Vermouth','20ml'],['Angostura Bitters','1 dash']],157,['Sunshine No. 1']),
d('Sunshine Cocktail No. 2','サンシャイン No.2','rum',22,[['Bacardi Rum','30ml'],['Dry Vermouth','15ml'],['Lemon Juice','15ml'],['Crème de Cassis','2 dashes']],157,['Sunshine No. 2']),
d("Eric Sutton's Gin Blind",'エリック・サットンズ・ジン・ブラインド','gin',16,[['Dry Gin','30ml'],['Orange Curaçao','15ml'],['Brandy','10ml'],['Orange Bitters','1 dash']],157,["Sutton's Gin Blind"]),
d('Swazi Freeze','スワジ・フリーズ','whisky',12,[['Canadian Whisky','20ml'],['Caperitif','40ml'],['Peach Brandy','1 dash']],157)
];
