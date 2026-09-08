export const DRINK_MASTER_EXPANSION_B17_EVIDENCE_VERSION='jp-rarity-expansion-2026-09-08-b17';
export const DRINK_MASTER_EXPANSION_B17_EVALUATED_AT='2026-09-08';
const DIFF='https://www.diffordsguide.com/';
const LIQ='https://www.liquor.com/';
const JP='https://www.hotpepper.jp/strJ000868031/drink/';
const ev=n=>[{type:'international_professional_reference',title:`${n} professional recipe reference`,url:`${DIFF}search?keyword=${encodeURIComponent(n)}`,note:'Difford’s Guideの専門カクテル資料で実在性・標準名称・代表構成を確認。'},{type:'supporting_reference',title:`${n} supporting recipe reference`,url:`${LIQ}search?q=${encodeURIComponent(n)}`,note:'Liquor.com等の専門カクテル資料群で来歴・代表レシピを補助確認。'},{type:'jp_bar_reference',title:'Japanese classic cocktail bar menu reference',url:JP,note:'日本国内BARの現行メニューを標準スピリッツ、ベルモット、リキュール、ワイン、ビターズ等の一般的な提供環境の共通根拠として使用。個別rarityは特殊材料、名称認知、仕込み負荷で調整。'}];
const label=r=>r>=75?'かなり珍しい':r>=55?'珍しい':r>=35?'やや珍しい':'定番寄り';
const d=(masterKey,nameJa,baseSpirit,availability,reason,ingredients,method='全材料を氷と十分に冷却し、レシピに適したグラスへ提供する。')=>({masterKey,nameJa,aliases:[],category:'cocktail',baseSpirit,drinkKind:'cocktail',availability,rarity:100-availability,rarityLabel:label(100-availability),confidence:.82,rarityReason:reason,shortDescription:`${masterKey}として確立しているクラシック／モダンクラシックカクテル。`,orderHint:'名称で通じない場合は主要材料を添えて注文すると確実。',imageQuery:`${masterKey} cocktail`,recipe:{ingredients:ingredients.map(([name,amount])=>({name,amount})),method},evidence:ev(masterKey)});
export const DRINK_MASTER_EXPANSION_B17=[
d('Blackthorn','ブラックソーン','whisky',36,'アイリッシュウイスキー、スイートベルモット、アブサン、ビターズを使う古典。アブサン常備と名称認知に店差があるため。',[['Irish Whiskey','45ml'],['Sweet Vermouth','30ml'],['Absinthe','2 dashes'],['Angostura Bitters','2 dashes']]),
d('Brainstorm','ブレインストーム','whisky',35,'アイリッシュウイスキー、ドライベルモット、Benedictineを使う歴史的カクテル。Benedictine常備率と名称認知が一般BARでは限定的なため。',[['Irish Whiskey','60ml'],['Dry Vermouth','30ml'],['Benedictine','7.5ml']]),
d('Irish Cocktail','アイリッシュ・カクテル','whisky',32,'アイリッシュウイスキー、マラスキーノ、オレンジキュラソー、アブサン等を使う古典で、副材料数と名称認知が制約になるため。',[['Irish Whiskey','60ml'],['Maraschino Liqueur','7.5ml'],['Orange Curaçao','7.5ml'],['Absinthe','2 dashes'],['Angostura Bitters','2 dashes']]),
d('Emerald','エメラルド','whisky',49,'アイリッシュウイスキーとスイートベルモット、オレンジビターズのマンハッタン系。材料は一般的だが名称認知に店差があるため。',[['Irish Whiskey','60ml'],['Sweet Vermouth','30ml'],['Orange Bitters','2 dashes']]),
d('Dubliner','ダブリナー','whisky',31,'アイリッシュウイスキー、スイートベルモット、Grand Marnier、オレンジビターズを使う現代カクテル。名称認知と副材料の常備に店差があるため。',[['Irish Whiskey','45ml'],['Sweet Vermouth','15ml'],['Grand Marnier','15ml'],['Orange Bitters','2 dashes']]),
d('Metropole','メトロポール','brandy',35,'コニャック、ドライベルモット、ビターズを使う歴史的クラシック。材料は調達可能だが名称認知が一般BARでは低いため。',[['Cognac','45ml'],['Dry Vermouth','30ml'],['Orange Bitters','2 dashes'],['Peychaud’s Bitters','1 dash']]),
d('Japanese Cocktail','ジャパニーズ・カクテル','brandy',43,'コニャック、オルジェー、ビターズを使う19世紀クラシック。オルジェー常備率と名称認知に店差があるため。',[['Cognac','60ml'],['Orgeat Syrup','15ml'],['Angostura Bitters','2 dashes']]),
d('Brandy Smash','ブランデー・スマッシュ','brandy',48,'ブランデー、砂糖、ミントを使う古典的スマッシュ。材料は比較的一般的だがミント常備と名称認知に店差があるため。',[['Brandy','60ml'],['Simple Syrup','10ml'],['Fresh Mint','6 leaves']], 'ミントを軽く扱い、材料を氷とシェイクしクラッシュドアイス上へ提供する。'),
d('Brandy Scaffa','ブランデー・スカッファ','brandy',28,'ブランデー、マラスキーノ、ビターズを常温で合わせる古典。スタイル自体の認知度が低く、名称で通じる店が限られるため。',[['Brandy','45ml'],['Maraschino Liqueur','15ml'],['Angostura Bitters','2 dashes']], '氷を使わず材料をステアし、小型グラスへ提供する。'),
d('Sherry Cobbler','シェリー・コブラー','sherry',46,'シェリー、砂糖、柑橘をクラッシュドアイスで仕上げる歴史的定番。シェリーと季節果実の運用に店差があるため。',[['Amontillado Sherry','90ml'],['Simple Syrup','15ml'],['Orange Slices','2']], '材料をシェイクし、クラッシュドアイスを満たしたグラスへ注いで果実を添える。'),
d('Sherry Flip','シェリー・フリップ','sherry',34,'シェリー、全卵、砂糖を使う古典的フリップ。生卵の取り扱いとシェリー常備が必要で、一般BARでは提供店が限られるため。',[['Oloroso Sherry','60ml'],['Whole Egg','1'],['Simple Syrup','15ml']], '材料をドライシェイク後に氷を加えて再度シェイクし、冷やしたグラスへストレインする。'),
d('Kalimotxo','カリモーチョ','wine',48,'赤ワインとコーラを合わせるスペイン圏の定番ミックスドリンク。材料は一般的だが、日本のBARでの注文名としては認知に店差があるため。',[['Red Wine','90ml'],['Cola','90ml']], '氷を入れたグラスでビルドし、軽くステアする。'),
d('Tinto de Verano','ティント・デ・ベラーノ','wine',47,'赤ワインとレモン系ソーダを合わせるスペインの定番。材料は容易だが、日本の一般BARでは名称認知が限定的なため。',[['Red Wine','90ml'],['Lemon Soda','90ml']], '氷を入れたグラスでビルドし、軽くステアする。'),
d('Chilcano','チルカノ','pisco',36,'ピスコ、ライム、ジンジャーエール、ビターズを使うペルーの定番。ピスコの常備率が日本の一般BARで主要な制約になるため。',[['Pisco','60ml'],['Fresh Lime Juice','15ml'],['Ginger Ale','120ml'],['Angostura Bitters','2 dashes']], '氷を入れたハイボールグラスでビルドし、軽くステアする。'),
d('Piscola','ピスコーラ','pisco',34,'ピスコとコーラを合わせるチリの定番ミックスドリンク。構成は簡単だが日本ではピスコ常備率と名称認知が低いため。',[['Pisco','60ml'],['Cola','120ml']], '氷を入れたハイボールグラスでビルドし、軽くステアする。'),
d('El Capitán','エル・カピタン','pisco',29,'ピスコとスイートベルモット、ビターズを合わせるペルーのクラシック。ピスコ常備率と名称認知が低いため。',[['Pisco','60ml'],['Sweet Vermouth','30ml'],['Angostura Bitters','2 dashes']]),
d('Algarrobina','アルガロビーナ','pisco',22,'ピスコ、アルガロビーナシロップ、ミルク、卵を使うペルーの伝統カクテル。特殊シロップと卵の運用が必要なため。',[['Pisco','45ml'],['Algarrobina Syrup','15ml'],['Evaporated Milk','30ml'],['Egg Yolk','1']], '全材料を氷と十分にシェイクし、冷やしたグラスへストレインする。'),
d('Pisco Punch','ピスコ・パンチ','pisco',30,'ピスコ、パイナップル、柑橘、糖分を使う歴史的カクテル。ピスコと果実由来材料の準備が必要なため。',[['Pisco','60ml'],['Pineapple Syrup','22.5ml'],['Fresh Lemon Juice','22.5ml']], '全材料を氷とシェイクし、氷を入れたグラスへストレインする。'),
d('Prince of Wales','プリンス・オブ・ウェールズ','whisky',29,'ライウイスキー、マラスキーノ、ビターズ、スパークリングワインを使う古典。材料数と名称認知が制約になるため。',[['Rye Whiskey','45ml'],['Maraschino Liqueur','7.5ml'],['Angostura Bitters','1 dash'],['Sparkling Wine','60ml']], 'ウイスキー類を氷とステアしてグラスへ注ぎ、スパークリングワインで満たす。'),
d('Champagne Julep','シャンパン・ジュレップ','sparkling wine',40,'スパークリングワイン、砂糖、ミントを使う古典的ジュレップ。材料は調達しやすいがミント運用と名称認知に店差があるため。',[['Champagne','120ml'],['Simple Syrup','10ml'],['Fresh Mint','8 leaves']], 'ミントと糖分を軽く合わせ、クラッシュドアイスとシャンパンを加えて提供する。'),
d("Buck's Fizz",'バックス・フィズ','sparkling wine',58,'スパークリングワインとオレンジジュースを使う英国の古典。材料は一般的で再現容易だが、日本ではミモザとの呼び分けに店差があるため。',[['Champagne','90ml'],['Orange Juice','60ml']], '冷やしたフルートグラスへオレンジジュースを入れ、スパークリングワインを静かに注ぐ。'),
d('Death in the Afternoon','デス・イン・ジ・アフタヌーン','absinthe',31,'アブサンとシャンパンを使うヘミングウェイ由来の定番。アブサン常備率と強い個性から提供可能な店が限られるため。',[['Absinthe','30ml'],['Champagne','90ml']], '冷やしたフルートグラスへアブサンを入れ、シャンパンをゆっくり注ぐ。'),
d('Seelbach Cocktail','シールバック・カクテル','whisky',36,'バーボン、Cointreau、複数ビターズ、スパークリングワインを使う現代クラシック。材料数とビターズ常備に店差があるため。',[['Bourbon Whiskey','30ml'],['Cointreau','15ml'],['Angostura Bitters','7 dashes'],['Peychaud’s Bitters','7 dashes'],['Champagne','90ml']], 'シャンパン以外をグラスで合わせ、冷えたスパークリングワインで満たす。'),
d('Tuxedo No. 1','タキシード No.1','gin',33,'Old Tom gin、ドライベルモット、マラスキーノ、アブサン、ビターズを使う古典。副材料の同時常備と番号付き名称の識別が必要なため。',[['Old Tom Gin','45ml'],['Dry Vermouth','45ml'],['Maraschino Liqueur','7.5ml'],['Absinthe','2 dashes'],['Orange Bitters','2 dashes']]),
d('Eastside','イーストサイド','gin',46,'ジン、ライム、ミント、キュウリを使う現代クラシック。生鮮のキュウリとミントを常備する店に限られるため。',[['Gin','60ml'],['Fresh Lime Juice','22.5ml'],['Simple Syrup','15ml'],['Fresh Mint','6 leaves'],['Cucumber','3 slices']], '全材料を氷とシェイクし、冷やしたグラスへダブルストレインする。'),
d('French Pearl','フレンチ・パール','gin',35,'ジン、ライム、ミント、アブサン、砂糖を使う現代クラシック。アブサンと生ミントの同時常備が必要なため。',[['Gin','60ml'],['Fresh Lime Juice','22.5ml'],['Simple Syrup','15ml'],['Absinthe','5ml'],['Fresh Mint','6 leaves']], '全材料を氷とシェイクし、冷やしたグラスへダブルストレインする。'),
d('Jasmine','ジャスミン','gin',48,'ジン、Campari、Cointreau、レモンを使う現代クラシック。材料は比較的一般的だが名称認知に店差があるため。',[['Gin','45ml'],['Cointreau','7.5ml'],['Campari','7.5ml'],['Fresh Lemon Juice','22.5ml']], '全材料を氷とシェイクし、冷やしたカクテルグラスへストレインする。'),
d('Fitzgerald','フィッツジェラルド','gin',52,'ジン、レモン、砂糖、Angostura bittersを使う現代クラシック。材料は一般的で再現容易だが名称認知に店差があるため。',[['Gin','60ml'],['Fresh Lemon Juice','22.5ml'],['Simple Syrup','15ml'],['Angostura Bitters','2 dashes']], '全材料を氷とシェイクし、氷を入れたロックグラスへストレインする。'),
d('Debutante','デビュタント','gin',31,'ジン、ライム、グレナデン、アブサンを使う歴史的カクテル。アブサン常備と名称認知の低さから一般BARでは珍しいため。',[['Gin','45ml'],['Fresh Lime Juice','22.5ml'],['Grenadine','15ml'],['Absinthe','2 dashes']], '全材料を氷とシェイクし、冷やしたカクテルグラスへストレインする。'),
d('Brooklynite','ブルックリナイト','rum',42,'ラム、ライム、蜂蜜を使うダイキリ系の古典。材料は比較的一般的だが名称認知と蜂蜜シロップ運用に店差があるため。',[['Aged Rum','60ml'],['Fresh Lime Juice','22.5ml'],['Honey Syrup','15ml']], '全材料を氷とシェイクし、冷やしたカクテルグラスへストレインする。'),
d('Stone Fence','ストーン・フェンス','whisky',45,'ウイスキーとアップルサイダーを合わせる北米の歴史的ロングドリンク。サイダー常備と名称認知に店差があるため。',[['Rye Whiskey','60ml'],['Apple Cider','120ml'],['Angostura Bitters','2 dashes']], '氷を入れたハイボールグラスでビルドし、軽くステアする。'),
d('Whiskey Skin','ウイスキー・スキン','whisky',37,'ウイスキー、砂糖、熱湯、レモンピールを使う歴史的ホットドリンク。材料は簡単だがホットカクテル対応と名称認知に店差があるため。',[['Scotch Whisky','60ml'],['Simple Syrup','10ml'],['Hot Water','90ml']], '耐熱グラスに材料を加えてステアし、レモンピールを添える。'),
d('Derby Cocktail','ダービー・カクテル','gin',39,'ジン、ピーチビターズ、ミントを使う古典的カクテル。ピーチビターズと生ミントの常備が一般BARでの制約になるため。',[['Gin','60ml'],['Peach Bitters','2 dashes'],['Fresh Mint','2 leaves']]),
d('Commodore','コモドア','whisky',31,'バーボン、レモン、オレンジリキュール、糖分を使う古典。レシピ系統が複数あり、名称認知と材料運用に店差があるため。',[['Bourbon Whiskey','45ml'],['Fresh Lemon Juice','22.5ml'],['Orange Liqueur','15ml'],['Simple Syrup','10ml']], '全材料を氷とシェイクし、冷やしたカクテルグラスへストレインする。'),
d('Warday’s Cocktail','ウォーデイズ・カクテル','gin',27,'ジン、Calvados、Dubonnet Rougeを等量で使う歴史的カクテル。Dubonnetとカルヴァドスの同時常備、名称認知が大きな制約になるため。',[['Gin','30ml'],['Calvados','30ml'],['Dubonnet Rouge','30ml']])
];
export const DRINK_MASTER_EXPANSION_B17_ALIAS_ENTRIES=DRINK_MASTER_EXPANSION_B17.flatMap(d=>[[d.nameJa,d.masterKey],...(d.aliases||[]).map(a=>[a,d.masterKey])]);
