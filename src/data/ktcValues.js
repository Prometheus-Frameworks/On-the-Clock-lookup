const ktcValuesArtifact = require('./sources/ktcValues.1qb.json');

function normalizePlayerName(name) {
  if (!name || typeof name !== 'string') {
    return '';
  }

  return name.trim().toLowerCase();
}

const KTC_BY_PLAYER = new Map(
  ktcValuesArtifact.players.map((entry) => [normalizePlayerName(entry.playerName), entry])
);

function resolveKtcValues(playerName) {
  const ktcEntry = KTC_BY_PLAYER.get(normalizePlayerName(playerName));

  if (!ktcEntry) {
    return {
      ktcRank: null,
      ktcValue: null
    };
  }

  return {
    ktcRank: ktcEntry.ktcRank,
    ktcValue: ktcEntry.ktcValue
  };
}

module.exports = { resolveKtcValues, ktcValuesArtifact };
