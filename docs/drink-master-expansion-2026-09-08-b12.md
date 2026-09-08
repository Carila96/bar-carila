# Drink Master Expansion Batch 12

Date: 2026-09-08
Range: 444 -> 447 known drinks
Policy: `docs/drink-master-expansion-policy.md`
Evidence version: `jp-rarity-expansion-2026-09-08-b12`

## Added

- Black Manhattan / ブラック・マンハッタン
- Rosita / ロジータ
- Cameron's Kick / キャメロンズ・キック

## Validation approach

- The audited 400-row `BOOK_INDEX_V19_ROWS` is kept unchanged and checked first.
- The selected three canonical names are checked against expansion batches B01-B11 by normalized master key and alias tests.
- Each drink has an established international reference plus Japan-specific current BAR/menu or material-availability evidence.
- Existing 400-row source-of-truth remains unchanged.
- Recommendation remains Open Recommendation + Growing Known Master; no recommendation whitelist or master-external penalty is introduced.

## Rarity notes

### Black Manhattan — availability 42 / rarity 58
A 2005 modern classic using rye whiskey, Averna-style amaro, aromatic bitters and orange bitters. A current Japanese BAR menu lists Black Manhattan by name, and Averna is commercially available in Japan. The main limiting factor is amaro stocking and lower name recognition versus a standard Manhattan.

### Rosita — availability 36 / rarity 64
An established tequila classic traceable to the 1970s, combining reposado tequila, red bitter liqueur, dry vermouth, sweet vermouth and bitters. A current Japanese BAR menu lists Rosita, and core modifiers are domestically distributed. Recognition and the need to stock multiple modifiers reduce general-BAR availability.

### Cameron's Kick — availability 24 / rarity 76
A 1922 whisky classic combining Scotch and Irish whiskey with lemon and orgeat. A current Japanese BAR menu lists Cameron's Kick, showing domestic reproducibility, while the split whisky base, orgeat requirement and low name recognition keep general-BAR availability low.

## Production wiring

`src/worker-v1.9-expansions.mjs` seeds B12 additively after B09-B11, then delegates to the existing v1.9 worker. The original 400-row source-of-truth and prior expansion modules are not rewritten or replaced.
