# Bar Carila ドリンクマスター拡張 Batch 03

Date: 2026-09-08
Evidence version: `jp-rarity-expansion-2026-09-08-b03`
Scope: initial 400-book-index source, Batch 01, Batch 02 remain unchanged; this batch is additive.

## 追加対象

| masterKey | 日本語名 | availability | rarity | confidence | 主な成立制約 |
|---|---|---:|---:|---:|---|
| Clover Club | クローバー・クラブ | 55 | 45 | 0.88 | ラズベリーシロップ・卵白運用 |
| Pisco Sour | ピスコ・サワー | 45 | 55 | 0.88 | ピスコ・ビターズ・卵白常備 |
| Trinidad Sour | トリニダード・サワー | 28 | 72 | 0.88 | Angostura 45ml・オルジェ・ライ |
| South Side | サウスサイド | 48 | 52 | 0.87 | 国内名称認知・ミント・卵白運用 |
| Canchanchara | カンチャンチャラ | 34 | 66 | 0.86 | キューバ産アグアルディエンテ・名称認知 |

## 選定理由

既存411杯の明確な重複を避け、IBA公式レシピで実在性・代表構成が確認でき、日本語圏のBAR・業界媒体から国内提供可能性を複数根拠で評価できる5杯を選定した。件数水増しではなく、ジン・ピスコ・ビターズ・キューバ系など既存マスターの味・ベース・地域の空白を補うことを優先した。

## 主な実在性・標準レシピ根拠

- Clover Club – IBA: https://iba-world.com/iba-cocktail/clover-club/
- Pisco Sour – IBA: https://iba-world.com/iba-cocktail/pisco-sour/
- Trinidad Sour – IBA: https://iba-world.com/iba-cocktail/trinidad-sour/
- South Side – IBA: https://iba-world.com/iba-cocktail/south-side/
- Canchanchara – IBA: https://iba-world.com/iba-cocktail/canchanchara/

## 日本BAR成立性の主な根拠

### Clover Club
- DRINK PLANET: https://www.drinkplanet.jp/cocktail_todays/view/24
- Bar Leaf: https://barleaf2020.com/menu/

国内BARメニューで現行掲載があり、材料も概ね一般的。ただしラズベリーシロップと卵白運用で店差が出るためavailability 55。

### Pisco Sour
- DRINK PLANET / Bar Super Nova: https://www.drinkplanet.jp/cocktail_todays/view/2042
- JAM17 BAR: https://prtimes.jp/main/html/rd/p/000003922.000005113.html

横浜BARで実提供が確認でき、東京のホテルBARでもPisco Sourを基礎にしたシグネチャーが現行提供される。一方、ピスコの常備率と卵白・ビターズ運用を考慮しavailability 45。

### Trinidad Sour
- Bar domingo: https://www.hotpepper.jp/strJ000868031/drink/
- OliveJuniper: https://olivejuniper.com/cocktail/

国内BARのIBA公認メニュー掲載はあるが、Angostura Bittersを45ml使用する特殊構成とオルジェ・ライの常備制約が大きくavailability 28。

### South Side
- Bar domingo: https://www.hotpepper.jp/strJ000868031/drink/
- BAR TIMES: https://bar-times.com/contents/156967/

国内実メニューと2026年のトップバーテンダー記事を確認。材料は一般的だが、記事中で「日本では知名度は低い」と明記されるためavailability 48。

### Canchanchara
- BAR TIMES: https://www.bar-times.com/contents/73982/
- Havana Club カンチャ認定店 – BAR TIMES: https://www.bar-times.com/contents/81208/

国内ラムカクテル専門家・認定BAR群で派生形を含む提供文脈はあるが、IBA標準のキューバ産アグアルディエンテ常備が一般BARでは難しくavailability 34。

## source-of-truth / 推薦方針

`src/drink-master-v1.9-book-index.mjs` の監査済み400杯、Batch 01、Batch 02は変更しない。本バッチは `src/drink-master-expansion-b03.mjs` として追加し、D1へadditive seedする。既知マスターは推薦候補の上限にしない **Open Recommendation + Growing Known Master** 方針を維持する。
