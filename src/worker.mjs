import { CARILA_MAX_TOKENS, CARILA_MODEL, CARILA_SYSTEM_PROMPT } from './carila-personality.mjs';
const ANTHROPIC_ENDPOINT = 'https://api.anthropic.com/v1/messages';
const UNSPLASH_ENDPOINT = 'https://api.unsplash.com/search/photos';
const ALLOWED_MODELS = new Set(['claude-sonnet-4-6', 'claude-haiku-4-5-20251001']);

let drinkImageTableReady;

let drinkMasterReady;
const DRINK_MASTER_SEED = [["ジントニック",98,2,"定番",0.98,"日本の一般BARで非常に成立しやすい定番カクテル。"],["モスコミュール",95,5,"定番",0.96,"日本の一般BARで広く認知され、材料も揃いやすい。"],["ギムレット",93,7,"定番",0.96,"国内のスタンダードカクテルとして認知度が高い。"],["マティーニ",92,8,"定番",0.96,"国内のカクテルBARで代表的なスタンダード。"],["マルガリータ",90,10,"定番",0.95,"国内でも定番性が高く、基本材料で成立しやすい。"],["ダイキリ",88,12,"定番",0.94,"国内のスタンダードとして認知され、材料も基本的。"],["サイドカー",86,14,"定番",0.93,"国内のクラシックカクテルとして標準性が高い。"],["ソルティドッグ",86,14,"定番",0.93,"材料が一般的で日本のBARでも成立しやすい。"],["ブラッディメアリー",85,15,"比較的よくある",0.92,"日本でもよく知られ、材料も比較的揃いやすい。"],["マンハッタン",84,16,"比較的よくある",0.91,"クラシックとして高認知で、カクテルBARで成立しやすい。"],["モヒート",84,16,"比較的よくある",0.91,"国内提供は多いが、生ミント常備の有無で店差が出る。"],["カンパリソーダ",83,17,"比較的よくある",0.91,"国内流通が良く、一般BARでも作りやすい。"],["キューバリバー",82,18,"比較的よくある",0.9,"基本材料で成立しやすく国内でも認知されている。"],["カルーアミルク",82,18,"比較的よくある",0.9,"材料が容易で国内でも広く知られている。"],["ジンフィズ",81,19,"比較的よくある",0.9,"国内スタンダードで基本的な技法と材料で成立する。"],["ジンリッキー",80,20,"比較的よくある",0.89,"基本材料で作りやすく国内専門書でも標準群に入る。"],["ミモザ",80,20,"比較的よくある",0.88,"ホテルやレストランを含め国内提供が広い。"],["シャンディガフ",79,21,"比較的よくある",0.9,"材料が容易で日本でもよく知られている。"],["レッドアイ",77,23,"比較的よくある",0.88,"材料が容易で国内でも一定の認知がある。"],["ネグローニ",76,24,"比較的よくある",0.87,"国内提供例が多く材料流通も良好。"],["オールドファッションド",74,26,"比較的よくある",0.87,"カクテルBARでは高認知だが全店共通の定番まではいかない。"],["アレキサンダー",73,27,"比較的よくある",0.86,"国内スタンダード群で材料も比較的一般的。"],["ベリーニ",72,28,"比較的よくある",0.85,"スパークリングワインを扱う店では成立しやすい。"],["テキーラサンライズ",70,30,"やや珍しい",0.84,"材料は容易だが日本一般BARの定番度は一段下がる。"],["スクリュードライバー",70,30,"やや珍しい",0.84,"材料は非常に容易だが名称注文の頻度は定番群より低い。"],["ホワイトルシアン",68,32,"やや珍しい",0.82,"材料は比較的容易だが常時注文される定番ではない。"],["ブラックルシアン",68,32,"やや珍しい",0.82,"材料は比較的容易だが一般BARでの頻度は中程度。"],["シンガポールスリング",66,34,"やや珍しい",0.83,"高認知だが材料数が増え、店ごとの差が出る。"],["フレンチ75",66,34,"やや珍しい",0.87,"国内のホテルBARから一般BARまで提供例があり、スパークリング常備店では成立しやすい。"],["キール",65,35,"やや珍しい",0.82,"国内認知があり材料も比較的揃いやすい。"],["キールロワイヤル",63,37,"やや珍しい",0.81,"スパークリングを常備する店では成立しやすい。"],["ラスティネイル",65,35,"やや珍しい",0.86,"国内の現行BARで複数提供例があるが、ドランブイ常備の有無で店差が出る。"],["ゴッドファーザー",68,32,"やや珍しい",0.88,"国内の複数業態で現行提供例があり、材料と技法も比較的シンプル。"],["ロブロイ",63,37,"やや珍しい",0.83,"クラシックとして国内提供例があり、材料も専門BARでは揃いやすい。"],["アペロールスプリッツ",60,40,"やや珍しい",0.86,"日本でも流通と提供例はあるが、一般BARの定番まではいかない。"],["ブロンクス",62,38,"やや珍しい",0.82,"国内の現行BARでクラシックとして提供例があり、材料・技法上は成立しやすい。"],["ロングアイランドアイスティー",58,42,"やや珍しい",0.85,"一般ショットバーで提供例はあるが材料数が多く店差が出る。"],["グラスホッパー",60,40,"やや珍しい",0.85,"国内のカクテルバーで現役だがリキュール常備に左右される。"],["パローマ",64,36,"やや珍しい",0.86,"国内のホテルBARやダイニングBAR等で現行提供が広がっており、材料・技法も比較的シンプル。"],["ミントジュレップ",58,42,"やや珍しい",0.86,"国内提供例は複数あるが生ミント常備と季節性に左右される。"],["カイピリーニャ",50,50,"珍しい",0.8,"国内提供例はあるがカシャッサ常備が主要な制約。"],["マイタイ",55,45,"やや珍しい",0.84,"国内BARで現行提供例は複数あるが、レシピ差と副材料の常備で店差が大きい。"],["ピニャコラーダ",52,48,"やや珍しい",0.84,"国内BARで現行提供例は複数あるが、ココナッツ系材料や提供スタイルに依存する。"],["ピスコサワー",38,62,"珍しい",0.78,"日本では提供例が専門業態に寄り、ピスコ常備率が制約。"],["アメリカーノ",62,38,"やや珍しい",0.86,"材料は一般的で国内BARの実メニューにも確認できる。"],["サゼラック",42,58,"珍しい",0.83,"国内の現行カクテルBARで提供例はあるが、アブサンやペイショーズビターズ等の常備に依存する。"],["コープスリバイバー No.2",38,62,"珍しい",0.82,"国内の現行BARで提供例はあるが、専門性と複数の特殊材料に依存する。"],["ラモスジンフィズ",32,68,"珍しい",0.84,"国内で複数の現行提供例はあるが、材料数、長いシェイク、提供時間の制約が大きい。"],["ヴューカレ",32,68,"珍しい",0.82,"国内で現行提供例はあるが、ライ、コニャック、ベネディクティン、複数ビターズ等の常備に依存する。"],["トリニダードサワー",24,76,"かなり珍しい",0.78,"国内の現行提供例はあるが、ビターズを大量使用する特殊構成で一般BAR標準から遠い。"]];
const DRINK_COPY_SEED = [["ジントニック","ジンの香りをトニックの苦甘さと炭酸で軽快に楽しむロングカクテル。","爽やか、ほろ苦い、ドライ","迷ったらジンの銘柄指定なしで注文して問題ありません。"],["ジンフィズ","ジンに柑橘と甘味、ソーダを合わせるクラシックなロングカクテル。","爽やか、甘酸っぱい、軽快","酸味や甘さの好みを一言伝えると調整してもらいやすい一杯です。"],["ジンリッキー","ジンとライムをソーダで伸ばす、甘味を抑えたシンプルなロングカクテル。","ドライ、爽快、柑橘","甘くないものがよければそのまま注文しやすい一杯です。"],["ソルティドッグ","ウォッカとグレープフルーツに塩のアクセントを合わせる定番カクテル。","爽やか、ほろ苦い、塩味","塩の縁は好みなので、不要なら塩なしでも頼めます。"],["ブラッディメアリー","ウォッカとトマトを軸に、店ごとの味付けも楽しめるロングカクテル。","旨味、酸味、スパイシー","辛さやスパイス感は店によって違うので好みを伝えても構いません。"],["モスコミュール","ウォッカにライムとジンジャーの刺激を合わせる爽快なロングカクテル。","爽やか、辛口、ジンジャー","ジンジャーの辛さは店差があるため、好みがあれば伝えると安心です。"],["キューバリバー","ラムとコーラにライムを合わせる、親しみやすいロングカクテル。","甘め、爽快、コーラとライム","キューバリバー、またはキューバリブレの呼び方で通じることが多い一杯です。"],["モヒート","ラム、ライム、ミント、甘味とソーダを合わせる清涼感の強いカクテル。","爽快、ミント、甘酸っぱい","生ミントの在庫で作れないことがあるため、なければ近い方向で相談できます。"],["アイリッシュコーヒー","アイリッシュウイスキーとコーヒー、甘味、クリームを合わせる温かいカクテル。","温かい、コーヒー、まろやか","食後の一杯として頼みやすいですが、提供可否はコーヒー設備にも左右されます。"],["オールドファッションド","ウイスキーを甘味とビターズで整え、ゆっくり味わうクラシックカクテル。","濃厚、ほろ苦い、ウイスキー主体","ベースのウイスキーに希望があれば銘柄やスタイルを相談できます。"],["カンパリソーダ","カンパリをソーダで割り、薬草系の苦味を軽快に楽しむシンプルな一杯。","ほろ苦い、爽快、ハーブ","苦味が好きならそのまま、少し柔らかくしたい場合は相談できます。"],["カルーアミルク","コーヒーリキュールをミルクでまろやかに仕上げる甘口カクテル。","甘い、ミルキー、コーヒー","甘口を希望するときに名前でそのまま注文しやすい一杯です。"],["ベリーニ","桃とスパークリングワインを合わせる、果実感のある華やかなカクテル。","フルーティ、やや甘い、発泡","桃の材料やピューレの有無で提供できない店もあります。"],["ミモザ","オレンジとスパークリングワインを合わせる軽快で華やかなカクテル。","爽やか、フルーティ、発泡","スパークリングワインを扱う店なら相談しやすい一杯です。"],["シャンディガフ","ビールとジンジャーエールを合わせる軽快なビアカクテル。","爽快、軽め、ジンジャー","軽めに飲みたいときに名前で頼みやすい一杯です。"],["レッドアイ","ビールとトマトジュースを合わせる、軽めで旨味のあるビアカクテル。","軽め、トマト、旨味","トマトジュース常備の有無で提供可否が分かれます。"],["ギムレット","ジンとライムを中心に仕上げる、シャープでクラシックなショートカクテル。","ドライ、柑橘、シャープ","酸味や甘味のバランスに店の個性が出やすい一杯です。"],["マティーニ","ジンとベルモットを軸にした、香りとドライさを楽しむ代表的なショートカクテル。","ドライ、芳香、力強い","好みがなければまず通常のマティーニとして注文して十分です。"],["バラライカ","ウォッカとオレンジ系リキュール、レモンを合わせる端正なショートカクテル。","甘酸っぱい、柑橘、すっきり","スタンダードを扱うBARなら名前で相談できます。"],["ダイキリ","ホワイトラムとライム、甘味で作るシンプルなショートカクテル。","甘酸っぱい、ドライ、ラム","シンプルな分、酸味と甘味のバランスに店の個性が出ます。"],["マルガリータ","テキーラ、オレンジ系リキュール、柑橘を合わせ、塩を添える代表的なカクテル。","甘酸っぱい、塩味、テキーラ","グラスの塩が苦手なら塩なしで頼むこともできます。"],["マンハッタン","ウイスキーとスイートベルモット、ビターズを合わせる重厚なクラシック。","芳醇、ほろ苦い、甘み","ウイスキー主体の落ち着いた一杯が欲しいと伝えても通じやすいです。"],["アレキサンダー","ブランデー系のベースにカカオとクリームを合わせるデザート感のあるショートカクテル。","甘い、クリーミー、カカオ","食後の甘い一杯として相談しやすいカクテルです。"],["サイドカー","ブランデー、オレンジ系リキュール、レモンを合わせる端正なクラシック。","甘酸っぱい、柑橘、芳醇","酸味と甘味のバランスに好みがあれば伝えられます。"],["アペロールスプリッツ","アペロール、スパークリングワイン、ソーダを合わせるイタリアの食前酒スタイル。","ほろ苦い、ほのかな甘み、爽快","日本では一般BARの定番とは限らないため、アペロールとスパークリングの有無を尋ねると自然です。"],["ネグローニ","ジン、カンパリ、スイートベルモットを合わせる苦味と甘味の強いクラシック。","ビター、ハーブ、芳醇","苦味が得意なら名前でそのまま注文しやすい一杯です。"],["ミントジュレップ","ウイスキーにミントと甘味を合わせ、たっぷりの氷で楽しむ爽快なカクテル。","ミント、爽快、ウイスキー","生ミントが必要なので、提供できるか先に尋ねても自然です。"],["グラスホッパー","ミント系とカカオ系のリキュールにクリームを合わせる甘口カクテル。","甘い、ミント、カカオ","食後の甘い一杯として頼むとイメージが伝わりやすいです。"],["アメリカーノ","カンパリとスイートベルモットをソーダで伸ばす、ほろ苦く軽快なカクテル。","ほろ苦い、ハーブ、爽快","コーヒーのアメリカーノと区別するため、カクテルのアメリカーノと伝えると確実です。"],["ロングアイランドアイスティー","複数のスピリッツと柑橘、コーラを合わせる、見た目以上に強いロングカクテル。","甘酸っぱい、コーラ、アルコール感","飲みやすくても度数が高くなりやすいので、ゆっくり飲む前提で頼む一杯です。"],["パローマ","テキーラとグレープフルーツ系の風味を爽快に楽しむロングカクテル。","爽やか、ほろ苦い、柑橘","日本では店によって材料が異なるため、作れるか尋ねるのが確実です。"],["カイピリーニャ","カシャッサとライム、砂糖を合わせるブラジルを代表するカクテル。","甘酸っぱい、ライム、力強い","カシャッサを置いていないBARもあるため、在庫確認が必要なことがあります。"],["ピスコサワー","ピスコと柑橘、甘味を中心に仕上げる南米を代表するサワースタイル。","甘酸っぱい、芳香、まろやか","日本ではピスコ常備店が限られるので、作れるか尋ねるのが自然です。"],["ラモスジンフィズ","ジンフィズを土台に乳製品などを使い、手間をかけて滑らかに仕上げるクラシック。","クリーミー、柑橘、爽やか","時間と仕込みを要するため、混雑時には提供できないことがあります。"]];
const DRINK_MASTER_ALIASES = [
  ['モスコーミュール','モスコミュール'],
  ['moscowmule','モスコミュール'],
  ['oldfashioned','オールドファッションド'],
  ['オールドファッション','オールドファッションド'],
  ['cubalibre','キューバリバー'],
  ['キューバリブレ','キューバリバー'],
  ['bloodymary','ブラッディメアリー'],
  ['ブラッディーマリー','ブラッディメアリー'],
  ['aperolspritz','アペロールスプリッツ'],
  ['corpseiviverno2','コープスリバイバー No.2']
];

function normalizeDrinkMasterKey(value) {
  return (value || '').trim().toLowerCase().replace(/[・\s.\-_]/g, '');
}

async function ensureDrinkMasterTables(env) {
  if (!env.DRINK_DB) return false;
  if (!drinkMasterReady) {
    drinkMasterReady = (async () => {
      await env.DRINK_DB.prepare(`CREATE TABLE IF NOT EXISTS drinks (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        canonical_key TEXT NOT NULL UNIQUE,
        name_ja TEXT NOT NULL,
        name_en TEXT NOT NULL DEFAULT '',
        category TEXT NOT NULL DEFAULT '',
        base_spirit TEXT NOT NULL DEFAULT '',
        drink_kind TEXT NOT NULL DEFAULT 'cocktail',
        japan_availability_score INTEGER,
        japan_rarity_score INTEGER,
        japan_rarity_label TEXT NOT NULL DEFAULT '',
        japan_rarity_confidence REAL,
        rarity_reason TEXT NOT NULL DEFAULT '',
        evidence_version TEXT NOT NULL DEFAULT '',
        evaluated_at TEXT,
        taste_summary TEXT NOT NULL DEFAULT '',
        origin_summary TEXT NOT NULL DEFAULT '',
        short_description TEXT NOT NULL DEFAULT '',
        order_hint TEXT NOT NULL DEFAULT '',
        global_popularity_score INTEGER,
        active INTEGER NOT NULL DEFAULT 1,
        created_at TEXT NOT NULL DEFAULT (datetime('now')),
        updated_at TEXT NOT NULL DEFAULT (datetime('now'))
      )`).run();
      await env.DRINK_DB.prepare(`CREATE TABLE IF NOT EXISTS drink_aliases (
        alias_key TEXT PRIMARY KEY,
        drink_id INTEGER NOT NULL,
        alias_text TEXT NOT NULL,
        language TEXT NOT NULL DEFAULT '',
        created_at TEXT NOT NULL DEFAULT (datetime('now')),
        FOREIGN KEY (drink_id) REFERENCES drinks(id)
      )`).run();
      await env.DRINK_DB.prepare(`CREATE TABLE IF NOT EXISTS drink_evidence (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        drink_id INTEGER NOT NULL,
        evidence_type TEXT NOT NULL,
        source_title TEXT NOT NULL DEFAULT '',
        source_url TEXT NOT NULL DEFAULT '',
        source_note TEXT NOT NULL DEFAULT '',
        observed_at TEXT,
        weight TEXT NOT NULL DEFAULT 'supporting',
        created_at TEXT NOT NULL DEFAULT (datetime('now')),
        FOREIGN KEY (drink_id) REFERENCES drinks(id)
      )`).run();
      const statements = DRINK_MASTER_SEED.map(([name, availability, rarity, label, confidence, reason]) => env.DRINK_DB.prepare(`INSERT INTO drinks (
          canonical_key, name_ja, japan_availability_score, japan_rarity_score, japan_rarity_label,
          japan_rarity_confidence, rarity_reason, evidence_version, evaluated_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, 'jp-rarity-v1.5', '2026-09-04')
        ON CONFLICT(canonical_key) DO UPDATE SET
          name_ja = excluded.name_ja,
          japan_availability_score = excluded.japan_availability_score,
          japan_rarity_score = excluded.japan_rarity_score,
          japan_rarity_label = excluded.japan_rarity_label,
          japan_rarity_confidence = excluded.japan_rarity_confidence,
          rarity_reason = excluded.rarity_reason,
          evidence_version = excluded.evidence_version,
          evaluated_at = excluded.evaluated_at,
          updated_at = datetime('now')`).bind(
          normalizeDrinkMasterKey(name), name, availability, rarity, label, confidence, reason,
        ));
        if (typeof env.DRINK_DB.batch === 'function') await env.DRINK_DB.batch(statements);
        else for (const statement of statements) await statement.run();
      for (const [name, description, taste, orderHint] of DRINK_COPY_SEED) {
        await env.DRINK_DB.prepare('UPDATE drinks SET short_description = ?, taste_summary = ?, order_hint = ?, updated_at = datetime(\'now\') WHERE canonical_key = ?')
          .bind(description, taste, orderHint, normalizeDrinkMasterKey(name)).run();
      }
      for (const [aliasText, canonicalName] of DRINK_MASTER_ALIASES) {
        const row = await env.DRINK_DB.prepare('SELECT id FROM drinks WHERE canonical_key = ?').bind(normalizeDrinkMasterKey(canonicalName)).first();
        if (row?.id) await env.DRINK_DB.prepare('INSERT OR IGNORE INTO drink_aliases (alias_key, drink_id, alias_text) VALUES (?, ?, ?)')
          .bind(normalizeDrinkMasterKey(aliasText), row.id, aliasText).run();
      }
      return true;
    })().catch((error) => {
      console.error('D1 drink master setup failed', error);
      drinkMasterReady = undefined;
      return false;
    });
  }
  return drinkMasterReady;
}

async function readDrinkMaster(env, name) {
  if (!name || !await ensureDrinkMasterTables(env)) return null;
  const key = normalizeDrinkMasterKey(name);
  let row = await env.DRINK_DB.prepare(`SELECT id, name_ja, name_en, category, base_spirit, drink_kind,
      japan_availability_score, japan_rarity_score, japan_rarity_label, japan_rarity_confidence,
      rarity_reason, taste_summary, origin_summary, short_description, order_hint, evidence_version, evaluated_at
    FROM drinks WHERE canonical_key = ? AND active = 1`).bind(key).first();
  if (!row) {
    row = await env.DRINK_DB.prepare(`SELECT d.id, d.name_ja, d.name_en, d.category, d.base_spirit, d.drink_kind,
        d.japan_availability_score, d.japan_rarity_score, d.japan_rarity_label, d.japan_rarity_confidence,
        d.rarity_reason, d.taste_summary, d.origin_summary, d.short_description, d.order_hint, d.evidence_version, d.evaluated_at
      FROM drink_aliases a JOIN drinks d ON d.id = a.drink_id
      WHERE a.alias_key = ? AND d.active = 1`).bind(key).first();
  }
  return row || null;
}

async function drinkMeta(request, env) {
  if (request.method !== 'GET') return json({ error: 'Method not allowed' }, 405, { allow: 'GET' });
  if (!env.DRINK_DB) return json({ error: 'Drink database unavailable' }, 503);
  const url = new URL(request.url);
  const name = url.searchParams.get('name');
  if (!name) return json({ error: 'name required' }, 400);
  const row = await readDrinkMaster(env, name);
  if (!row) return json({ found: false }, 404, { 'cache-control': 'public, max-age=300' });
  return json({
    found: true,
    drink: {
      id: row.id,
      name: row.name_ja,
      nameEn: row.name_en || '',
      category: row.category || '',
      baseSpirit: row.base_spirit || '',
      kind: row.drink_kind || 'cocktail',
      japanAvailability: row.japan_availability_score,
      rarity: row.japan_rarity_score,
      rarityLabel: row.japan_rarity_label,
      confidence: row.japan_rarity_confidence,
      rarityReason: row.rarity_reason || '',
      tasteSummary: row.taste_summary || '',
      originSummary: row.origin_summary || '',
      description: row.short_description || '',
      orderHint: row.order_hint || '',
      evidenceVersion: row.evidence_version || '',
      evaluatedAt: row.evaluated_at || '',
    },
  }, 200, { 'cache-control': 'public, max-age=3600, stale-while-revalidate=86400' });
}

async function ensureDrinkImageTable(env) {
  if (!env.DRINK_DB) return false;
  if (!drinkImageTableReady) {
    drinkImageTableReady = env.DRINK_DB.prepare(`CREATE TABLE IF NOT EXISTS drink_images (
      cache_key TEXT PRIMARY KEY,
      display_name TEXT NOT NULL DEFAULT '',
      image_url TEXT NOT NULL DEFAULT '',
      photo_id TEXT NOT NULL DEFAULT '',
      photographer TEXT NOT NULL DEFAULT '',
      photographer_url TEXT NOT NULL DEFAULT '',
      search_query TEXT NOT NULL DEFAULT '',
      created_at TEXT NOT NULL,
      last_used_at TEXT NOT NULL,
      use_count INTEGER NOT NULL DEFAULT 1
    )`).run().then(() => true).catch((error) => {
      console.error('D1 drink image table setup failed', error);
      drinkImageTableReady = undefined;
      return false;
    });
  }
  return drinkImageTableReady;
}

function drinkImagePayload(row, source = '') {
  return {
    url: row?.image_url || null,
    photoId: row?.photo_id || '',
    photographer: row?.photographer || '',
    photographerUrl: row?.photographer_url || '',
    ...(source ? { source } : {}),
  };
}

async function readDrinkImageFromD1(env, cacheIdentity, context) {
  if (!await ensureDrinkImageTable(env)) return null;
  const row = await env.DRINK_DB.prepare('SELECT image_url, photo_id, photographer, photographer_url FROM drink_images WHERE cache_key = ?')
    .bind(cacheIdentity).first();
  if (!row) return null;
  context.waitUntil(env.DRINK_DB.prepare("UPDATE drink_images SET last_used_at = datetime('now'), use_count = use_count + 1 WHERE cache_key = ?")
    .bind(cacheIdentity).run().catch((error) => console.error('D1 drink image usage update failed', error)));
  return drinkImagePayload(row, 'd1');
}

async function saveDrinkImageToD1(env, record) {
  if (!await ensureDrinkImageTable(env)) return;
  await env.DRINK_DB.prepare(`INSERT INTO drink_images (
      cache_key, display_name, image_url, photo_id, photographer, photographer_url, search_query, created_at, last_used_at, use_count
    ) VALUES (?, ?, ?, ?, ?, ?, ?, datetime('now'), datetime('now'), 1)
    ON CONFLICT(cache_key) DO UPDATE SET
      display_name = excluded.display_name,
      image_url = excluded.image_url,
      photo_id = excluded.photo_id,
      photographer = excluded.photographer,
      photographer_url = excluded.photographer_url,
      search_query = excluded.search_query,
      last_used_at = datetime('now'),
      use_count = drink_images.use_count + 1`)
    .bind(record.cacheIdentity, record.name || '', record.url || '', record.photoId || '', record.photographer || '', record.photographerUrl || '', record.query || '')
    .run();
}

const json = (body, status = 200, headers = {}) => new Response(JSON.stringify(body), {
  status,
  headers: { 'content-type': 'application/json; charset=utf-8', ...headers },
});

function missingSecret(name) {
  return json({ error: 'Service is not configured', code: `MISSING_${name}` }, 503);
}

function diagnosticId() {
  return crypto.randomUUID();
}

function safeUpstreamError(body) {
  try {
    const parsed = JSON.parse(body);
    return {
      type: typeof parsed?.error?.type === 'string' ? parsed.error.type : 'unknown_error',
      message: typeof parsed?.error?.message === 'string'
        ? parsed.error.message.slice(0, 500)
        : 'No upstream error message',
    };
  } catch {
    return { type: 'invalid_response', message: 'Upstream returned a non-JSON error response' };
  }
}

async function enrichBarCarilaRecommendation(data, env) {
  const textItem = data?.content?.find((item) => item?.type === 'text' && typeof item.text === 'string');
  if (!textItem || !env.DRINK_DB) return data;
  let parsed;
  try { parsed = JSON.parse(textItem.text.replace(/```json|```/g, '').trim()); } catch { return data; }
  if (parsed?.type !== 'recommendation' || !parsed?.drink?.name) return data;
  let row;
  try { row = await readDrinkMaster(env, parsed.drink.name); } catch (error) {
    console.error('D1 drink master enrichment failed', error);
    return data;
  }
  if (!row) return data;
  if (Number.isFinite(row.japan_rarity_score)) parsed.drink.rarity = row.japan_rarity_score;
  parsed.drink.rarityLabel = row.japan_rarity_label || '';
  parsed.drink.rarityConfidence = row.japan_rarity_confidence ?? null;
  parsed.drink.rarityReason = row.rarity_reason || '';
  if (row.short_description) parsed.drink.description = row.short_description;
  if (row.order_hint) parsed.drink.trivia = row.order_hint;
  parsed.drink.masterSource = 'd1';
  parsed.drink.evidenceVersion = row.evidence_version || '';
  textItem.text = JSON.stringify(parsed);
  return data;
}

function cacheStaticAsset(response, pathname) {
  if (!response.ok || response.status === 206) return response;
  const isLongLivedAsset = pathname.startsWith('/pandas/')
    || pathname.startsWith('/carila/assets/')
    || pathname.startsWith('/assets/')
    || /\.(?:png|jpe?g|webp|gif|svg|css|js)$/i.test(pathname);
  const isHtml = pathname === '/' || pathname.endsWith('.html') || pathname === '/carila/';
  if (!isLongLivedAsset && !isHtml) return response;

  const cached = new Response(response.body, response);
  cached.headers.delete('content-length');
  if (isLongLivedAsset) {
    cached.headers.set('cache-control', 'public, max-age=86400, stale-while-revalidate=604800');
  } else {
    cached.headers.set('cache-control', 'no-cache');
  }
  return cached;
}

function optimizeBarCarilaHtml(response) {
  if (typeof HTMLRewriter !== 'function') return response;

  const lazyPandaScript = `<script>(()=>{const load=(img)=>{if(!img||!img.dataset.src||img.getAttribute('src'))return;img.setAttribute('src',img.dataset.src);delete img.dataset.src;};document.querySelectorAll('.panda-img.active').forEach(load);const stage=document.getElementById('pandaStage');if(stage){new MutationObserver((records)=>{for(const record of records){const img=record.target;if(img.classList&&img.classList.contains('panda-img')&&img.classList.contains('active'))load(img);}}).observe(stage,{subtree:true,attributes:true,attributeFilter:['class']});}})();</script>`;

  return new HTMLRewriter()
    .on('img.panda-img', {
      element(element) {
        const id = element.getAttribute('id');
        const src = element.getAttribute('src');
        if (id === 'p-counter') {
          element.setAttribute('fetchpriority', 'high');
          element.setAttribute('decoding', 'async');
          return;
        }
        if (src) {
          element.setAttribute('data-src', src);
          element.removeAttribute('src');
          element.setAttribute('decoding', 'async');
        }
      },
    })
    .on('body', {
      element(element) {
        element.append(lazyPandaScript, { html: true });
      },
    })
    .transform(response);
}

async function chat(request, env) {
  if (request.method !== 'POST') return json({ error: 'Method not allowed' }, 405, { allow: 'POST' });
  if (!env.ANTHROPIC_API_KEY) return missingSecret('ANTHROPIC_API_KEY');

  let body;
  try {
    body = await request.json();
  } catch {
    return json({ error: 'Invalid JSON body' }, 400);
  }
  if (!body || !ALLOWED_MODELS.has(body.model) || !Number.isInteger(body.max_tokens)
    || body.max_tokens < 0 || !Array.isArray(body.messages) || body.messages.length === 0
    || (body.system !== undefined && typeof body.system !== 'string')) {
    return json({ error: 'Invalid Anthropic Messages request' }, 400);
  }

  const upstream = await fetch(ANTHROPIC_ENDPOINT, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'x-api-key': env.ANTHROPIC_API_KEY,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({ ...body, system: typeof body.system === 'string' && body.system ? [{ type: 'text', text: body.system, cache_control: { type: 'ephemeral' } }] : body.system }),
  });
  if (!upstream.ok) {
    const requestId = diagnosticId();
    const error = safeUpstreamError(await upstream.text());
    console.error('Anthropic Messages API failed', {
      requestId,
      status: upstream.status,
      type: error.type,
      message: error.message,
      upstreamRequestId: upstream.headers.get('request-id'),
    });
    return json({
      error: 'Chat service unavailable',
      code: `ANTHROPIC_${error.type.toUpperCase()}`,
      requestId,
    }, upstream.status);
  }

  const data = await upstream.json();
  await enrichBarCarilaRecommendation(data, env);
  return json(data, upstream.status);
}

async function carilaChat(request, env) {
  if (request.method !== 'POST') return json({ error: 'Method not allowed' }, 405, { allow: 'POST' });
  if (!env.ANTHROPIC_API_KEY) return missingSecret('ANTHROPIC_API_KEY');

  let body;
  try { body = await request.json(); } catch { return json({ error: 'Invalid JSON body' }, 400); }
  const messages = body?.messages;
  const valid = Array.isArray(messages) && messages.length > 0 && messages.length <= 40
    && messages.every((message) => ['user', 'assistant'].includes(message?.role)
      && typeof message.content === 'string' && message.content.trim().length > 0
      && message.content.length <= 4000)
    && messages[0].role === 'user'
    && messages.every((message, index) => index === 0 || message.role !== messages[index - 1].role);
  if (!valid || messages.at(-1).role !== 'user') return json({ error: 'Invalid conversation' }, 400);

  const upstream = await fetch(ANTHROPIC_ENDPOINT, {
    method: 'POST',
    headers: {
      'content-type': 'application/json', 'x-api-key': env.ANTHROPIC_API_KEY,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: CARILA_MODEL, max_tokens: CARILA_MAX_TOKENS,
      system: CARILA_SYSTEM_PROMPT, messages,
    }),
  });
  if (!upstream.ok) {
    const requestId = diagnosticId();
    const error = safeUpstreamError(await upstream.text());
    console.error('Carila chat API failed', { requestId, status: upstream.status, type: error.type });
    return json({ error: 'Chat service unavailable', code: `ANTHROPIC_${error.type.toUpperCase()}`, requestId }, upstream.status);
  }
  const data = await upstream.json();
  const reply = data?.content?.find((item) => item.type === 'text')?.text?.trim();
  return reply ? json({ reply }) : json({ error: 'Invalid chat response' }, 502);
}

async function drinkImage(request, env, context) {
  if (request.method !== 'GET') return json({ error: 'Method not allowed' }, 405, { allow: 'GET' });
  const url = new URL(request.url);
  const name = url.searchParams.get('name');
  const query = url.searchParams.get('query');
  if (!name && !query) return json({ error: 'name or query required' }, 400);
  if (!env.UNSPLASH_ACCESS_KEY && !env.DRINK_DB) return missingSecret('UNSPLASH_ACCESS_KEY');

  const cache = caches.default;
  const normalize = (value) => (value || '').trim().toLowerCase().replace(/[・\s.\-]/g, '');
  const cacheIdentity = normalize(name) || normalize(query);
  const cacheUrl = new URL('/api/drink-image', url.origin);
  cacheUrl.searchParams.set('key', cacheIdentity);
  const cacheKey = new Request(cacheUrl.toString(), { method: 'GET' });
  const cached = await cache.match(cacheKey);
  if (cached) {
    const body = await cached.clone().json().catch(() => null);
    if (body && typeof body === 'object') return json({ ...body, source: body.source || 'cloudflare-cache' }, cached.status, { 'cache-control': cached.headers.get('cache-control') || 'public, max-age=31536000' });
    return cached;
  }

  try {
    const stored = await readDrinkImageFromD1(env, cacheIdentity, context);
    if (stored) {
      const ttl = stored.url ? 31536000 : 2592000;
      const response = json(stored, 200, { 'cache-control': `public, max-age=${ttl}, stale-while-revalidate=604800` });
      context.waitUntil(cache.put(cacheKey, response.clone()));
      return response;
    }
  } catch (error) {
    console.error('D1 drink image lookup failed; falling back to Unsplash', error);
  }

  if (!env.UNSPLASH_ACCESS_KEY) return missingSecret('UNSPLASH_ACCESS_KEY');
  const searchQuery = query || `${name} cocktail drink`;
  const params = new URLSearchParams({
    query: searchQuery,
    per_page: '3',
    orientation: 'landscape',
  });
  const upstream = await fetch(`${UNSPLASH_ENDPOINT}?${params}`, {
    headers: { authorization: `Client-ID ${env.UNSPLASH_ACCESS_KEY}` },
  });
  if (!upstream.ok) return json({ error: 'Image service unavailable' }, 502);

  const data = await upstream.json();
  const photo = data.results?.[0];
  const rawUrl = photo?.urls?.regular;
  const imageUrl = rawUrl ? `${rawUrl.split('?')[0]}?w=800&auto=format&fit=crop` : null;
  const payload = {
    url: imageUrl,
    photoId: photo?.id || '',
    photographer: photo?.user?.name || '',
    photographerUrl: photo?.user?.links?.html || '',
    source: 'unsplash',
  };
  const ttl = imageUrl ? 31536000 : 2592000;
  const response = json(payload, 200, { 'cache-control': `public, max-age=${ttl}, stale-while-revalidate=604800` });
  context.waitUntil(cache.put(cacheKey, response.clone()));
  context.waitUntil(saveDrinkImageToD1(env, {
    cacheIdentity, name: name || '', query: searchQuery, ...payload,
  }).catch((error) => console.error('D1 drink image save failed', error)));
  return response;
}

export default {
  async fetch(request, env, context) {
    const { pathname } = new URL(request.url);
    try {
      if (pathname === '/health') {
        if (request.method !== 'GET') return json({ error: 'Method not allowed' }, 405, { allow: 'GET' });
        return json({ status: 'ok', service: 'bar-carila' }, 200, { 'cache-control': 'no-store' });
      }
      if (pathname === '/api/chat') return await chat(request, env);
      if (pathname === '/api/carila-chat') return await carilaChat(request, env);
      if (pathname === '/api/drink-meta') return await drinkMeta(request, env);
      if (pathname === '/api/drink-image') return await drinkImage(request, env, context);
      if (pathname.startsWith('/api/')) return json({ error: 'Not found' }, 404);
      if (pathname === '/carila') return Response.redirect(`${new URL(request.url).origin}/carila/`, 308);

      let response = await env.ASSETS.fetch(request);
      if (request.method === 'GET' && (pathname === '/' || pathname === '/index.html')) {
        response = optimizeBarCarilaHtml(response);
      }
      return cacheStaticAsset(response, pathname);
    } catch (error) {
      console.error('Worker request failed', error);
      return json({ error: 'Internal server error' }, 500);
    }
  },
};
