import axios from 'axios';
import { City, HourlyData, DailyData } from '../types';

const WEATHER_API = 'https://api.open-meteo.com/v1/forecast';
const AIR_QUALITY_API = 'https://air-quality-api.open-meteo.com/v1/air-quality';

interface WeatherResponse {
  current: any;
  hourly: any;
  daily: any;
  timezone: string;
}

interface AirQualityResponse {
  current: {
    us_aqi: number;
    pm10: number;
    pm2_5: number;
  };
}

export async function fetchWeatherData(lat: number, lon: number, timezone: string): Promise<WeatherResponse> {
  try {
    const response = await axios.get(WEATHER_API, {
      params: {
        latitude: lat,
        longitude: lon,
        timezone: timezone || 'auto',
        current: [
          'temperature_2m',
          'apparent_temperature',
          'relative_humidity_2m',
          'precipitation',
          'weather_code',
          'cloud_cover',
          'pressure_msl',
          'wind_speed_10m',
          'wind_direction_10m',
          'wind_gusts_10m',
        ].join(','),
        hourly: [
          'temperature_2m',
          'apparent_temperature',
          'precipitation_probability',
          'precipitation',
          'weather_code',
          'cloud_cover',
          'visibility',
          'wind_speed_10m',
          'wind_direction_10m',
          'wind_gusts_10m',
          'uv_index',
          'is_day',
          'cape',
          'dew_point_2m',
          'relative_humidity_2m',
        ].join(','),
        daily: [
          'weather_code',
          'temperature_2m_max',
          'temperature_2m_min',
          'apparent_temperature_max',
          'apparent_temperature_min',
          'sunrise',
          'sunset',
          'uv_index_max',
          'precipitation_sum',
          'precipitation_probability_max',
          'wind_speed_10m_max',
          'wind_gusts_10m_max',
          'wind_direction_10m_dominant',
        ].join(','),
        temperature_unit: 'fahrenheit',
        wind_speed_unit: 'mph',
        precipitation_unit: 'inch',
        forecast_days: 10,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Weather fetch failed:', error);
    throw error;
  }
}

export async function fetchAirQuality(lat: number, lon: number): Promise<AirQualityResponse | null> {
  try {
    const response = await axios.get(AIR_QUALITY_API, {
      params: {
        latitude: lat,
        longitude: lon,
        current: ['us_aqi', 'pm10', 'pm2_5'].join(','),
      },
    });

    return response.data;
  } catch (error) {
    console.error('Air quality fetch failed:', error);
    return null;
  }
}

export function parseHourlyData(hourly: any, startIndex: number = 0, count: number = 24): HourlyData[] {
  const result: HourlyData[] = [];

  for (let i = startIndex; i < Math.min(startIndex + count, hourly.time.length); i++) {
    result.push({
      time: hourly.time[i],
      temp: hourly.temperature_2m[i],
      feels: hourly.apparent_temperature[i],
      precip: hourly.precipitation[i] || 0,
      precipProb: hourly.precipitation_probability[i] || 0,
      code: hourly.weather_code[i],
      cloud: hourly.cloud_cover[i] || 0,
      visibility: hourly.visibility[i] || 10000,
      windSpeed: hourly.wind_speed_10m[i] || 0,
      windDir: hourly.wind_direction_10m[i] || 0,
      windGust: hourly.wind_gusts_10m[i] || 0,
      uv: hourly.uv_index[i] || 0,
      isDay: hourly.is_day[i] === 1,
      cape: hourly.cape?.[i] || 0,
      dewpoint: hourly.dew_point_2m[i] || 0,
      humidity: hourly.relative_humidity_2m[i] || 0,
    });
  }

  return result;
}

export function parseDailyData(daily: any): DailyData[] {
  const result: DailyData[] = [];

  for (let i = 0; i < daily.time.length; i++) {
    result.push({
      date: daily.time[i],
      code: daily.weather_code[i],
      tempMax: daily.temperature_2m_max[i],
      tempMin: daily.temperature_2m_min[i],
      feelsMax: daily.apparent_temperature_max[i],
      feelsMin: daily.apparent_temperature_min[i],
      sunrise: daily.sunrise[i],
      sunset: daily.sunset[i],
      uvMax: daily.uv_index_max[i] || 0,
      precipSum: daily.precipitation_sum[i] || 0,
      precipProb: daily.precipitation_probability_max[i] || 0,
      windSpeedMax: daily.wind_speed_10m_max[i] || 0,
      windGustMax: daily.wind_gusts_10m_max[i] || 0,
      windDir: daily.wind_direction_10m_dominant[i] || 0,
    });
  }

  return result;
}

export async function buildCityData(
  name: string,
  country: string,
  lat: number,
  lon: number,
  timezone: string
): Promise<Partial<City>> {
  try {
    const [weatherData, airQualityData] = await Promise.all([
      fetchWeatherData(lat, lon, timezone),
      fetchAirQuality(lat, lon),
    ]);

    const hourly24 = parseHourlyData(weatherData.hourly, 0, 24);
    const daily = parseDailyData(weatherData.daily);

    const current = weatherData.current;

    return {
      name,
      country,
      lat,
      lon,
      tz: weatherData.timezone,
      temp: current.temperature_2m,
      feels: current.apparent_temperature,
      humidity: current.relative_humidity_2m,
      precip: current.precipitation || 0,
      code: current.weather_code,
      cloud: current.cloud_cover || 0,
      pressure: current.pressure_msl,
      windSpeed: current.wind_speed_10m || 0,
      windDir: current.wind_direction_10m || 0,
      windGust: current.wind_gusts_10m || 0,
      aqi: airQualityData?.current?.us_aqi || null,
      pm10: airQualityData?.current?.pm10 || null,
      pm25: airQualityData?.current?.pm2_5 || null,
      hourly: hourly24,
      weekly: daily,
    };
  } catch (error) {
    console.error('Build city data failed:', error);
    throw error;
  }
}
