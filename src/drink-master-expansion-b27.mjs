export const DRINK_MASTER_EXPANSION_B27_EVIDENCE_VERSION='jp-rarity-expansion-2026-09-09-b27';
export const DRINK_MASTER_EXPANSION_B27_EVALUATED_AT='2026-09-09';
const SAVOY='https://savoycocktaildatabase.com/';
const DIFF='https://www.diffordsguide.com/';
const JP1='https://www.hotpepper.jp/strJ003365641/drink/';
const JP2='https://www.hotpepper.jp/strJ003474302/drink/';
const JP3='https://www.hotpepper.jp/strJ004678153/drink/';
const ev=n=>[{type:'historical_primary_reference',title:`${n} — 1930 Savoy cocktail reference`,url:`${SAVOY}?s=${encodeURIComponent(n)}`,note:'The Savoy Cocktail Book 1930の検索データベースで実在・標準名称・歴史的構成を照合。'},{type:'international_professional_reference',title:`${n} professional cocktail cross-check`,url:`${DIFF}search?keyword=${encodeURIComponent(n)}`,note:'現代の専門カクテル資料で名称・代表構成を補助照合。'},{type:'jp_bar_reference',title:'Japanese full-service bar current menu coverage',url:JP1,note:'日本国内BARで主要スピリッツ、ワイン、リキュール、果汁類の現行提供環境を確認。'},{type:'jp_bar_reference',title:'Japanese specialist bar current menu coverage',url:JP2,note:'日本国内でアブサン、ハーブ系・香草系リキュール等を扱う専門BARの現行提供環境を確認。'},{type:'jp_bar_reference',title:'Japanese classic cocktail bar current menu coverage',url:JP3,note:'日本国内BARで主要蒸留酒、ベルモット、リキュール、ワイン系カクテルを提供する環境を補助確認。'}];
const label=r=>r>=75?'かなり珍しい':r>=55?'珍しい':r>=35?'やや珍しい':'定番寄り';
const methodFor=ings=>{const names=ings.map(x=>x[0].toLowerCase());if(names.some(n=>n.includes('ginger beer')||n.includes('sparkling cider')))return '炭酸以外を氷と冷却し、氷入りグラスへ注いで最後に炭酸材料を加え、軽くステアする。';if(names.some(n=>n.includes('juice')||n.includes('egg')||n.includes('syrup')||n.includes('cream')))return '全材料を氷と十分にシェイクし、代表レシピに適した冷やしたグラスへストレインする。';return '全材料を氷と十分に冷却し、代表レシピに適した冷やしたグラスへストレインする。';};
const d=(masterKey,nameJa,baseSpirit,availability,ingredients,aliases=[])=>({masterKey,nameJa,aliases,category:'cocktail',baseSpirit,drinkKind:'cocktail',availability,rarity:100-availability,rarityLabel:label(100-availability),confidence:.83,rarityReason:'1930年Savoy掲載の古典として実在と構成を確認。主要材料は日本国内で調達可能だが、歴史的名称の認知度と特殊副材料の常備性に店差があり、一般BARでの即時提供可能性は限定される。',shortDescription:`${masterKey}として1930年Savoy系資料で実在と代表構成を確認できる古典カクテル。`,orderHint:'名称で通じない場合は主要材料を添えて注文すると確実。',imageQuery:`${masterKey} cocktail`,recipe:{ingredients:ingredients.map(([name,amount])=>({name,amount})),method:methodFor(ingredients)},evidence:ev(masterKey)});
export const DRINK_MASTER_EXPANSION_B27_CANDIDATES=[
d('Dempsey','デンプシー','gin',20,[['Gin','30ml'],['Calvados','30ml'],['Absinthe','2 dashes'],['Grenadine','2 dashes']]),
d('Depth Charge','デプス・チャージ','gin',18,[['Dry Gin','30ml'],['Kina Lillet or Cocchi Americano','30ml'],['Absinthe','2 dashes']]),
d('Depth-Charge Brandy','デプス・チャージ・ブランデー','brandy',17,[['Brandy','30ml'],['Calvados','30ml'],['Grenadine','5ml'],['Fresh Lemon Juice','10ml']]),
d('Depth Bomb','デプス・ボム','brandy',18,[['Brandy','30ml'],['Calvados or Apple Brandy','30ml'],['Grenadine','4 dashes'],['Fresh Lemon Juice','1 dash']]),
d('Derby Cocktail','ダービー・カクテル','gin',27,[['Dry Gin','60ml'],['Peach Bitters','2 dashes'],['Fresh Mint','2 sprigs']]),
d('De Rigueur','ド・リグール','whisky',31,[['Whisky','45ml'],['Fresh Grapefruit Juice','22.5ml'],['Honey Syrup','10ml']]),
d('Desert Healer','デザート・ヒーラー','gin',24,[['Dry Gin','45ml'],['Cherry Brandy','15ml'],['Orange Juice','30ml'],['Ginger Beer','60ml']]),
d("Devil's Cocktail",'デビルズ・カクテル','wine',21,[['Port Wine','30ml'],['Dry Vermouth','30ml'],['Fresh Lemon Juice','15ml']]),
d('Devonia','デヴォニア','gin',22,[['Sparkling Cider','60ml'],['Gin','30ml'],['Orange Bitters','2 dashes']]),
d('Diabola','ディアボラ','wine',19,[['Dubonnet Rouge','40ml'],['Gin','20ml'],['Orgeat Syrup','2 dashes']]),
d('Diana Cocktail','ダイアナ・カクテル','liqueur',21,[['White Crème de Menthe','45ml'],['Brandy','15ml']]),
d('Diki-Diki','ディキ・ディキ','brandy',26,[['Calvados','45ml'],['Swedish Punsch','15ml'],['Fresh Grapefruit Juice','15ml']]),
d('Dinah Cocktail','ダイナ・カクテル','whisky',20,[['Whisky','30ml'],['Sweetened Lemon Juice','30ml'],['Fresh Mint','2 sprigs']]),
d('Diplomat Cocktail','ディプロマット・カクテル','wine',32,[['Dry Vermouth','40ml'],['Sweet Vermouth','20ml'],['Maraschino Liqueur','1 dash']]),
d('Dixie Cocktail','ディキシー・カクテル','gin',18,[['Dry Gin','30ml'],['Dry Vermouth','15ml'],['Absinthe','15ml']]),
d('Dixie Whisky Cocktail','ディキシー・ウイスキー・カクテル','whisky',17,[['Whisky','45ml'],['Orange Curaçao','10ml'],['Crème de Menthe','5ml'],['Fresh Lemon Juice','10ml'],['Angostura Bitters','1 dash']]),
d('Doctor Cocktail','ドクター・カクテル','liqueur',28,[['Swedish Punsch','45ml'],['Fresh Lime Juice','22.5ml']]),
d('The Dodge Special','ザ・ドッジ・スペシャル','gin',16,[['Gin','45ml'],['Grape Juice','15ml'],['Cointreau','10ml'],['Fresh Mint','2 leaves']]),
d("Dolly O'Dare",'ドリー・オデア','gin',20,[['Dry Gin','30ml'],['Dry Vermouth','30ml'],['Apricot Brandy','15ml']]),
d('Douglas Cocktail','ダグラス・カクテル','gin',24,[['Plymouth Gin','45ml'],['Dry Vermouth','30ml']]),
d('Dream Cocktail','ドリーム・カクテル','brandy',20,[['Brandy','30ml'],['Orange Curaçao','30ml'],['Absinthe','1 dash']]),
d('Du Barry','デュ・バリー','gin',17,[['Dry Gin','45ml'],['Dry Vermouth','15ml'],['Absinthe','1 dash'],['Angostura Bitters','1 dash']]),
d('Dubonnet Cocktail','デュボネ・カクテル','gin',38,[['Dry Gin','30ml'],['Dubonnet Rouge','30ml']]),
d('Duchess Cocktail','ダッチェス・カクテル','wine',18,[['Dry Vermouth','20ml'],['Sweet Vermouth','20ml'],['Absinthe','20ml']]),
d('Duke of Marlborough','デューク・オブ・マールボロ','wine',20,[['Sherry','30ml'],['Sweet Vermouth','30ml'],['Orange Bitters','3 dashes']]),
d("Dunhill's Special",'ダンヒルズ・スペシャル','gin',16,[['Gin','20ml'],['Sherry','20ml'],['Dry Vermouth','20ml'],['Orange Curaçao','5ml'],['Absinthe','2 dashes']]),
d('Dunlop Cocktail','ダンロップ・カクテル','rum',24,[['Rum','40ml'],['Sherry','20ml'],['Angostura Bitters','1 dash']]),
d('Duppy Cocktail','ダピー・カクテル','whisky',16,[['Whisky','45ml'],['Orange Curaçao','15ml'],['Cloves','2'],['Orange Bitters','1 dash']]),
d("Eagle's Dream",'イーグルズ・ドリーム','gin',17,[['Dry Gin','45ml'],['Crème Yvette','15ml'],['Fresh Lemon Juice','15ml'],['Egg White','15ml'],['Powdered Sugar','1 tsp']]),
d('Earthquake Cocktail','アースクエイク・カクテル','gin',19,[['Gin','20ml'],['Whisky','20ml'],['Absinthe','20ml']]),
d('East India Cocktail','イースト・インディア・カクテル','brandy',31,[['Brandy','45ml'],['Pineapple Juice','15ml'],['Orange Curaçao','7.5ml'],['Angostura Bitters','1 dash']]),
d('East Indian Cocktail','イースト・インディアン・カクテル','wine',20,[['Sherry','40ml'],['Dry Vermouth','20ml'],['Orange Bitters','2 dashes']]),
d('Eclipse Cocktail','エクリプス・カクテル','gin',21,[['Dry Gin','30ml'],['Sloe Gin','30ml'],['Grenadine','5ml']]),
d('Eddie Brown','エディ・ブラウン','gin',16,[['Dry Gin','30ml'],['Kina Lillet or Cocchi Americano','15ml'],['Apricot Brandy','15ml']]),
d('Elk Cocktail','エルク・カクテル','gin',16,[['Dry Gin','30ml'],['Dry Vermouth','15ml'],['Prunelle Brandy','15ml']]),
d("Elk's Own",'エルクス・オウン','whisky',18,[['Canadian Whisky','30ml'],['Port Wine','30ml'],['Fresh Lemon Juice','15ml'],['Egg White','15ml'],['Sugar Syrup','5ml']]),
d('Elixir Cocktail','エリクサー・カクテル','brandy',14,[['Calvados','45ml'],['Kola Tonic','15ml']]),
d('Empire Cocktail','エンパイア・カクテル','gin',28,[['Gin','30ml'],['Calvados','15ml'],['Apricot Brandy','15ml']])
];
export const DRINK_MASTER_EXPANSION_B27=DRINK_MASTER_EXPANSION_B27_CANDIDATES;
export const DRINK_MASTER_EXPANSION_B27_ALIAS_ENTRIES=DRINK_MASTER_EXPANSION_B27_CANDIDATES.flatMap(d=>[[d.nameJa,d.masterKey],...(d.aliases||[]).map(a=>[a,d.masterKey])]);
