import React from 'react';
import { HourlyData } from '../../types';
import { getWeatherMeta } from '../../utils';
import { WeatherIcon } from '../WeatherIcon';

interface HourlyTileProps {
  data: HourlyData;
  metric: 'temp' | 'feels' | 'wind' | 'humidity' | 'uv' | 'precip';
  units: 'Imperial' | 'Metric';
}

export function HourlyTile({ data, metric, units }: HourlyTileProps) {
  const { condition } = getWeatherMeta(data.code);
  const time = new Date(data.time);
  const hours = time.getHours();
  const displayHours = hours % 12 || 12;
  const ampm = hours >= 12 ? 'PM' : 'AM';

  const getValue = (): string => {
    switch (metric) {
      case 'temp':
        return `${Math.round(data.temp)}°`;
      case 'feels':
        return `${Math.round(data.feels)}°`;
      case 'wind':
        return `${Math.round(data.windSpeed)} ${units === 'Imperial' ? 'mph' : 'km/h'}`;
      case 'humidity':
        return `${data.humidity}%`;
      case 'uv':
        return data.uv.toFixed(1);
      case 'precip':
        return `${data.precipProb}%`;
      default:
        return '—';
    }
  };

  return (
    <div className="bg-sw-surface border border-sw-border rounded-lg p-3 min-w-[100px] text-center">
      <div className="text-xs text-sw-muted mb-2">
        {displayHours}{ampm}
      </div>

      <div className="mb-2">
        <WeatherIcon code={data.code} isNight={!data.isDay} size="sm" />
      </div>

      <div className="text-lg font-semibold text-sw-text">
        {getValue()}
      </div>

      <div className="text-xs text-sw-muted mt-1 truncate">
        {condition}
      </div>
    </div>
  );
}
