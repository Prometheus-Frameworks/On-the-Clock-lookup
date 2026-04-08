const { MOCK_PLAYERS } = require('../data/mockPlayers');
const { resolvePprFinish2025 } = require('../data/pprFinish2025');
const { resolveSeasonTotals2025 } = require('../data/seasonTotals2025');
const { resolveKtcValues } = require('../data/ktcValues');

function findPlayerByName(nameQuery) {
  if (!nameQuery || typeof nameQuery !== 'string') {
    return null;
  }

  const normalizedQuery = nameQuery.trim().toLowerCase();
  if (!normalizedQuery) {
    return null;
  }

  const basePlayer =
    MOCK_PLAYERS.find((player) =>
      player.playerName.toLowerCase().includes(normalizedQuery)
    ) || null;

  if (!basePlayer) {
    return null;
  }

  const ktcValues = resolveKtcValues(basePlayer.playerName);

  return {
    ...basePlayer,
    pprFinish2025: resolvePprFinish2025(basePlayer.playerName),
    ktcRank: ktcValues.ktcRank,
    ktcValue: ktcValues.ktcValue,
    seasonTotals2025: resolveSeasonTotals2025(basePlayer.playerName)
  };
}

module.exports = { findPlayerByName };
