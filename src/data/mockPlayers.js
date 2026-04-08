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
  },
  {
    playerName: 'Baker Mayfield',
    position: 'QB',
    team: 'TB'
  },
  {
    playerName: 'Kyler Murray',
    position: 'QB',
    team: 'ARI'
  },
  {
    playerName: "D'Andre Swift",
    position: 'RB',
    team: 'CHI'
  },
  {
    playerName: 'Rhamondre Stevenson',
    position: 'RB',
    team: 'NE'
  },
  {
    playerName: 'Tyjae Spears',
    position: 'RB',
    team: 'TEN'
  },
  {
    playerName: 'Amon-Ra St. Brown',
    position: 'WR',
    team: 'DET'
  },
  {
    playerName: 'DK Metcalf',
    position: 'WR',
    team: 'SEA'
  },
  {
    playerName: 'Jaxon Smith-Njigba',
    position: 'WR',
    team: 'SEA'
  },
  {
    playerName: 'Rome Odunze',
    position: 'WR',
    team: 'CHI'
  },
  {
    playerName: 'Brian Thomas Jr.',
    position: 'WR',
    team: 'JAX'
  },
  {
    playerName: 'Rashid Shaheed',
    position: 'WR',
    team: 'NO'
  },
  {
    playerName: 'Dalton Kincaid',
    position: 'TE',
    team: 'BUF'
  },
  {
    playerName: 'Pat Freiermuth',
    position: 'TE',
    team: 'PIT'
  }
];

module.exports = { MOCK_PLAYERS };
