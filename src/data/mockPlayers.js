/**
 * Minimal local player pool for MVP lookup matching.
 * Real-source-backed fields are assembled later in the API layer.
 */
const MOCK_PLAYERS = [
  {
    playerName: 'Drake London',
    position: 'WR',
    team: 'ATL'
  },
  {
    playerName: 'Garrett Wilson',
    position: 'WR',
    team: 'NYJ'
  },
  {
    playerName: 'Brock Bowers',
    position: 'TE',
    team: 'LV'
  }
];

module.exports = { MOCK_PLAYERS };
