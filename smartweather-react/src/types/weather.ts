export interface City {
  name: string;
  country: string;
  lat: number;
  lon: number;
  tz: string;
  temp: number;
  feels: number;
  humidity: number;
  precip: number;
  code: number;
  cloud: number;
  pressure: number;
  windSpeed: number;
  windDir: number;
  windGust: number;
  aqi: number | null;
  pm10: number | null;
  pm25: number | null;
  hourly: HourlyData[];
  weekly: DailyData[];
}

export interface HourlyData {
  time: string;
  temp: number;
  feels: number;
  precip: number;
  precipProb: number;
  code: number;
  cloud: number;
  visibility: number;
  windSpeed: number;
  windDir: number;
  windGust: number;
  uv: number;
  isDay: boolean;
  cape: number;
  dewpoint: number;
  humidity: number;
}

export interface DailyData {
  date: string;
  code: number;
  tempMax: number;
  tempMin: number;
  feelsMax: number;
  feelsMin: number;
  sunrise: string;
  sunset: string;
  uvMax: number;
  precipSum: number;
  precipProb: number;
  windSpeedMax: number;
  windGustMax: number;
  windDir: number;
}
