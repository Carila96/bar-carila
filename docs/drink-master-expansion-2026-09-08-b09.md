# Drink Master Expansion Batch 09

Date: 2026-09-08
Known master before: 435
Known master after: 438
Policy: Open Recommendation + Growing Known Master
Evidence version: `jp-rarity-expansion-2026-09-08-b09`

## Added

1. Army & Navy — availability 38 / rarity 62 / confidence 0.88
2. Hotel Nacional Special — availability 34 / rarity 66 / confidence 0.87
3. Scofflaw — availability 45 / rarity 55 / confidence 0.91

## Selection and duplicate audit

All three names were checked against the authoritative 400-row `BOOK_INDEX_V19_ROWS` and expansion batches B01–B08. None is an existing canonical master key. Alias validation is covered by `test/drink-master-expansion-b09.test.mjs` and must not redirect an occupied alias to a different drink.

## Evidence summary

- Army & Navy: Difford’s Guide confirms the historical/representative gin-lemon-orgeat-bitters construction. Giffard Japan and Japanese retail availability confirm that orgeat is realistically procurable in Japan.
- Hotel Nacional Special: Difford’s Guide confirms the Hotel Nacional de Cuba provenance and representative rum-apricot-pineapple-lime construction. BOLS and De Kuyper apricot brandy are both currently available through Japanese retail channels, reducing single-brand dependency.
- Scofflaw: Difford’s Guide confirms the 1924 Paris provenance and representative whiskey-vermouth-lemon-grenadine construction. Wild Turkey Japan publishes a Japanese Scofflaw recipe, providing direct domestic professional/brand evidence and supporting higher availability than the other two drinks.

## Runtime integration

B01–B08 remain under `src/worker-v1.9.mjs` unchanged. Batch 09 is seeded additively by `src/worker-v1.9-expansions.mjs`, which delegates request handling to the existing v1.9 worker after ensuring the B09 rows, aliases, and evidence exist in D1. `wrangler.jsonc` points to this additive wrapper. This avoids rewriting the existing B01–B08 source-of-truth or changing the recommendation engine’s candidate-space behavior.

The known master remains an enrichment layer only. Drinks outside the 438 known records remain valid recommendation candidates.

## Acceptance checks

- 400-row source-of-truth unchanged.
- B01–B08 modules unchanged.
- B09 canonical-key duplicate test.
- Cross-batch alias redirect test.
- Recipe / rarity / evidence completeness test.
- Deployment entrypoint wiring test.
- Full repository CI and drink-master validator required before merge.
