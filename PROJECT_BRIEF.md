# BarCarila migration brief

BarCarila is a static, bilingual single-page AI bartender. CARILA WORKS Control
and Cloudflare are its only supported release path. This repository uses CARILA
WORKS' dynamic `cloudflare-worker-app` adapter and intentionally contains
neither a custom-domain route nor DNS configuration.

## Runtime contract

- Wrangler serves `public/` through the `ASSETS` binding and executes
  `src/worker-carila-realtime.mjs` as the entrypoint, delegating to base Worker and master enrichment layers for `/api/*` and `/health`.
- `POST /api/chat` proxies the existing Anthropic Messages request, using the
  server-only `ANTHROPIC_API_KEY` secret. Ordinary recommendations use `claude-sonnet-5`; short turns/search use `claude-haiku-4-5-20251001`; Bartender Carila text uses server-configured `claude-sonnet-4-6`.
- `GET /api/drink-image` searches Unsplash using the server-only
  `UNSPLASH_ACCESS_KEY` secret and caches successful results at the edge.
- `GET /health` performs no upstream request and does not disclose secret values.

Create preview secrets with `wrangler secret put <NAME>` (or inject them through
CARILA WORKS Control). Do not put secret values in `wrangler.jsonc` or client
code.

## Runtime secrets

Add `ANTHROPIC_API_KEY` and `UNSPLASH_ACCESS_KEY` to both Preview and Production
through CARILA WORKS Control's Cloudflare secret injection. Without the former,
`POST /api/chat` returns HTTP 503; without the latter,
`GET /api/drink-image` returns HTTP 503. Secret values must never be stored in
this repository.

## Promotion boundary

The release flow is: Codex changes land on `main`, CARILA WORKS Control deploys
Preview, a human accepts Preview, and CARILA WORKS Control promotes the same
application to Production at `https://bar.carilaworks.com/`. Production
promotion, custom-domain attachment, and DNS changes remain owned by CARILA
WORKS Control and must not be performed from this repository.

## Current acceptance
See `evals/ACCEPTANCE.md` and `docs/UNRESOLVED.md`. Voice requires `OPENAI_API_KEY`. Trial is provisional (20 text / 2 voice per browser per JST day; 5 minutes in normal voice UI). D1 DRINK_DB and secrets are injected by Control; dry-run does not verify runtime bindings. Master maintenance is blocked for recommendation/metadata paths. Static missing assets must return 404; PWA metadata does not imply offline support.
