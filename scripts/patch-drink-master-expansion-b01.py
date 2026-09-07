from pathlib import Path

path = Path('src/worker-v1.9.mjs')
source = path.read_text()

old_import = "import { JP_RARITY_V19_SEED_ROWS, JP_RARITY_V19_JA_NAMES, JP_RARITY_V19_BASE_SPIRIT_BY_KEY, normalizeDrinkV19Key } from './drink-master-v1.9-master.mjs';\n"
new_import = old_import + "import { DRINK_MASTER_EXPANSION_B01, DRINK_MASTER_EXPANSION_B01_SEED_ROWS, DRINK_MASTER_EXPANSION_B01_ALIAS_ENTRIES, DRINK_MASTER_EXPANSION_B01_EVIDENCE_VERSION, DRINK_MASTER_EXPANSION_B01_EVALUATED_AT } from './drink-master-expansion-b01.mjs';\n"
if old_import not in source:
    raise SystemExit('v1.9 import marker not found')
source = source.replace(old_import, new_import, 1)

old_map = "const V19_BY_KEY = new Map(JP_RARITY_V19_SEED_ROWS.map((row) => [normalizeDrinkV19Key(row[0]), row]));"
new_map = "const V19_BY_KEY = new Map([...JP_RARITY_V19_SEED_ROWS, ...DRINK_MASTER_EXPANSION_B01_SEED_ROWS].map((row) => [normalizeDrinkV19Key(row[0]), row]));"
if old_map not in source:
    raise SystemExit('V19_BY_KEY marker not found')
source = source.replace(old_map, new_map, 1)

old_alias_tail = "  [normalizeDrinkV19Key('コープスリバイバーNo.2'), normalizeDrinkV19Key('Corpse Reviver')],\n]);\nlet v19Ready;"
new_alias_tail = "  [normalizeDrinkV19Key('コープスリバイバーNo.2'), normalizeDrinkV19Key('Corpse Reviver')],\n]);\nfor (const [alias, masterKey] of DRINK_MASTER_EXPANSION_B01_ALIAS_ENTRIES) {\n  LOOKUP_ALIASES.set(normalizeDrinkV19Key(alias), normalizeDrinkV19Key(masterKey));\n}\nconst ACCEPTED_EVIDENCE_VERSIONS = new Set([EVIDENCE_VERSION, DRINK_MASTER_EXPANSION_B01_EVIDENCE_VERSION]);\nlet v19Ready;"
if old_alias_tail not in source:
    raise SystemExit('alias tail marker not found')
source = source.replace(old_alias_tail, new_alias_tail, 1)

table_marker = "  await env.DRINK_DB.prepare(`CREATE TRIGGER IF NOT EXISTS protect_jp_rarity_v19"
insert_tables = """  await env.DRINK_DB.prepare(`CREATE TABLE IF NOT EXISTS drink_aliases (\n    alias_key TEXT PRIMARY KEY,\n    drink_id INTEGER NOT NULL,\n    alias_text TEXT NOT NULL,\n    language TEXT NOT NULL DEFAULT '',\n    created_at TEXT NOT NULL DEFAULT (datetime('now')),\n    FOREIGN KEY (drink_id) REFERENCES drinks(id)\n  )`).run();\n  await env.DRINK_DB.prepare(`CREATE TABLE IF NOT EXISTS drink_evidence (\n    id INTEGER PRIMARY KEY AUTOINCREMENT,\n    drink_id INTEGER NOT NULL,\n    evidence_type TEXT NOT NULL,\n    source_title TEXT NOT NULL DEFAULT '',\n    source_url TEXT NOT NULL DEFAULT '',\n    source_note TEXT NOT NULL DEFAULT '',\n    observed_at TEXT,\n    weight TEXT NOT NULL DEFAULT 'supporting',\n    created_at TEXT NOT NULL DEFAULT (datetime('now')),\n    FOREIGN KEY (drink_id) REFERENCES drinks(id)\n  )`).run();\n"""
if table_marker not in source:
    raise SystemExit('table marker not found')
source = source.replace(table_marker, insert_tables + table_marker, 1)

seed_marker = "async function seedV19IfNeeded(env) {\n  if (!env?.DRINK_DB) return;\n  if (await hasCurrentV19Seed(env)) return;\n  await seedV19(env);\n}"
seed_replacement = r'''async function hasExpansionB01Seed(env) {
  if (!env?.DRINK_DB) return false;
  try {
    const row = await env.DRINK_DB.prepare(`SELECT COUNT(*) AS count FROM drinks WHERE evidence_version = ?`)
      .bind(DRINK_MASTER_EXPANSION_B01_EVIDENCE_VERSION).first();
    return Number(row?.count || 0) >= DRINK_MASTER_EXPANSION_B01.length;
  } catch {
    return false;
  }
}

async function seedExpansionB01(env) {
  if (!env?.DRINK_DB) return;
  await ensureV19Tables(env);
  const statements = DRINK_MASTER_EXPANSION_B01.map((drink) => {
    const key = normalizeDrinkV19Key(drink.masterKey);
    return env.DRINK_DB.prepare(`INSERT INTO drinks (
      canonical_key, name_ja, name_en, category, base_spirit, drink_kind,
      japan_availability_score, japan_rarity_score, japan_rarity_label, japan_rarity_confidence,
      rarity_reason, evidence_version, evaluated_at, short_description, order_hint, updated_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, datetime('now'))
    ON CONFLICT(canonical_key) DO UPDATE SET
      name_ja = excluded.name_ja,
      name_en = excluded.name_en,
      category = excluded.category,
      base_spirit = excluded.base_spirit,
      drink_kind = excluded.drink_kind,
      japan_availability_score = excluded.japan_availability_score,
      japan_rarity_score = excluded.japan_rarity_score,
      japan_rarity_label = excluded.japan_rarity_label,
      japan_rarity_confidence = excluded.japan_rarity_confidence,
      rarity_reason = excluded.rarity_reason,
      evidence_version = excluded.evidence_version,
      evaluated_at = excluded.evaluated_at,
      short_description = excluded.short_description,
      order_hint = excluded.order_hint,
      updated_at = datetime('now')`)
      .bind(key, drink.nameJa, drink.masterKey, drink.category, drink.baseSpirit, drink.drinkKind,
        drink.availability, drink.rarity, drink.rarityLabel, drink.confidence, drink.rarityReason,
        DRINK_MASTER_EXPANSION_B01_EVIDENCE_VERSION, DRINK_MASTER_EXPANSION_B01_EVALUATED_AT,
        drink.shortDescription, drink.orderHint);
  });
  if (statements.length) await env.DRINK_DB.batch(statements);

  for (const drink of DRINK_MASTER_EXPANSION_B01) {
    const key = normalizeDrinkV19Key(drink.masterKey);
    const row = await env.DRINK_DB.prepare(`SELECT id FROM drinks WHERE canonical_key = ? LIMIT 1`).bind(key).first();
    if (!row?.id) continue;
    const aliasStatements = [drink.nameJa, ...drink.aliases].map((alias) => env.DRINK_DB.prepare(`INSERT INTO drink_aliases (
      alias_key, drink_id, alias_text, language
    ) VALUES (?, ?, ?, ?)
    ON CONFLICT(alias_key) DO UPDATE SET drink_id = excluded.drink_id, alias_text = excluded.alias_text, language = excluded.language`)
      .bind(normalizeDrinkV19Key(alias), row.id, alias, /[\u3040-\u30ff\u3400-\u9fff]/.test(alias) ? 'ja' : 'en'));
    if (aliasStatements.length) await env.DRINK_DB.batch(aliasStatements);

    for (const evidence of drink.evidence) {
      const exists = await env.DRINK_DB.prepare(`SELECT id FROM drink_evidence WHERE drink_id = ? AND source_url = ? LIMIT 1`)
        .bind(row.id, evidence.url).first();
      if (exists?.id) continue;
      await env.DRINK_DB.prepare(`INSERT INTO drink_evidence (
        drink_id, evidence_type, source_title, source_url, source_note, observed_at, weight
      ) VALUES (?, ?, ?, ?, ?, ?, ?)`)
        .bind(row.id, evidence.type, evidence.title, evidence.url, evidence.note, DRINK_MASTER_EXPANSION_B01_EVALUATED_AT, 'supporting').run();
    }
  }
}

async function seedV19IfNeeded(env) {
  if (!env?.DRINK_DB) return;
  if (!(await hasCurrentV19Seed(env))) await seedV19(env);
  if (!(await hasExpansionB01Seed(env))) await seedExpansionB01(env);
}'''
if seed_marker not in source:
    raise SystemExit('seedV19IfNeeded marker not found')
source = source.replace(seed_marker, seed_replacement, 1)

old_accept = "    if (!row || row.evidence_version !== EVIDENCE_VERSION) return null;"
new_accept = "    if (!row || !ACCEPTED_EVIDENCE_VERSIONS.has(row.evidence_version)) return null;"
if old_accept not in source:
    raise SystemExit('evidence acceptance marker not found')
source = source.replace(old_accept, new_accept, 1)

old_export = "export { JP_RARITY_V19_SEED_ROWS as V19_ROWS, rarityLabel, rarityReason, canonicalLookupKey, enrichV19Response, hasCurrentV19Seed };"
new_export = "export { JP_RARITY_V19_SEED_ROWS as V19_ROWS, rarityLabel, rarityReason, canonicalLookupKey, enrichV19Response, hasCurrentV19Seed, hasExpansionB01Seed };"
if old_export not in source:
    raise SystemExit('export marker not found')
source = source.replace(old_export, new_export, 1)

path.write_text(source)
