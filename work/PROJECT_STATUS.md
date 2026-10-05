# PROJECT_STATUS

最終更新: 2026-10-05
対象: Amazon tracking preparation PR → main
監査時main: 1767105d93087d4300cb78691a79264644ff2b23

## 現在地
- ドリンクマスター1500杯到達済み。自動拡張停止済み。Open Recommendation方針を維持する。
- /carilaのRealtime / WebRTCは実装済み。PR #106以降のiPhone実機確認（日本語・挨拶・voice・配置・割り込み）は継続課題。
- Amazon mainのIDはcarila0e-22、PR #107はMerge済み。一方、2026-10-05に公開版の固定12hrefと公開JSで旧carila-22を確認した。
- 本PRは5導線のID設定/URL生成をpublic/assets/js/amazon-links.jsへ集約。未発行IDはnullで、既存carila0e-22へfallbackする。
- グッズ12商品/提案/材料/検索/履歴をplacementで区別。affiliate_clickにprojectId / placement / trackingIdを送る。Amazon IDの分離はまだ未完了。
- Amazonログインがunsupported session/clientの500で止まったため、現在のレポート/登録サイト/追加ID/命名上限は未取得。
- 詳細と次回のSource of Truthはdocs/amazon-tracking.md。

## 検証
- npm test: 232/232 PASS（Amazon追加4件を含む）。
- npm run validate:drink-master-v1.9: 400/400 book-index canonical gate PASS。
- 対象JS/HTML inline構文 PASS。新ID別成果/Preview/モバイル/Productionイベント受信は未検証。
- CIはPR時に1本。依存・Actions設定・Worker/API・UI・楽天URLは変更しない。

## Production / 次
1. Amazon管理画面で既存設定/命名制約を確認し、同一アカウント配下の5導線の実IDを発行する。
2. trackingIdsを更新し、Previewの全導線とモバイルを確認する。
3. 明示的な公開依頼後のみControlからProduction更新。公開tagとイベント受信を再確認する。
- 本PRのMergeはProduction公開ではない。公開更新は実施しない。
- mainにはRealtime/favicons/AdSense法務導線等の既存未公開変更が含まれる可能性があり、ID修正だけの公開と見なさない。
- 支払い/銀行口座設定は変更しない。既存の1500杯マスター横断監査とRealtime実機確認待ちは保持する。
- DEPENDENCY DELTA: NONE / ROUTE DELTA: NONE / ACTIONS DELTA: NONE。
