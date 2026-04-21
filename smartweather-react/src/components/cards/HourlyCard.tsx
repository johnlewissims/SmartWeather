import React from 'react';
import { HourlyData } from '../../types';
import { getWeatherMeta } from '../../utils';
import { Card } from '../ui';
import { WeatherIcon } from '../WeatherIcon';

interface HourlyCardProps {
  data: HourlyData;
  onClick?: () => void;
}

export function HourlyCard({ data, onClick }: HourlyCardProps) {
  const { condition } = getWeatherMeta(data.code);
  const time = new Date(data.time);
  const hours = time.getHours();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const displayHours = hours % 12 || 12;

  return (
    <Card
      padding="sm"
      hover={!!onClick}
      onClick={onClick}
      className="cursor-pointer min-w-[120px]"
    >
      <div className="text-center">
        <div className="text-sm text-sw-muted mb-2">
          {displayHours}:00 {ampm}
        </div>

        <div className="mb-2">
          <WeatherIcon code={data.code} isNight={!data.isDay} size="md" />
        </div>

        <div className="text-xl font-semibold text-sw-text mb-1">
          {Math.round(data.temp)}°
        </div>

        <div className="text-xs text-sw-muted mb-2">
          {condition}
        </div>

        {data.precipProb > 0 && (
          <div className="text-xs text-blue-400">
            💧 {data.precipProb}%
          </div>
        )}
      </div>
    </Card>
  );
}
