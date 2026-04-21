import React from 'react';
import { useAppState } from '../context';
import { Card, MetricTile, Spinner } from '../components/ui';
import { HourlyCard } from '../components/cards';
import { PrecipitationChart } from '../components/charts';
import { WeatherIcon } from '../components/WeatherIcon';
import {
  getWeatherMeta,
  getUVLabel,
  getUVColor,
  getAQIInfo,
  getLightningRisk,
  getWindDetail,
  getCloudDescription,
  isNightTime,
} from '../utils';

export function OverviewView() {
  const { state } = useAppState();

  if (!state.city) {
    return (
      <div className="flex items-center justify-center h-full p-8">
        <div className="text-center">
          <p className="text-6xl mb-4">🌍</p>
          <h2 className="text-2xl font-semibold text-sw-text mb-2">Welcome to SmartWeather</h2>
          <p className="text-sw-muted">Search for a city to get started</p>
        </div>
      </div>
    );
  }

  if (state.loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Spinner size="lg" />
      </div>
    );
  }

  const { city, hourly } = state;
  const { condition } = getWeatherMeta(city.code);
  const isNight = isNightTime(city.tz);
  const uvInfo = { label: getUVLabel(city.hourly?.[0]?.uv || 0), color: getUVColor(city.hourly?.[0]?.uv || 0) };
  const aqiInfo = getAQIInfo(city.aqi);
  const lightningRisk = getLightningRisk(city.hourly?.[0]?.cape || 0);

  return (
    <div className="p-6 space-y-6">
      {/* Hero Section */}
      <Card padding="lg">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-sw-text mb-2">
              {Math.round(city.temp)}°{state.units === 'Imperial' ? 'F' : 'C'}
            </h1>
            <p className="text-xl text-sw-muted">{condition}</p>
            <p className="text-sm text-sw-muted mt-1">
              Feels like {Math.round(city.feels)}°
            </p>
          </div>
          <WeatherIcon code={city.code} isNight={isNight} size="xl" />
        </div>
      </Card>

      {/* Hourly Forecast */}
      <div>
        <h2 className="text-xl font-semibold text-sw-text mb-3">24-Hour Forecast</h2>
        <div className="flex gap-3 overflow-x-auto pb-2">
          {hourly.slice(0, 24).map((hour, index) => (
            <HourlyCard key={index} data={hour} />
          ))}
        </div>
      </div>

      {/* Precipitation Chart */}
      {hourly.length > 0 && <PrecipitationChart data={hourly.slice(0, 24)} />}

      {/* Metrics Grid */}
      <div>
        <h2 className="text-xl font-semibold text-sw-text mb-3">Current Conditions</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <MetricTile
            label="Wind"
            value={Math.round(city.windSpeed)}
            unit={state.units === 'Imperial' ? 'mph' : 'km/h'}
            icon="💨"
            subtext={getWindDetail(city.windSpeed, city.windDir, state.units)}
          />
          <MetricTile
            label="Humidity"
            value={city.humidity}
            unit="%"
            icon="💧"
          />
          <MetricTile
            label="Pressure"
            value={Math.round(city.pressure)}
            unit="mb"
            icon="🌡️"
          />
          <MetricTile
            label="Cloud Cover"
            value={city.cloud}
            unit="%"
            icon="☁️"
            subtext={getCloudDescription(city.cloud)}
          />
          {city.hourly?.[0]?.uv !== undefined && (
            <MetricTile
              label="UV Index"
              value={city.hourly[0].uv.toFixed(1)}
              icon="☀️"
              subtext={uvInfo.label}
              color={uvInfo.color}
            />
          )}
          {city.aqi !== null && (
            <MetricTile
              label="Air Quality"
              value={city.aqi}
              icon="🌫️"
              subtext={aqiInfo.label}
              color={aqiInfo.color}
            />
          )}
          {city.hourly?.[0]?.cape !== undefined && (
            <MetricTile
              label="Lightning Risk"
              value={city.hourly[0].cape}
              unit="J/kg"
              icon="⚡"
              subtext={lightningRisk.label}
              color={lightningRisk.color}
            />
          )}
          <MetricTile
            label="Wind Gust"
            value={Math.round(city.windGust)}
            unit={state.units === 'Imperial' ? 'mph' : 'km/h'}
            icon="🌪️"
          />
        </div>
      </div>

      {/* Weekly Forecast Preview */}
      {city.weekly && city.weekly.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold text-sw-text mb-3">10-Day Forecast</h2>
          <Card>
            <div className="space-y-2">
              {city.weekly.slice(0, 10).map((day, index) => {
                const date = new Date(day.date);
                const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
                const monthDay = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
                const { icon } = getWeatherMeta(day.code);

                return (
                  <div
                    key={index}
                    className="flex items-center justify-between py-2 border-b border-sw-border last:border-b-0"
                  >
                    <div className="flex items-center gap-4 flex-1">
                      <div className="w-16 text-left">
                        <div className="font-semibold text-sw-text">{dayName}</div>
                        <div className="text-xs text-sw-muted">{monthDay}</div>
                      </div>
                      <span className="text-2xl">{icon}</span>
                      <div className="flex-1">
                        {day.precipProb > 0 && (
                          <div className="text-xs text-blue-400">💧 {day.precipProb}%</div>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xl font-semibold text-sw-text">
                        {Math.round(day.tempMax)}°
                      </span>
                      <span className="text-lg text-sw-muted">
                        {Math.round(day.tempMin)}°
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
