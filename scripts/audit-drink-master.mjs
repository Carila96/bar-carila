import { writeFile } from 'node:fs/promises';
import { JP_RARITY_V19_SEED_ROWS, JP_RARITY_V19_JA_NAMES, JP_RARITY_V19_BASE_SPIRIT_BY_KEY, normalizeDrinkV19Key as normalize } from '../src/drink-master-v1.9-master.mjs';

export async function auditMaster() {
  const base = JP_RARITY_V19_SEED_ROWS.map(([masterKey, availability, rarity, confidence]) => ({ masterKey, nameJa: JP_RARITY_V19_JA_NAMES.get(normalize(masterKey)) || '', baseSpirit: JP_RARITY_V19_BASE_SPIRIT_BY_KEY.get(normalize(masterKey)), availability, rarity, confidence, batch: 'base400' }));
  const expansions = [];
  for (let i = 1; i <= 41; i++) {
    const id = String(i).padStart(2, '0');
    const module = await import(`../src/drink-master-expansion-b${id}${i >= 18 ? '-approved' : ''}.mjs`);
    expansions.push(...module[`DRINK_MASTER_EXPANSION_B${id}`].map(d => ({ ...d, batch: `B${id}` })));
  }
  const rows = [...base, ...expansions];
  const findings = [];
  const add = (kind, d, detail, severity = 'review') => findings.push({ kind, batch: d.batch, name: d.masterKey, detail, severity });
  const identities = new Map();
  const aliases = new Map();
  const recipeSignatures = new Map();
  const missing = Object.fromEntries(['nameJa','recipe','glass','garnish','imageQuery','category','drinkKind'].map(k => [k, 0]));
  for (const d of rows) {
    const key = normalize(d.masterKey);
    if (!key) add('empty-key', d, '', 'error');
    if (identities.has(key)) add('duplicate-key', d, identities.get(key), 'error');
    identities.set(key, d.masterKey);
    if (d.availability + d.rarity !== 100 || d.confidence < 0 || d.confidence > 1) add('score-range', d, '', 'error');
    for (const a of [d.masterKey, d.nameJa, ...(d.aliases || [])].filter(Boolean)) {
      const k = normalize(a);
      const previous = aliases.get(k);
      if (previous && previous !== key) add('alias-collision', d, `${a} => ${previous}`);
      aliases.set(k, key);
    }
    for (const k of Object.keys(missing)) if (!(d[k] || d.recipe?.[k])) missing[k]++;
    if (d.batch === 'base400') continue;
    if (!d.nameJa || !d.recipe?.ingredients?.length || !d.recipe?.method?.trim()) add('missing-required', d, 'name / ingredients / method', 'error');
    if (!d.imageQuery?.trim() || !d.shortDescription || !d.orderHint) add('missing-display', d, 'image query / description / order hint', 'error');
    if (!d.evidence?.length) add('missing-evidence', d, '', 'error');
    for (const e of d.evidence || []) if (!/^https:\/\//.test(e.url || '')) add('evidence-url', d, String(e.url), 'error');
    let totalMl = 0;
    for (const i of d.recipe?.ingredients || []) {
      if (!i.name?.trim() || !String(i.amount || '').trim()) add('ingredient-empty', d, JSON.stringify(i), 'error');
      const amount = String(i.amount || '');
      if (/^-|\bNaN\b|\bInfinity\b/.test(amount)) add('amount-invalid', d, amount, 'error');
      const match = amount.match(/^(\d+(?:\.\d+)?)\s*ml$/i);
      if (match) { totalMl += Number(match[1]); if (Number(match[1]) > 250 || Number(match[1]) === 0) add('amount-review', d, `${i.name}: ${amount}`); }
      else if (!(/^\d+(?:\/\d+)?$/.test(amount) && /egg|mint|lime|fruit|strawberry|leaf|grape|cherry|olive/i.test(i.name)) && !/ml|cl|oz|dash|drop|tsp|tbsp|適量|少量|個|枚|片|本|杯|滴|g\b|Top|fill|part|to taste|pinch|wedge|slice|piece|shot|spoon|tablespoon|leaves|grapes|fruit|cube|garnish|rim|splash|sprig|stick|whole|peel|rinse|scoop|squeeze|top up/i.test(amount)) add('unit-review', d, `${i.name}: ${amount}`);
    }
    if (totalMl > 350) add('volume-review', d, `${totalMl}ml`);
    const signature = (d.recipe?.ingredients || []).map(i => `${normalize(i.name)}:${String(i.amount).toLowerCase()}`).sort().join('|');
    if (signature && recipeSignatures.has(signature)) add('shared-recipe', d, recipeSignatures.get(signature));
    recipeSignatures.set(signature, d.masterKey);
    if (/non.?alcohol|mocktail|ノンアル/i.test(`${d.category} ${d.drinkKind} ${d.baseSpirit}`) && (d.recipe?.ingredients || []).some(i => /whisk|bourbon|vodka|\bgin\b|\brum\b|tequila|brandy|liqueur|vermouth|champagne|beer|wine/i.test(i.name) && !/non.?alcohol|0%|alcohol.?free/i.test(i.name))) add('non-alcohol-review', d, JSON.stringify(d.recipe.ingredients));
    if (/[<>\uFFFD]/.test(`${d.masterKey}${d.nameJa}`)) add('name-character', d, d.nameJa, 'error');
  }
  return { total: rows.length, base: base.length, expansion: expansions.length, uniqueKeys: identities.size, aliasKeys: aliases.size, missing, categories: Object.fromEntries([...new Set(rows.map(d => d.category || '(base: absent)'))].map(k => [k, rows.filter(d => (d.category || '(base: absent)') === k).length])), errors: findings.filter(f => f.severity === 'error').length, reviewCount: findings.filter(f => f.severity === 'review').length, findings, limitations: ['Repository embedded master only; deployed D1 contents were not read.', 'Base400 is rarity/identity data, not a complete recipe dataset.', 'No externally verified recipe correctness or semantic Japanese-English match.', 'Shared recipes and alias collisions require contextual review; no automatic merge.', 'Image queries are not image URLs; remote availability not verified.', 'No stored slug/id or affiliate SKU per drink: runtime/generated fields cannot be audited as persisted fields.'] };
}

if (process.argv[1]?.endsWith('audit-drink-master.mjs')) {
  const report = await auditMaster();
  if (process.argv[2]) await writeFile(process.argv[2], JSON.stringify(report, null, 2) + '\n');
  console.log(JSON.stringify({ ...report, findings: undefined }, null, 2));
  if (report.errors || report.total !== 1500) process.exitCode = 1;
}
