const { MOCK_PLAYERS } = require('../data/mockPlayers');
const { resolvePprFinish2025 } = require('../data/pprFinish2025');
const { resolveSeasonTotals2025 } = require('../data/seasonTotals2025');
const { resolveKtcValues } = require('../data/ktcValues');
const { resolveDynastyDataLabValues } = require('../data/dynastyDataLabValues');
const { createPlayerLookupResponse } = require('../data/playerContract');

function normalizePlayerName(value) {
  if (!value || typeof value !== 'string') {
    return '';
  }

  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function getQueryMeta(nameQuery) {
  const rawQuery = typeof nameQuery === 'string' ? nameQuery.trim() : '';
  const normalizedQuery = normalizePlayerName(nameQuery);
  const queryTokens = normalizedQuery ? normalizedQuery.split(' ') : [];

  return {
    rawQuery,
    normalizedQuery,
    queryTokens,
    hasSingleShortToken: queryTokens.length === 1 && queryTokens[0].length <= 2,
    hasOneToken: queryTokens.length === 1,
    tokenCount: queryTokens.length
  };
}


function getLevenshteinDistance(a, b) {
  const rows = a.length + 1;
  const cols = b.length + 1;
  const matrix = Array.from({ length: rows }, () => Array(cols).fill(0));

  for (let row = 0; row < rows; row += 1) {
    matrix[row][0] = row;
  }

  for (let col = 0; col < cols; col += 1) {
    matrix[0][col] = col;
  }

  for (let row = 1; row < rows; row += 1) {
    for (let col = 1; col < cols; col += 1) {
      const cost = a[row - 1] === b[col - 1] ? 0 : 1;
      matrix[row][col] = Math.min(
        matrix[row - 1][col] + 1,
        matrix[row][col - 1] + 1,
        matrix[row - 1][col - 1] + cost
      );
    }
  }

  return matrix[a.length][b.length];
}

function getSuggestionScore(normalizedQuery, normalizedPlayerName) {
  if (!normalizedQuery || !normalizedPlayerName) {
    return 0;
  }

  if (normalizedPlayerName.startsWith(normalizedQuery)) {
    return 100;
  }

  const playerTokens = normalizedPlayerName.split(' ');
  const queryTokens = normalizedQuery.split(' ');

  if (playerTokens.some((token) => token.startsWith(normalizedQuery))) {
    return 90;
  }

  if (normalizedPlayerName.includes(normalizedQuery)) {
    return 80;
  }

  if (queryTokens.some((token) => normalizedPlayerName.includes(token) && token.length >= 3)) {
    return 70;
  }

  if (playerTokens.some((token) => queryTokens.includes(token) && token.length >= 3)) {
    return 60;
  }

  const compactQuery = normalizedQuery.replace(/\s+/g, '');
  const compactPlayerName = normalizedPlayerName.replace(/\s+/g, '');

  if (compactQuery.length >= 4) {
    const distance = getLevenshteinDistance(compactQuery, compactPlayerName);
    if (distance <= 2) {
      return 50;
    }

    if (distance <= 4 && compactQuery[0] === compactPlayerName[0]) {
      return 40;
    }

    const tokenDistanceMatch = playerTokens.some((token) => {
      if (Math.abs(token.length - compactQuery.length) > 2) {
        return false;
      }
      return getLevenshteinDistance(compactQuery, token) <= 2;
    });

    if (tokenDistanceMatch) {
      return 35;
    }
  }

  return 0;
}

function findClosePlayerSuggestions(nameQuery, limit = 3) {
  const { normalizedQuery } = getQueryMeta(nameQuery);

  if (!normalizedQuery) {
    return [];
  }

  const scoredSuggestions = MOCK_PLAYERS.map((player) => {
    const normalizedPlayerName = normalizePlayerName(player.playerName);
    return {
      playerName: player.playerName,
      score: getSuggestionScore(normalizedQuery, normalizedPlayerName)
    };
  })
    .filter((entry) => entry.score > 0)
    .sort((a, b) => {
      if (b.score !== a.score) {
        return b.score - a.score;
      }
      return a.playerName.localeCompare(b.playerName);
    })
    .slice(0, limit);

  return scoredSuggestions.map((entry) => entry.playerName);
}

function getNotFoundReason(nameQuery) {
  const meta = getQueryMeta(nameQuery);

  if (!meta.normalizedQuery) {
    return 'empty_query';
  }

  if (meta.hasSingleShortToken) {
    return 'query_too_short';
  }

  if (meta.hasOneToken) {
    return 'query_too_broad';
  }

  return 'no_local_match';
}

function findPlayerByName(nameQuery) {
  if (!nameQuery || typeof nameQuery !== 'string') {
    return null;
  }

  const rawQuery = nameQuery.trim();
  const normalizedQuery = normalizePlayerName(nameQuery);

  if (!rawQuery || !normalizedQuery) {
    return null;
  }

  const exactMatch =
    MOCK_PLAYERS.find(
      (player) => player.playerName.trim().toLowerCase() === rawQuery.toLowerCase()
    ) || null;

  const normalizedExactMatch =
    exactMatch ||
    MOCK_PLAYERS.find(
      (player) => normalizePlayerName(player.playerName) === normalizedQuery
    ) ||
    null;

  const normalizedPrefixMatch =
    normalizedExactMatch ||
    MOCK_PLAYERS.find((player) =>
      normalizePlayerName(player.playerName).startsWith(normalizedQuery)
    ) ||
    null;

  const normalizedTokenMatch =
    normalizedPrefixMatch ||
    MOCK_PLAYERS.find((player) => {
      const normalizedPlayerName = normalizePlayerName(player.playerName);
      return (
        normalizedPlayerName.includes(normalizedQuery) ||
        normalizedQuery.includes(normalizedPlayerName)
      );
    }) ||
    null;

  const basePlayer = normalizedTokenMatch;

  if (!basePlayer) {
    return null;
  }

  const ktcValues = resolveKtcValues(basePlayer.playerName);
  const dynastyDataLabValues = resolveDynastyDataLabValues(basePlayer.playerName);

  return createPlayerLookupResponse({
    ...basePlayer,
    pprFinish2025: resolvePprFinish2025(basePlayer.playerName),
    ktcRank: ktcValues.ktcRank,
    ktcValue: ktcValues.ktcValue,
    dynastyDataLabAdp: dynastyDataLabValues.dynastyDataLabAdp,
    dynastyDataLabValue: dynastyDataLabValues.dynastyDataLabValue,
    seasonTotals2025: resolveSeasonTotals2025(basePlayer.playerName)
  });
}

function lookupPlayer(nameQuery) {
  const player = findPlayerByName(nameQuery);

  if (player) {
    return {
      player,
      resultMeta: {
        status: 'match',
        reason: null,
        suggestions: []
      }
    };
  }

  return {
    player: null,
    resultMeta: {
      status: 'no_match',
      reason: getNotFoundReason(nameQuery),
      suggestions: findClosePlayerSuggestions(nameQuery)
    }
  };
}

module.exports = {
  findPlayerByName,
  findClosePlayerSuggestions,
  getNotFoundReason,
  lookupPlayer,
  normalizePlayerName
};
