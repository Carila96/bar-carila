# Drink master expansion batch 13

- Date: 2026-09-08
- Range: 447 → 450 known drinks
- Policy: `docs/drink-master-expansion-policy.md`
- Source-of-truth: initial 400 remains unchanged; this batch is additive only.
- Recommendation policy: Open Recommendation + Growing Known Master remains unchanged. Drinks outside the known master remain recommendable.

## Added drinks

| masterKey | 日本語名 | availability | rarity | label | main constraint |
|---|---|---:|---:|---|---|
| Sazerac | サゼラック | 43 | 57 | やや珍しい | Peychaud's Bitters とアブサンの同時常備 |
| Vieux Carré | ヴュー・カレ | 29 | 71 | かなり珍しい | Bénédictine + Peychaud's を含む複数副材料と国内名称認知 |
| Final Ward | ファイナル・ワード | 19 | 81 | かなり珍しい | Green Chartreuse の国内入手性 |

## Verification notes

### Sazerac
- IBA公式で実在性、標準名称、基本構成を確認。
- 国内BAR PRIVATE PODの実作解説で日本BAR文脈を確認。
- 信濃屋でPeychaud's Bittersの国内現行流通を確認。
- 歴史的レシピにはコニャック／ライ等の差があるため、登録レシピは現代の代表的なライ版とし、名称自体の同一性は維持。

### Vieux Carré
- Difford's GuideでWalter Bergeronによる1938年のクラシックとして実在性と代表構成を確認。
- Bénédictine D.O.M.はビック酒販、Peychaud's Bittersは信濃屋で国内現行流通を確認。
- 特殊機材は不要だが、複数の副材料を同時常備する必要があるためrarityを高めに設定。

### Final Ward
- Difford's GuideでPhil Ward考案のLast Word派生として実在性と等量レシピを確認。
- Luxardo Maraschinoはドーバーオンラインショップで国内流通を確認。
- Green Chartreuseは国内販売履歴が明確だが、確認時点のビック酒販ページでは販売終了・在庫なし。この制約をrarityへ強く反映。

## Duplicate / alias audit

- Initial 400 and B01–B12 are treated as occupied names.
- New canonical names are checked after `normalizeDrinkV19Key` normalization.
- Alias tests reject local normalized duplicates and aliases that would redirect an occupied name to a different drink.

## Runtime

- B13 is seeded additively by `src/worker-v1.9-expansions.mjs` after B09–B12 and before delegating to the base v1.9 worker.
- No existing batch, initial-book source, or recommendation behavior is replaced.
