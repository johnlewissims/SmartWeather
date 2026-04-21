import React from 'react';
import { useAppState } from '../../context';
import { getWeatherMeta, isNightTime } from '../../utils';
import { Card } from '../ui';
import { WeatherIcon } from '../WeatherIcon';

export function CurrentConditionsCard() {
  const { state } = useAppState();

  if (!state.city) {
    return (
      <Card>
        <div className="text-center text-sw-muted py-8">
          <p className="text-4xl mb-2">🌍</p>
          <p>Search for a city to see current conditions</p>
        </div>
      </Card>
    );
  }

  const { city } = state;
  const { condition } = getWeatherMeta(city.code);
  const isNight = isNightTime(city.tz);

  return (
    <Card>
      <div className="text-center">
        <h2 className="text-lg font-semibold text-sw-text mb-4">Current Conditions</h2>

        <div className="mb-4">
          <WeatherIcon code={city.code} isNight={isNight} size="xl" />
        </div>

        <div className="mb-4">
          <div className="text-5xl font-bold text-sw-text mb-1">
            {Math.round(city.temp)}°{state.units === 'Imperial' ? 'F' : 'C'}
          </div>
          <div className="text-sw-muted text-lg">{condition}</div>
          <div className="text-sw-muted text-sm mt-1">
            Feels like {Math.round(city.feels)}°
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="bg-sw-bg rounded-lg p-3">
            <div className="text-sw-muted mb-1">Humidity</div>
            <div className="text-sw-text font-semibold">{city.humidity}%</div>
          </div>
          <div className="bg-sw-bg rounded-lg p-3">
            <div className="text-sw-muted mb-1">Wind</div>
            <div className="text-sw-text font-semibold">
              {Math.round(city.windSpeed)} {state.units === 'Imperial' ? 'mph' : 'km/h'}
            </div>
          </div>
          <div className="bg-sw-bg rounded-lg p-3">
            <div className="text-sw-muted mb-1">Pressure</div>
            <div className="text-sw-text font-semibold">{Math.round(city.pressure)} mb</div>
          </div>
          <div className="bg-sw-bg rounded-lg p-3">
            <div className="text-sw-muted mb-1">Cloud Cover</div>
            <div className="text-sw-text font-semibold">{city.cloud}%</div>
          </div>
        </div>
      </div>
    </Card>
  );
}
