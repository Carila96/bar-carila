import baseWorker from './worker.mjs';
import { JP_RARITY_V19_SEED_ROWS, normalizeDrinkV19Key } from './drink-master-v1.9-master.mjs';

const EVIDENCE_VERSION = 'jp-rarity-v1.9';
const EVALUATED_AT = '2026-09-05';
const V19_BY_KEY = new Map(JP_RARITY_V19_SEED_ROWS.map((row) => [normalizeDrinkV19Key(row[0]), row]));
let v19Ready;

function rarityLabel(rarity) {
  if (rarity <= 15) return '定番';
  if (rarity <= 35) return '比較的よくある';
  if (rarity <= 55) return 'やや珍しい';
  if (rarity <= 70) return '珍しい';
  return 'かなり珍しい';
}

function rarityReason(availability) {
  if (availability >= 85) return '国内で現行提供が広く、材料・運用面でも成立しやすい。';
  if (availability >= 60) return '国内で現行提供を確認でき、一般的なBARでも比較的成立しやすいが店差がある。';
  if (availability >= 40) return '国内提供例はあるが、名称定着・専用材料・運用のいずれかで店差が大きい。';
  return '国内の現行提供密度が低く、専用材料または特殊な運用を要するため成立店が限られる。';
}

async function ensureV19Tables(env) {
  if (!env.DRINK_DB) return;
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
  await env.DRINK_DB.prepare(`CREATE TRIGGER IF NOT EXISTS protect_jp_rarity_v19
    BEFORE UPDATE ON drinks
    WHEN OLD.evidence_version = '${EVIDENCE_VERSION}' AND NEW.evidence_version = 'jp-rarity-v1.8'
    BEGIN SELECT RAISE(IGNORE); END`).run();
}

async function seedV19(env) {
  if (!env.DRINK_DB) return;
  await ensureV19Tables(env);
  const statements = JP_RARITY_V19_SEED_ROWS.map(([name, availability, rarity, confidence]) =>
    env.DRINK_DB.prepare(`INSERT INTO drinks (
      canonical_key, name_ja, name_en, japan_availability_score, japan_rarity_score,
      japan_rarity_label, japan_rarity_confidence, rarity_reason, evidence_version, evaluated_at, updated_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, datetime('now'))
    ON CONFLICT(canonical_key) DO UPDATE SET
      name_ja = excluded.name_ja,
      name_en = CASE WHEN drinks.name_en = '' THEN excluded.name_en ELSE drinks.name_en END,
      japan_availability_score = excluded.japan_availability_score,
      japan_rarity_score = excluded.japan_rarity_score,
      japan_rarity_label = excluded.japan_rarity_label,
      japan_rarity_confidence = excluded.japan_rarity_confidence,
      rarity_reason = excluded.rarity_reason,
      evidence_version = excluded.evidence_version,
      evaluated_at = excluded.evaluated_at,
      updated_at = datetime('now')`)
      .bind(normalizeDrinkV19Key(name), name, name, availability, rarity, rarityLabel(rarity), confidence, rarityReason(availability), EVIDENCE_VERSION, EVALUATED_AT)
  );
  for (let i = 0; i < statements.length; i += 80) await env.DRINK_DB.batch(statements.slice(i, i + 80));
}

function ensureV19Seed(env) {
  if (!v19Ready) v19Ready = seedV19(env).catch((error) => { v19Ready = undefined; throw error; });
  return v19Ready;
}

async function addMasterKeyInstruction(request) {
  if (request.method !== 'POST') return request;
  let body;
  try { body = await request.clone().json(); } catch { return request; }
  if (!body || typeof body !== 'object' || typeof body.system !== 'string') return request;
  body.system += '\n\n【BarCarila固定マスター照合】最終回答が recommendation の場合、drink.masterKey にそのカクテルの標準的な英語名を必ず入れてください（例: Gin and Tonic, Moscow Mule）。既存フィールドは変更しないでください。';
  return new Request(request, { body: JSON.stringify(body) });
}

async function enrichV19Response(response) {
  if (!response.ok || !String(response.headers.get('content-type') || '').includes('application/json')) return response;
  let data;
  try { data = await response.clone().json(); } catch { return response; }
  const textItem = data?.content?.find((item) => item?.type === 'text' && typeof item.text === 'string');
  if (!textItem) return response;
  let parsed;
  try { parsed = JSON.parse(textItem.text.replace(/```json|```/g, '').trim()); } catch { return response; }
  if (parsed?.type !== 'recommendation' || !parsed?.drink) return response;
  const lookup = parsed.drink.masterKey || parsed.drink.name || '';
  const row = V19_BY_KEY.get(normalizeDrinkV19Key(lookup));
  if (!row) return response;
  const [, availability, rarity, confidence] = row;
  parsed.drink.rarity = rarity;
  parsed.drink.rarityLabel = rarityLabel(rarity);
  parsed.drink.rarityConfidence = confidence;
  parsed.drink.rarityReason = rarityReason(availability);
  parsed.drink.masterSource = 'd1';
  parsed.drink.evidenceVersion = EVIDENCE_VERSION;
  textItem.text = JSON.stringify(parsed);
  const headers = new Headers(response.headers);
  headers.set('content-type', 'application/json; charset=utf-8');
  return new Response(JSON.stringify(data), { status: response.status, headers });
}

export { JP_RARITY_V19_SEED_ROWS as V19_ROWS, rarityLabel, rarityReason, enrichV19Response };

export default {
  async fetch(request, env, context) {
    try { await ensureV19Seed(env); } catch (error) { console.error('v1.9 D1 seed failed', error); }
    const { pathname } = new URL(request.url);
    const effectiveRequest = pathname === '/api/chat' ? await addMasterKeyInstruction(request) : request;
    const response = await baseWorker.fetch(effectiveRequest, env, context);
    return pathname === '/api/chat' ? enrichV19Response(response) : response;
  }
};
