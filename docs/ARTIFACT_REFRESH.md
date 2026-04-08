# Artifact Refresh Guide

This project serves MVP player-card fields from **checked-in local artifacts** so output stays stable and inspectable.

Use this guide when refreshing the artifacts.

## Ground rules
- Keep files small and human-auditable.
- Keep format stable unless there is a clear MVP reason to change it.
- If you change artifact shape, update the adapter module and `BUILD_LOG.md` in the same PR.
- Record snapshot date and source context in this file and in the artifact metadata.

---

## 1) 2025 season totals artifact

- **Artifact file:** `src/data/sources/seasonTotals2025.nflverse.json`
- **Used by:** `src/data/seasonTotals2025.js`
- **Card field(s):** `seasonTotals2025`
- **Upstream source:** nflverse `stats_player_reg_2025.csv`
- **Snapshot/format represented:** Regular-season receiving totals for the small MVP player pool.
- **Current local format:**
  - top-level `metadata`
  - `players` array entries with:
    - `playerName`
    - `receptions`
    - `receivingYards`
    - `receivingTds`

### How this artifact was derived
1. Start from nflverse `stats_player_reg_2025.csv`.
2. Filter to players in the current local 9-player pool (`Drake London`, `Garrett Wilson`, `Brock Bowers`, `Bijan Robinson`, `CeeDee Lamb`, `Jahmyr Gibbs`, `Puka Nacua`, `Jayden Daniels`, `C.J. Stroud`).
3. Copy receiving totals into the JSON structure above.
4. Update metadata date/source notes.

### How to refresh later
1. Download the latest version of `stats_player_reg_2025.csv` from nflverse.
2. Rebuild or manually update only the required player rows.
3. Preserve existing key names and number types.
4. Save to `src/data/sources/seasonTotals2025.nflverse.json`.
5. Run local app checks and verify the card still renders expected totals.

---

## 2) 2025 PPR finish artifact

- **Artifact file:** `src/data/sources/pprFinish2025.nflverse.json`
- **Used by:** `src/data/pprFinish2025.js`
- **Card field(s):** `pprFinish2025`
- **Upstream source:** nflverse `stats_player_reg_2025.csv`
- **Snapshot/format represented:** Positional finish in PPR scoring for the MVP player pool.
- **Current local format:**
  - top-level `metadata`
  - `players` array entries with:
    - `playerName`
    - `position`
    - `pprFinish`

### How this artifact was derived
1. Start from nflverse `stats_player_reg_2025.csv`.
2. Use `fantasy_points_ppr` to rank players **within each position**.
3. Keep the MVP player subset and write their position + finish.
4. Save as JSON with metadata.

### How to refresh later
1. Pull newest nflverse regular-season file for 2025.
2. Recompute position-specific PPR finish from `fantasy_points_ppr`.
3. Update only MVP player entries in `src/data/sources/pprFinish2025.nflverse.json`.
4. Verify the API returns numeric finish values or `null` when missing.

---

## 3) KTC rank/value artifact

- **Artifact file:** `src/data/sources/ktcValues.1qb.json`
- **Used by:** `src/data/ktcValues.js`
- **Card field(s):** `ktcRank`, `ktcValue`
- **Upstream source:** KeepTradeCut public 1QB dynasty ranking data via `flamjammy/dynastykit-ktc-scraper` snapshot path (`docs/ktc_1qb.csv`)
- **Snapshot/format represented:** Point-in-time 1QB KTC rank/value snapshot.
- **Current local format:**
  - top-level `metadata`
  - `players` array entries with:
    - `playerName`
    - `ktcRank`
    - `ktcValue`

### How this artifact was derived
1. Pull a recent `docs/ktc_1qb.csv` snapshot from the scraper repo.
2. Locate rows for current local pool players.
3. Copy rank/value into local JSON structure.
4. Set/update snapshot date in metadata.

### How to refresh later
1. Get latest public `ktc_1qb.csv` snapshot.
2. Re-copy MVP rows into `src/data/sources/ktcValues.1qb.json`.
3. Keep number fields as numbers (not strings).
4. Update metadata snapshot date and brief source note.

---

## 4) Dynasty Data Lab ADP/value artifact

- **Artifact file:** `src/data/sources/dynastyDataLab.adpValue.json`
- **Used by:** `src/data/dynastyDataLabValues.js`
- **Card field(s):** `dynastyDataLabAdp`, `dynastyDataLabValue`
- **Upstream source:** Dynasty Data Lab public dynasty startup ADP/value table (Superflex)
- **Snapshot/format represented:** Point-in-time ADP and value snapshot for MVP players.
- **Current local format:**
  - top-level `metadata`
  - `players` array entries with:
    - `playerName`
    - `dynastyDataLabAdp`
    - `dynastyDataLabValue`

### How this artifact was derived
1. Open Dynasty Data Lab public startup ADP/value table in Superflex format.
2. Capture current local pool player rows when available.
3. Copy ADP/value into local JSON structure with metadata snapshot date.

### How to refresh later
1. Open the latest public Dynasty Data Lab startup ADP/value view (Superflex).
2. Update rows for current local pool players in `src/data/sources/dynastyDataLab.adpValue.json`.
3. Keep missing values as `null` when not published.
4. Update metadata snapshot date and source note.

---

## Refresh checklist (every artifact update PR)
1. Update artifact JSON file(s).
2. Keep adapter modules unchanged unless shape changed.
3. Run local app checks.
4. Validate player card output for all nine local sample players.
5. Add a `BUILD_LOG.md` entry including source snapshot dates.
