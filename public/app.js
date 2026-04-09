const form = document.getElementById('player-search-form');
const input = document.getElementById('player-name');
const result = document.getElementById('result');

function formatValue(value) {
  if (value === null || value === undefined || value === '') {
    return 'unavailable';
  }
  return value;
}

function renderSourceSummary(sourceItems) {
  const sourceRows = sourceItems
    .map((item) => {
      return `<li><span class="source-field">${item.fieldLabel}</span><span class="source-detail">${formatValue(item.sourceLabel)}</span></li>`;
    })
    .join('');

  return `
    <div class="source-summary">
      <p class="source-title">Sources</p>
      <ul>
        ${sourceRows}
      </ul>
    </div>
  `;
}

function renderPlayerCard(player) {
  const playerView = window.mapPlayerToCardViewModel(player);

  return `
    <article class="player-card">
      <h2>${playerView.identity.name}</h2>
      <p class="coverage">${playerView.performance.coverage.text}</p>
      <div class="grid">
        <div><span class="label">Position</span><span class="value">${formatValue(playerView.identity.position)}</span></div>
        <div><span class="label">Team</span><span class="value">${formatValue(playerView.identity.team)}</span></div>
        <div><span class="label">2025 PPR finish</span><span class="value">${formatValue(playerView.performance.pprFinish2025)}</span></div>
        <div><span class="label">KTC rank</span><span class="value">${formatValue(playerView.marketMetrics.ktcRank)}</span></div>
        <div><span class="label">KTC value</span><span class="value">${formatValue(playerView.marketMetrics.ktcValue)}</span></div>
        <div><span class="label">Dynasty Data Lab ADP</span><span class="value">${formatValue(playerView.marketMetrics.dynastyDataLabAdp)}</span></div>
        <div><span class="label">Dynasty Data Lab value</span><span class="value">${formatValue(playerView.marketMetrics.dynastyDataLabValue)}</span></div>
        <div><span class="label">${playerView.performance.seasonTotals.label}</span><span class="value">${formatValue(playerView.performance.seasonTotals.value)}</span></div>
      </div>
      <section class="note">
        ${renderSourceSummary(playerView.sources.items)}
      </section>
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
