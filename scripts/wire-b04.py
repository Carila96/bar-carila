from pathlib import Path
p=Path('src/worker-v1.9.mjs')
s=p.read_text()
imp="import { DRINK_MASTER_EXPANSION_B03, DRINK_MASTER_EXPANSION_B03_SEED_ROWS, DRINK_MASTER_EXPANSION_B03_ALIAS_ENTRIES, DRINK_MASTER_EXPANSION_B03_EVIDENCE_VERSION, DRINK_MASTER_EXPANSION_B03_EVALUATED_AT } from './drink-master-expansion-b03.mjs';"
add="import { DRINK_MASTER_EXPANSION_B04, DRINK_MASTER_EXPANSION_B04_SEED_ROWS, DRINK_MASTER_EXPANSION_B04_ALIAS_ENTRIES, DRINK_MASTER_EXPANSION_B04_EVIDENCE_VERSION, DRINK_MASTER_EXPANSION_B04_EVALUATED_AT } from './drink-master-expansion-b04.mjs';"
if add not in s:
    if imp not in s: raise SystemExit('b03 import marker missing')
    s=s.replace(imp,imp+'\n'+add,1)
s=s.replace("...DRINK_MASTER_EXPANSION_B03_SEED_ROWS].map", "...DRINK_MASTER_EXPANSION_B03_SEED_ROWS, ...DRINK_MASTER_EXPANSION_B04_SEED_ROWS].map",1)
marker="for (const [alias, masterKey] of DRINK_MASTER_EXPANSION_B03_ALIAS_ENTRIES) {\n  LOOKUP_ALIASES.set(normalizeDrinkV19Key(alias), normalizeDrinkV19Key(masterKey));\n}\n"
if 'for (const [alias, masterKey] of DRINK_MASTER_EXPANSION_B04_ALIAS_ENTRIES)' not in s:
    if marker not in s: raise SystemExit('b03 alias marker missing')
    s=s.replace(marker,marker+"for (const [alias, masterKey] of DRINK_MASTER_EXPANSION_B04_ALIAS_ENTRIES) {\n  LOOKUP_ALIASES.set(normalizeDrinkV19Key(alias), normalizeDrinkV19Key(masterKey));\n}\n",1)
s=s.replace("DRINK_MASTER_EXPANSION_B03_EVIDENCE_VERSION]);", "DRINK_MASTER_EXPANSION_B03_EVIDENCE_VERSION, DRINK_MASTER_EXPANSION_B04_EVIDENCE_VERSION]);",1)
funcs=r'''async function hasExpansionB04Seed(env) {
  if (!env?.DRINK_DB) return false;
  try {
    const row = await env.DRINK_DB.prepare(`SELECT COUNT(*) AS count FROM drinks WHERE evidence_version = ?`)
      .bind(DRINK_MASTER_EXPANSION_B04_EVIDENCE_VERSION).first();
    return Number(row?.count || 0) >= DRINK_MASTER_EXPANSION_B04.length;
  } catch {
    return false;
  }
}

async function seedExpansionB04(env) {
  if (!env?.DRINK_DB) return;
  await ensureV19Tables(env);
  const statements = DRINK_MASTER_EXPANSION_B04.map((drink) => {
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
        DRINK_MASTER_EXPANSION_B04_EVIDENCE_VERSION, DRINK_MASTER_EXPANSION_B04_EVALUATED_AT,
        drink.shortDescription, drink.orderHint);
  });
  if (statements.length) await env.DRINK_DB.batch(statements);
  for (const drink of DRINK_MASTER_EXPANSION_B04) {
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
        .bind(row.id, evidence.type, evidence.title, evidence.url, evidence.note, DRINK_MASTER_EXPANSION_B04_EVALUATED_AT, 'supporting').run();
    }
  }
}

'''
if 'async function hasExpansionB04Seed' not in s:
    marker2='async function seedV19IfNeeded(env) {'
    if marker2 not in s: raise SystemExit('seed marker missing')
    s=s.replace(marker2,funcs+marker2,1)
s=s.replace("  if (!(await hasExpansionB03Seed(env))) await seedExpansionB03(env);", "  if (!(await hasExpansionB03Seed(env))) await seedExpansionB03(env);\n  if (!(await hasExpansionB04Seed(env))) await seedExpansionB04(env);",1)
s=s.replace('hasExpansionB02Seed, hasExpansionB03Seed };','hasExpansionB02Seed, hasExpansionB03Seed, hasExpansionB04Seed };',1)
p.write_text(s)
