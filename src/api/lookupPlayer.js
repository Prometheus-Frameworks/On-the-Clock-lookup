const { MOCK_PLAYERS } = require('../data/mockPlayers');
const { resolvePprFinish2025 } = require('../data/pprFinish2025');
const { resolveSeasonTotals2025 } = require('../data/seasonTotals2025');

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

  return {
    ...basePlayer,
    pprFinish2025: resolvePprFinish2025(basePlayer.playerName),
    seasonTotals2025: resolveSeasonTotals2025(basePlayer.playerName)
  };
}

module.exports = { findPlayerByName };
