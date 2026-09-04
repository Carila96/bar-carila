const fs = require('fs');
const path = 'src/worker.mjs';
let s = fs.readFileSync(path, 'utf8');

const seed = [
['ジントニック',98,2,'定番',0.98,'日本の一般BARで非常に成立しやすい定番カクテル。'],
['モスコミュール',95,5,'定番',0.96,'日本の一般BARで広く認知され、材料も揃いやすい。'],
['ギムレット',93,7,'定番',0.96,'国内のスタンダードカクテルとして認知度が高い。'],
['マティーニ',92,8,'定番',0.96,'国内のカクテルBARで代表的なスタンダード。'],
['マルガリータ',90,10,'定番',0.95,'国内でも定番性が高く、基本材料で成立しやすい。'],
['ダイキリ',88,12,'定番',0.94,'国内のスタンダードとして認知され、材料も基本的。'],
['サイドカー',86,14,'定番',0.93,'国内のクラシックカクテルとして標準性が高い。'],
['ソルティドッグ',86,14,'定番',0.93,'材料が一般的で日本のBARでも成立しやすい。'],
['ブラッディメアリー',85,15,'比較的よくある',0.92,'日本でもよく知られ、材料も比較的揃いやすい。'],
['マンハッタン',84,16,'比較的よくある',0.91,'クラシックとして高認知で、カクテルBARで成立しやすい。'],
['モヒート',84,16,'比較的よくある',0.91,'国内提供は多いが、生ミント常備の有無で店差が出る。'],
['カンパリソーダ',83,17,'比較的よくある',0.91,'国内流通が良く、一般BARでも作りやすい。'],
['キューバリバー',82,18,'比較的よくある',0.90,'基本材料で成立しやすく国内でも認知されている。'],
['カルーアミルク',82,18,'比較的よくある',0.90,'材料が容易で国内でも広く知られている。'],
['ジンフィズ',81,19,'比較的よくある',0.90,'国内スタンダードで基本的な技法と材料で成立する。'],
['ジンリッキー',80,20,'比較的よくある',0.89,'基本材料で作りやすく国内専門書でも標準群に入る。'],
['ミモザ',80,20,'比較的よくある',0.88,'ホテルやレストランを含め国内提供が広い。'],
['シャンディガフ',79,21,'比較的よくある',0.90,'材料が容易で日本でもよく知られている。'],
['レッドアイ',77,23,'比較的よくある',0.88,'材料が容易で国内でも一定の認知がある。'],
['ネグローニ',76,24,'比較的よくある',0.87,'国内提供例が多く材料流通も良好。'],
['オールドファッションド',74,26,'比較的よくある',0.87,'カクテルBARでは高認知だが全店共通の定番まではいかない。'],
['アレキサンダー',73,27,'比較的よくある',0.86,'国内スタンダード群で材料も比較的一般的。'],
['ベリーニ',72,28,'比較的よくある',0.85,'スパークリングワインを扱う店では成立しやすい。'],
['テキーラサンライズ',70,30,'やや珍しい',0.84,'材料は容易だが日本一般BARの定番度は一段下がる。'],
['スクリュードライバー',70,30,'やや珍しい',0.84,'材料は非常に容易だが名称注文の頻度は定番群より低い。'],
['ホワイトルシアン',68,32,'やや珍しい',0.82,'材料は比較的容易だが常時注文される定番ではない。'],
['ブラックルシアン',68,32,'やや珍しい',0.82,'材料は比較的容易だが一般BARでの頻度は中程度。'],
['シンガポールスリング',66,34,'やや珍しい',0.83,'高認知だが材料数が増え、店ごとの差が出る。'],
['フレンチ75',64,36,'やや珍しい',0.84,'国内提供例はあるがスパークリング常備店に寄りやすい。'],
['キール',65,35,'やや珍しい',0.82,'国内認知があり材料も比較的揃いやすい。'],
['キールロワイヤル',63,37,'やや珍しい',0.81,'スパークリングを常備する店では成立しやすい。'],
['ラスティネイル',62,38,'やや珍しい',0.80,'クラシックだがドランブイ常備の有無に左右される。'],
['ゴッドファーザー',62,38,'やや珍しい',0.80,'認知はあるがアマレット常備の有無で店差が出る。'],
['ロブロイ',60,40,'やや珍しい',0.78,'クラシックだが日本一般BARでの注文頻度は高くない。'],
['アペロールスプリッツ',60,40,'やや珍しい',0.86,'日本でも流通と提供例はあるが、一般BARの定番まではいかない。'],
['ブロンクス',57,43,'やや珍しい',0.77,'クラシックだが現代日本の一般BARでは頻度が低め。'],
['ロングアイランドアイスティー',58,42,'やや珍しい',0.85,'一般ショットバーで提供例はあるが材料数が多く店差が出る。'],
['グラスホッパー',60,40,'やや珍しい',0.85,'国内のカクテルバーで現役だがリキュール常備に左右される。'],
['パローマ',52,48,'やや珍しい',0.76,'世界では定番だが日本一般BARではテキーラ系材料の常備に店差がある。'],
['ミントジュレップ',58,42,'やや珍しい',0.86,'国内提供例は複数あるが生ミント常備と季節性に左右される。'],
['カイピリーニャ',50,50,'珍しい',0.80,'国内提供例はあるがカシャッサ常備が主要な制約。'],
['マイタイ',46,54,'珍しい',0.76,'材料数と店のスタイルに依存し一般BARでは店差が大きい。'],
['ピニャコラーダ',45,55,'珍しい',0.76,'ココナッツ系材料や提供スタイルに依存する。'],
['ピスコサワー',38,62,'珍しい',0.78,'日本では提供例が専門業態に寄り、ピスコ常備率が制約。'],
['アメリカーノ',62,38,'やや珍しい',0.86,'材料は一般的で国内BARの実メニューにも確認できる。'],
['サゼラック',36,64,'珍しい',0.72,'クラシックだが材料常備と専門性への依存が大きい。'],
['コープスリバイバー No.2',34,66,'珍しい',0.78,'国内でも現役だが専門性と材料依存が大きい。'],
['ラモスジンフィズ',26,74,'かなり珍しい',0.74,'材料、技法、提供時間の制約が大きい。'],
['ヴューカレ',24,76,'かなり珍しい',0.69,'複数の特殊材料と専門性に依存する。'],
['トリニダードサワー',18,82,'かなり珍しい',0.65,'ビターズを大量使用する特殊な構成で一般BAR標準から遠い。']
];

const block = `
let drinkMasterReady;
const DRINK_MASTER_SEED = ${JSON.stringify(seed)};
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
  return (value || '').trim().toLowerCase().replace(/[・\\s.\\-_]/g, '');
}

async function ensureDrinkMasterTables(env) {
  if (!env.DRINK_DB) return false;
  if (!drinkMasterReady) {
    drinkMasterReady = (async () => {
      await env.DRINK_DB.prepare(\`CREATE TABLE IF NOT EXISTS drinks (
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
      )\`).run();
      await env.DRINK_DB.prepare(\`CREATE TABLE IF NOT EXISTS drink_aliases (
        alias_key TEXT PRIMARY KEY,
        drink_id INTEGER NOT NULL,
        alias_text TEXT NOT NULL,
        language TEXT NOT NULL DEFAULT '',
        created_at TEXT NOT NULL DEFAULT (datetime('now')),
        FOREIGN KEY (drink_id) REFERENCES drinks(id)
      )\`).run();
      await env.DRINK_DB.prepare(\`CREATE TABLE IF NOT EXISTS drink_evidence (
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
      )\`).run();
      const countRow = await env.DRINK_DB.prepare('SELECT COUNT(*) AS count FROM drinks').first();
      if (Number(countRow?.count || 0) < DRINK_MASTER_SEED.length) {
        const statements = DRINK_MASTER_SEED.map(([name, availability, rarity, label, confidence, reason]) => env.DRINK_DB.prepare(\`INSERT OR IGNORE INTO drinks (
          canonical_key, name_ja, japan_availability_score, japan_rarity_score, japan_rarity_label,
          japan_rarity_confidence, rarity_reason, evidence_version, evaluated_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, 'jp-rarity-v1.3', '2026-09-04')\`).bind(
          normalizeDrinkMasterKey(name), name, availability, rarity, label, confidence, reason,
        ));
        if (typeof env.DRINK_DB.batch === 'function') await env.DRINK_DB.batch(statements);
        else for (const statement of statements) await statement.run();
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
  let row = await env.DRINK_DB.prepare(\`SELECT id, name_ja, name_en, category, base_spirit, drink_kind,
      japan_availability_score, japan_rarity_score, japan_rarity_label, japan_rarity_confidence,
      rarity_reason, taste_summary, origin_summary, short_description, order_hint, evidence_version, evaluated_at
    FROM drinks WHERE canonical_key = ? AND active = 1\`).bind(key).first();
  if (!row) {
    row = await env.DRINK_DB.prepare(\`SELECT d.id, d.name_ja, d.name_en, d.category, d.base_spirit, d.drink_kind,
        d.japan_availability_score, d.japan_rarity_score, d.japan_rarity_label, d.japan_rarity_confidence,
        d.rarity_reason, d.taste_summary, d.origin_summary, d.short_description, d.order_hint, d.evidence_version, d.evaluated_at
      FROM drink_aliases a JOIN drinks d ON d.id = a.drink_id
      WHERE a.alias_key = ? AND d.active = 1\`).bind(key).first();
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
`;

if (!s.includes('let drinkMasterReady;')) {
  s = s.replace('let drinkImageTableReady;\n', 'let drinkImageTableReady;\n' + block + '\n');
}
if (!s.includes("pathname === '/api/drink-meta'")) {
  s = s.replace("      if (pathname === '/api/drink-image') return await drinkImage(request, env, context);", "      if (pathname === '/api/drink-meta') return await drinkMeta(request, env);\n      if (pathname === '/api/drink-image') return await drinkImage(request, env, context);");
}
fs.writeFileSync(path, s);

const test = `import test from 'node:test';\nimport assert from 'node:assert/strict';\nimport fs from 'node:fs';\n\nconst source = fs.readFileSync(new URL('../src/worker.mjs', import.meta.url), 'utf8');\n\ntest('drink master creates D1 tables and seeds calibrated drinks', () => {\n  assert.match(source, /CREATE TABLE IF NOT EXISTS drinks/);\n  assert.match(source, /CREATE TABLE IF NOT EXISTS drink_aliases/);\n  assert.match(source, /CREATE TABLE IF NOT EXISTS drink_evidence/);\n  assert.match(source, /jp-rarity-v1\\.3/);\n  assert.match(source, /アペロールスプリッツ/);\n  assert.match(source, /ピスコサワー/);\n});\n\ntest('drink meta API exposes Japan rarity separately from availability', () => {\n  assert.match(source, /pathname === '\\/api\\/drink-meta'/);\n  assert.match(source, /japanAvailability: row\\.japan_availability_score/);\n  assert.match(source, /rarity: row\\.japan_rarity_score/);\n  assert.match(source, /rarityLabel: row\\.japan_rarity_label/);\n  assert.match(source, /confidence: row\\.japan_rarity_confidence/);\n});\n`;
fs.writeFileSync('test/drink-master.test.mjs', test);
