const pprFinishData = require('./sources/pprFinish2025.nflverse.json');

const finishByPlayerName = new Map(
  pprFinishData.players.map((player) => [player.playerName.toLowerCase(), player])
);

function resolvePprFinish2025(playerName) {
  if (!playerName || typeof playerName !== 'string') {
    return null;
  }

  const result = finishByPlayerName.get(playerName.toLowerCase());
  if (!result) {
    return null;
  }

  return result.pprFinish;
}

module.exports = { resolvePprFinish2025 };
