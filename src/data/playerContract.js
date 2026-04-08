/**
 * Normalized player response contract for the MVP lookup card.
 *
 * Keep this file intentionally simple so the shape is easy to inspect.
 */

const SOURCE_LABELS = {
  pprFinish:
    'nflverse stats_player_reg_2025.csv (real, local artifact; rank by fantasy_points_ppr within position)',
  ktc: 'KeepTradeCut dynasty rankings (1QB; real, local artifact snapshot: 2026-04-07)',
  dynastyDataLab:
    'Dynasty Data Lab dynasty startup ADP/value (Superflex; real, local artifact snapshot: 2026-04-08)',
  seasonTotals: 'nflverse stats_player_reg_2025.csv (real, local artifact)'
};

/**
 * @typedef {Object} SourceLabels
 * @property {string} pprFinish
 * @property {string} ktc
 * @property {string} dynastyDataLab
 * @property {string} seasonTotals
 */

/**
 * @typedef {Object} PlayerLookupResponse
 * @property {string} playerName
 * @property {string} position
 * @property {string} team
 * @property {number | null} pprFinish2025
 * @property {number | null} ktcRank
 * @property {number | null} ktcValue
 * @property {number | null} dynastyDataLabAdp
 * @property {number | null} dynastyDataLabValue
 * @property {string | null} seasonTotals2025
 * @property {SourceLabels} sourceLabels
 */

function normalizeText(value) {
  if (typeof value !== 'string') {
    return '';
  }

  return value.trim();
}

function normalizeNumberOrNull(value) {
  return typeof value === 'number' && Number.isFinite(value) ? value : null;
}

/**
 * Small response builder to keep route output consistent with the contract.
 * @param {Partial<PlayerLookupResponse>} input
 * @returns {PlayerLookupResponse}
 */
function createPlayerLookupResponse(input) {
  return {
    playerName: normalizeText(input.playerName),
    position: normalizeText(input.position),
    team: normalizeText(input.team),
    pprFinish2025: normalizeNumberOrNull(input.pprFinish2025),
    ktcRank: normalizeNumberOrNull(input.ktcRank),
    ktcValue: normalizeNumberOrNull(input.ktcValue),
    dynastyDataLabAdp: normalizeNumberOrNull(input.dynastyDataLabAdp),
    dynastyDataLabValue: normalizeNumberOrNull(input.dynastyDataLabValue),
    seasonTotals2025:
      typeof input.seasonTotals2025 === 'string' && input.seasonTotals2025.trim()
        ? input.seasonTotals2025.trim()
        : null,
    sourceLabels: SOURCE_LABELS
  };
}

module.exports = {
  SOURCE_LABELS,
  createPlayerLookupResponse
};
