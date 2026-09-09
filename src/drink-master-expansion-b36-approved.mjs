import { BOOK_INDEX_V19_ROWS } from './drink-master-v1.9-book-index.mjs';
import { normalizeDrinkV19Key } from './drink-master-v1.9-master.mjs';
import { DRINK_MASTER_EXPANSION_B01 } from './drink-master-expansion-b01.mjs';
import { DRINK_MASTER_EXPANSION_B02 } from './drink-master-expansion-b02.mjs';
import { DRINK_MASTER_EXPANSION_B03 } from './drink-master-expansion-b03.mjs';
import { DRINK_MASTER_EXPANSION_B04 } from './drink-master-expansion-b04.mjs';
import { DRINK_MASTER_EXPANSION_B05 } from './drink-master-expansion-b05.mjs';
import { DRINK_MASTER_EXPANSION_B06 } from './drink-master-expansion-b06.mjs';
import { DRINK_MASTER_EXPANSION_B07 } from './drink-master-expansion-b07.mjs';
import { DRINK_MASTER_EXPANSION_B08 } from './drink-master-expansion-b08.mjs';
import { DRINK_MASTER_EXPANSION_B09 } from './drink-master-expansion-b09.mjs';
import { DRINK_MASTER_EXPANSION_B10 } from './drink-master-expansion-b10.mjs';
import { DRINK_MASTER_EXPANSION_B11 } from './drink-master-expansion-b11.mjs';
import { DRINK_MASTER_EXPANSION_B12 } from './drink-master-expansion-b12.mjs';
import { DRINK_MASTER_EXPANSION_B13 } from './drink-master-expansion-b13.mjs';
import { DRINK_MASTER_EXPANSION_B14 } from './drink-master-expansion-b14.mjs';
import { DRINK_MASTER_EXPANSION_B15 } from './drink-master-expansion-b15.mjs';
import { DRINK_MASTER_EXPANSION_B16 } from './drink-master-expansion-b16.mjs';
import { DRINK_MASTER_EXPANSION_B17 } from './drink-master-expansion-b17.mjs';
import { DRINK_MASTER_EXPANSION_B18 } from './drink-master-expansion-b18-approved.mjs';
import { DRINK_MASTER_EXPANSION_B19 } from './drink-master-expansion-b19-approved.mjs';
import { DRINK_MASTER_EXPANSION_B20 } from './drink-master-expansion-b20-approved.mjs';
import { DRINK_MASTER_EXPANSION_B21 } from './drink-master-expansion-b21-approved.mjs';
import { DRINK_MASTER_EXPANSION_B22 } from './drink-master-expansion-b22-approved.mjs';
import { DRINK_MASTER_EXPANSION_B23 } from './drink-master-expansion-b23-approved.mjs';
import { DRINK_MASTER_EXPANSION_B24 } from './drink-master-expansion-b24-approved.mjs';
import { DRINK_MASTER_EXPANSION_B25 } from './drink-master-expansion-b25-approved.mjs';
import { DRINK_MASTER_EXPANSION_B26 } from './drink-master-expansion-b26-approved.mjs';
import { DRINK_MASTER_EXPANSION_B27 } from './drink-master-expansion-b27-approved.mjs';
import { DRINK_MASTER_EXPANSION_B28 } from './drink-master-expansion-b28-approved.mjs';
import { DRINK_MASTER_EXPANSION_B29 } from './drink-master-expansion-b29-approved.mjs';
import { DRINK_MASTER_EXPANSION_B30 } from './drink-master-expansion-b30-approved.mjs';
import { DRINK_MASTER_EXPANSION_B31 } from './drink-master-expansion-b31-approved.mjs';
import { DRINK_MASTER_EXPANSION_B32 } from './drink-master-expansion-b32-approved.mjs';
import { DRINK_MASTER_EXPANSION_B33 } from './drink-master-expansion-b33-approved.mjs';
import { DRINK_MASTER_EXPANSION_B34 } from './drink-master-expansion-b34-approved.mjs';
import { DRINK_MASTER_EXPANSION_B35 } from './drink-master-expansion-b35-approved.mjs';
import { DRINK_MASTER_EXPANSION_B36_CANDIDATES,DRINK_MASTER_EXPANSION_B36_EVIDENCE_VERSION,DRINK_MASTER_EXPANSION_B36_EVALUATED_AT } from './drink-master-expansion-b36.mjs';
export { DRINK_MASTER_EXPANSION_B36_EVIDENCE_VERSION,DRINK_MASTER_EXPANSION_B36_EVALUATED_AT };
const PRIOR=[DRINK_MASTER_EXPANSION_B01,DRINK_MASTER_EXPANSION_B02,DRINK_MASTER_EXPANSION_B03,DRINK_MASTER_EXPANSION_B04,DRINK_MASTER_EXPANSION_B05,DRINK_MASTER_EXPANSION_B06,DRINK_MASTER_EXPANSION_B07,DRINK_MASTER_EXPANSION_B08,DRINK_MASTER_EXPANSION_B09,DRINK_MASTER_EXPANSION_B10,DRINK_MASTER_EXPANSION_B11,DRINK_MASTER_EXPANSION_B12,DRINK_MASTER_EXPANSION_B13,DRINK_MASTER_EXPANSION_B14,DRINK_MASTER_EXPANSION_B15,DRINK_MASTER_EXPANSION_B16,DRINK_MASTER_EXPANSION_B17,DRINK_MASTER_EXPANSION_B18,DRINK_MASTER_EXPANSION_B19,DRINK_MASTER_EXPANSION_B20,DRINK_MASTER_EXPANSION_B21,DRINK_MASTER_EXPANSION_B22,DRINK_MASTER_EXPANSION_B23,DRINK_MASTER_EXPANSION_B24,DRINK_MASTER_EXPANSION_B25,DRINK_MASTER_EXPANSION_B26,DRINK_MASTER_EXPANSION_B27,DRINK_MASTER_EXPANSION_B28,DRINK_MASTER_EXPANSION_B29,DRINK_MASTER_EXPANSION_B30,DRINK_MASTER_EXPANSION_B31,DRINK_MASTER_EXPANSION_B32,DRINK_MASTER_EXPANSION_B33,DRINK_MASTER_EXPANSION_B34,DRINK_MASTER_EXPANSION_B35];
const occupied=new Map();
for(const {name} of BOOK_INDEX_V19_ROWS){const n=normalizeDrinkV19Key(name);occupied.set(n,{target:n,source:'initial-400'});}
for(const batch of PRIOR)for(const d of batch){const target=normalizeDrinkV19Key(d.masterKey);for(const a of [d.masterKey,d.nameJa,...(d.aliases||[])])occupied.set(normalizeDrinkV19Key(a),{target,source:'prior-expansion'});}
const semanticInitialAliases=new Set(['Pink Gin Cocktail','Pink Lady Cocktail',"Planter's Cocktail No. 1","Planter's Cocktail No. 2",'President Cocktail','Rattlesnake Cocktail','Rob Roy Cocktail','Rolls Royce Cocktail','Rye Whisky Cocktail'].map(normalizeDrinkV19Key));
const qualityExcluded=new Map([
['Peter Pan Cocktail','primary recipe proportions insufficiently legible for high-confidence automated inclusion'],
['Phoebe Snow Cocktail','primary recipe proportions insufficiently legible for high-confidence automated inclusion'],
['Plaza Cocktail','primary recipe proportions insufficiently legible for high-confidence automated inclusion'],
['Poppy Cocktail','primary recipe proportions insufficiently legible for high-confidence automated inclusion'],
['Presto Cocktail','primary recipe proportions insufficiently legible for high-confidence automated inclusion']
]);
const local=new Map();
export const DRINK_MASTER_EXPANSION_B36_EXCLUDED=[];
export const DRINK_MASTER_EXPANSION_B36=[];
for(const d of DRINK_MASTER_EXPANSION_B36_CANDIDATES){let reason=qualityExcluded.get(d.masterKey)||'';const target=normalizeDrinkV19Key(d.masterKey);if(!reason&&semanticInitialAliases.has(target))reason='semantic alias collision with established canonical drink';const names=[d.masterKey,d.nameJa,...(d.aliases||[])].map(normalizeDrinkV19Key);if(!reason)for(const n of names){const hit=occupied.get(n);if(hit&&hit.target!==target){reason=`normalized name/alias collision with ${hit.source}`;break;}if(hit&&hit.target===target){reason=`existing normalized masterKey/alias in ${hit.source}`;break;}if(local.has(n)&&local.get(n)!==target){reason='local normalized alias collision';break;}if(local.has(n)&&local.get(n)===target){reason='duplicate normalized self alias';break;}}if(reason){DRINK_MASTER_EXPANSION_B36_EXCLUDED.push([d.masterKey,reason]);continue;}DRINK_MASTER_EXPANSION_B36.push(d);for(const n of names)local.set(n,target);}
export const DRINK_MASTER_EXPANSION_B36_ALIAS_ENTRIES=DRINK_MASTER_EXPANSION_B36.flatMap(d=>[[d.nameJa,d.masterKey],...(d.aliases||[]).map(a=>[a,d.masterKey])]);
