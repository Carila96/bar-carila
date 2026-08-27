# BarCarila contributor guide

- Keep the existing single-page UI and its Japanese/English conversation flow intact.
- Cloudflare production code belongs in `src/worker.mjs`; static files remain in `public/`.
- Never commit API keys. Runtime credentials must be Cloudflare Workers secrets.
- `GET /health` must remain free of calls to metered upstream services.
- Do not add a production route or change DNS from this repository. Promotion is owned by CARILA WORKS Control.
- Run `npm test` before committing Worker changes.
