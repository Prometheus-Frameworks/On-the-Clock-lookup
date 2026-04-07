/**
 * Normalized player response contract for the MVP lookup card.
 */

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

module.exports = {};
