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
  },
  {
    playerName: 'Bijan Robinson',
    position: 'RB',
    team: 'ATL'
  },
  {
    playerName: 'CeeDee Lamb',
    position: 'WR',
    team: 'DAL'
  },
  {
    playerName: 'Jahmyr Gibbs',
    position: 'RB',
    team: 'DET'
  },
  {
    playerName: 'Puka Nacua',
    position: 'WR',
    team: 'LAR'
  },
  {
    playerName: 'Jayden Daniels',
    position: 'QB',
    team: 'WAS'
  },
  {
    playerName: 'C.J. Stroud',
    position: 'QB',
    team: 'HOU'
  }
];

module.exports = { MOCK_PLAYERS };
