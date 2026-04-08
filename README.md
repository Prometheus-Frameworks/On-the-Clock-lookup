# On-the-Clock Lookup

## What this project is
On-the-Clock Lookup is a simple fantasy football player lookup tool.

The goal is to let normal users search for a player and quickly see a small set of useful dynasty and season context from public sources, in one place.

This project is also a build-in-public example. The workflow and decisions are documented so other people can inspect how the repo was created and extended over time.

## MVP: what it does
For v1 (MVP), a user types a player name and gets a compact player card.

If a query does not resolve cleanly, the app now returns a simple not-found state with plain-language guidance and up to 3 close suggestions from the local player pool.

The card shows these exact fields:
- Player name
- Position
- Team
- 2025 PPR finish
- KTC rank
- KTC value
- Dynasty Data Lab ADP
- Dynasty Data Lab value (if available)
- 2025 season totals in a simple format
  - WR/TE format in MVP: receptions / yards / touchdowns
  - wording and formatting should stay flexible so position-specific layouts can expand later
- A compact coverage line based on those six data fields (for example: “Coverage: 5 of 6 fields available”), so users can quickly tell whether a card is mostly complete or partial

## MVP: what it explicitly does NOT do
This MVP is intentionally limited. It does **not** include:
- a custom grading engine
- a trade calculator
- a player compare tool
- league account sync
- rankings history graphs
- a projections engine
- a large backend architecture in v1

## Product principles
- Keep it simple
- Keep it inspectable
- No invented values
- Clearly label each source
- Show “unavailable” when data does not exist
- Do not present this as a predictive model
- Treat workflow transparency as part of the product

## AI-assisted build workflow
This repo is built using common consumer AI subscriptions plus public data sources.

### Option A
- ChatGPT Plus
- ChatGPT handles repo context, prompt assignment, drift correction, and review
- Codex handles implementation work

### Option B
- ChatGPT Plus + Claude Pro
- Claude can be used for second-opinion review
- If Claude is rate-limited or unavailable, work continues with ChatGPT/Codex or another capable repo-aware model

### Resilience rule
The build should never pause just because one agent is offline.

If one AI coding/review agent is unavailable:
1. Continue with the available agent(s)
2. Record the switch in `BUILD_LOG.md`
3. Keep prompts and outcomes visible so anyone can audit decisions later


## Data source status (current)
- **Real-source-backed now:**
  - `2025 PPR finish` and `2025 season totals` (served from checked-in local artifacts derived from nflverse `stats_player_reg_2025.csv`).
  - `KTC rank` and `KTC value` (served from a checked-in local artifact derived from a KeepTradeCut 1QB snapshot from `flamjammy/dynastykit-ktc-scraper`, updated 2026-04-07 UTC).
  - `Dynasty Data Lab ADP` and `Dynasty Data Lab value` (served from a checked-in local artifact snapshot prepared from Dynasty Data Lab public dynasty startup ADP/value table, Superflex format, snapshot date 2026-04-08 UTC).
- **Still mocked in this phase:** none on the current MVP player card fields.

## Artifact refresh instructions
Detailed, step-by-step refresh guidance for every checked-in source artifact now lives in:

- `docs/ARTIFACT_REFRESH.md`

That guide documents for each artifact:
- upstream source
- snapshot meaning/format
- how the current local file was derived
- practical refresh steps for normal users

## Local development
1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the app:
   ```bash
   npm run dev
   ```
3. Open `http://localhost:3000` and search for one of the local sample players:
   - Drake London
   - Garrett Wilson
   - Brock Bowers
   - Bijan Robinson
   - CeeDee Lamb
   - Jayden Daniels
   - Baker Mayfield
   - D'Andre Swift
   - Amon-Ra St. Brown
   - Jaxon Smith-Njigba
   - Brian Thomas Jr.
   - Dalton Kincaid

Note: the local player pool is now intentionally broader (23 players) than current checked-in artifact coverage, so some players will return partial cards with `unavailable` values. This is expected for stress-testing search behavior, source coverage transparency, and edge-case name handling.

## Public build log process
Future build prompts and meaningful build steps are logged in `BUILD_LOG.md`.

Each entry should include:
- date
- goal
- prompt used
- model/agent used
- files changed
- result
- notes/issues
