import { WEATHER_CODES } from './constants';

export interface WeatherMeta {
  condition: string;
  icon: string;
}

export function getWeatherMeta(code: number): WeatherMeta {
  const data = WEATHER_CODES[code] || { c: 'Unknown', i: '🌍' };
  return { condition: data.c, icon: data.i };
}

export function getLightningRisk(cape: number): { label: string; color: string } {
  if (cape > 2500) return { label: 'Extreme', color: '#ef4444' };
  if (cape > 1000) return { label: 'High', color: '#f97316' };
  if (cape > 100) return { label: 'Moderate', color: '#eab308' };
  return { label: 'Low', color: '#4ade80' };
}

export function distanceFromMeters(meters: number | null, units: 'Imperial' | 'Metric'): string {
  if (meters === null || meters === undefined || Number.isNaN(meters)) return '—';

  if (units === 'Imperial') {
    const miles = meters / 1609.34;
    return `${Math.round(miles * 10) / 10} mi`;
  } else {
    const km = meters / 1000;
    return `${Math.round(km * 10) / 10} km`;
  }
}

export function getWeatherType(code: number, isNight = false): string {
  const c = Number(code);
  if (isNight && (c === 0 || c === 1 || c === 2)) return 'night';
  if ([95, 96, 99, 65, 82].includes(c)) return 'storm';
  if ([51, 53, 55, 61, 63, 80, 81].includes(c)) return 'rain';
  if ([71, 73, 75].includes(c)) return 'snow';
  if (c === 45) return 'fog';
  if (c === 1 || c === 2) return 'partly';
  if (c === 3) return 'cloud';
  if (c === 0) return 'clear';
  return 'cloud';
}

export function degToCompass(deg: number): string {
  const dirs = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
  const index = Math.round((((deg % 360) + 360) % 360) / 22.5) % 16;
  return dirs[index];
}

export function getPressureTrend(pressure: number): string {
  if (pressure < 1008) return 'Lower pressure';
  if (pressure > 1020) return 'Higher pressure';
  return 'Steady pressure';
}

export function getUVLabel(uv: number): string {
  if (uv <= 2) return 'Low';
  if (uv <= 5) return 'Moderate';
  if (uv <= 7) return 'High';
  if (uv <= 10) return 'Very High';
  return 'Extreme';
}

export function getUVColor(uv: number): string {
  if (uv <= 2) return '#4ade80';
  if (uv <= 5) return '#eab308';
  if (uv <= 7) return '#f97316';
  if (uv <= 10) return '#ef4444';
  return '#a855f7';
}

export function getWindDetail(speed: number, deg: number, units: 'Imperial' | 'Metric'): string {
  const dir = degToCompass(deg);
  const unit = units === 'Imperial' ? 'mph' : 'km/h';
  if (dir === 'Variable') return `Variable winds around ${Math.round(speed)} ${unit}`;
  return `From the ${dir} at ${Math.round(speed)} ${unit}`;
}

export function getCloudDescription(percent: number): string {
  if (percent < 15) return 'Clear skies';
  if (percent < 40) return 'Partly cloudy';
  if (percent < 70) return 'Mostly cloudy';
  return 'Overcast';
}

export function getAQIInfo(value: number | null): { label: string; color: string } {
  if (!value) return { label: 'N/A', color: 'var(--sw-muted)' };
  if (value <= 50) return { label: 'Good', color: '#4ade80' };
  if (value <= 100) return { label: 'Moderate', color: '#eab308' };
  if (value <= 150) return { label: 'USG', color: '#f97316' };
  if (value <= 200) return { label: 'Unhealthy', color: '#ef4444' };
  return { label: 'Hazardous', color: '#a855f7' };
}

export function formatPrecipitation(value: number, units: 'Imperial' | 'Metric'): string {
  if (value === null || value === undefined || Number.isNaN(Number(value))) return '—';
  return units === 'Imperial'
    ? `${Math.round((Number(value) / 25.4) * 100) / 100} in`
    : `${Math.round(Number(value) * 10) / 10} mm`;
}

export function formatSnowfall(value: number, units: 'Imperial' | 'Metric'): string {
  if (value === null || value === undefined || Number.isNaN(Number(value))) return '—';
  return units === 'Imperial'
    ? `${Math.round((Number(value) / 2.54) * 10) / 10} in`
    : `${Math.round(Number(value) * 10) / 10} cm`;
}

export function isNightTime(timezone: string): boolean {
  try {
    const hour = new Date().toLocaleTimeString('en-US', {
      timeZone: timezone,
      hour: 'numeric',
      hour12: false,
    });
    const h = parseInt(hour);
    return h < 6 || h >= 18;
  } catch {
    const hour = new Date().getHours();
    return hour < 6 || hour >= 18;
  }
}
