const seasonTotalsData = require('./sources/seasonTotals2025.nflverse.json');

const totalsByPlayerName = new Map(
  seasonTotalsData.players.map((player) => [
    player.playerName.toLowerCase(),
    player
  ])
);

function resolveSeasonTotals2025(playerName) {
  if (!playerName || typeof playerName !== 'string') {
    return null;
  }

  const totals = totalsByPlayerName.get(playerName.toLowerCase());
  if (!totals) {
    return null;
  }

  return `${totals.receptions} rec / ${totals.receivingYards} yds / ${totals.receivingTds} TD`;
}

module.exports = { resolveSeasonTotals2025 };
