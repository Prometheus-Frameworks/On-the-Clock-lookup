const { MOCK_PLAYERS } = require('../src/data/mockPlayers');
const { findPlayerByName } = require('../src/api/lookupPlayer');

const COVERAGE_FIELDS = [
  'pprFinish2025',
  'ktcRank',
  'ktcValue',
  'dynastyDataLabAdp',
  'dynastyDataLabValue',
  'seasonTotals2025'
];

function getCoverageBucket(availableCount) {
  if (availableCount === COVERAGE_FIELDS.length) {
    return 'full';
  }

  if (availableCount >= 4) {
    return 'broad';
  }

  return 'partial';
}

function runCoverageReport() {
  const totals = {
    full: 0,
    broad: 0,
    partial: 0
  };

  const byPosition = new Map();

  console.log('On-the-Clock local pool coverage report');
  console.log('Fields:', COVERAGE_FIELDS.join(', '));
  console.log('');

  MOCK_PLAYERS.forEach((entry) => {
    const result = findPlayerByName(entry.playerName);
    const hasLookup = Boolean(result);

    const missingFields = hasLookup
      ? COVERAGE_FIELDS.filter((fieldName) => result[fieldName] === null)
      : [...COVERAGE_FIELDS];

    const availableCount = COVERAGE_FIELDS.length - missingFields.length;
    const bucket = getCoverageBucket(availableCount);

    totals[bucket] += 1;

    if (!byPosition.has(entry.position)) {
      byPosition.set(entry.position, {
        full: 0,
        broad: 0,
        partial: 0,
        total: 0
      });
    }

    const positionSummary = byPosition.get(entry.position);
    positionSummary[bucket] += 1;
    positionSummary.total += 1;

    console.log(
      [
        `${entry.playerName} (${entry.position})`,
        `lookup=${hasLookup ? 'yes' : 'no'}`,
        `coverage=${availableCount}/${COVERAGE_FIELDS.length}`,
        `missing=${missingFields.length ? missingFields.join('|') : 'none'}`
      ].join(' | ')
    );
  });

  console.log('');
  console.log('Aggregate summary');
  console.log(`total players: ${MOCK_PLAYERS.length}`);
  console.log(`full coverage: ${totals.full}`);
  console.log(`broad coverage: ${totals.broad}`);
  console.log(`partial coverage: ${totals.partial}`);
  console.log('');
  console.log('By position');

  Array.from(byPosition.entries())
    .sort((a, b) => a[0].localeCompare(b[0]))
    .forEach(([position, summary]) => {
      console.log(
        `${position}: total=${summary.total}, full=${summary.full}, broad=${summary.broad}, partial=${summary.partial}`
      );
    });
}

runCoverageReport();
