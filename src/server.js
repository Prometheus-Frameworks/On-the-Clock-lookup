const path = require('path');
const express = require('express');
const { findPlayerByName } = require('./api/lookupPlayer');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, '..', 'public')));

app.get('/api/players', (req, res) => {
  const name = req.query.name;

  if (!name || typeof name !== 'string' || !name.trim()) {
    return res.status(400).json({
      error: 'Missing required query parameter: name'
    });
  }

  const player = findPlayerByName(name);

  return res.json({
    query: name,
    player
  });
});

app.listen(PORT, () => {
  console.log(`On-the-Clock Lookup running on http://localhost:${PORT}`);
});
