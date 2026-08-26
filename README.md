# BarCarila

AIバーテンダーが会話から一杯を提案する、日英対応のシングルページアプリです。

## Cloudflare preview

```sh
npm install
npx wrangler secret put ANTHROPIC_API_KEY
npx wrangler secret put UNSPLASH_ACCESS_KEY
npm run dev
```

`public/` と `/api/*` は同一Worker・同一originで配信されます。無料の死活確認は
`GET /health` です。CARILA WORKS連携と本番昇格条件は
[`PROJECT_BRIEF.md`](./PROJECT_BRIEF.md)を参照してください。既存Vercel環境は
Cloudflare Previewの受入確認まで削除しません。

> **Merge前の必須作業:** 既存Vercel Productionへ
> `ANTHROPIC_API_KEY` と `UNSPLASH_ACCESS_KEY` を設定して再デプロイして
> ください。特に後者が未設定の場合、`/api/drink-image` は503になります。
> 値はリポジトリへ保存しないでください。
