# BarCarila recommendation model switch

Final drink recommendation turns use `claude-sonnet-5`. Lightweight question turns continue to use `claude-haiku-4-5-20251001`.

The Worker allowlist and drink-master lean-output path both accept Sonnet 5. Runtime tests cover the client and Worker routing together.
