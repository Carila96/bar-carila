# Bar Carila ドリンクマスター拡張 Batch 02

Date: 2026-09-08
Evidence version: `jp-rarity-expansion-2026-09-08-b02`
Scope: initial 400-book-index source and Batch 01 remain unchanged; this batch is additive.

## 追加対象

| masterKey | 日本語名 | availability | rarity | confidence | 主な成立制約 |
|---|---|---:|---:|---:|---|
| Bee's Knees | ビーズニーズ | 58 | 42 | 0.86 | 名称定着は中程度、蜂蜜運用 |
| Bramble | ブランブル | 47 | 53 | 0.82 | Crème de Mûre・クラッシュアイス |
| Jungle Bird | ジャングルバード | 42 | 58 | 0.82 | Blackstrap rum・Demerara syrup |
| Hanky Panky | ハンキー・パンキー | 38 | 62 | 0.84 | Fernet常備・国内名称認知 |
| Martinez | マルティネス | 44 | 56 | 0.85 | Maraschino・Orange Bitters・名称認知 |

## 選定理由

Batch 01 の次候補群から、IBA公式リストで実在性と代表レシピが明確で、日本語圏のBAR・メーカー・業界媒体から国内提供可能性を複数根拠で評価できる5杯を選定した。初期400杯およびBatch 01とcanonical keyで重複しないことをテストで確認する。

## 主な実在性・レシピ根拠

- Bee’s Knees – IBA: https://iba-world.com/iba-cocktail/bees-knees/
- Bramble – IBA: https://iba-world.com/iba-cocktail/bramble/
- Jungle Bird – IBA: https://iba-world.com/iba-cocktail/jungle-bird/
- Hanky Panky – IBA: https://iba-world.com/iba-cocktail/hanky-panky/
- Martinez – IBA: https://iba-world.com/iba-cocktail/martinez/

## 日本BAR成立性の主な根拠

### Bee's Knees
- Bar彩月庵: https://ameblo.jp/bar-saigetsuan/entry-12793113885.html
- Recitail: https://www.recitail.com/ja/cocktails/%E3%83%93%E3%83%BC%E3%82%BA%E3%83%8B%E3%83%BC%E3%82%BA

国内BARでの現行提供・レシピ紹介があり、材料は一般的。名称注文の定着度を考慮してavailability 58とした。

### Bramble
- Johnnie Walker Japan: https://www.johnniewalker.com/ja-jp/whisky-cocktails/cocktails/the-spiced-citrus-bramble-cocktail
- 国内日本語レシピ: https://ameblo.jp/blanco-tequila/entry-12889267673.html

Bramble系の国内認知はあるが、Crème de Mûre常備とクラッシュアイス運用を制約としてavailability 47とした。

### Jungle Bird
- Hilton Kuala Lumpur（発祥地側公式）: https://www.hilton.com/ja/hotels/kulhihi-hilton-kuala-lumpur/dining/
- Bar彩月庵: https://ameblo.jp/bar-saigetsuan/entry-12798957757.html

国内BARでの紹介文脈はあるが、Blackstrap rumとDemerara syrupの常備差を考慮してavailability 42とした。

### Hanky Panky
- DRINK PLANET / Bar Rose Garden: https://www.drinkplanet.jp/cocktail_todays/view/918
- BAR TIMES: https://www.bar-times.com/contents/2555/

国内BAR提供例を確認できる一方、BAR TIMESが「日本ではあまり馴染みがない」と明記しているためavailability 38とした。

### Martinez
- Cocktail Bar Tinkle: https://www.bar-tinkle.com/
- BarMahalo: https://www.barmahalo.com/1292/

国内オーセンティックBARでメニュー掲載がある一方、Martiniほど一般名称注文が定着していないことと、Maraschino/Orange Bitters常備差を考慮してavailability 44とした。

## source-of-truth / 推薦方針

`src/drink-master-v1.9-book-index.mjs` の監査済み400杯は変更しない。Batch 01も変更しない。本バッチは `src/drink-master-expansion-b02.mjs` として追加し、D1へadditive seedする。既知マスターは推薦候補の上限にしない Open Recommendation + Growing Known Master 方針を維持する。
