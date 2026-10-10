# Unresolved — 2026-10-10

## Release acceptance
- Updated code is not deployed. Control Preview update and browser verification required; then user-controlled Production promotion.
- iPhone microphone/speaker, actual OpenAI session issuance/model access, voice timbre, Japanese greeting, barge-in, echo, narrow layout, keyboard, background and five-minute termination are not real-device PASS.
- Client-side five-minute stop does not enforce a strict server time limit. Cookie deletion / alternate browser can reset identity; account/billing redesign remains a separate task.
- Quota reserves an attempt before upstream; valid failed upstream attempts still consume a turn/session. Invalid method/body no longer consumes quota. First anonymous simultaneous requests before cookie settlement can have independent IDs.
- Production metadata endpoint timed out in one HTTP sample. The initialization path was removed; verify on Preview and measure Production D1 reads after user promotion. Live deployed D1 rows/telemetry were not audited directly.
- `_headers` manifest MIME and asset `not_found_handling: none` require Control Preview runtime checks. No offline service worker exists.
- Search generated `ナグローニ` as a suggested alternative during the Negroni sample. Search remains generative; do not claim every suggestion is a verified master alias.

## Master quality: external review required
Machine audit: `docs/drink-master-audit-20261010.json`, reproduce via `node scripts/audit-drink-master.mjs`.
- 1500 keys unique; zero hard structural errors. 49 findings = alias collisions 2, identical ingredient/amount signatures 15, unit candidates 27, large individual amounts 3, large total volumes 2. These are candidates, not 49 proven defects; beer servings and historical recipe units can be valid.
- Casino / Casino Cocktail share the Japanese alias カジノ. Princess Mary / Princess Mary Cocktail share プリンセス・メアリー. Different English keys do not prove distinct drinks; confirm referenced sources before merge/deletion/renaming. Current runtime alias precedence is deterministic but semantically unresolved.
- Examples of matching signatures: Mexican Firing Squad / Mexican Firing Squad Special, Duchess / Duchess Cocktail, Jack Kearns No.1 / No.2. Different methods, history or context may make matching signatures legitimate. Preserve identities until verified.
- Base400 stores canonical names, category/base-spirit and rarity scores, not full recipes. This audit's canonical Japanese map has only 12/400 translations; it does not prove 388 missing live Japanese display names because runtime legacy aliases/D1 may supply them.
- Explicit glass and garnish fields absent across all 1500. Some methods imply glassware/garnish, but systematic completeness is not established. Recipe absent in base400; imageQuery/category/drinkKind are not stored in that canonical row representation.
- All expansion category/drinkKind entries are generic cocktail. Base includes non-alcohol identities; granular alcohol/non-alcohol metadata and Japanese-English semantic matches are not externally verified.
- Remote evidence URLs, image results and affiliate product availability are not verified for every drink. IDs are D1-generated; no stored slug or per-drink affiliate SKU exists in embedded master.

## Explicit non-goals
No Stripe, fixed price, final free/paid boundary, account authentication, master expansion or speculative recipe correction in this audit.
