const dynastyDataLabArtifact = require('./sources/dynastyDataLab.adpValue.json');

function normalizePlayerName(name) {
  if (!name || typeof name !== 'string') {
    return '';
  }

  return name.trim().toLowerCase();
}

const DDL_BY_PLAYER = new Map(
  dynastyDataLabArtifact.players.map((entry) => [normalizePlayerName(entry.playerName), entry])
);

function resolveDynastyDataLabValues(playerName) {
  const entry = DDL_BY_PLAYER.get(normalizePlayerName(playerName));

  if (!entry) {
    return {
      dynastyDataLabAdp: null,
      dynastyDataLabValue: null
    };
  }

  return {
    dynastyDataLabAdp: entry.dynastyDataLabAdp,
    dynastyDataLabValue: entry.dynastyDataLabValue
  };
}

module.exports = { resolveDynastyDataLabValues, dynastyDataLabArtifact };
