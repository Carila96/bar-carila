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
