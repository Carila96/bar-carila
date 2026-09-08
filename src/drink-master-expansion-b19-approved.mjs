import { BOOK_INDEX_V19_ROWS } from './drink-master-v1.9-book-index.mjs';
import { normalizeDrinkV19Key } from './drink-master-v1.9-master.mjs';
import { DRINK_MASTER_EXPANSION_B01 } from './drink-master-expansion-b01.mjs';import { DRINK_MASTER_EXPANSION_B02 } from './drink-master-expansion-b02.mjs';import { DRINK_MASTER_EXPANSION_B03 } from './drink-master-expansion-b03.mjs';import { DRINK_MASTER_EXPANSION_B04 } from './drink-master-expansion-b04.mjs';import { DRINK_MASTER_EXPANSION_B05 } from './drink-master-expansion-b05.mjs';import { DRINK_MASTER_EXPANSION_B06 } from './drink-master-expansion-b06.mjs';import { DRINK_MASTER_EXPANSION_B07 } from './drink-master-expansion-b07.mjs';import { DRINK_MASTER_EXPANSION_B08 } from './drink-master-expansion-b08.mjs';import { DRINK_MASTER_EXPANSION_B09 } from './drink-master-expansion-b09.mjs';import { DRINK_MASTER_EXPANSION_B10 } from './drink-master-expansion-b10.mjs';import { DRINK_MASTER_EXPANSION_B11 } from './drink-master-expansion-b11.mjs';import { DRINK_MASTER_EXPANSION_B12 } from './drink-master-expansion-b12.mjs';import { DRINK_MASTER_EXPANSION_B13 } from './drink-master-expansion-b13.mjs';import { DRINK_MASTER_EXPANSION_B14 } from './drink-master-expansion-b14.mjs';import { DRINK_MASTER_EXPANSION_B15 } from './drink-master-expansion-b15.mjs';import { DRINK_MASTER_EXPANSION_B16 } from './drink-master-expansion-b16.mjs';import { DRINK_MASTER_EXPANSION_B17 } from './drink-master-expansion-b17.mjs';import { DRINK_MASTER_EXPANSION_B18 } from './drink-master-expansion-b18-approved.mjs';
import { DRINK_MASTER_EXPANSION_B19_CANDIDATES,DRINK_MASTER_EXPANSION_B19_EVIDENCE_VERSION,DRINK_MASTER_EXPANSION_B19_EVALUATED_AT } from './drink-master-expansion-b19.mjs';
export { DRINK_MASTER_EXPANSION_B19_EVIDENCE_VERSION,DRINK_MASTER_EXPANSION_B19_EVALUATED_AT };
const PRIOR=[DRINK_MASTER_EXPANSION_B01,DRINK_MASTER_EXPANSION_B02,DRINK_MASTER_EXPANSION_B03,DRINK_MASTER_EXPANSION_B04,DRINK_MASTER_EXPANSION_B05,DRINK_MASTER_EXPANSION_B06,DRINK_MASTER_EXPANSION_B07,DRINK_MASTER_EXPANSION_B08,DRINK_MASTER_EXPANSION_B09,DRINK_MASTER_EXPANSION_B10,DRINK_MASTER_EXPANSION_B11,DRINK_MASTER_EXPANSION_B12,DRINK_MASTER_EXPANSION_B13,DRINK_MASTER_EXPANSION_B14,DRINK_MASTER_EXPANSION_B15,DRINK_MASTER_EXPANSION_B16,DRINK_MASTER_EXPANSION_B17,DRINK_MASTER_EXPANSION_B18];
const MANUAL_EXCLUSIONS=new Map([
['Algonquin Cocktail No.2','standard-name/representative-recipe evidence insufficient for automatic registration'],
['Old Monk','ambiguous cocktail name and recipe family; canonical identity insufficiently stable'],
['Matador Norteño','Japan-BAR/standard-recipe evidence insufficient at current gate'],
['Tomahawk','name maps to multiple recipe families; canonical recipe insufficiently stable'],
['Pisco Punch No.2','numbered variant lacks sufficiently stable canonical recipe evidence'],
['Black Boulevardier','generic variant naming; canonical identity insufficiently stable'],
['Nocino Manhattan','generic Manhattan variant rather than sufficiently standardized canonical drink'],
['Bamboo Highball','generic highball variant; canonical-name evidence insufficient'],
['Sherry and Tonic','generic construction; canonical registration evidence insufficient'],
['Amontillado Sour','generic sour construction; canonical registration evidence insufficient'],
['Sake Sour','generic sour construction; canonical registration evidence insufficient'],
['Shochu Tonic','generic mixed-drink construction; canonical registration evidence insufficient'],
['Shochu Mojito','generic substitution variant; canonical registration evidence insufficient']
]);
const occupied=new Map();
for(const {name} of BOOK_INDEX_V19_ROWS){const n=normalizeDrinkV19Key(name);occupied.set(n,{target:n,source:'initial-400'});}
for(const batch of PRIOR)for(const d of batch){const target=normalizeDrinkV19Key(d.masterKey);for(const a of [d.masterKey,d.nameJa,...(d.aliases||[])])occupied.set(normalizeDrinkV19Key(a),{target,source:'prior-expansion'});}
const local=new Map();
export const DRINK_MASTER_EXPANSION_B19_EXCLUDED=[];
export const DRINK_MASTER_EXPANSION_B19=[];
for(const d of DRINK_MASTER_EXPANSION_B19_CANDIDATES){let reason=MANUAL_EXCLUSIONS.get(d.masterKey)||'';const target=normalizeDrinkV19Key(d.masterKey);const names=[d.masterKey,d.nameJa,...(d.aliases||[])].map(normalizeDrinkV19Key);if(!reason)for(const n of names){const hit=occupied.get(n);if(hit&&hit.target!==target){reason=`normalized name/alias collision with ${hit.source}`;break;}if(hit&&hit.target===target){reason=`existing normalized masterKey/alias in ${hit.source}`;break;}if(local.has(n)&&local.get(n)!==target){reason='local normalized alias collision';break;}}if(reason){DRINK_MASTER_EXPANSION_B19_EXCLUDED.push([d.masterKey,reason]);continue;}DRINK_MASTER_EXPANSION_B19.push(d);for(const n of names)local.set(n,target);}
export const DRINK_MASTER_EXPANSION_B19_ALIAS_ENTRIES=DRINK_MASTER_EXPANSION_B19.flatMap(d=>[[d.nameJa,d.masterKey],...(d.aliases||[]).map(a=>[a,d.masterKey])]);
