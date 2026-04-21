import React from 'react';
import { HourlyData } from '../../types';

interface PrecipitationChartProps {
  data: HourlyData[];
}

export function PrecipitationChart({ data }: PrecipitationChartProps) {
  if (!data || data.length === 0) {
    return null;
  }

  const maxProb = Math.max(...data.map((d) => d.precipProb), 1);

  return (
    <div className="bg-sw-surface border border-sw-border rounded-lg p-4">
      <h3 className="text-lg font-semibold text-sw-text mb-4">Precipitation Probability</h3>

      <div className="flex items-end justify-between gap-1 h-32">
        {data.map((hour, index) => {
          const height = (hour.precipProb / maxProb) * 100;
          const time = new Date(hour.time);
          const hours = time.getHours();
          const displayHours = hours % 12 || 12;
          const ampm = hours >= 12 ? 'PM' : 'AM';

          return (
            <div
              key={index}
              className="flex-1 flex flex-col items-center justify-end group relative"
            >
              <div
                className="w-full bg-blue-500 rounded-t transition-all duration-200 hover:bg-blue-400 relative"
                style={{ height: `${Math.max(height, 2)}%` }}
              >
                {hour.precipProb > 0 && (
                  <div className="absolute -top-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-sw-bg px-2 py-1 rounded text-xs whitespace-nowrap">
                    {hour.precipProb}%
                  </div>
                )}
              </div>

              {index % 3 === 0 && (
                <div className="text-xs text-sw-muted mt-2">
                  {displayHours}{ampm}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-4 flex items-center justify-center gap-4 text-xs text-sw-muted">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-blue-500 rounded"></div>
          <span>Precipitation Chance</span>
        </div>
      </div>
    </div>
  );
}
