# PROJECT_STATUS

最終更新: 2026-10-05
対象: 発行済みAmazon IDの設定 PR → main
Task base main: 50ac3f7ac6969deff76654c72f2fafc76d66242a

## 現在地
- ドリンクマスター1500杯到達済み。自動拡張停止済み。Open Recommendation方針を維持する。
- /carilaのRealtime / WebRTCは実装済み。PR #106以降のiPhone実機確認（日本語・挨拶・voice・配置・割り込み）は継続課題。
- Amazon mainのIDはcarila0e-22、PR #107はMerge済み。一方、2026-10-05に公開版の固定12hrefと公開JSで旧carila-22を確認した。
- 本PRは5導線のID設定/URL生成をpublic/assets/js/amazon-links.jsへ集約。5設定はユーザー提示のAmazon管理一覧（IMG_1955.png）の発行済みIDへ更新。既存carila0e-22は未知の導線のfallbackとして維持する。
- グッズ12商品/提案/材料/検索/履歴をplacementで区別。affiliate_clickにprojectId / placement / trackingIdを送る。5用途のAmazon ID設定は完了。固定12hrefもcarilabgoods-22を使い、helperは?v=20261005-idsで参照する。
- Amazonログインがunsupported session/clientの500で止まったため、レポート/登録サイト/命名上限は未取得。追加IDの発行済み一覧はユーザー提示画像で確認済み。
- 詳細と次回のSource of Truthはdocs/amazon-tracking.md。

## 検証
- npm test: 232/232 PASS（Amazon追加4件を含む）。
- npm run validate:drink-master-v1.9: 400/400 book-index canonical gate PASS。
- 対象JS/HTML inline構文 PASS。新ID別成果/Preview/モバイル/Productionイベント受信は未検証。
- CIはPR時に1本。依存・Actions設定・Worker/API・UI・楽天URLは変更しない。

## Production / 次
1. Previewの5導線とモバイルを確認する。
2. 明示的な公開依頼後のみControlからProduction更新。公開tagとイベント受信を再確認する。
3. AmazonのID別レポートで5用途のクリック/注文/紹介料を確認する。
- Xの「それあります」は既存URLを使う方針。X返信URLや自動運用は変更しない。
- 本PRのMergeはProduction公開ではない。公開更新は実施しない。
- mainにはRealtime/favicons/AdSense法務導線等の既存未公開変更が含まれる可能性があり、ID修正だけの公開と見なさない。
- 支払い/銀行口座設定は変更しない。既存の1500杯マスター横断監査とRealtime実機確認待ちは保持する。
- DEPENDENCY DELTA: NONE / ROUTE DELTA: NONE / ACTIONS DELTA: NONE。
