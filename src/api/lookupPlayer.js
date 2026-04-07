const { MOCK_PLAYERS } = require('../data/mockPlayers');

function findPlayerByName(nameQuery) {
  if (!nameQuery || typeof nameQuery !== 'string') {
    return null;
  }

  const normalizedQuery = nameQuery.trim().toLowerCase();
  if (!normalizedQuery) {
    return null;
  }

  return (
    MOCK_PLAYERS.find((player) =>
      player.playerName.toLowerCase().includes(normalizedQuery)
    ) || null
  );
}

module.exports = { findPlayerByName };
