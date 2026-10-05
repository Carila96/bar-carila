# Amazon tracking

監査日: 2026-10-05。Production公開、支払い/銀行設定の変更は行わない。

## 実状態
- mainはcarila0e-22。既存PR #107 merged=trueをGitHub connectorで確認。
- Productionのグッズ12hrefとassets/js/main.jsは旧carila-22。main反映とProduction反映を混同しない。
- Amazonログインがunsupported session/clientの500画面で止まり、レポート/追加ID/登録サイト/命名制約の現在値は未取得。
- 3クリックがcarila0e-22の集計なら、現在公開Haloの購入導線が有力。BARは旧IDのため候補として弱い。クリック日/過去公開版/SNSは未確認。

## Source of Truth
- public/assets/js/amazon-links.jsのdefaultTrackingIdとtrackingIds。
- bar_recommend / bar_ingredients / bar_search / bar_history / bar_goodsは内部キーであり、AmazonのID名ではない。
- 設定がnullの間は既存carila0e-22へfallbackする。同一メインアカウント配下で実際に発行されたIDだけを設定する。
- 固定12hrefはJavaScriptなしで開くためのfallbackとして維持。DOMContentLoadedでbar_goodsの設定済みIDを適用する。
- main.jsの動的4導線は共通URL生成を使う。楽天リンク・UI・検索語は維持する。
- Amazonクリックは共通helperの1送信元からcarilaTrackへaffiliate_clickを送る。provider / projectId / placement / hrefのtrackingIdのみで、自由入力全文を送信しない。
- Control Analyticsはpropertiesを保存する構造だが、現行管理UIの導線別集計は未実装。受信のProduction E2Eは未確認。
- このPRだけではAmazonのクリック/注文/紹介料はID別に分離されない。実IDの発行→設定→公開→Amazonレポートの確認が必要。

## 次
1. Amazon管理画面で既存設定と命名制約を確認し、5導線に実IDを発行する。未発行文字列を推測しない。
2. trackingIdsの5設定を更新し、Previewとモバイルで全導線を確認する。
3. ユーザーの明示的な公開依頼後のみ、ControlからProduction反映する。既存mainの未公開変更全体も確認する。
