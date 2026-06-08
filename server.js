const express = require('express');
const cors = require('cors');
const axios = require('axios');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.static('public'));
app.use(express.json());

// Current Weather
app.get('/api/weather', async (req, res) => {
    const city = req.query.city;
    const apiKey = process.env.WEATHER_API_KEY || 'YOUR_FREE_API_KEY_HERE';

    if (!city) {
        return res.status(400).json({ error: 'City name is required' });
    }

    try {
        const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather`,
            { params: { q: city, appid: apiKey, units: 'metric' } }
        );
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'City not found or API error' });
    }
});

// 5-Day Forecast
app.get('/api/forecast', async (req, res) => {
    const city = req.query.city;
    const apiKey = process.env.WEATHER_API_KEY || 'YOUR_FREE_API_KEY_HERE';

    if (!city) {
        return res.status(400).json({ error: 'City name is required' });
    }

    try {
        const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/forecast`,
            { params: { q: city, appid: apiKey, units: 'metric' } }
        );
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Forecast not available' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
