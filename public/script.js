// Weather emoji based on condition
function getWeatherIcon(condition) {
    const c = condition.toLowerCase();
    if (c.includes('clear'))  return '☀️';
    if (c.includes('cloud'))  return '☁️';
    if (c.includes('rain'))   return '🌧️';
    if (c.includes('drizzle'))return '🌦️';
    if (c.includes('snow'))   return '❄️';
    if (c.includes('thunder'))return '⛈️';
    if (c.includes('mist') || c.includes('fog')) return '🌫️';
    return '🌤️';
}

// Quick city search (called from buttons)
function quickSearch(city) {
    document.getElementById('cityInput').value = city;
    getWeather();
}

// Main function — fetches weather from our backend
async function getWeather() {
    const city = document.getElementById('cityInput').value.trim();
    const resultDiv    = document.getElementById('weatherResult');
    const forecastSec  = document.getElementById('forecastSection');
    const errorDiv     = document.getElementById('error');
    const loader       = document.getElementById('loader');

    if (!city) return;

    // Show loader, hide old results
    loader.classList.remove('hidden');
    resultDiv.classList.add('hidden');
    forecastSec.classList.add('hidden');
    errorDiv.classList.add('hidden');

    try {
        // Fetch current weather + forecast in parallel
        const [weatherRes, forecastRes] = await Promise.all([
            fetch(`/api/weather?city=${encodeURIComponent(city)}`),
            fetch(`/api/forecast?city=${encodeURIComponent(city)}`)
        ]);

        const data     = await weatherRes.json();
        const forecast = await forecastRes.json();

        if (data.error) throw new Error(data.error);

        // --- Update current weather ---
        const condition = data.weather[0].main;
        document.getElementById('weatherIcon').textContent  = getWeatherIcon(condition);
        document.getElementById('cityName').textContent     = `${data.name}, ${data.sys.country}`;
        document.getElementById('description').textContent  = data.weather[0].description;
        document.getElementById('temp').textContent         = `${Math.round(data.main.temp)}°C`;
        document.getElementById('humidity').textContent     = `${data.main.humidity}%`;
        document.getElementById('wind').textContent         = `${data.wind.speed} m/s`;
        document.getElementById('feelsLike').textContent    = `${Math.round(data.main.feels_like)}°C`;
        document.getElementById('pressure').textContent     = `${data.main.pressure} hPa`;

        resultDiv.classList.remove('hidden');

        // --- Update 5-day forecast ---
        if (!forecast.error && forecast.list) {
            const days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
            const seen = new Set();
            const daily = [];

            for (const item of forecast.list) {
                const day = item.dt_txt.split(' ')[0];
                if (!seen.has(day) && daily.length < 5) {
                    seen.add(day);
                    daily.push(item);
                }
            }

            const container = document.getElementById('forecastCards');
            container.innerHTML = daily.map(item => {
                const d    = new Date(item.dt_txt);
                const icon = getWeatherIcon(item.weather[0].main);
                const temp = Math.round(item.main.temp);
                return `
                  <div class="forecast-card">
                    <div class="forecast-day">${days[d.getDay()]}</div>
                    <span class="forecast-icon">${icon}</span>
                    <div class="forecast-temp">${temp}°C</div>
                  </div>`;
            }).join('');

            forecastSec.classList.remove('hidden');
        }

    } catch (err) {
        resultDiv.classList.add('hidden');
        forecastSec.classList.add('hidden');
        errorDiv.textContent = '⚠️ ' + err.message;
        errorDiv.classList.remove('hidden');
    } finally {
        loader.classList.add('hidden');
    }
}

// Allow pressing Enter to search
document.getElementById('cityInput').addEventListener('keydown', function(e) {
    if (e.key === 'Enter') getWeather();
});
