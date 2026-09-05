import baseWorker from './worker.mjs';
import { JP_RARITY_V19_ROWS } from './drink-master-v1.9-research.mjs';

const EVIDENCE_VERSION = 'jp-rarity-v1.9';
const EVALUATED_AT = '2026-09-05';
let v19Ready;

function normalizeKey(value) {
  return String(value || '').trim().toLowerCase().replace(/[・\s.\-_]/g, '');
}

function rarityLabel(rarity) {
  if (rarity <= 15) return '定番';
  if (rarity <= 30) return '比較的よくある';
  if (rarity <= 50) return 'やや珍しい';
  if (rarity <= 70) return '珍しい';
  return 'かなり珍しい';
}

function rarityReason(availability) {
  if (availability >= 85) return '日本のBARで名称注文が成立しやすく、現行提供または一般的な材料構成を確認。';
  if (availability >= 60) return '日本のBARで現行提供例または十分な標準性があり、材料・技法上も比較的成立しやすい。';
  if (availability >= 40) return '日本で認知・提供例はあるが、名称注文密度や材料・オペレーションに店差がある。';
  return '日本でレシピ認知はあるが、現行提供密度または専用材料・技法の制約が大きい。';
}

async function ensureV19Tables(env) {
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

  // The legacy v1.8 bootstrap in worker.mjs still runs for the original 150 rows.
  // Prevent that bootstrap from downgrading rows already normalized by v1.9.
  await env.DRINK_DB.prepare(`CREATE TRIGGER IF NOT EXISTS protect_jp_rarity_v19
    BEFORE UPDATE ON drinks
    WHEN OLD.evidence_version = '${EVIDENCE_VERSION}' AND NEW.evidence_version = 'jp-rarity-v1.8'
    BEGIN
      SELECT RAISE(IGNORE);
    END`).run();
}

async function seedV19(env) {
  if (!env.DRINK_DB) return;
  if (!v19Ready) {
    v19Ready = (async () => {
      await ensureV19Tables(env);
      const statements = JP_RARITY_V19_ROWS.map(([name, availability, rarity, confidence]) => {
        const label = rarityLabel(rarity);
        const reason = rarityReason(availability);
        return env.DRINK_DB.prepare(`INSERT INTO drinks (
          canonical_key, name_ja, japan_availability_score, japan_rarity_score,
          japan_rarity_label, japan_rarity_confidence, rarity_reason,
          evidence_version, evaluated_at, updated_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, datetime('now'))
        ON CONFLICT(canonical_key) DO UPDATE SET
          name_ja = excluded.name_ja,
          japan_availability_score = excluded.japan_availability_score,
          japan_rarity_score = excluded.japan_rarity_score,
          japan_rarity_label = excluded.japan_rarity_label,
          japan_rarity_confidence = excluded.japan_rarity_confidence,
          rarity_reason = excluded.rarity_reason,
          evidence_version = excluded.evidence_version,
          evaluated_at = excluded.evaluated_at,
          updated_at = datetime('now')`)
          .bind(normalizeKey(name), name, availability, rarity, label, confidence, reason, EVIDENCE_VERSION, EVALUATED_AT);
      });
      if (statements.length) await env.DRINK_DB.batch(statements);
    })().catch((error) => {
      v19Ready = undefined;
      throw error;
    });
  }
  await v19Ready;
}

export default {
  async fetch(request, env, ctx) {
    await seedV19(env);
    return baseWorker.fetch(request, env, ctx);
  }
};
