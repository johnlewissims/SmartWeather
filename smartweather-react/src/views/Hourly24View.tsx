import React, { useState } from 'react';
import { useAppState } from '../context';
import { Card, Spinner } from '../components/ui';
import { HourlyTile } from '../components/charts';

type MetricType = 'temp' | 'feels' | 'wind' | 'humidity' | 'uv' | 'precip';

export function Hourly24View() {
  const { state } = useAppState();
  const [selectedMetric, setSelectedMetric] = useState<MetricType>('temp');

  if (!state.city) {
    return (
      <div className="flex items-center justify-center h-full p-8">
        <div className="text-center text-sw-muted">
          <p className="text-4xl mb-2">⏰</p>
          <p>No city selected</p>
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

  const metrics: Array<{ value: MetricType; label: string; icon: string }> = [
    { value: 'temp', label: 'Temperature', icon: '🌡️' },
    { value: 'feels', label: 'Feels Like', icon: '🤔' },
    { value: 'wind', label: 'Wind', icon: '💨' },
    { value: 'humidity', label: 'Humidity', icon: '💧' },
    { value: 'uv', label: 'UV Index', icon: '☀️' },
    { value: 'precip', label: 'Precipitation', icon: '🌧️' },
  ];

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-sw-text mb-2">24-Hour Forecast</h1>
        <p className="text-sw-muted">Detailed hourly conditions for {state.city.name}</p>
      </div>

      {/* Metric Selector */}
      <Card>
        <div className="flex flex-wrap gap-2">
          {metrics.map((metric) => (
            <button
              key={metric.value}
              onClick={() => setSelectedMetric(metric.value)}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                selectedMetric === metric.value
                  ? 'bg-sw-accent text-white'
                  : 'bg-sw-bg text-sw-text hover:bg-sw-surface'
              }`}
            >
              <span className="mr-2">{metric.icon}</span>
              {metric.label}
            </button>
          ))}
        </div>
      </Card>

      {/* Hourly Data */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {state.hourly.slice(0, 24).map((hour, index) => (
          <HourlyTile
            key={index}
            data={hour}
            metric={selectedMetric}
            units={state.units}
          />
        ))}
      </div>
    </div>
  );
}
