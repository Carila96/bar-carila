# BAR CARILA Acceptance — 2026-10-10

Baseline main: `4168265bb86997325fcf726fac88dcf1b029bef4`.
Branch: `audit/bar-carila-acceptance-20261010`.
Production deployment: **not performed**. Results below distinguish existing Production observations from revised code tests. Merge alone does not deploy.

| Area | Result | Evidence / remaining limit |
|---|---|---|
| Production text conversation | PASS (sample) | `/carila/` rendered; Ctrl+Enter first turn and Send second turn received Japanese replies; log showed greeting and both exchanges. Two real text calls, not 20. |
| Text composer / IME | PASS in simulated UI | Plain Enter creates a newline; Ctrl / Command+Enter submits; `isComposing` suppresses submission. Existing long-form contract retained and explained in UI. iPhone keyboard remains device acceptance. |
| Safe Carila history | PASS | `createTextNode`, `textContent`, `replaceChildren`; literal HTML tested. |
| Text retry / voice-to-text history | FIXED + PASS | Consecutive same-role turns are combined only in upstream payload; bounded to 39 recent messages and 4000 chars each. Full display history preserved. Previously retries after a failure could produce an invalid alternating-role payload. |
| Text quota | PASS endpoint + real SQLite | 20 accepted requests, 21st 429; Anthropic mock called exactly 20 times. Counter, remaining headers and Retry-After asserted. No real 20-call spend. |
| Voice quota | PASS endpoint + real SQLite | Two accepted sessions, third 429; OpenAI mock called exactly twice. Independent text and voice counters. |
| JST reset | PASS | 14:59:59Z → 15:00:00Z rolls to a new JST date row; blocked Retry-After was 1 second. |
| Guard outage | PASS | Missing DB, table setup failure and counter failure return 503 with zero upstream calls. Invalid method/body/content type no longer spends quota or touches DB. Malformed cookie is replaced; cookie flags asserted. Table readiness tracked separately per DB binding. |
| Realtime session request | PASS mocked endpoint | Server-only secret; `/v1/realtime/calls`, SDP/FormData, configured `gpt-realtime-2.1`, Japanese instructions/transcription, `ash`, server VAD interrupt_response true / create_response false. Live OpenAI voice session issuance was not attempted. |
| Greeting / transcript / interruption | PARTIAL | Japanese initial greeting event and transcript rendering tested with simulated WebRTC; VAD interruption configuration tested. Real microphone, speaker feedback, audio interruption and voice quality need iPhone. |
| Five-minute stop / lifecycle | FIXED + PASS simulated WebRTC | Single five-minute timer; repeated connected events do not extend cap. 30-second connection timeout, fetch abort, late getUserMedia cleanup, pagehide, old-peer event rejection, error cleanup, track stop and restart tested. Five-minute cap is client-side, not strict server enforcement. |
| Ordinary `/api/chat` | PASS regression | Outside Trial; known-master tests and open recommendation fallback retained. Search Production returned Negroni and Amazon/Rakuten URLs with expected tracking tag. |
| D1 master load | FIXED + PASS regression | PR #121/#122 merged and protections remain. Static/health bypass D1. Found old `/api/drink-meta` initialization path; now uses same read-only master gate as `/api/chat`. Metadata test sees one indexed SELECT, no master DDL/seed/COUNT. |
| Image cache | PASS existing tests | Edge HIT precedes D1; durable `drink_images` path unchanged; master wrapper does not suppress image writes. No live row-read telemetry was available. |
| 1500 master quality | PARTIAL | All 1500 canonical keys unique; 1100 expansion recipes structurally complete; zero hard structural errors. 49 review findings; base400 is not a complete recipe dataset. See JSON and unresolved register. External recipe correctness not asserted. |
| Security / headers | FIXED + PASS tests | Ordinary recommendation, recipe, stored history, question and log escaped; native-share handler moved out of interpolated onclick. API and assets get nosniff, referrer policy, frame protections and microphone-self permissions. CSP is deliberately limited to base-uri/object-src/frame-ancestors; legacy inline UI is still allowed. |
| PWA / assets | PARTIAL | Production manifest, icons, CSS and JS returned 200; manifest incorrectly used application/octet-stream, now explicitly application/manifest+json. Production missing PNG returned HTML 200 due SPA fallback; changed asset not-found handling to none. Preview must confirm MIME and 404 after release. No offline service worker is present; offline support not claimed. |
| Navigation / first use | FIXED + sample PASS | Trial explanation and midnight reset added without price claims; premium heading renamed; menu accessible name added; closed Carila drawer inert; small voice target enlarged and status contrast improved. Production layout visually inspected at desktop width; iPhone layout remains pending. |
| Runtime error sample | PARTIAL | `/health` 200, unknown API 404, main pages/assets 200. Production `/api/drink-meta?name=Negroni` timed out in curl; cannot claim all live endpoints PASS. This is consistent with the removed initialization path but live causation needs Preview verification. Search model produced a suspicious alternative name `ナグローニ`; search response correctness is not uniformly proven. |

## Verification

- Baseline: `npm test` 240/240 PASS.
- Revised suite: `npm test` 255/255 PASS, including new SQLite quota, UI lifecycle, safe rendering and D1 metadata regressions.
- `npm run validate:drink-master-v1.9`: PASS (400 exact book-index identities).
- `node scripts/audit-drink-master.mjs docs/drink-master-audit-20261010.json`: PASS structural gate, 1500 identities; review findings retained.
- `node --check` for changed main/Carila JS and `git diff --check`: PASS.
- `npx wrangler deploy --dry-run --outdir /tmp/bar-build`: PASS; no upload/deployment. D1/secrets are injected by Control, so dry-run does not verify deployed bindings.
- Local `wrangler dev` could not start: `uv_interface_addresses` system error in this execution environment. Full updated-browser/asset-router checks therefore require Preview. This does not invalidate code/unit/dry-run results.
- Existing GitHub CI only; no new workflow, dependency, price or Stripe integration.

## Resume / release

1. Read the audit PR's merged state and Checks; latest main SHA is authoritative on GitHub, not this baseline.
2. User updates the **test version** in CARILA WORKS Control.
3. On Preview, verify `/carila/`, two successive text turns, search/recommendation, metadata latency, new security headers, manifest MIME and missing-asset 404.
4. iPhone: mic permission, Japanese greeting / actual voice, speaker playback, interruption, transcripts, five-minute end, stop/restart, background/pagehide and narrow layout. Test normal quotas only as needed; use mocks for the 20-turn boundary.
5. Only after Preview acceptance, user updates the **public version** through Control. Do not deploy from this repository.

## GitHub evidence
PR #124: https://github.com/Carila96/bar-carila/pull/124
Code head `ac23b890d16196c0847296075af852af3c1e1002`; existing CI #844 (run 38054155814) completed SUCCESS, including npm test and master validation on Node 22. This final evidence append changes documentation only. Confirm final PR merged state/main ref before Control Preview update.
