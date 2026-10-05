# Amazon tracking

監査日: 2026-10-05。Production公開、支払い/銀行設定の変更は行わない。

## 実状態
- 既存carila0e-22はfallbackとして維持。5用途はユーザー提示のAmazon管理一覧（IMG_1955.png）の実発行IDを設定した。
- 先行監査時のProductionのグッズ12hrefとassets/js/main.jsは旧carila-22。main反映とProduction反映を混同しない。
- Amazonログインがunsupported session/clientの500画面で止まり、レポート/追加ID/登録サイト/命名制約の現在値は未取得。
- 3クリックがcarila0e-22の集計なら、現在公開Haloの購入導線が有力。BARは旧IDのため候補として弱い。クリック日/過去公開版/SNSは未確認。

## Source of Truth
- public/assets/js/amazon-links.jsのdefaultTrackingIdとtrackingIds。
- bar_recommend / bar_ingredients / bar_search / bar_history / bar_goodsは内部キーであり、AmazonのID名ではない。
- bar_recommend=carilabrecommend-22 / bar_ingredients=carilabrecipe-22 / bar_search=carilabsearch-22 / bar_history=carilabhistory-22 / bar_goods=carilabgoods-22。未知の導線は既存carila0e-22へfallbackする。
- 固定12hrefもcarilabgoods-22でJavaScriptなしに同じIDを使う。DOMContentLoadedでbar_goodsの設定済みIDを適用する。
- main.jsの動的4導線は共通URL生成を使う。楽天リンク・UI・検索語は維持する。
- Amazonクリックは共通helperの1送信元からcarilaTrackへaffiliate_clickを送る。provider / projectId / placement / hrefのtrackingIdのみで、自由入力全文を送信しない。
- Control Analyticsはpropertiesを保存する構造だが、現行管理UIの導線別集計は未実装。受信のProduction E2Eは未確認。
- ID設定は完了。Production反映後のAmazon ID別レポートで5用途を分ける。過去の3クリックは新IDへ付け替えられない。

## 次
1. Previewとモバイルで全5導線のIDを確認する。
2. ユーザーの明示的な公開依頼後のみ、ControlからProduction反映する。既存mainの未公開変更全体も確認する。
3. AmazonのID別レポートで5用途の成果を確認する。Xの「それあります」は既存URLを使い、今回変更しない。
