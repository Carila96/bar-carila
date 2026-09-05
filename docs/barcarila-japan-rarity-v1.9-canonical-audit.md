# BarCarila Japan Rarity v1.9 — Canonical population audit

Status: IN PROGRESS / PR remains Draft
Date: 2026-09-05

## Source of truth

The canonical population is the cocktail index on pp.6–22 of 『カクテル完全バイブル』. Runtime count alone is not accepted as evidence of correctness.

## Corrections confirmed by fresh visual index audit

Removed as non-index/invented rows from the earlier working data:
- Brandy Daisy
- Brandy Fizz
- Brandy Flip
- Brandy Milk Punch
- Brandy Cassis

Corrected misreads:
- Satan -> Zaza / ザザ
- Three Mirrors -> Three Millers / スリー・ミラーズ

Restored confirmed index omissions in this pass:
- Trentaine / トランタン
- La Festa / ラ・フェスタ
- Opera Martini / オペラ・マティーニ
- King's Valley / キングス・バレイ

Resolved same-name/different-recipe collision:
- Acapulco in Rum section -> canonical runtime key `Acapulco (Rum)`
- Acapulco in Tequila section -> canonical runtime key `Acapulco (Tequila)`

The two Acapulco entries are distinct book recipes and must never be collapsed into one name-only canonical key.

## Evidence notes for newly corrected rows

- Zaza: Japanese cocktail reference confirms gin + Dubonnet + Angostura. Specialized Dubonnet stock constrains ordinary-bar fulfillment.
- Three Millers: Suntory Japanese cocktail essay confirms the name and recipe; the common mistranslation as a mirror-related name is explicitly discussed.
- Trentaine: Japanese recipe source confirms brandy + amaretto + cream + egg yolk + chocolate powder; dessert handling materially limits orderability.
- La Festa: Japanese recipe source identifies it as an HBA competition winner and confirms multiple specialized liqueurs, garnish and rim work; high operational/stock burden keeps availability low despite provenance.
- Opera Martini: current Japanese recipe sources confirm gin + Dubonnet + maraschino; direct current-menu density remains limited.
- King's Valley: current Japanese bartender/reference sources and an operating-bar menu support actual fulfillment; its ingredients are obtainable in cocktail-focused bars.
- Acapulco (Rum): multiple Japanese references agree on the rum/citrus/curacao family; some versions add egg white.
- Acapulco (Tequila): Japanese reference confirms a distinct tequila + rum + pineapple + grapefruit + coconut-milk long recipe, materially harder to fulfill than the rum version.

## Quality gate now enforced in CI

The validator now fails when:
- known non-index rows survive;
- known misread names survive;
- confirmed corrections are absent;
- same-name/different-recipe collisions remain unresolved;
- availability/rarity arithmetic or confidence bounds are invalid.

`400` remains only a final population sanity check, not the criterion for correctness.

## Remaining audit before Ready

The remaining task is to finish the same source-of-truth comparison across every index entry, not merely the rows already found to be wrong. PR #35 must remain Draft until that full comparison no longer finds a mismatch.
