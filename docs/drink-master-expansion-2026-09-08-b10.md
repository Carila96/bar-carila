# Drink Master Expansion Batch 10

Date: 2026-09-08
Range: 438 -> 441 known drinks
Policy: `docs/drink-master-expansion-policy.md`
Evidence version: `jp-rarity-expansion-2026-09-08-b10`

## Added

- Algonquin / アルゴンキン
- Painkiller / ペインキラー
- Fog Cutter / フォグ・カッター

## Validation approach

- Confirmed none of the three canonical names are present in the audited 400-row book-index source-of-truth.
- Batch test compares canonical keys and aliases against the 400-row source and batches B01-B09.
- Each drink has an established international recipe/history reference plus at least one Japan-specific recipe, bar, or material-availability reference.
- Rarity estimates represent expected orderability in a general Japanese bar, not global fame.
- Existing 400-row source-of-truth remains unchanged.
- Recommendation remains Open Recommendation + Growing Known Master; this batch does not constrain candidates to known-master rows.

## Rarity notes

### Algonquin — availability 43 / rarity 57
Established 1930s New York classic. The core ingredients are ordinary for cocktail bars and Japanese bartender-oriented recipe coverage exists, but name recognition is below major whisky classics.

### Painkiller — availability 48 / rarity 52
Established tropical drink with a current Pusser's official recipe and documented Japanese bar/event presentation. Coconut cream and nutmeg reduce instant orderability compared with simpler rum standards.

### Fog Cutter — availability 31 / rarity 69
Established Trader Vic tiki classic. The recipe requires multiple base spirits, citrus, orgeat and sherry. Japanese recipe coverage and domestic orgeat availability support reproducibility, but ingredient breadth makes general-bar availability relatively low.

## Production wiring

`src/worker-v1.9-expansions.mjs` seeds B10 additively into D1 before delegating to the existing v1.9 worker. This does not modify the original 400-row source-of-truth or reverse the existing source-of-truth relationship.
