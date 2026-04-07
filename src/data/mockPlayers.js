const SOURCE_LABELS = {
  pprFinish:
    'nflverse stats_player_reg_2025.csv (real, local artifact; rank by fantasy_points_ppr within position)',
  ktc: 'KeepTradeCut (mock)',
  dynastyDataLab: 'Dynasty Data Lab (mock)',
  seasonTotals: 'nflverse stats_player_reg_2025.csv (real, local artifact)'
};

/** @type {import('./playerContract').PlayerLookupResponse[]} */
const MOCK_PLAYERS = [
  {
    playerName: 'Drake London',
    position: 'WR',
    team: 'ATL',
    pprFinish2025: null,
    ktcRank: 18,
    ktcValue: 6210,
    dynastyDataLabAdp: 20.4,
    dynastyDataLabValue: 6040,
    seasonTotals2025: null,
    sourceLabels: SOURCE_LABELS
  },
  {
    playerName: 'Garrett Wilson',
    position: 'WR',
    team: 'NYJ',
    pprFinish2025: null,
    ktcRank: 12,
    ktcValue: 7015,
    dynastyDataLabAdp: 14.2,
    dynastyDataLabValue: null,
    seasonTotals2025: null,
    sourceLabels: SOURCE_LABELS
  },
  {
    playerName: 'Brock Bowers',
    position: 'TE',
    team: 'LV',
    pprFinish2025: null,
    ktcRank: 7,
    ktcValue: 7420,
    dynastyDataLabAdp: 11.6,
    dynastyDataLabValue: 7280,
    seasonTotals2025: null,
    sourceLabels: SOURCE_LABELS
  }
];

module.exports = { MOCK_PLAYERS };
