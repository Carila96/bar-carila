# CURRENT_TASK

## Task
Bartender Carilaを正式課金前の試用版として運用できるよう、サービス構想をRepositoryへ残し、テキスト/Realtime音声の無制限API消費を防ぐ暫定コストガードを追加する。

## Acceptance criteria
- 将来の無料/有料境界、価格、Stripe等は未確定として文書化し、過去の月額1,000円案を確定仕様にしない。
- `/api/carila-chat` は匿名ブラウザID単位で1日20 user turnを上限とし、超過時はAnthropicへ送らずHTTP 429を返す。
- `/api/carila-realtime-session` は匿名ブラウザID単位で1日2 sessionを上限とし、超過時はOpenAI Realtimeへ送らずHTTP 429を返す。
- 音声1 sessionは通常UIで最大5分とする。
- 日次リセットはAsia/Tokyo 00:00基準とする。
- 利用回数は既存Cloudflare D1 `DRINK_DB` 内の専用 `carila_usage_daily` tableで保持し、raw IPは保存しない。
- D1 usage guardが利用不能な場合は課金APIへfail-openせず、Carila会話のみ503で保護する。
- BAR本体のお酒提案 `/api/chat`、1500杯Known Master、検索、Amazon/Rakuten導線はこの制限対象にしない。
- 既存Realtimeの日本語、割り込み、VOICE LOG、テキスト会話を壊さない。
- Production公開はCARILA WORKS Controlからのみ行う。

## Non-goals
- Stripe課金実装
- アカウント認証
- 最終的な無料枠/有料枠の確定
- cookie削除や別ブラウザまで防ぐ強固なanti-abuse
