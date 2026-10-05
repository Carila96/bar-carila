# CURRENT_TASK

## Task
BarCarilaの検索安定化とPWA実機UXを一度に改善する。

## Acceptance criteria
- お酒検索の本体表示はAmazon/Rakutenリンク生成失敗の影響を受けない。
- AI検索JSONにコードフェンスや余計な前後文が混ざっても可能な範囲で復旧する。
- AI検索JSONが一度だけ不正な場合は1回だけ再試行し、恒常的なAPIループを作らない。
- Amazon導線5種の発行済みtracking IDは維持する。
- iPhone PWA/standaloneで100vh由来の見切れを避け、100dvhとsafe-areaへ対応する。
- 検索入力欄と検索ボタンが狭いiPhone幅でも横にはみ出さない。
- History/Goods/Searchの全面ページもsafe-area内に収まる。
- PWA manifestを追加し、Barの暗い背景 + 中央のカクテルグラスをモチーフにした専用アイコンを使う。
- 既存推薦、1500杯Known Master、Realtime会話、楽天URL、Amazon tracking分類を壊さない。
- Production公開はCARILA WORKS Controlからのみ行う。
