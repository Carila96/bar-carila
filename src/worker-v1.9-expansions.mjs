import baseWorker from './worker-v1.9.mjs';
import { DRINK_MASTER_EXPANSION_B09, DRINK_MASTER_EXPANSION_B09_EVIDENCE_VERSION, DRINK_MASTER_EXPANSION_B09_EVALUATED_AT } from './drink-master-expansion-b09.mjs';
import { DRINK_MASTER_EXPANSION_B10, DRINK_MASTER_EXPANSION_B10_EVIDENCE_VERSION, DRINK_MASTER_EXPANSION_B10_EVALUATED_AT } from './drink-master-expansion-b10.mjs';
import { DRINK_MASTER_EXPANSION_B11, DRINK_MASTER_EXPANSION_B11_EVIDENCE_VERSION, DRINK_MASTER_EXPANSION_B11_EVALUATED_AT } from './drink-master-expansion-b11.mjs';
import { DRINK_MASTER_EXPANSION_B12, DRINK_MASTER_EXPANSION_B12_EVIDENCE_VERSION, DRINK_MASTER_EXPANSION_B12_EVALUATED_AT } from './drink-master-expansion-b12.mjs';
import { DRINK_MASTER_EXPANSION_B13, DRINK_MASTER_EXPANSION_B13_EVIDENCE_VERSION, DRINK_MASTER_EXPANSION_B13_EVALUATED_AT } from './drink-master-expansion-b13.mjs';
import { DRINK_MASTER_EXPANSION_B14, DRINK_MASTER_EXPANSION_B14_EVIDENCE_VERSION, DRINK_MASTER_EXPANSION_B14_EVALUATED_AT } from './drink-master-expansion-b14.mjs';
import { DRINK_MASTER_EXPANSION_B15, DRINK_MASTER_EXPANSION_B15_EVIDENCE_VERSION, DRINK_MASTER_EXPANSION_B15_EVALUATED_AT } from './drink-master-expansion-b15.mjs';
import { DRINK_MASTER_EXPANSION_B16, DRINK_MASTER_EXPANSION_B16_EVIDENCE_VERSION, DRINK_MASTER_EXPANSION_B16_EVALUATED_AT } from './drink-master-expansion-b16.mjs';
import { DRINK_MASTER_EXPANSION_B17, DRINK_MASTER_EXPANSION_B17_EVIDENCE_VERSION, DRINK_MASTER_EXPANSION_B17_EVALUATED_AT } from './drink-master-expansion-b17.mjs';
import { normalizeDrinkV19Key } from './drink-master-v1.9-master.mjs';

const EXPANSION_BATCHES = [
  { id: 'B09', drinks: DRINK_MASTER_EXPANSION_B09, evidenceVersion: DRINK_MASTER_EXPANSION_B09_EVIDENCE_VERSION, evaluatedAt: DRINK_MASTER_EXPANSION_B09_EVALUATED_AT },
  { id: 'B10', drinks: DRINK_MASTER_EXPANSION_B10, evidenceVersion: DRINK_MASTER_EXPANSION_B10_EVIDENCE_VERSION, evaluatedAt: DRINK_MASTER_EXPANSION_B10_EVALUATED_AT },
  { id: 'B11', drinks: DRINK_MASTER_EXPANSION_B11, evidenceVersion: DRINK_MASTER_EXPANSION_B11_EVIDENCE_VERSION, evaluatedAt: DRINK_MASTER_EXPANSION_B11_EVALUATED_AT },
  { id: 'B12', drinks: DRINK_MASTER_EXPANSION_B12, evidenceVersion: DRINK_MASTER_EXPANSION_B12_EVIDENCE_VERSION, evaluatedAt: DRINK_MASTER_EXPANSION_B12_EVALUATED_AT },
  { id: 'B13', drinks: DRINK_MASTER_EXPANSION_B13, evidenceVersion: DRINK_MASTER_EXPANSION_B13_EVIDENCE_VERSION, evaluatedAt: DRINK_MASTER_EXPANSION_B13_EVALUATED_AT },
  { id: 'B14', drinks: DRINK_MASTER_EXPANSION_B14, evidenceVersion: DRINK_MASTER_EXPANSION_B14_EVIDENCE_VERSION, evaluatedAt: DRINK_MASTER_EXPANSION_B14_EVALUATED_AT },
  { id: 'B15', drinks: DRINK_MASTER_EXPANSION_B15, evidenceVersion: DRINK_MASTER_EXPANSION_B15_EVIDENCE_VERSION, evaluatedAt: DRINK_MASTER_EXPANSION_B15_EVALUATED_AT },
  { id: 'B16', drinks: DRINK_MASTER_EXPANSION_B16, evidenceVersion: DRINK_MASTER_EXPANSION_B16_EVIDENCE_VERSION, evaluatedAt: DRINK_MASTER_EXPANSION_B16_EVALUATED_AT },
  { id: 'B17', drinks: DRINK_MASTER_EXPANSION_B17, evidenceVersion: DRINK_MASTER_EXPANSION_B17_EVIDENCE_VERSION, evaluatedAt: DRINK_MASTER_EXPANSION_B17_EVALUATED_AT },
];

const readyByVersion = new Map();
const expansionLookup = new Map();
for (const batch of EXPANSION_BATCHES) {
  for (const drink of batch.drinks) {
    const record = { ...drink, evidenceVersion: batch.evidenceVersion };
    for (const candidate of [drink.masterKey, drink.nameJa, ...(drink.aliases || [])]) {
      expansionLookup.set(normalizeDrinkV19Key(candidate), record);
    }
  }
}

async function ensureExpansionTables(env) {
  if (!env?.DRINK_DB) return;
  await env.DRINK_DB.prepare(`CREATE TABLE IF NOT EXISTS drinks (id INTEGER PRIMARY KEY AUTOINCREMENT,canonical_key TEXT NOT NULL UNIQUE,name_ja TEXT NOT NULL,name_en TEXT NOT NULL DEFAULT '',category TEXT NOT NULL DEFAULT '',base_spirit TEXT NOT NULL DEFAULT '',drink_kind TEXT NOT NULL DEFAULT 'cocktail',japan_availability_score INTEGER,japan_rarity_score INTEGER,japan_rarity_label TEXT NOT NULL DEFAULT '',japan_rarity_confidence REAL,rarity_reason TEXT NOT NULL DEFAULT '',evidence_version TEXT NOT NULL DEFAULT '',evaluated_at TEXT,taste_summary TEXT NOT NULL DEFAULT '',origin_summary TEXT NOT NULL DEFAULT '',short_description TEXT NOT NULL DEFAULT '',order_hint TEXT NOT NULL DEFAULT '',global_popularity_score INTEGER,active INTEGER NOT NULL DEFAULT 1,created_at TEXT NOT NULL DEFAULT (datetime('now')),updated_at TEXT NOT NULL DEFAULT (datetime('now')))` ).run();
  await env.DRINK_DB.prepare(`CREATE TABLE IF NOT EXISTS drink_aliases (alias_key TEXT PRIMARY KEY,drink_id INTEGER NOT NULL,alias_text TEXT NOT NULL,language TEXT NOT NULL DEFAULT '',created_at TEXT NOT NULL DEFAULT (datetime('now')),FOREIGN KEY (drink_id) REFERENCES drinks(id))`).run();
  await env.DRINK_DB.prepare(`CREATE TABLE IF NOT EXISTS drink_evidence (id INTEGER PRIMARY KEY AUTOINCREMENT,drink_id INTEGER NOT NULL,evidence_type TEXT NOT NULL,source_title TEXT NOT NULL DEFAULT '',source_url TEXT NOT NULL DEFAULT '',source_note TEXT NOT NULL DEFAULT '',observed_at TEXT,weight TEXT NOT NULL DEFAULT 'supporting',created_at TEXT NOT NULL DEFAULT (datetime('now')),FOREIGN KEY (drink_id) REFERENCES drinks(id))`).run();
}

async function hasBatch(env, evidenceVersion, length) {
  if (!env?.DRINK_DB) return true;
  try {
    const row = await env.DRINK_DB.prepare('SELECT COUNT(*) AS count FROM drinks WHERE evidence_version = ?').bind(evidenceVersion).first();
    return Number(row?.count || 0) >= length;
  } catch {
    return false;
  }
}

async function seedBatch(env, drinks, evidenceVersion, evaluatedAt) {
  if (!env?.DRINK_DB) return;
  await ensureExpansionTables(env);
  for (const drink of drinks) {
    const key = normalizeDrinkV19Key(drink.masterKey);
    await env.DRINK_DB.prepare(`INSERT INTO drinks (canonical_key,name_ja,name_en,category,base_spirit,drink_kind,japan_availability_score,japan_rarity_score,japan_rarity_label,japan_rarity_confidence,rarity_reason,evidence_version,evaluated_at,short_description,order_hint,updated_at) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,datetime('now')) ON CONFLICT(canonical_key) DO UPDATE SET name_ja=excluded.name_ja,name_en=excluded.name_en,category=excluded.category,base_spirit=excluded.base_spirit,drink_kind=excluded.drink_kind,japan_availability_score=excluded.japan_availability_score,japan_rarity_score=excluded.japan_rarity_score,japan_rarity_label=excluded.japan_rarity_label,japan_rarity_confidence=excluded.japan_rarity_confidence,rarity_reason=excluded.rarity_reason,evidence_version=excluded.evidence_version,evaluated_at=excluded.evaluated_at,short_description=excluded.short_description,order_hint=excluded.order_hint,updated_at=datetime('now')`).bind(key,drink.nameJa,drink.masterKey,drink.category,drink.baseSpirit,drink.drinkKind,drink.availability,drink.rarity,drink.rarityLabel,drink.confidence,drink.rarityReason,evidenceVersion,evaluatedAt,drink.shortDescription,drink.orderHint).run();
    const row = await env.DRINK_DB.prepare('SELECT id FROM drinks WHERE canonical_key = ? LIMIT 1').bind(key).first();
    if (!row?.id) continue;
    for (const alias of [drink.nameJa, ...(drink.aliases || [])]) {
      await env.DRINK_DB.prepare(`INSERT INTO drink_aliases (alias_key,drink_id,alias_text,language) VALUES (?,?,?,?) ON CONFLICT(alias_key) DO UPDATE SET drink_id=excluded.drink_id,alias_text=excluded.alias_text,language=excluded.language`).bind(normalizeDrinkV19Key(alias),row.id,alias,/[぀-ヿ㐀-鿿]/.test(alias)?'ja':'en').run();
    }
    for (const evidence of drink.evidence || []) {
      const exists = await env.DRINK_DB.prepare('SELECT id FROM drink_evidence WHERE drink_id = ? AND source_url = ? AND source_title = ? LIMIT 1').bind(row.id,evidence.url,evidence.title).first();
      if (!exists?.id) await env.DRINK_DB.prepare('INSERT INTO drink_evidence (drink_id,evidence_type,source_title,source_url,source_note,observed_at,weight) VALUES (?,?,?,?,?,?,?)').bind(row.id,evidence.type,evidence.title,evidence.url,evidence.note,evaluatedAt,'supporting').run();
    }
  }
}

function ensureBatch(env, batch) {
  if (!env?.DRINK_DB) return Promise.resolve();
  const current = readyByVersion.get(batch.evidenceVersion);
  if (current) return current;
  const promise = (async () => {
    if (!(await hasBatch(env, batch.evidenceVersion, batch.drinks.length))) {
      await seedBatch(env, batch.drinks, batch.evidenceVersion, batch.evaluatedAt);
    }
  })().catch((error) => {
    readyByVersion.delete(batch.evidenceVersion);
    console.error(`${batch.id} seed failed`, error);
  });
  readyByVersion.set(batch.evidenceVersion, promise);
  return promise;
}

function parseJsonText(text) {
  if (typeof text !== 'string') return null;
  const cleaned = text.replace(/```json|```/g, '').trim();
  try { return JSON.parse(cleaned); } catch {}
  const first = cleaned.indexOf('{');
  const last = cleaned.lastIndexOf('}');
  if (first < 0 || last <= first) return null;
  try { return JSON.parse(cleaned.slice(first, last + 1)); } catch { return null; }
}

function findExpansionDrink(candidates) {
  for (const candidate of candidates) {
    const match = expansionLookup.get(normalizeDrinkV19Key(candidate));
    if (match) return match;
  }
  return null;
}

async function readExpansionFromD1(env, drink) {
  if (!env?.DRINK_DB || !drink) return null;
  try {
    const row = await env.DRINK_DB.prepare(`SELECT canonical_key,japan_availability_score,japan_rarity_score,japan_rarity_label,japan_rarity_confidence,rarity_reason,evidence_version FROM drinks WHERE canonical_key = ? LIMIT 1`).bind(normalizeDrinkV19Key(drink.masterKey)).first();
    if (!row || row.evidence_version !== drink.evidenceVersion) return null;
    return row;
  } catch (error) {
    console.error('expansion D1 lookup failed', error);
    return null;
  }
}

async function enrichExpansionResponse(response, env) {
  const started = Date.now();
  if (!response.ok || !String(response.headers.get('content-type') || '').includes('application/json')) return response;
  let data;
  try { data = await response.clone().json(); } catch { return response; }
  const textItem = data?.content?.find((item) => item?.type === 'text' && typeof item.text === 'string') || data?.content?.find((item) => typeof item?.text === 'string');
  if (!textItem) return response;
  const parsed = parseJsonText(textItem.text);
  if (parsed?.type !== 'recommendation' || !parsed?.drink) return response;

  const known = findExpansionDrink([parsed.drink.masterKey, parsed.drink.name].filter(Boolean));
  if (!known) return response;

  const d1Row = await readExpansionFromD1(env, known);
  if (d1Row) {
    parsed.drink.rarity = d1Row.japan_rarity_score;
    parsed.drink.rarityLabel = d1Row.japan_rarity_label || known.rarityLabel;
    parsed.drink.rarityConfidence = d1Row.japan_rarity_confidence;
    parsed.drink.rarityReason = d1Row.rarity_reason || known.rarityReason;
    parsed.drink.masterSource = 'd1';
    parsed.drink.evidenceVersion = d1Row.evidence_version;
  } else {
    parsed.drink.rarity = known.rarity;
    parsed.drink.rarityLabel = known.rarityLabel;
    parsed.drink.rarityConfidence = known.confidence;
    parsed.drink.rarityReason = known.rarityReason;
    parsed.drink.masterSource = 'embedded-expansion';
    parsed.drink.evidenceVersion = known.evidenceVersion;
  }

  data.content = [{ type: 'text', text: JSON.stringify(parsed) }];
  const headers = new Headers(response.headers);
  headers.set('content-type', 'application/json; charset=utf-8');
  const currentTiming = headers.get('server-timing');
  headers.set('server-timing', [currentTiming, `expansion-enrich;dur=${Date.now() - started}`].filter(Boolean).join(', '));
  return new Response(JSON.stringify(data), { status: response.status, headers });
}

export { EXPANSION_BATCHES, expansionLookup, enrichExpansionResponse };

export default {
  async fetch(request, env, ctx) {
    const maintenance = Promise.allSettled(EXPANSION_BATCHES.map((batch) => ensureBatch(env, batch)));
    if (ctx?.waitUntil) ctx.waitUntil(maintenance);
    const response = await baseWorker.fetch(request, env, ctx);
    return enrichExpansionResponse(response, env);
  }
};
