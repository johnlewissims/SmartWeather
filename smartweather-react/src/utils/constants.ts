export const WEATHER_CODES: Record<number, { c: string; i: string }> = {
  0: { c: 'Clear', i: '☀️' },
  1: { c: 'Mainly clear', i: '🌤️' },
  2: { c: 'Partly cloudy', i: '⛅' },
  3: { c: 'Overcast', i: '☁️' },
  45: { c: 'Fog', i: '🌫️' },
  48: { c: 'Depositing rime fog', i: '🌫️' },
  51: { c: 'Light drizzle', i: '🌦️' },
  53: { c: 'Drizzle', i: '🌦️' },
  55: { c: 'Dense drizzle', i: '🌧️' },
  56: { c: 'Freezing drizzle', i: '🌧️' },
  57: { c: 'Dense freezing drizzle', i: '🌧️' },
  61: { c: 'Light rain', i: '🌦️' },
  63: { c: 'Rain', i: '🌧️' },
  65: { c: 'Heavy rain', i: '⛈️' },
  66: { c: 'Freezing rain', i: '🌧️' },
  67: { c: 'Heavy freezing rain', i: '🌧️' },
  71: { c: 'Light snow', i: '🌨️' },
  73: { c: 'Snow', i: '❄️' },
  75: { c: 'Heavy snow', i: '❄️' },
  77: { c: 'Snow grains', i: '❄️' },
  80: { c: 'Showers', i: '🌦️' },
  81: { c: 'Showers', i: '🌧️' },
  82: { c: 'Heavy showers', i: '⛈️' },
  85: { c: 'Light snow showers', i: '🌨️' },
  86: { c: 'Heavy snow showers', i: '❄️' },
  95: { c: 'Thunderstorm', i: '⛈️' },
  96: { c: 'T-storm w/hail', i: '⛈️' },
  99: { c: 'Severe T-storm', i: '⛈️' },
};

export const RADAR_LEGENDS: Record<string, Array<{ color: string; label: string; title?: string }>> = {
  reflectivity: [
    { color: '#646464', label: '5', title: 'Reflectivity' },
    { color: '#04e9e7', label: '10' },
    { color: '#019ff4', label: '15' },
    { color: '#0300f4', label: '20' },
    { color: '#02fd02', label: '25' },
    { color: '#01c501', label: '30' },
    { color: '#008e00', label: '35' },
    { color: '#fdf802', label: '40' },
    { color: '#e5bc00', label: '45' },
    { color: '#fd9500', label: '50' },
    { color: '#fd0000', label: '55' },
    { color: '#d40000', label: '60' },
    { color: '#bc0000', label: '65' },
    { color: '#f800fd', label: '70' },
    { color: '#9854c6', label: '75+' },
  ],
  satellite: [
    { color: '#1e293b', label: 'Clear', title: 'Satellite' },
    { color: '#334155', label: 'Thin' },
    { color: '#64748b', label: 'Clouds' },
    { color: '#cbd5e1', label: 'Dense' },
    { color: '#f8fafc', label: 'Thick' },
  ],
  temperature: [
    { color: '#1d4ed8', label: 'Cold', title: 'Temperature' },
    { color: '#06b6d4', label: 'Cool' },
    { color: '#22c55e', label: 'Mild' },
    { color: '#f59e0b', label: 'Warm' },
    { color: '#ef4444', label: 'Hot' },
  ],
};

export const MAP_TILES = {
  CARTO_DARK: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
  CARTO_LIGHT: 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',
  ESRI_SATELLITE: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',

  // Weather overlays - using RainViewer API (free, no key required)
  RAINVIEWER_RADAR: 'https://tilecache.rainviewer.com/v2/radar/{timestamp}/512/{z}/{x}/{y}/2/1_1.png',

  // OpenWeatherMap overlays (note: requires API key, using free tier limits)
  OWM_PRECIPITATION: 'https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=',
  OWM_CLOUDS: 'https://tile.openweathermap.org/map/clouds_new/{z}/{x}/{y}.png?appid=',
  OWM_TEMP: 'https://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=',
};

export const API_ENDPOINTS = {
  GEOCODING: 'https://geocoding-api.open-meteo.com/v1/search',
  WEATHER: 'https://api.open-meteo.com/v1/forecast',
  AIR_QUALITY: 'https://air-quality-api.open-meteo.com/v1/air-quality',
  NWS_ALERTS: 'https://api.weather.gov/alerts/active',
  NWS_POINTS: 'https://api.weather.gov/points',
};

export const VIEW_TITLES: Record<string, string> = {
  overview: 'Overview',
  hourly24: '24-Hour Forecast',
  forecast: '7-Day Forecast',
  radar: 'Radar Maps',
  settings: 'Settings',
  'alert-detail': 'Alert Details',
};
