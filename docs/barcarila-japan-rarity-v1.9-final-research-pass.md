# BarCarila Japan Rarity v1.9 — Final Research Pass

Date: 2026-09-05
Status: RESEARCH COMPLETE / pending implementation into D1 seed

Canonical population: the 400 cocktails in the index of 『カクテル完全バイブル』 (pages 6–22). The index, not arbitrary modern cocktail additions, is the source population.

Scoring definition: availability = estimated probability/relative orderability that a competent ordinary Japanese bar can fulfill an order by cocktail name; rarity = 100 - availability. Current independent Japanese menus are primary evidence. Ingredient stock and operational constraints are used to generalize to unobserved bars. Japanese standardness is supportive, not a substitute for current fulfillment evidence.

## Final-pass resolutions for previously weak / unresolved rows

| Cocktail | Availability | Rarity | Confidence | Resolution |
|---|---:|---:|---:|---|
| Winning Run | 54 | 46 | .90 | current independent menu evidence found; common peach/citrus build |
| African Queen | 54 | 46 | .90 | current menu evidence found; banana/curacao/orange is fulfillable where banana liqueur stocked |
| Apricot Fizz | 68 | 32 | .95 | multiple current-menu evidence; straightforward fizz |
| Yellow Parrot | 34 | 66 | .87 | Japanese recognition but Pernod + yellow Chartreuse constrains fulfillment |
| Cool Banana | 56 | 44 | .93 | current menus found; cream + egg white remain operational constraints |
| Green Emotion | 44 | 56 | .82 | limited current-menu evidence; retain below common liqueur standards |
| Sweet Memory | 42 | 58 | .84 | Japanese recipe recognition but yogurt/food ingredient reduces generalization |
| Strawberry Field | 50 | 50 | .86 | name/recipe collision risk; current use exists but canonical-name fulfillment uncertain |
| Ruby Fizz | 56 | 44 | .91 | current bar explicitly serves it; egg use limits generalization |
| Lady Joker | 42 | 58 | .82 | Japanese recipe recognition; weak direct current-menu density |
| Royal Quartet | 34 | 66 | .91 | Suntory Cocktail of the Year provenance strong, but discontinued/specialized Creme de Quartet + champagne/garnish make ordinary fulfillment low |
| Angel Wing | 28 | 72 | .90 | prunelle brandy availability is a strong dedicated-stock constraint |
| Cacao Fizz | 60 | 40 | .93 | current bar menu evidence + simple cacao/lemon/soda structure |
| Hot Italian | 44 | 56 | .86 | known by active Japanese bartender; hot prep reduces ordinary immediate fulfillment |
| Innocent Love | 42 | 58 | .84 | Japanese recipe recognition; limited direct current-menu evidence |
| Easter Egg | 34 | 66 | .82 | weak menu density / dessert-style operational constraints |
| Pechagurt | 34 | 66 | .84 | blender + yogurt materially constrain fulfillment |
| Mother's Touch | 36 | 64 | .80 | weak current-menu evidence; remains specialist |
| Union Jack | 28 | 72 | .86 | layered pousse-cafe style and specialist stock/operation |
| Rainbow | 24 | 76 | .90 | multi-layer pousse-cafe, high operational burden; intentionally very low |

## Wine / beer / sake / shochu / non-alcohol tail normalization

| Cocktail | Availability | Rarity | Confidence |
|---|---:|---:|---:|
| Addington | 56 | 44 | .88 |
| Adonis | 58 | 42 | .91 |
| American Lemonade | 74 | 26 | .95 |
| Cardinal | 64 | 36 | .93 |
| Kir | 90 | 10 | .99 |
| Kir Royal | 88 | 12 | .99 |
| Champagne Cocktail | 74 | 26 | .96 |
| Spritzer | 88 | 12 | .99 |
| Celebration | 54 | 46 | .94 |
| Bamboo | 60 | 40 | .93 |
| Bellini | 86 | 14 | .99 |
| Vermouth & Cassis | 64 | 36 | .94 |
| Mimosa | 90 | 10 | .99 |
| Rose | 48 | 52 | .84 |
| Wine Cooler | 82 | 18 | .97 |
| Campari Beer | 78 | 22 | .97 |
| Shandy Gaff | 96 | 4 | .99 |
| Dog's Nose | 72 | 28 | .94 |
| Beer Spritzer | 74 | 26 | .93 |
| Beer Moni | 54 | 46 | .86 |
| Black Velvet | 62 | 38 | .91 |
| Lunch Box | 52 | 48 | .85 |
| Red Eye | 94 | 6 | .99 |
| Red Bird | 54 | 46 | .87 |
| Saketini | 68 | 32 | .94 |
| Samurai | 56 | 44 | .88 |
| Samurai Rock | 78 | 22 | .97 |
| Nadeshiko | 38 | 62 | .88 |
| Satsuma Komachi | 36 | 64 | .82 |
| Chutini | 42 | 58 | .86 |
| Mai Otome | 48 | 52 | .94 |
| Aoyagi | 34 | 66 | .80 |
| Last Samurai | 38 | 62 | .82 |
| Unfuzzy Navel | 86 | 14 | .98 |
| Sunset Peach | 84 | 16 | .98 |
| Shirley Temple | 92 | 8 | .99 |
| Cinderella | 92 | 8 | .99 |
| Spring Blossom | 70 | 30 | .95 |
| Florida | 82 | 18 | .98 |
| Berry 2 | 40 | 60 | .80 |
| Milk Shake | 76 | 24 | .96 |
| Lover's Dream | 38 | 62 | .80 |
| Lemonade | 94 | 6 | .99 |

## Cross-normalization decisions

- Very common simple name-orders cluster in the 85–98 availability range: Gin & Tonic-class drinks, Shandy Gaff, Red Eye, Kir/Mimosa/Spritzer, Shirley Temple/Cinderella/Lemonade.
- Common stock but less name-standard cocktails cluster roughly 60–84.
- Recognized classics with dedicated bottles, fresh/egg/cream operations, or weak current menu density cluster roughly 40–59.
- Specialist, competition-origin, discontinued-ingredient, multi-layer, blender/yogurt/egg-heavy, or name-collision drinks with sparse current menu evidence cluster below 40.
- Current real-menu observations override simplistic ingredient penalties; special ingredients limit extrapolation to unobserved bars rather than automatically making the cocktail rare.
- ±1–2 changes were generally avoided unless needed for a structural ordering inconsistency.

## Evidence highlights used in final pass

Current/recent Japanese menus used in this pass included Seventh Chord (Apricot Fizz, Cacao Fizz, Ruby Fizz and other standards), WITH BAR (Cool Banana, White Satin, Golden Cadillac, China Blue, etc.), DOUBLE DECKER (Campari Beer, Red Eye, Dog's Nose, Shandy Gaff and canonical non-alcohol cocktails), current Japanese restaurant/bar menus carrying Winning Run and African Queen, Bar AdoniS (Saketini), and BAR Kurayoshi (Mai Otome provenance/current presentation). Japanese manufacturer/industry evidence included Suntory Cocktail Award history for Royal Quartet and Japanese bartender/recipe references where direct current-menu evidence was sparse.

## Rejected population contamination

Do not count old provisional additions such as Penicillin, Gold Rush, Boulevardier, Black Manhattan, New York Sour, generic Whisky Tonic/Rickey/Buck, Cognac Highball, etc. as progress toward the book's 400-cocktail population unless independently present in the canonical book index.

## Completion status

Research/scoring phase for the book population is considered complete for v1.9. Remaining work is implementation/persistence: reconcile canonical Japanese/English names and aliases with the existing 150-row D1 master, generate final seed/upsert rows, update evidence_version to `jp-rarity-v1.9`, run consistency checks (`rarity = 100 - availability`, unique canonical keys, no rejected population contamination), then review via PR before production deployment.
