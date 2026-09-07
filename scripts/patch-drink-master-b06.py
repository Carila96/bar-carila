from pathlib import Path

p=Path('src/worker-v1.9.mjs')
s=p.read_text()
imp="import { DRINK_MASTER_EXPANSION_B05, DRINK_MASTER_EXPANSION_B05_SEED_ROWS, DRINK_MASTER_EXPANSION_B05_ALIAS_ENTRIES, DRINK_MASTER_EXPANSION_B05_EVIDENCE_VERSION, DRINK_MASTER_EXPANSION_B05_EVALUATED_AT } from './drink-master-expansion-b05.mjs';"
imp6="import { DRINK_MASTER_EXPANSION_B06, DRINK_MASTER_EXPANSION_B06_SEED_ROWS, DRINK_MASTER_EXPANSION_B06_ALIAS_ENTRIES, DRINK_MASTER_EXPANSION_B06_EVIDENCE_VERSION, DRINK_MASTER_EXPANSION_B06_EVALUATED_AT } from './drink-master-expansion-b06.mjs';"
if imp6 not in s:
    s=s.replace(imp,imp+'\n'+imp6,1)
s=s.replace('...DRINK_MASTER_EXPANSION_B05_SEED_ROWS].map', '...DRINK_MASTER_EXPANSION_B05_SEED_ROWS, ...DRINK_MASTER_EXPANSION_B06_SEED_ROWS].map',1)
loop5="for (const [alias, masterKey] of DRINK_MASTER_EXPANSION_B05_ALIAS_ENTRIES) {\n  LOOKUP_ALIASES.set(normalizeDrinkV19Key(alias), normalizeDrinkV19Key(masterKey));\n}"
loop6="for (const [alias, masterKey] of DRINK_MASTER_EXPANSION_B06_ALIAS_ENTRIES) {\n  LOOKUP_ALIASES.set(normalizeDrinkV19Key(alias), normalizeDrinkV19Key(masterKey));\n}"
if loop6 not in s:
    s=s.replace(loop5,loop5+'\n'+loop6,1)
s=s.replace('DRINK_MASTER_EXPANSION_B05_EVIDENCE_VERSION]);','DRINK_MASTER_EXPANSION_B05_EVIDENCE_VERSION, DRINK_MASTER_EXPANSION_B06_EVIDENCE_VERSION]);',1)
start=s.index('async function hasExpansionB05Seed')
end=s.index('\nasync function seedV19IfNeeded',start)
block=s[start:end]
block6=block.replace('B05','B06')
if 'async function hasExpansionB06Seed' not in s:
    s=s[:end]+'\n'+block6+s[end:]
s=s.replace('if (!(await hasExpansionB05Seed(env))) await seedExpansionB05(env);','if (!(await hasExpansionB05Seed(env))) await seedExpansionB05(env);\n  if (!(await hasExpansionB06Seed(env))) await seedExpansionB06(env);',1)
s=s.replace('hasExpansionB04Seed, hasExpansionB05Seed };','hasExpansionB04Seed, hasExpansionB05Seed, hasExpansionB06Seed };',1)
p.write_text(s)

t=Path('test/drink-master-expansion-b06.test.mjs')
t.write_text("""import test from 'node:test';
import assert from 'node:assert/strict';
import { BOOK_INDEX_V19_ROWS } from '../src/drink-master-v1.9-book-index.mjs';
import { normalizeDrinkV19Key } from '../src/drink-master-v1.9-master.mjs';
import { DRINK_MASTER_EXPANSION_B01 } from '../src/drink-master-expansion-b01.mjs';
import { DRINK_MASTER_EXPANSION_B02 } from '../src/drink-master-expansion-b02.mjs';
import { DRINK_MASTER_EXPANSION_B03 } from '../src/drink-master-expansion-b03.mjs';
import { DRINK_MASTER_EXPANSION_B04 } from '../src/drink-master-expansion-b04.mjs';
import { DRINK_MASTER_EXPANSION_B05 } from '../src/drink-master-expansion-b05.mjs';
import { DRINK_MASTER_EXPANSION_B06, DRINK_MASTER_EXPANSION_B06_ALIAS_ENTRIES, DRINK_MASTER_EXPANSION_B06_EVIDENCE_VERSION } from '../src/drink-master-expansion-b06.mjs';
const PRIOR_EXPANSIONS=[DRINK_MASTER_EXPANSION_B01,DRINK_MASTER_EXPANSION_B02,DRINK_MASTER_EXPANSION_B03,DRINK_MASTER_EXPANSION_B04,DRINK_MASTER_EXPANSION_B05];
test('expansion batch 06 is additive and unique',()=>{const occupied=new Set([...BOOK_INDEX_V19_ROWS.map(({name})=>normalizeDrinkV19Key(name)),...PRIOR_EXPANSIONS.flatMap(b=>b.map(d=>normalizeDrinkV19Key(d.masterKey)))]);const keys=DRINK_MASTER_EXPANSION_B06.map(d=>normalizeDrinkV19Key(d.masterKey));assert.equal(DRINK_MASTER_EXPANSION_B06.length,3);assert.equal(new Set(keys).size,keys.length);for(const key of keys)assert.equal(occupied.has(key),false,`duplicate known master key: ${key}`);});
test('expansion batch 06 aliases do not collide with known names',()=>{const occupied=new Map();for(const {name} of BOOK_INDEX_V19_ROWS)occupied.set(normalizeDrinkV19Key(name),normalizeDrinkV19Key(name));for(const batch of PRIOR_EXPANSIONS)for(const drink of batch){const target=normalizeDrinkV19Key(drink.masterKey);for(const alias of [drink.masterKey,drink.nameJa,...(drink.aliases||[])])occupied.set(normalizeDrinkV19Key(alias),target);}const local=new Set();for(const drink of DRINK_MASTER_EXPANSION_B06){const target=normalizeDrinkV19Key(drink.masterKey);for(const alias of [drink.masterKey,drink.nameJa,...(drink.aliases||[])]){const n=normalizeDrinkV19Key(alias);assert.equal(occupied.has(n),false,`cross-batch alias collision: ${n}=>${target}`);assert.equal(local.has(n),false,`local alias collision: ${n}`);local.add(n);}}});
test('expansion batch 06 has complete recipes rarity and evidence',()=>{for(const drink of DRINK_MASTER_EXPANSION_B06){assert.equal(drink.availability+drink.rarity,100);assert.ok(drink.confidence>=0.7&&drink.confidence<=1);assert.ok(drink.recipe?.ingredients?.length>=3&&drink.recipe?.method);assert.ok(drink.shortDescription&&drink.orderHint&&drink.imageQuery);assert.ok(drink.evidence?.length>=3);assert.ok(drink.evidence.some(x=>x.type==='international_professional_reference'));assert.ok(drink.evidence.some(x=>x.type.startsWith('jp_')));for(const x of drink.evidence)assert.match(x.url,/^https:\\/\\//);}const sigs=new Set();for(const [alias,key] of DRINK_MASTER_EXPANSION_B06_ALIAS_ENTRIES){const sig=`${normalizeDrinkV19Key(alias)}=>${normalizeDrinkV19Key(key)}`;assert.equal(sigs.has(sig),false);sigs.add(sig);}assert.equal(DRINK_MASTER_EXPANSION_B06_EVIDENCE_VERSION,'jp-rarity-expansion-2026-09-08-b06');});
test('runtime is wired to batch 06',async()=>{const source=await import('node:fs/promises').then(({readFile})=>readFile(new URL('../src/worker-v1.9.mjs',import.meta.url),'utf8'));assert.match(source,/DRINK_MASTER_EXPANSION_B06/);assert.match(source,/seedExpansionB06/);assert.match(source,/hasExpansionB06Seed/);assert.match(source,/DRINK_MASTER_EXPANSION_B06_EVIDENCE_VERSION/);});
""")
