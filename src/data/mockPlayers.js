const SOURCE_LABELS = {
  pprFinish:
    'nflverse stats_player_reg_2025.csv (real, local artifact; rank by fantasy_points_ppr within position)',
  ktc: 'KeepTradeCut dynasty rankings (1QB; real, local artifact snapshot: 2026-04-07)',
  dynastyDataLab:
    'Dynasty Data Lab dynasty startup ADP/value (Superflex; real, local artifact snapshot: 2026-04-08)',
  seasonTotals: 'nflverse stats_player_reg_2025.csv (real, local artifact)'
};

/** @type {import('./playerContract').PlayerLookupResponse[]} */
const MOCK_PLAYERS = [
  {
    playerName: 'Drake London',
    position: 'WR',
    team: 'ATL',
    pprFinish2025: null,
    ktcRank: null,
    ktcValue: null,
    dynastyDataLabAdp: null,
    dynastyDataLabValue: null,
    seasonTotals2025: null,
    sourceLabels: SOURCE_LABELS
  },
  {
    playerName: 'Garrett Wilson',
    position: 'WR',
    team: 'NYJ',
    pprFinish2025: null,
    ktcRank: null,
    ktcValue: null,
    dynastyDataLabAdp: null,
    dynastyDataLabValue: null,
    seasonTotals2025: null,
    sourceLabels: SOURCE_LABELS
  },
  {
    playerName: 'Brock Bowers',
    position: 'TE',
    team: 'LV',
    pprFinish2025: null,
    ktcRank: null,
    ktcValue: null,
    dynastyDataLabAdp: null,
    dynastyDataLabValue: null,
    seasonTotals2025: null,
    sourceLabels: SOURCE_LABELS
  }
];

module.exports = { MOCK_PLAYERS };
