const form = document.getElementById('player-search-form');
const input = document.getElementById('player-name');
const result = document.getElementById('result');

function formatValue(value) {
  if (value === null || value === undefined || value === '') {
    return 'unavailable';
  }
  return value;
}

function renderSourceSummary(sourceLabels) {
  return [
    `2025 PPR finish: ${formatValue(sourceLabels.pprFinish)}`,
    `KTC rank/value: ${formatValue(sourceLabels.ktc)}`,
    `Dynasty Data Lab ADP/value: ${formatValue(sourceLabels.dynastyDataLab)}`,
    `2025 season totals: ${formatValue(sourceLabels.seasonTotals)}`
  ].join(' • ');
}

function isFieldAvailable(value) {
  return !(value === null || value === undefined || value === '');
}

function getCoverageSummary(player) {
  const coverageFields = [
    player.pprFinish2025,
    player.ktcRank,
    player.ktcValue,
    player.dynastyDataLabAdp,
    player.dynastyDataLabValue,
    player.seasonTotals2025
  ];

  const availableCount = coverageFields.filter((value) => isFieldAvailable(value)).length;
  const totalCount = coverageFields.length;

  let statusText = 'partial coverage';
  if (availableCount === totalCount) {
    statusText = 'full coverage';
  } else if (availableCount >= totalCount - 1) {
    statusText = 'broad coverage';
  }

  return `Coverage: ${availableCount} of ${totalCount} fields available (${statusText}).`;
}

function renderPlayerCard(player) {
  return `
    <article class="player-card">
      <h2>${player.playerName}</h2>
      <p class="coverage">${getCoverageSummary(player)}</p>
      <div class="grid">
        <div><span class="label">Position</span><span class="value">${formatValue(player.position)}</span></div>
        <div><span class="label">Team</span><span class="value">${formatValue(player.team)}</span></div>
        <div><span class="label">2025 PPR finish</span><span class="value">${formatValue(player.pprFinish2025)}</span></div>
        <div><span class="label">KTC rank</span><span class="value">${formatValue(player.ktcRank)}</span></div>
        <div><span class="label">KTC value</span><span class="value">${formatValue(player.ktcValue)}</span></div>
        <div><span class="label">Dynasty Data Lab ADP</span><span class="value">${formatValue(player.dynastyDataLabAdp)}</span></div>
        <div><span class="label">Dynasty Data Lab value</span><span class="value">${formatValue(player.dynastyDataLabValue)}</span></div>
        <div><span class="label">2025 season totals</span><span class="value">${formatValue(player.seasonTotals2025)}</span></div>
      </div>
      <p class="note">
        Sources: ${renderSourceSummary(player.sourceLabels)}.
      </p>
    </article>
  `;
}

function getNoMatchMessage(reason, query) {
  if (reason === 'query_too_short') {
    return 'That search is very short. Try at least 3 letters or a full name.';
  }

  if (reason === 'query_too_broad') {
    return `"${query}" is broad. Try first and last name for a better match.`;
  }

  return `No local player found for "${query}".`;
}

function renderSuggestions(suggestions) {
  if (!suggestions || suggestions.length === 0) {
    return '<p class="result-help">No close local suggestions yet. Try full first + last name.</p>';
  }

  const listItems = suggestions.map((name) => `<li>${name}</li>`).join('');

  return `
    <div class="suggestions">
      <p class="result-help">Did you mean:</p>
      <ul>${listItems}</ul>
    </div>
  `;
}

function renderNoMatchState(query, resultMeta) {
  return `
    <article class="search-feedback">
      <p class="error">${getNoMatchMessage(resultMeta?.reason, query)}</p>
      ${renderSuggestions(resultMeta?.suggestions)}
    </article>
  `;
}

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const query = input.value.trim();
  if (!query) {
    return;
  }

  result.innerHTML = '<p>Searching…</p>';

  try {
    const response = await fetch(`/api/players?name=${encodeURIComponent(query)}`);
    const payload = await response.json();

    if (!response.ok) {
      result.innerHTML = `<p class="error">${payload.error || 'Something went wrong.'}</p>`;
      return;
    }

    if (!payload.player) {
      result.innerHTML = renderNoMatchState(query, payload.resultMeta);
      return;
    }

    result.innerHTML = renderPlayerCard(payload.player);
  } catch (error) {
    result.innerHTML = '<p class="error">Request failed. Please try again.</p>';
  }
});
