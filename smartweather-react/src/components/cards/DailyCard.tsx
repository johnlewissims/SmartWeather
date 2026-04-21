import React from 'react';
import { DailyData } from '../../types';
import { getWeatherMeta } from '../../utils';
import { Card } from '../ui';
import { WeatherIcon } from '../WeatherIcon';

interface DailyCardProps {
  data: DailyData;
  expanded?: boolean;
  onClick?: () => void;
}

export function DailyCard({ data, expanded = false, onClick }: DailyCardProps) {
  const { condition } = getWeatherMeta(data.code);
  const date = new Date(data.date);
  const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
  const monthDay = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

  return (
    <Card
      padding="md"
      hover={!!onClick}
      onClick={onClick}
      className={`cursor-pointer transition-all duration-200 ${
        expanded ? 'border-sw-accent' : ''
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4 flex-1">
          <div className="text-left">
            <div className="text-lg font-semibold text-sw-text">{dayName}</div>
            <div className="text-sm text-sw-muted">{monthDay}</div>
          </div>

          <div className="flex-shrink-0">
            <WeatherIcon code={data.code} size="lg" />
          </div>

          <div className="flex-1 min-w-0">
            <div className="text-sm text-sw-text font-medium truncate">{condition}</div>
            {data.precipProb > 0 && (
              <div className="text-xs text-blue-400">
                💧 {data.precipProb}% chance
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2 text-right">
          <div className="text-2xl font-bold text-sw-text">
            {Math.round(data.tempMax)}°
          </div>
          <div className="text-xl text-sw-muted">
            {Math.round(data.tempMin)}°
          </div>
        </div>
      </div>

      {expanded && (
        <div className="mt-4 pt-4 border-t border-sw-border grid grid-cols-2 gap-3 text-sm">
          <div>
            <div className="text-sw-muted">Sunrise</div>
            <div className="text-sw-text font-medium">
              {new Date(data.sunrise).toLocaleTimeString('en-US', {
                hour: 'numeric',
                minute: '2-digit',
              })}
            </div>
          </div>
          <div>
            <div className="text-sw-muted">Sunset</div>
            <div className="text-sw-text font-medium">
              {new Date(data.sunset).toLocaleTimeString('en-US', {
                hour: 'numeric',
                minute: '2-digit',
              })}
            </div>
          </div>
          <div>
            <div className="text-sw-muted">UV Index</div>
            <div className="text-sw-text font-medium">{data.uvMax.toFixed(1)}</div>
          </div>
          <div>
            <div className="text-sw-muted">Wind</div>
            <div className="text-sw-text font-medium">
              {Math.round(data.windSpeedMax)} mph
            </div>
          </div>
        </div>
      )}
    </Card>
  );
}
