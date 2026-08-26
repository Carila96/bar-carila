# BarCarila migration brief

BarCarila is a static, bilingual single-page AI bartender. The existing Vercel
deployment must remain available until the Cloudflare preview has passed manual
acceptance. This repository is now prepared for CARILA WORKS' dynamic
`cloudflare-worker-app` adapter, but it intentionally contains neither a custom
domain route nor DNS configuration.

## Runtime contract

- Wrangler serves `public/` through the `ASSETS` binding and executes
  `src/worker.mjs` for `/api/*` and `/health` on the same origin.
- `POST /api/chat` proxies the existing Anthropic Messages request, using the
  server-only `ANTHROPIC_API_KEY` secret. The UI currently requests
  `claude-sonnet-4-20250514`.
- `GET /api/drink-image` searches Unsplash using the server-only
  `UNSPLASH_ACCESS_KEY` secret and caches successful results at the edge.
- `GET /health` performs no upstream request and does not disclose secret values.

Create preview secrets with `wrangler secret put <NAME>` (or inject them through
CARILA WORKS Control). Do not put secret values in `wrangler.jsonc` or client
code.

## Secret rollout gate

Do **not** merge the Worker migration until the current Vercel production
project has both environment variables below assigned to its Production
environment and has been redeployed:

- `ANTHROPIC_API_KEY` — already read by the existing Vercel chat function.
- `UNSPLASH_ACCESS_KEY` — now read by the existing Vercel image function in
  place of the previously embedded credential.

Without `UNSPLASH_ACCESS_KEY`, `GET /api/drink-image` returns HTTP 503 and drink
images cannot be resolved; the conversation itself continues to use
`ANTHROPIC_API_KEY`. Setting the same valid Unsplash credential in Vercel before
merge and redeploy preserves the existing request and response behavior. Secret
values must be entered only in the Vercel project settings, never in this
repository.

Cloudflare Preview has an independent secret store. Add both names to the
Preview Worker through CARILA WORKS Control's secret injection (or `wrangler
secret put` against the preview environment). A Vercel environment variable is
not automatically available to Cloudflare, and vice versa.

## Promotion boundary

Preview deployment is safe. Production promotion, the
`bar.carilaworks.com` custom-domain attachment, and DNS changes must remain
disabled until preview acceptance. Only then should the Vercel deployment be
retired.
