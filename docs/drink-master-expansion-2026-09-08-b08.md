# Drink Master Expansion — 2026-09-08 Batch 08

## Result

- Previous known master: 432
- Added: 3
- Resulting known master after merge: 435
- Evidence version: `jp-rarity-expansion-2026-09-08-b08`
- Policy: `Open Recommendation + Growing Known Master` unchanged. This batch expands known enrichment coverage only and does not restrict recommendation candidates to the master.

## Added drinks

| masterKey | 日本語名 | Availability | Rarity | 評価要点 |
| --- | --- | ---: | ---: | --- |
| Queen's Park Swizzle | クイーンズ・パーク・スウィズル | 28 | 72 | Established Trinidad rum classic; ingredients are obtainable in Japan, but swizzle technique, crushed-ice operation and name recognition limit general-bar availability. |
| Suffering Bastard | サファリング・バスタード | 32 | 68 | Established Joe Scialom classic; Japanese-language recipe coverage and domestic ginger-beer availability confirmed, but name recognition remains limited. |
| Toronto | トロント | 30 | 70 | Established whisky/Fernet classic; Fernet-Branca has Japanese distribution, but the bitter profile and low name recognition make immediate service bar-dependent. |

## Evidence summary

### Queen's Park Swizzle
- Difford's Guide: https://www.diffordsguide.com/cocktails/recipe/2740/queens-park-swizzle
- El Dorado / Demerara rum domestic retail: https://www.biccamera.com/bc/item/12845394/
- Angostura Bitters domestic retail: https://www.biccamera.com/bc/item/1854665/

### Suffering Bastard
- Difford's Guide: https://www.diffordsguide.com/cocktails/recipe/2588/suffering-bastard
- Japanese cocktail article / recipe: https://sorso-scelto-stasera.com/suffering-bastard/
- Fever-Tree Ginger Beer domestic retail: https://shop.andspirits.com/en/products/fever-tree-premium-ginger-beer-%E3%83%95%E3%82%A3%E3%83%BC%E3%83%90%E3%83%BC%E3%83%84%E3%83%AA%E3%83%BC-%E3%83%97%E3%83%AC%E3%83%9F%E3%82%A2%E3%83%A0-%E3%82%B8%E3%83%B3%E3%82%B8%E3%83%A3%E3%83%BC%E3%83%93%E3%82%A2

### Toronto
- Difford's Guide: https://www.diffordsguide.com/cocktails/recipe/3442/toronto
- Fernet-Branca Japan distributor: https://whisk-e.co.jp/products/fernetbranca/
- Fernet-Branca domestic specialist retail: https://www.shinanoya-tokyo.jp/view/item/000000011555

## Duplicate / alias audit

- All three canonical `masterKey` values were checked against the audited 400-book index and batches 01–07.
- The first validation correctly detected normalized self-alias collisions caused by punctuation variants (for example, Japanese middle dots and the apostrophe in Queen's Park). The test was not weakened; redundant aliases were removed from the data.
- The final batch retains only aliases that are distinct after `normalizeDrinkV19Key`.

## Change-management notes

- Initial 400-drink source-of-truth is unchanged.
- Prior batch masterKeys and rarity scores are unchanged.
- Batch 08 is an additive D1/embedded expansion layer following the existing B01–B07 runtime pattern.
- Runtime seeding, alias lookup and accepted evidence versions are wired for B08.
- No whitelist or penalty for master-external recommendations was introduced.
