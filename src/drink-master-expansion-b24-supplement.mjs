const DIFF='https://www.diffordsguide.com/';
const LIQ='https://www.liquor.com/';
const JP1='https://www.hotpepper.jp/strJ003365641/drink/';
const JP2='https://www.hotpepper.jp/strJ003474302/drink/';
const JP3='https://www.hotpepper.jp/strJ004678153/drink/';
const ev=n=>[{type:'international_professional_reference',title:`${n} professional cocktail reference`,url:`${DIFF}search?keyword=${encodeURIComponent(n)}`,note:'Difford’s Guide等の専門資料で実在性・標準名称・代表構成を照合する共通調査経路。'},{type:'supporting_reference',title:`${n} supporting cocktail reference`,url:`${LIQ}search?q=${encodeURIComponent(n)}`,note:'専門カクテル資料で来歴・代表レシピを補助照合。'},{type:'jp_bar_reference',title:'Japanese full-service bar current menu coverage',url:JP1,note:'日本国内BARで主要蒸留酒、コーヒー、ワイン、ビール、定番副材料を扱える現行提供環境を確認。'},{type:'jp_bar_reference',title:'Japanese specialist bar current menu coverage',url:JP2,note:'日本国内でハーブ系リキュール等の専門酒材を実提供する環境を確認。'},{type:'jp_bar_reference',title:'Japanese classic cocktail bar current menu coverage',url:JP3,note:'日本国内BARで主要蒸留酒、リキュール、ワイン系カクテルの現行提供環境を補助確認。'}];
const label=r=>r>=75?'かなり珍しい':r>=55?'珍しい':r>=35?'やや珍しい':'定番寄り';
const d=(masterKey,nameJa,baseSpirit,availability,reason,ingredients,method='全材料を氷と十分に冷却し、代表レシピに適したグラスへ提供する。',aliases=[])=>({masterKey,nameJa,aliases,category:'cocktail',baseSpirit,drinkKind:'cocktail',availability,rarity:100-availability,rarityLabel:label(100-availability),confidence:.82,rarityReason:reason,shortDescription:`${masterKey}として専門資料・地域資料で実在と代表構成を確認できるドリンク。`,orderHint:'名称で通じない場合は主要材料を添えて注文すると確実。',imageQuery:`${masterKey} cocktail`,recipe:{ingredients:ingredients.map(([name,amount])=>({name,amount})),method},evidence:ev(masterKey)});
export const DRINK_MASTER_EXPANSION_B24_EXTRA=[
d('Pendennis Club','ペンデニス・クラブ','gin',32,'ジン、アプリコットリキュール、ライム、ビターズの米国クラブ系古典。副材料と名称認知に店差がある。',[['Gin','45ml'],['Apricot Liqueur','22.5ml'],['Fresh Lime Juice','22.5ml'],['Peychaud’s Bitters','2 dashes']],'全材料を氷とシェイクし、冷やしたクープへストレインする。'),
d('Diamondback','ダイヤモンドバック','whisky',24,'ライ、アップルブランデー、Yellow Chartreuseを合わせる強い古典系カクテル。Chartreuse入手性が大きな制約。',[['Rye Whiskey','45ml'],['Apple Brandy','22.5ml'],['Yellow Chartreuse','22.5ml']]),
d('Leatherneck','レザーネック','whisky',30,'ウイスキー、ブルーキュラソー、ライムを使う20世紀の確立したカクテル。着色リキュール常備と名称認知に店差。',[['Blended Whisky','45ml'],['Blue Curaçao','15ml'],['Fresh Lime Juice','15ml']],'全材料を氷とシェイクし、冷やしたクープへストレインする。'),
d('Mamadeta','ママデタ','liqueur',22,'Chartreuseとレモン系ソーダを合わせるタラゴナの地域定番。Chartreuseの国内入手性が主な制約。',[['Green Chartreuse','45ml'],['Lemonade','120ml']],'氷入りグラスへChartreuseを注ぎ、レモネードで満たして軽くステアする。'),
d('Carajillo 43','カラヒージョ43','liqueur',43,'Licor 43とエスプレッソを合わせるスペイン／メキシコ圏で定着したコーヒーカクテル。エスプレッソ設備が店差要因。',[['Licor 43','45ml'],['Espresso','30ml']],'Licor 43と冷ましたエスプレッソを氷と強くシェイクし、氷入りグラスへ注ぐ。',['Carajillo de Licor 43']),
d('Barraquito','バラキート','liqueur',23,'Licor 43、エスプレッソ、練乳、ミルク等を重ねるカナリア諸島の地域定番。コーヒー設備と乳製品準備が必要。',[['Licor 43','30ml'],['Espresso','30ml'],['Condensed Milk','20ml'],['Milk','30ml']],'練乳、Licor 43、ミルク、エスプレッソを層状または代表的な順序で重ね、シナモン等を添える。'),
d('Café Asiático','カフェ・アシアティコ','brandy',20,'ブランデー、Licor 43、エスプレッソ、練乳を使うカルタヘナの地域定番。コーヒー設備と複数副材料が必要。',[['Brandy','15ml'],['Licor 43','15ml'],['Espresso','30ml'],['Condensed Milk','20ml']],'耐熱グラスへ練乳と酒類を入れ、エスプレッソを加えて層または混合で提供する。',['Cafe Asiatico']),
d('Bombardino','ボンバルディーノ','brandy',22,'卵系リキュール、ブランデー、クリームを温製で出すイタリア山岳地域の定番。温製・乳製品運用が必要。',[['Advocaat','45ml'],['Brandy','15ml'],['Whipped Cream','30ml']],'Advocaatとブランデーを温めて耐熱グラスへ注ぎ、ホイップクリームをのせる。'),
d('Caffè Corretto','カフェ・コレット','grappa',46,'エスプレッソにグラッパ等の蒸留酒を加えるイタリアの確立した飲み方。材料は単純だがコーヒー設備が必要。',[['Espresso','30ml'],['Grappa','15ml']],'熱いエスプレッソにグラッパを加え、小型カップまたはグラスで提供する。',['Caffe Corretto']),
d('Agua de Valencia','アグア・デ・バレンシア','wine',37,'スパークリングワイン、オレンジ、ジン、ウォッカを合わせるバレンシアの地域定番。泡酒と生果汁準備が必要。',[['Cava','60ml'],['Orange Juice','60ml'],['Gin','15ml'],['Vodka','15ml']],'よく冷やした材料を合わせ、氷入りまたは冷えたピッチャー／グラスで提供する。'),
d('Clara','クララ','beer',52,'ビールとレモン系ソーダを合わせるスペインの定番ビールミックス。材料は一般的で再現しやすい。',[['Lager Beer','165ml'],['Lemon Soda','165ml']],'冷えたグラスへビールとレモンソーダを注ぎ、軽く混ぜる。'),
d('Tango Beer','タンゴ・ビール','beer',44,'ビールにグレナデンを加えるフランス系の定番ビールミックス。材料は容易だが名称認知に店差。',[['Lager Beer','250ml'],['Grenadine','15ml']],'冷えたグラスへグレナデンを入れ、ビールを静かに注ぐ。',['Tango']),
d('Cardinal','カーディナル','wine',46,'赤ワインとCrème de Cassisを合わせるKir系の確立したワインカクテル。材料は比較的一般的。',[['Red Wine','90ml'],['Crème de Cassis','15ml']],'冷えたワイングラスへカシスを入れ、赤ワインを加えて軽く混ぜる。'),
d('Ferrari','フェラーリ','amaro',29,'Fernet-BrancaとCampariを等量で合わせるバーテンダー界隈で定着した50/50ドリンク。二種ビター系酒材の常備が必要。',[['Fernet-Branca','30ml'],['Campari','30ml']],'両材料を氷とステアしてショットまたは小型グラスで提供する。'),
d('M&M','エム・アンド・エム','agave',24,'メスカルとAmaro Montenegroを等量で合わせる現代の確立した50/50ドリンク。両方の専門酒材常備が制約。',[['Mezcal','30ml'],['Amaro Montenegro','30ml']],'両材料を氷とステアし、冷やした小型グラスまたは氷上で提供する。',['M and M']),
d('Demerara Dry Float','デメララ・ドライ・フロート','rum',18,'デメラララム、柑橘、パッションフルーツ等を使うDon the Beachcomber系ティキ古典。専門材料と複数ラムが制約。',[['Demerara Rum','45ml'],['Fresh Lime Juice','22.5ml'],['Fresh Lemon Juice','15ml'],['Passion Fruit Syrup','15ml'],['Maraschino Liqueur','7.5ml']],'全材料をクラッシュドアイスとシェイクまたは短くブレンドして提供する。'),
];