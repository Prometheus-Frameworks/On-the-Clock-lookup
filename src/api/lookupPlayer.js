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

module.exports = { findPlayerByName, normalizePlayerName };
