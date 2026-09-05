# BarCarila Japan Rarity v1.9 — PR Notes

## Scope

This branch packages the v1.9 research pass, its evidence notes, machine-readable research rows, and validation/tests for review.

## Production guardrail

This PR deliberately does **not** replace the production `DRINK_MASTER_SEED` in `src/worker.mjs` or write research rows into D1 yet. The existing v1.8 150-drink production master remains the runtime source until the v1.9 dataset is fully reconciled into canonical Japanese names/aliases and the final seed is generated.

Reason: partial wiring would allow rows with unresolved aliases/copy fields to enter production and would make the 400-cocktail coverage claim unverifiable.

## Review checks

- `npm test`
- `npm run validate:drink-master-v1.9`
- `rarity === 100 - availability`
- normalized canonical keys unique inside machine-readable v1.9 rows
- rejected non-book additions excluded

## Follow-up implementation after data review

1. reconcile the full book index against existing v1.8 keys/aliases;
2. generate the final v1.9 upsert seed with `evidence_version = jp-rarity-v1.9`;
3. preserve fixed copy fields for existing drinks and add fixed copy for new rows;
4. wire the completed seed into Worker/D1;
5. verify preview before production.
