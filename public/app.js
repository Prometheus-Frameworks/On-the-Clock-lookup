const form = document.getElementById('player-search-form');
const input = document.getElementById('player-name');
const result = document.getElementById('result');
const searchButton = form.querySelector('button[type="submit"]');

const TEAM_ACCENT_COLORS = {
  ATL: '#d32f2f',
  NYJ: '#16a34a',
  LV: '#a1a1aa',
  SF: '#ef4444',
  DAL: '#60a5fa',
  WAS: '#f59e0b',
  TB: '#f87171',
  CHI: '#fb923c',
  DET: '#3b82f6',
  SEA: '#84cc16',
  JAX: '#06b6d4',
  BUF: '#2563eb'
};

function formatValue(value) {
  if (value === null || value === undefined || value === '') {
    return 'unavailable';
  }
  return value;
}

function getTeamAccent(team) {
  if (!team) {
    return '#64748b';
  }

  const normalized = String(team).toUpperCase().trim();
  return TEAM_ACCENT_COLORS[normalized] || '#64748b';
}

function getPositionBadgeClass(position) {
  const normalized = String(position || '').toUpperCase().trim();

  if (normalized === 'QB') return 'badge-qb';
  if (normalized === 'RB') return 'badge-rb';
  if (normalized === 'WR') return 'badge-wr';
  if (normalized === 'TE') return 'badge-te';

  return 'badge-default';
}

function getCoverageTone(statusText) {
  if (statusText === 'full coverage') {
    return 'coverage-good';
  }

  if (statusText === 'broad coverage') {
    return 'coverage-broad';
  }

  return 'coverage-partial';
}

function renderMetric(label, value, options = {}) {
  const { featured = false } = options;
  const display = formatValue(value);
  const isUnavailable = display === 'unavailable' || display.startsWith('unavailable');

  return `
    <div class="metric ${featured ? 'metric-featured' : ''}">
      <span class="label">${label}</span>
      <span class="value ${isUnavailable ? 'value-unavailable' : ''}">${display}</span>
    </div>
  `;
}

function renderSourceSummary(sourceItems) {
  const sourceRows = sourceItems
    .map((item) => {
      return `<li><span class="source-field">${item.fieldLabel}</span><span class="source-detail">${formatValue(item.sourceLabel)}</span></li>`;
    })
    .join('');

  return `
    <section class="section section-sources">
      <h3 class="section-title">Sources & context</h3>
      <p class="section-subtle">Public-source labels shown for inspectability. Unavailable fields are kept explicit.</p>
      <div class="source-summary">
        <ul>
          ${sourceRows}
        </ul>
      </div>
    </section>
  `;
}

function renderPlayerCard(player) {
  const playerView = window.mapPlayerToCardViewModel(player);
  const positionValue = formatValue(playerView.identity.position);
  const teamValue = formatValue(playerView.identity.team);
  const positionClass = getPositionBadgeClass(playerView.identity.position);
  const teamAccent = getTeamAccent(playerView.identity.team);

  const coverage = playerView.performance.coverage;
  const coveragePercent = Math.round((coverage.availableCount / coverage.totalCount) * 100);
  const coverageClass = getCoverageTone(coverage.statusText);

  return `
    <article class="player-card" style="--team-accent:${teamAccent}">
      <header class="player-header">
        <div>
          <p class="player-kicker">MVP Lookup Card</p>
          <h2 class="player-title">${playerView.identity.name}</h2>
          <div class="badge-row">
            <span class="badge ${positionClass}">${positionValue}</span>
            <span class="badge badge-team">${teamValue}</span>
          </div>
        </div>
        <div class="coverage-panel ${coverageClass}">
          <p class="coverage-heading">Coverage</p>
          <p class="coverage-count">${coverage.availableCount}/${coverage.totalCount}</p>
          <div class="coverage-track" role="presentation">
            <span class="coverage-fill" style="width:${coveragePercent}%"></span>
          </div>
          <p class="coverage-copy">${coverage.statusText}</p>
        </div>
      </header>

      <section class="section section-market">
        <h3 class="section-title">Market metrics</h3>
        <div class="metric-grid">
          ${renderMetric('KTC rank', playerView.marketMetrics.ktcRank, { featured: true })}
          ${renderMetric('KTC value', playerView.marketMetrics.ktcValue, { featured: true })}
          ${renderMetric('Dynasty Data Lab ADP', playerView.marketMetrics.dynastyDataLabAdp)}
          ${renderMetric('Dynasty Data Lab value', playerView.marketMetrics.dynastyDataLabValue)}
        </div>
      </section>

      <section class="section section-performance">
        <h3 class="section-title">Performance snapshot</h3>
        <p class="section-subtle">Latest season context shown as-is from checked-in artifacts.</p>
        <div class="performance-highlight">
          ${renderMetric('2025 PPR finish', playerView.performance.pprFinish2025, { featured: true })}
        </div>
        <div class="metric-grid">
          ${renderMetric(playerView.performance.seasonTotals.label, playerView.performance.seasonTotals.value)}
        </div>
      </section>

      ${renderSourceSummary(playerView.sources.items)}
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

  searchButton.disabled = true;
  searchButton.textContent = 'Searching…';
  result.innerHTML = '<article class="search-loading">Searching player data…</article>';

  try {
    const response = await fetch(`/api/players?name=${encodeURIComponent(query)}`);
    const payload = await response.json();

    if (!response.ok) {
      result.innerHTML = `<article class="search-feedback"><p class="error">${payload.error || 'Something went wrong.'}</p></article>`;
      return;
    }

    if (!payload.player) {
      result.innerHTML = renderNoMatchState(query, payload.resultMeta);
      return;
    }

    result.innerHTML = renderPlayerCard(payload.player);
  } catch (error) {
    result.innerHTML = '<article class="search-feedback"><p class="error">Request failed. Please try again.</p></article>';
  } finally {
    searchButton.disabled = false;
    searchButton.textContent = 'Search';
  }
});
