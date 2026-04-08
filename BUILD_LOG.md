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
