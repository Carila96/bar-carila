# Drink Master Expansion Batch 11

Date: 2026-09-08
Range: 441 -> 444 known drinks
Policy: `docs/drink-master-expansion-policy.md`
Evidence version: `jp-rarity-expansion-2026-09-08-b11`

## Added

- Remember the Maine / リメンバー・ザ・メイン
- Bijou / ビジュー
- Gold Rush / ゴールド・ラッシュ

## Validation approach

- The audited 400-row `BOOK_INDEX_V19_ROWS` was checked first. Brown Derby and El Presidente were rejected as candidates because they already exist in the original 400-row source-of-truth.
- The selected three canonical names were also checked against expansion batches B01-B10 before implementation.
- Batch tests compare normalized master keys and aliases against the 400-row source and all prior expansion batches.
- Each drink has an established international reference and Japan-specific professional, brand, bar, or material-availability evidence.
- Existing 400-row source-of-truth remains unchanged.
- Recommendation remains Open Recommendation + Growing Known Master; no recommendation whitelist or master-external penalty is introduced.

## Rarity notes

### Remember the Maine — availability 34 / rarity 66
1939 Charles H. Baker classic with rye, sweet vermouth, cherry liqueur and absinthe. A current Japanese bartender-industry reference documents a Bible Club Osaka preparation, and absinthe remains domestically procurable. Name recognition and specialty liqueur stocking keep general-bar availability limited.

### Bijou — availability 31 / rarity 69
Late-19th-century gin classic using sweet vermouth, Green Chartreuse and orange bitters. Japanese bartender recipe coverage and domestic Green Chartreuse sales support reproducibility, but Chartreuse stocking is not universal.

### Gold Rush — availability 58 / rarity 42
Modern classic built from bourbon, lemon and honey syrup. It requires only ordinary bar equipment and easily obtained ingredients. Japanese whisky-brand and bartender-industry coverage support domestic recognition, though name-order familiarity remains below Whisky Sour.

## Production wiring

`src/worker-v1.9-expansions.mjs` seeds B11 additively after B09 and B10, then delegates to the existing v1.9 worker. The original 400-row source-of-truth and prior expansion modules are not rewritten or replaced.
