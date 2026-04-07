const SOURCE_LABELS = {
  pprFinish: 'Public season stats (mock)',
  ktc: 'KeepTradeCut (mock)',
  dynastyDataLab: 'Dynasty Data Lab (mock)',
  seasonTotals: 'Public season stats (mock)'
};

/** @type {import('./playerContract').PlayerLookupResponse[]} */
const MOCK_PLAYERS = [
  {
    playerName: 'Drake London',
    position: 'WR',
    team: 'ATL',
    pprFinish2025: 11,
    ktcRank: 18,
    ktcValue: 6210,
    dynastyDataLabAdp: 20.4,
    dynastyDataLabValue: 6040,
    seasonTotals2025: '96 rec / 1310 yds / 9 TD',
    sourceLabels: SOURCE_LABELS
  },
  {
    playerName: 'Garrett Wilson',
    position: 'WR',
    team: 'NYJ',
    pprFinish2025: 8,
    ktcRank: 12,
    ktcValue: 7015,
    dynastyDataLabAdp: 14.2,
    dynastyDataLabValue: null,
    seasonTotals2025: '103 rec / 1378 yds / 8 TD',
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
