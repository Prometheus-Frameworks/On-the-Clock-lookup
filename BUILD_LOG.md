# BUILD_LOG

This repository is being built in public.

Every meaningful build step should be recorded here so anyone can review what was asked, what was changed, and what happened.

## Entry template

### YYYY-MM-DD — Short step title
- **Date:** YYYY-MM-DD
- **Goal:**
- **Prompt used:**
- **Model/agent used:**
- **Files changed:**
  - `path/to/file`
- **Result:**
- **Notes/issues:**

---

## Entries

### 2026-04-09 — First MVP-card UI redesign (dark premium pass)
- **Date:** 2026-04-09
- **Goal:** Replace the plain MVP card with the first real dark-theme “MVP card” redesign using the existing frontend mapping layer, while preserving lookup behavior and truthful unavailable/source handling.
- **Prompt used:** “Build the next PR for this project by implementing the first real MVP-card UI redesign using the new frontend data-mapping layer that already exists.”
- **Model/agent used:** GPT-5.3-Codex (Codex CLI agent).
- **Files changed:**
  - `public/styles.css`
  - `public/app.js`
  - `README.md`
  - `BUILD_LOG.md`
- **Result:** Implemented a premium dark-shell redesign with upgraded search UI (dark input + stronger button + styled loading), a restructured card header (name + position/team badges + coverage), separated market/performance sections, team-accent border, and preserved transparent sources/unavailable values via the existing view-model render flow.
- **Notes/issues:** Intentionally deferred optional extras (sparklines, search history, broad component-system expansion, full responsive polish) to keep this pass readable and scoped.

### 2026-04-09 — Frontend data-shaping prep pass for future MVP-card redesign
- **Date:** 2026-04-09
- **Goal:** Add a small frontend mapping layer that reshapes the API player payload into a cleaner UI view model while keeping current card behavior and visuals unchanged.
- **Prompt used:** “Build the next PR for this project as a frontend data-shaping prep pass for a future MVP-card UI redesign.” (full prompt in chat task context).
- **Model/agent used:** GPT-5.3-Codex (Codex CLI agent).
- **Files changed:**
  - `public/playerViewModel.js`
  - `public/app.js`
  - `public/index.html`
  - `README.md`
  - `BUILD_LOG.md`
- **Result:** Added a dedicated frontend helper that maps raw player API fields into grouped UI-facing blocks (`identity`, `marketMetrics`, `performance`, `sources`) and switched card rendering to consume the mapped object without changing the existing UI layout or unavailable/source transparency behavior.
- **Notes/issues:** Kept backend API contract unchanged; this pass prepares cleaner rendering inputs for a future MVP-card visual redesign PR.

### 2026-04-09 — Position-aware season totals presentation for expanded stress-test pool
- **Date:** 2026-04-09
- **Goal:** Make the season totals row read more honestly across positions without changing the MVP card structure or search flow.
- **Prompt used:** “Build the next PR for this project by improving how the season totals field is presented across positions, based on the stress-test results from the expanded player pool.”
- **Model/agent used:** GPT-5.3-Codex (Codex CLI agent).
- **Files changed:**
  - `public/app.js`
  - `README.md`
  - `BUILD_LOG.md`
- **Result:** Added a small position-aware presentation helper for the season totals row: WR/RB/TE display a receiving-totals label, while unsupported positions now show an explicit unavailable fallback noting the current receiving-style artifact limitation.
- **Notes/issues:** Kept the card compact and preserved lookup behavior, coverage line logic, source summary, and general unavailable handling for other fields.

### 2026-04-08 — Not-found/search-result UX improvements with simple local suggestions
- **Date:** 2026-04-08
- **Goal:** Improve the not-found and weak-query search-result experience while keeping the existing MVP player card unchanged.
- **Prompt used:** “Build the next PR for this project by improving the not-found and search-result UX, while keeping the app simple and the current MVP card unchanged.”
- **Model/agent used:** GPT-5.3-Codex (Codex CLI agent).
- **Files changed:**
  - `src/api/lookupPlayer.js`
  - `src/server.js`
  - `public/app.js`
  - `public/styles.css`
  - `README.md`
  - `BUILD_LOG.md`
- **Result:** Added explicit no-match metadata (`reason` + up to 3 suggestions from local players), added small deterministic close-name suggestion logic, and upgraded frontend no-match rendering with plain-language guidance for short/broad/no-local-match queries.
- **Notes/issues:** Successful-match flow and player card fields/layout/source transparency/coverage line were preserved unchanged.

### 2026-04-08 — Player card coverage-awareness UX line
- **Date:** 2026-04-08
- **Goal:** Add a small, honest coverage-awareness indicator to the MVP player card so users can quickly see how complete the current result is.
- **Prompt used:** “Build the next PR for this project by adding a small coverage-awareness UX improvement so users can better understand when a player card has partial data coverage.”
- **Model/agent used:** GPT-5.3-Codex (Codex CLI agent).
- **Files changed:**
  - `public/app.js`
  - `public/styles.css`
  - `README.md`
  - `BUILD_LOG.md`
- **Result:** Added a compact coverage summary line on the player card that counts availability across the six MVP data fields and displays plain-language status (full, broad, or partial coverage) grounded in the count.
- **Notes/issues:** Kept UI structure and existing field rendering unchanged; missing values still render as `unavailable`.

### 2026-04-07 — Project foundation documents created
- **Date:** 2026-04-07
- **Goal:** Establish project foundation docs before app implementation.
- **Prompt used:** Create foundational documentation only (`README.md`, `BUILD_LOG.md`, `PROJECT_SCOPE.md`) for On-the-Clock Lookup, including MVP boundaries and AI workflow transparency.
- **Model/agent used:** Codex (implementation) guided by user-provided scope.
- **Files changed:**
  - `README.md`
  - `BUILD_LOG.md`
  - `PROJECT_SCOPE.md`
- **Result:** Foundation documentation created; MVP expectations, non-goals, and build-in-public process are now documented.
- **Notes/issues:** Assumed “2025 season totals” refers to finalized season stat lines from public sources, displayed as plain totals without derived scoring logic.

### 2026-04-07 — MVP vertical slice: mocked player lookup app
- **Date:** 2026-04-07
- **Goal:** Implement the first working end-to-end MVP slice with a frontend search flow, backend lookup route, and mocked player data.
- **Prompt used:** “Build the first real PR for this project by implementing the smallest possible working vertical slice of the MVP…” (full prompt in chat task context).
- **Model/agent used:** GPT-5.3-Codex (Codex CLI agent).
- **Files changed:**
  - `package.json`
  - `package-lock.json`
  - `src/server.js`
  - `src/api/lookupPlayer.js`
  - `src/data/mockPlayers.js`
  - `src/data/playerContract.js`
  - `public/index.html`
  - `public/styles.css`
  - `public/app.js`
  - `README.md`
  - `BUILD_LOG.md`
- **Result:** Added a runnable Node/Express app with a simple search UI and `/api/players?name=` route backed by isolated mock data (including Drake London), plus explicit MVP response contract fields and unavailable handling in UI.
- **Notes/issues:** Data values are intentionally mocked placeholders for MVP wiring only and are labeled as mock in visible source labels.

### 2026-04-07 — Season totals moved from mock to real-source-backed path
- **Date:** 2026-04-07
- **Goal:** Replace mocked `2025 season totals` in the player card flow with one real-source-backed path while leaving KTC and Dynasty Data Lab fields mocked.
- **Prompt used:** “Build the next PR… replacing one part of the mocked player card flow with one real data source path… keep the rest intact.”
- **Model/agent used:** GPT-5.3-Codex (Codex CLI agent).
- **Files changed:**
  - `src/data/mockPlayers.js`
  - `src/data/sources/seasonTotals2025.nflverse.json`
  - `src/data/seasonTotals2025.js`
  - `src/api/lookupPlayer.js`
  - `public/app.js`
  - `README.md`
  - `BUILD_LOG.md`
- **Result:** Added a simple adapter path that resolves `seasonTotals2025` from a checked-in local artifact derived from nflverse 2025 regular-season player stats; all other player card data remains mocked.
- **Notes/issues:** Kept the season totals source explicit in `sourceLabels` and UI source text. Missing totals still return `null` and render as “unavailable”.

### 2026-04-07 — 2025 PPR finish moved from mock to real-source-backed path
- **Date:** 2026-04-07
- **Goal:** Replace mocked `2025 PPR finish` with a real-source-backed value while keeping KTC and Dynasty Data Lab fields mocked.
- **Prompt used:** “Build the next PR… replacing the mocked 2025 PPR finish field with a real-source-backed implementation, while keeping the rest of the app structure intact.”
- **Model/agent used:** GPT-5.3-Codex (Codex CLI agent).
- **Files changed:**
  - `src/data/sources/pprFinish2025.nflverse.json`
  - `src/data/pprFinish2025.js`
  - `src/api/lookupPlayer.js`
  - `src/data/mockPlayers.js`
  - `public/app.js`
  - `README.md`
  - `BUILD_LOG.md`
- **Result:** Added a local real-source-backed adapter for `pprFinish2025` using nflverse-derived data and wired it into lookup responses; UI now shows a dedicated PPR source label while preserving unavailable behavior for missing PPR values.
- **Notes/issues:** PPR finish is represented as positional finish derived by sorting `fantasy_points_ppr` within each position from nflverse 2025 regular-season stats.

### 2026-04-07 — KTC rank/value moved from mock to real-source-backed local artifact path
- **Date:** 2026-04-07
- **Goal:** Replace mocked KTC rank/value with a real-source-backed path while leaving Dynasty Data Lab fields mocked.
- **Prompt used:** “Build the next PR… replacing the mocked KTC fields with a real-source-backed implementation, while keeping the rest of the app structure intact.”
- **Model/agent used:** GPT-5.3-Codex (Codex CLI agent).
- **Files changed:**
  - `src/data/sources/ktcValues.1qb.json`
  - `src/data/ktcValues.js`
  - `src/api/lookupPlayer.js`
  - `src/data/mockPlayers.js`
  - `public/app.js`
  - `README.md`
  - `BUILD_LOG.md`
- **Result:** Added a small KTC adapter that resolves `ktcRank` and `ktcValue` from a checked-in local artifact (KeepTradeCut 1QB snapshot path), wired into lookup responses, and clearly labeled in both API source labels and player card UI.
- **Notes/issues:** KeepTradeCut direct live fetch/scrape was not used in this step; artifact was derived from the public `flamjammy/dynastykit-ktc-scraper` snapshot (`docs/ktc_1qb.csv`, updated 2026-04-07 UTC). Missing KTC entries still return `null` and render as “unavailable”. Dynasty Data Lab fields remain mocked.

### 2026-04-08 — Dynasty Data Lab ADP/value moved from mock to real-source-backed local artifact path
- **Date:** 2026-04-08
- **Goal:** Replace mocked Dynasty Data Lab ADP/value fields with a real-source-backed path while preserving current lookup and card structure.
- **Prompt used:** “Build the next PR for this project by replacing the remaining mocked Dynasty Data Lab fields with a real-source-backed implementation, while keeping the rest of the app structure intact.”
- **Model/agent used:** GPT-5.3-Codex (Codex CLI agent).
- **Files changed:**
  - `src/data/sources/dynastyDataLab.adpValue.json`
  - `src/data/dynastyDataLabValues.js`
  - `src/api/lookupPlayer.js`
  - `src/data/mockPlayers.js`
  - `public/app.js`
  - `README.md`
  - `BUILD_LOG.md`
- **Result:** Added a Dynasty Data Lab adapter that resolves ADP/value from a checked-in local artifact snapshot and wired it into API lookup responses, with explicit source labeling in API payload and UI and unchanged unavailable behavior for missing values.
- **Notes/issues:** Used a local artifact snapshot path (not live scraping) to keep implementation inspectable and stable; artifact metadata records format and snapshot date.

### 2026-04-08 — Cleanup/hardening pass: response contract, source-label UI cleanup, artifact refresh docs
- **Date:** 2026-04-08
- **Goal:** Tighten response contract assembly, reduce duplicated source-label clutter in the card UI, and add practical artifact refresh documentation.
- **Prompt used:** “Build the next PR for this project as a cleanup and hardening pass now that the MVP card is fully real-source-backed…” (full prompt in chat task context).
- **Model/agent used:** GPT-5.3-Codex (Codex CLI agent).
- **Files changed:**
  - `src/data/playerContract.js`
  - `src/data/mockPlayers.js`
  - `src/api/lookupPlayer.js`
  - `public/app.js`
  - `docs/ARTIFACT_REFRESH.md`
  - `README.md`
  - `BUILD_LOG.md`
- **Result:** Added a small explicit response-builder contract helper, removed repetitive per-field source rows while keeping a transparent source summary footer, and documented concrete refresh workflows for every checked-in artifact.
- **Notes/issues:** No product features added; card fields and lookup behavior remain unchanged aside from cleaner source-label presentation.

### 2026-04-08 — Search quality improvement + modest player pool expansion
- **Date:** 2026-04-08
- **Goal:** Improve player lookup matching behavior and expand the local player pool while keeping the MVP card unchanged.
- **Prompt used:** “Build the next PR for this project by improving search quality and slightly expanding player coverage, while keeping the app simple and the existing MVP card unchanged.”
- **Model/agent used:** GPT-5.3-Codex (Codex CLI agent).
- **Files changed:**
  - `src/api/lookupPlayer.js`
  - `src/data/mockPlayers.js`
  - `README.md`
  - `BUILD_LOG.md`
- **Result:** Added deterministic staged matching (case-insensitive exact, normalized exact, normalized prefix, normalized containment) with simple name normalization; expanded local player pool from 3 to 9 players; preserved card fields/layout and existing unavailable behavior for missing source-backed fields.
- **Notes/issues:** Did not expand source artifacts in this step; newly added players are intentionally discoverable in search but can show `unavailable` where source-backed values are not yet present.

### 2026-04-08 — Expanded artifact coverage for the 9-player local pool
- **Date:** 2026-04-08
- **Goal:** Improve source-backed field coverage for the expanded nine-player local pool while keeping the existing MVP card and response contract unchanged.
- **Prompt used:** “Build the next PR for this project by improving data coverage for the expanded 9-player local pool, while keeping the app simple and the existing MVP card unchanged.”
- **Model/agent used:** GPT-5.3-Codex (Codex CLI agent).
- **Files changed:**
  - `src/data/sources/pprFinish2025.nflverse.json`
  - `src/data/sources/seasonTotals2025.nflverse.json`
  - `src/data/sources/ktcValues.1qb.json`
  - `docs/ARTIFACT_REFRESH.md`
  - `README.md`
  - `BUILD_LOG.md`
- **Result:** Expanded checked-in nflverse and KTC artifacts from the original core trio to the full nine-player local pool, so newly added players now return source-backed values for PPR finish, season totals, and KTC rank/value. Dynasty Data Lab artifact remains a partial subset and still returns `unavailable` where rows are missing.
- **Notes/issues:** Dynasty Data Lab public site access was unavailable from this environment during this pass, so no new Dynasty Data Lab rows were added; existing null/unavailable behavior was preserved.


### 2026-04-08 — Follow-up fix: QB season totals set back to unavailable in receiving-style card format
- **Date:** 2026-04-08
- **Goal:** Address PR feedback by removing misleading QB receiving stat lines from the `2025 season totals` artifact so the current MVP card remains semantically honest.
- **Prompt used:** Follow-up implementation request to address inline PR comments and fix blocker on QB season totals semantics.
- **Model/agent used:** GPT-5.3-Codex (Codex CLI agent).
- **Files changed:**
  - `src/data/sources/seasonTotals2025.nflverse.json`
  - `docs/ARTIFACT_REFRESH.md`
  - `README.md`
  - `BUILD_LOG.md`
- **Result:** Removed Jayden Daniels and C.J. Stroud from the receiving-style season totals artifact so lookup returns `null` for this field and UI renders `unavailable` for those QBs under the current card shape.
- **Notes/issues:** Kept scope narrow; no response contract or UI structure changes.


### 2026-04-08 — Dynasty Data Lab artifact aligned to full 9-player local pool
- **Date:** 2026-04-08
- **Goal:** Expand Dynasty Data Lab artifact coverage alignment for the existing nine-player local pool while preserving MVP response behavior.
- **Prompt used:** “Build the next PR for this project by improving Dynasty Data Lab coverage for the expanded 9-player local pool, while keeping the app simple and the current MVP card unchanged.”
- **Model/agent used:** GPT-5.3-Codex (Codex CLI agent).
- **Files changed:**
  - `src/data/sources/dynastyDataLab.adpValue.json`
  - `BUILD_LOG.md`
- **Result:** Updated the checked-in Dynasty Data Lab artifact to include explicit rows for all nine local pool players while preserving existing source-backed ADP/value values and null handling for unavailable fields.
- **Notes/issues:** Dynasty Data Lab domain access remains blocked from this execution environment (HTTP 403), so additional ADP/value numbers beyond the previously captured rows could not be freshly retrieved in this pass.

### 2026-04-08 — Controlled local pool expansion for stress-testing search + coverage rough edges
- **Date:** 2026-04-08
- **Goal:** Expand the local player pool in a controlled way to stress-test search behavior, coverage transparency, and awkward-name handling without changing app structure.
- **Prompt used:** “Build the next PR for this project by expanding the local player pool in a controlled way so we can stress test how the current app behaves with a wider and slightly messier set of players.”
- **Model/agent used:** GPT-5.3-Codex (Codex CLI agent).
- **Files changed:**
  - `src/data/mockPlayers.js`
  - `README.md`
  - `BUILD_LOG.md`
- **Result:** Expanded the local pool from 9 to 23 players with a deliberately mixed set across QB/RB/WR/TE, including less-obvious fantasy names and punctuation/format edge cases (for example hyphenated and suffix-style names). Kept lookup/card/source/coverage/no-match UX behavior unchanged.
- **Notes/issues:** No artifact expansion in this step by design; newly added players can legitimately render `unavailable` for source-backed fields where artifact rows do not exist yet.


### 2026-04-08 — KTC default switched to Superflex + source footer readability cleanup
- **Date:** 2026-04-08
- **Goal:** Make Superflex the default KTC format and clean up source presentation in the player card without changing MVP behavior.
- **Prompt used:** “Build the next PR for this project by making superflex the default KTC format and cleaning up the source presentation so the player card matches that default more clearly.”
- **Model/agent used:** GPT-5.3-Codex (Codex CLI agent).
- **Files changed:**
  - `src/data/sources/ktcValues.superflex.json`
  - `src/data/ktcValues.js`
  - `src/data/playerContract.js`
  - `public/app.js`
  - `public/styles.css`
  - `docs/ARTIFACT_REFRESH.md`
  - `README.md`
  - `BUILD_LOG.md`
- **Result:** KTC artifact path and source labels now default to Superflex, KTC snapshot metadata/docs now reference `ktc_sf.csv`, and the player-card source area now renders as a compact field-by-field source list instead of one dense sentence.
- **Notes/issues:** Superflex values were refreshed from the public `flamjammy/dynastykit-ktc-scraper` `docs/ktc_sf.csv` snapshot in this environment (updated April 08, 2026 07:24 PM UTC in upstream header).

### 2026-04-09 — Stress-test local pool expansion + coverage diagnostic script
- **Date:** 2026-04-09
- **Goal:** Expand the local pool in a controlled way and add a simple diagnostic report to inspect lookup + six-field coverage gaps without changing product behavior.
- **Prompt used:** “Build a small stress-test PR for this project so we can evaluate how the current app behaves with a broader and slightly messier player pool, without changing the core product.”
- **Model/agent used:** GPT-5.3-Codex (Codex CLI agent).
- **Files changed:**
  - `src/data/mockPlayers.js`
  - `scripts/stressTestCoverageReport.js`
  - `package.json`
  - `README.md`
  - `BUILD_LOG.md`
- **Result:** Expanded the local player pool from 23 to 35 with additional mid-tier and edge-case names across QB/RB/WR/TE, and added a compact script that iterates the pool, runs existing lookup flow, and reports found status plus six-field coverage/missing fields with aggregate totals and position breakdowns.
- **Notes/issues:** Intentionally did not backfill missing artifacts or alter UI/lookup behavior; this pass is for stress visibility, not weakness remediation.

### 2026-04-09 — Targeted artifact backfill for weak partial-coverage players
- **Date:** 2026-04-09
- **Goal:** Use the stress-test report to improve a small, high-value subset of weak partial-coverage players in the 35-player local pool without changing app behavior.
- **Prompt used:** “Build the next PR for this project by using the stress-test results to improve coverage for a small, targeted set of the weakest partial-coverage players in the current 35-player pool.”
- **Model/agent used:** GPT-5.3-Codex (Codex CLI agent).
- **Files changed:**
  - `src/data/sources/pprFinish2025.nflverse.json`
  - `src/data/sources/seasonTotals2025.nflverse.json`
  - `src/data/sources/ktcValues.superflex.json`
  - `BUILD_LOG.md`
- **Result:** Backfilled source-backed rows for four previously 0/6 players (Amon-Ra St. Brown, Jaxon Smith-Njigba, Dalton Kincaid, Baker Mayfield) using existing nflverse and KTC artifacts. Their coverage improved to 4/6 (WR/TE) and 3/6 (QB), while Dynasty Data Lab fields remain unavailable due source-access limits.
- **Notes/issues:** Dynasty Data Lab remained inaccessible from this environment (HTTP 403), so ADP/value fields were intentionally left missing rather than inferred.

### 2026-04-09 — Second targeted artifact backfill batch for weak-coverage pool players
- **Date:** 2026-04-09
- **Goal:** Improve another small, high-value subset of weak-coverage players in the 35-player pool using existing artifacts, while preserving current UI and lookup behavior.
- **Prompt used:** “Build the next PR for this project by doing another small, targeted artifact backfill batch for weak-coverage players in the current 35-player pool.”
- **Model/agent used:** GPT-5.3-Codex (Codex CLI agent).
- **Files changed:**
  - `src/data/sources/pprFinish2025.nflverse.json`
  - `src/data/sources/seasonTotals2025.nflverse.json`
  - `src/data/sources/ktcValues.superflex.json`
  - `BUILD_LOG.md`
- **Result:** Backfilled five recognizable weak-coverage WR/RB/TE players (DK Metcalf, Rome Odunze, Brian Thomas Jr., Pat Freiermuth, D'Andre Swift) across nflverse PPR finish, nflverse season receiving totals, and KTC Superflex rank/value artifacts. Each moved from 0/6 to 4/6 coverage with only Dynasty Data Lab fields still unavailable.
- **Notes/issues:** Dynasty Data Lab was not expanded in this pass; missing ADP/value fields remain null/unavailable by design.
