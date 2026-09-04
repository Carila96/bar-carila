# D1-backed recommendation output optimization

Status: CONFIRMED implementation
Date: 2026-09-04

For BarCarila Sonnet recommendation turns, when the managed D1 drink master is available, the server appends a narrow output instruction listing drinks covered by `DRINK_COPY_SEED`.

For those listed drinks, the model may omit `drink.rarity`, `drink.description`, and `drink.trivia`. The Worker restores those fields from the researched D1 drink master before returning the response to the browser.

Unknown/unregistered drinks keep the existing full-output fallback, so recommendation cards remain usable even when a drink is not covered by D1.

This reduces model output devoted to fixed drink facts while preserving AI-generated recommendation reasoning, message, ABV, recipe, tags, and the existing fallback path.
