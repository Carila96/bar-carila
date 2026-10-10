# CURRENT_TASK
BAR CARILA横断Acceptance / 1500杯master監査の必要修正とlocal test完了。
branch: `audit/bar-carila-acceptance-20261010`。PR/CI/mergedはGitHubを確認。
- code/endpoint/mock PASS: text20/day、voice2/day、JST reset、fail-closed、通常api除外、D1 point lookup、voice lifecycle、安全表示。
- 詳細: evals/ACCEPTANCE.md。残件: docs/UNRESOLVED.md。
- 次はControlテスト版更新後、updated Preview runtime / iPhone実音声・狭幅UI Acceptance。
- master外部正解性とdeployed D1実消費は未検証。再監査は node scripts/audit-drink-master.mjs。
- Production公開なし。Preview確認後、ユーザーがControlで公開版更新。
- Stripe、価格確定、master自動拡張は対象外。

PR #124（https://github.com/Carila96/bar-carila/pull/124）のcode CI #844はSUCCESS。文書最終同期後のChecks/mergedを確認してControl Previewへ進む。
