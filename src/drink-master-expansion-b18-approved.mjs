import { DRINK_MASTER_EXPANSION_B18 as CANDIDATES, DRINK_MASTER_EXPANSION_B18_EVIDENCE_VERSION, DRINK_MASTER_EXPANSION_B18_EVALUATED_AT } from './drink-master-expansion-b18.mjs';
export { DRINK_MASTER_EXPANSION_B18_EVIDENCE_VERSION, DRINK_MASTER_EXPANSION_B18_EVALUATED_AT };
export const DRINK_MASTER_EXPANSION_B18_EXCLUDED=[
  ['Division Bell','existing normalized masterKey'],
  ['Naked and Famous','existing normalized masterKey'],
  ['Monkey Gland','existing normalized masterKey'],
  ['Pegu Club','existing normalized masterKey'],
  ['Bramble','existing normalized masterKey'],
  ['Last Word','existing normalized masterKey'],
  ['Frisco','existing normalized masterKey'],
  ["Widow's Kiss",'existing normalized masterKey'],
  ['Oaxacan Old Fashioned','existing alias collision with Oaxaca Old Fashioned'],
];
const excluded=new Set(DRINK_MASTER_EXPANSION_B18_EXCLUDED.map(([key])=>key));
export const DRINK_MASTER_EXPANSION_B18=CANDIDATES.filter(d=>!excluded.has(d.masterKey));
export const DRINK_MASTER_EXPANSION_B18_ALIAS_ENTRIES=DRINK_MASTER_EXPANSION_B18.flatMap(d=>[[d.nameJa,d.masterKey],...(d.aliases||[]).map(a=>[a,d.masterKey])]);
