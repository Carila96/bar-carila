# PROJECT_STATUS

最終更新: 2026-09-15
現在のbranch: fix-carila-voice-turns-transcripts

## 現在地
- ドリンクマスターは1500杯到達済み。自動拡張タスクは停止済み。
- /carila に OpenAI Realtime / WebRTC の連続音声会話を実装済み。
- 実機確認で「無音でもCarilaが勝手に返答する」「音声の発話内容が画面に出ない」「声が女性寄り」という問題を確認。

## 現在の作業
- Realtime入力を日本語文字起こし付きに変更。
- 自動応答をVAD終了直後ではなく、意味のある文字起こし完了後にクライアントから response.create する方式へ変更。
- near-field noise reduction と高めのVAD thresholdを設定。
- Carila/ユーザー双方の音声文字起こしを既存会話欄とログへ反映。
- 出力voiceを cedar、話速0.96へ変更。

## 検証状況
- コード・テスト更新済み。
- PR #105: CI成功 / drink-master validator成功。

## 次にやること
1. CI / drink-master validatorを通す。
2. 問題なければPRをMerge。
3. CARILA WORKS Previewを更新し、iPhone実機で無音誤反応・文字起こし・割り込み・声質を確認。
4. 1500杯マスターは別セッションで前半/中盤/高速追加後半/最終バッチを横断監査する。

## Handoff
- 推薦候補は1500杯に閉じない。Open Recommendation + Known Master方針を維持する。
- Production公開はCARILA WORKS Controlからのみ行う。
