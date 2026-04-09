function isFieldAvailable(value) {
  return !(value === null || value === undefined || value === '');
}

function getSeasonTotalsPresentation(player) {
  const position = typeof player.position === 'string' ? player.position.trim().toUpperCase() : '';
  const supportsReceivingTotals = ['WR', 'TE', 'RB'].includes(position);

  if (supportsReceivingTotals) {
    return {
      label: '2025 receiving totals',
      value: player.seasonTotals2025
    };
  }

  if (isFieldAvailable(player.seasonTotals2025)) {
    return {
      label: '2025 season totals',
      value: player.seasonTotals2025
    };
  }

  return {
    label: '2025 season totals',
    value: 'unavailable (current artifact is receiving-style for this position)'
  };
}

function getCoverageSummary(metrics) {
  const coverageFields = [
    metrics.pprFinish2025,
    metrics.ktcRank,
    metrics.ktcValue,
    metrics.dynastyDataLabAdp,
    metrics.dynastyDataLabValue,
    metrics.seasonTotals2025
  ];

  const availableCount = coverageFields.filter((value) => isFieldAvailable(value)).length;
  const totalCount = coverageFields.length;

  let statusText = 'partial coverage';
  if (availableCount === totalCount) {
    statusText = 'full coverage';
  } else if (availableCount >= totalCount - 1) {
    statusText = 'broad coverage';
  }

  return {
    availableCount,
    totalCount,
    statusText,
    text: `Coverage: ${availableCount} of ${totalCount} fields available (${statusText}).`
  };
}

function toSourceItems(sourceLabels = {}) {
  return [
    {
      fieldLabel: '2025 PPR finish',
      sourceLabel: sourceLabels.pprFinish
    },
    {
      fieldLabel: 'KTC rank/value',
      sourceLabel: sourceLabels.ktc
    },
    {
      fieldLabel: 'Dynasty Data Lab ADP/value',
      sourceLabel: sourceLabels.dynastyDataLab
    },
    {
      fieldLabel: '2025 season totals',
      sourceLabel: sourceLabels.seasonTotals
    }
  ];
}

function mapPlayerToCardViewModel(player) {
  const marketMetrics = {
    ktcRank: player.ktcRank,
    ktcValue: player.ktcValue,
    dynastyDataLabAdp: player.dynastyDataLabAdp,
    dynastyDataLabValue: player.dynastyDataLabValue
  };

  const performanceMetrics = {
    pprFinish2025: player.pprFinish2025,
    seasonTotals2025: player.seasonTotals2025
  };

  return {
    identity: {
      name: player.playerName,
      position: player.position,
      team: player.team
    },
    marketMetrics,
    performance: {
      ...performanceMetrics,
      seasonTotals: getSeasonTotalsPresentation(player),
      coverage: getCoverageSummary({
        ...marketMetrics,
        ...performanceMetrics
      })
    },
    sources: {
      labels: {
        pprFinish: player.sourceLabels?.pprFinish,
        ktc: player.sourceLabels?.ktc,
        dynastyDataLab: player.sourceLabels?.dynastyDataLab,
        seasonTotals: player.sourceLabels?.seasonTotals
      },
      items: toSourceItems(player.sourceLabels)
    }
  };
}

window.mapPlayerToCardViewModel = mapPlayerToCardViewModel;
