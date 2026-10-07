# Resource Audit — 2026-10-07

## Finding
Normal CI ran on every update to an open PR, including Draft-stage UI/implementation iteration. `cancel-in-progress` stops older runs, but already consumed runner time is not recovered.

## Decision
- Keep the existing CI test suite and validation commands unchanged.
- Skip the CI job while the PR is Draft.
- Include the `ready_for_review` event so CI starts automatically when the PR becomes a Merge candidate.
- Keep manual `workflow_dispatch` for explicit diagnostics.

## Expected resource delta
- Iterative Draft pushes do not consume Actions runner minutes.
- Final Merge candidate still receives the full test + drink-master validation gate.
- No D1, Worker, cron, Queue, dependency, or runtime change.
