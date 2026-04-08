const form = document.getElementById('player-search-form');
const input = document.getElementById('player-name');
const result = document.getElementById('result');

function formatValue(value) {
  if (value === null || value === undefined || value === '') {
    return 'unavailable';
  }
  return value;
}

function renderPlayerCard(player) {
  return `
    <article class="player-card">
      <h2>${player.playerName}</h2>
      <div class="grid">
        <div><span class="label">Position</span><span class="value">${formatValue(player.position)}</span></div>
        <div><span class="label">Team</span><span class="value">${formatValue(player.team)}</span></div>
        <div><span class="label">2025 PPR finish</span><span class="value">${formatValue(player.pprFinish2025)}</span></div>
        <div><span class="label">2025 PPR source</span><span class="value">${formatValue(player.sourceLabels.pprFinish)}</span></div>
        <div><span class="label">KTC rank</span><span class="value">${formatValue(player.ktcRank)}</span></div>
        <div><span class="label">KTC value</span><span class="value">${formatValue(player.ktcValue)}</span></div>
        <div><span class="label">KTC source</span><span class="value">${formatValue(player.sourceLabels.ktc)}</span></div>
        <div><span class="label">Dynasty Data Lab ADP</span><span class="value">${formatValue(player.dynastyDataLabAdp)}</span></div>
        <div><span class="label">Dynasty Data Lab value</span><span class="value">${formatValue(player.dynastyDataLabValue)}</span></div>
        <div><span class="label">Dynasty Data Lab source</span><span class="value">${formatValue(player.sourceLabels.dynastyDataLab)}</span></div>
        <div><span class="label">2025 season totals</span><span class="value">${formatValue(player.seasonTotals2025)}</span></div>
      </div>
      <p class="note">
        Sources: ${formatValue(player.sourceLabels.ktc)}, ${formatValue(player.sourceLabels.dynastyDataLab)}, ${formatValue(player.sourceLabels.pprFinish)}, ${formatValue(player.sourceLabels.seasonTotals)}.
      </p>
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
      result.innerHTML = `<p class="error">No mock player found for "${query}".</p>`;
      return;
    }

    result.innerHTML = renderPlayerCard(payload.player);
  } catch (error) {
    result.innerHTML = '<p class="error">Request failed. Please try again.</p>';
  }
});
