# BarCarila

AIバーテンダーが会話から一杯を提案する、日英対応のシングルページアプリです。

## ローカル開発

```sh
npm install
npm run dev
```

ローカルでAPIも確認する場合は、`.dev.vars` に `ANTHROPIC_API_KEY` と
`UNSPLASH_ACCESS_KEY` を設定します。`.dev.vars` やSecretの値はコミットしないで
ください。

`public/` と `/api/*` は同一Cloudflare Worker・同一originで配信されます。
`GET /health` は外部APIを呼ばない無料の死活確認です。

## バーテンダーCarila Phase 1

`/carila/` は既存のお酒提案画面から分離した、テキスト会話検証用ページです。
専用の `POST /api/carila-chat` がサーバー側の人格設定とセッション中の会話履歴を
Anthropic Messages APIへ渡します。音声、認証、永続的な顧客記憶はPhase 1には
含まれません。Carilaの仮画像は
`public/carila/assets/images/carila-main.png` を差し替え、表示パスを
`public/carila/assets/js/config/ui-config.js` で変更できます。

人格プロンプトは `src/carila-personality.mjs` で組み立てられ、`src/carila/` の
人格・会話・価値観・BAR思想・顧客理解・記憶方針ごとのモジュールで管理します。
ブラウザの `SessionMemory.customerUnderstanding` は顧客理解6分類のセッション内の
器ですが、Phase 1では抽出処理やDB保存には接続していません。現在Anthropicへ渡る
顧客理解は会話履歴と人格プロンプトに基づく文脈理解であり、ページを離れた後には
保持されません。

## 正式なデプロイ経路

正式運用はCloudflareのみです。デプロイと昇格はCARILA WORKS Controlが管理し、
このリポジトリから本番routeやDNSを変更しません。

1. Codexで変更し、`main` に反映する。
2. CARILA WORKS ControlがCloudflare Previewへデプロイする。
3. Previewで会話、画像、静的ファイル、`GET /health` を確認する。
4. CARILA WORKS ControlでProductionへ昇格する。
5. [`https://bar.carilaworks.com/`](https://bar.carilaworks.com/) で公開を確認する。

PreviewとProductionの両方に、CARILA WORKS Controlを通じて次のCloudflare
Runtime Secretsを設定します。

- `ANTHROPIC_API_KEY`
- `UNSPLASH_ACCESS_KEY`

Workerの構成、runtime contract、昇格境界は
[`PROJECT_BRIEF.md`](./PROJECT_BRIEF.md)を参照してください。
