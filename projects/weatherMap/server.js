// server.js
require('dotenv').config();
const express = require('express');

const app = express();

// serve your static files (index.html, css/, js/) from the project root
app.use(express.static(__dirname));

app.get('/weather', async (req, res) => {
  try {
    const { lat, lon } = req.query;
    if (!lat || !lon) return res.status(400).json({ error: 'lat and lon are required' });

    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.OPENWEATHER_API_KEY}&units=imperial`;
    const r = await fetch(url); // Node 18+ has global fetch
    const data = await r.json();
    res.json(data);
  } catch (e) {
    res.status(500).json({ error: 'server error', detail: e.message });
  }
});

const PORT = 3000;
app.listen(PORT, () => console.log(`→ http://localhost:${PORT}`));
