# 🌤️ Weather Dashboard

A full-stack weather app using Node.js + Express backend and vanilla JS frontend.

## Features
- Live weather for any city
- 5-day forecast
- Humidity, wind speed, feels like, pressure
- Quick city buttons
- Loading spinner
- Error handling

## Tech Stack
- **Backend:** Node.js, Express.js, Axios
- **Frontend:** HTML, CSS, Vanilla JavaScript
- **API:** OpenWeatherMap

## How to Run

### Step 1 — Get FREE API Key
1. Go to https://openweathermap.org/api
2. Sign up (free)
3. Go to "API keys" tab → copy your key

### Step 2 — Add API Key
Open `.env` file and replace:
```
WEATHER_API_KEY=your_api_key_here
```

### Step 3 — Install & Run
```bash
npm install
npm start
```
Open http://localhost:3000 in your browser.

## Project Structure
```
weather-dashboard/
├── server.js         ← Express backend (hides API key)
├── package.json
├── .env              ← Your API key goes here
└── public/
    ├── index.html    ← UI structure
    ├── style.css     ← Styling
    └── script.js     ← Frontend logic (fetch + DOM)
```

## What to explain in interview
- "I used a Node.js backend so the API key is never exposed in the browser"
- "Frontend fetches from my own /api/weather endpoint, not directly from OpenWeatherMap"
- "I used Promise.all() to fetch weather and forecast at the same time (parallel requests)"
- "I handled errors like city not found and network issues with try/catch"
