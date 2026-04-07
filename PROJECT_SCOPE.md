# PROJECT_SCOPE (MVP Lock)

## Product goal
Build a trustworthy, standalone fantasy football player lookup tool that shows key public data points in one compact view.

This product is not trying to “out-rank” existing platforms. It is a straightforward lookup utility that makes source data easier to inspect.

## Target user
- Normal fantasy football users who want quick player context
- Users who do not want to build a full analytics stack
- Users who value clear sourcing over black-box scores

## MVP inputs
- User enters a player name in search

## MVP outputs
A compact player card with the following fields:
- Player name
- Position
- Team
- 2025 PPR finish
- KTC rank
- KTC value
- Dynasty Data Lab ADP
- Dynasty Data Lab value (if available)
- 2025 season totals in simple format
  - MVP baseline format for WR/TE: receptions / yards / touchdowns
  - formatting language should remain flexible so position-specific stat layouts can be added later

## Data sources
MVP uses public fantasy football data sources, explicitly labeled in the UI/output:
- KeepTradeCut (KTC) for rank/value fields
- Dynasty Data Lab for ADP/value fields
- Public season-stat source(s) for 2025 totals

Rules:
- Do not invent missing values
- If a source field is missing, display “unavailable”
- Keep source labels visible

## Non-goals (MVP)
- No proprietary/custom player grading engine
- No trade calculator
- No player compare tool (yet)
- No league sync/integration
- No rankings history graph
- No projections engine
- No oversized backend architecture in v1

## Design principles
- Keep it simple
- Keep it inspectable
- No invented values
- Clearly label each source
- Show unavailable when data is missing
- Do not present this as a predictive model
- Treat workflow transparency as a first-class project outcome

## Technical constraints
- MVP should remain small and understandable
- Prefer simple implementation choices over heavy architecture
- Keep logic auditable and easy to review in-repo
- Use publicly available data inputs only for MVP
- Avoid building advanced infrastructure before core lookup flow is working

## Expansion ideas for later (not in MVP)
- Compare multiple players side by side
- Add optional trade context tooling
- Add rankings history visualization
- Add projection overlays from external providers
- Add league platform sync
- Add richer position-specific season stat formatting
- Add caching/performance improvements after MVP stability
