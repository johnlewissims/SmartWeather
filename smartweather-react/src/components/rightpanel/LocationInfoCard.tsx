import React from 'react';
import { useAppState } from '../../context';
import { Card } from '../ui';

export function LocationInfoCard() {
  const { state } = useAppState();

  if (!state.city) {
    return null;
  }

  const { city } = state;

  return (
    <Card>
      <h2 className="text-lg font-semibold text-sw-text mb-3">Location Info</h2>

      <div className="space-y-3 text-sm">
        <div className="flex justify-between">
          <span className="text-sw-muted">City</span>
          <span className="text-sw-text font-medium">{city.name}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-sw-muted">Country</span>
          <span className="text-sw-text font-medium">{city.country}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-sw-muted">Coordinates</span>
          <span className="text-sw-text font-mono text-xs">
            {city.lat.toFixed(4)}°, {city.lon.toFixed(4)}°
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-sw-muted">Timezone</span>
          <span className="text-sw-text font-medium">{city.tz}</span>
        </div>

        {city.aqi !== null && (
          <>
            <div className="border-t border-sw-border pt-3 mt-3"></div>
            <div className="flex justify-between">
              <span className="text-sw-muted">Air Quality Index</span>
              <span className="text-sw-text font-medium">{city.aqi}</span>
            </div>

            {city.pm25 !== null && (
              <div className="flex justify-between">
                <span className="text-sw-muted">PM2.5</span>
                <span className="text-sw-text font-medium">{Math.round(city.pm25)} µg/m³</span>
              </div>
            )}

            {city.pm10 !== null && (
              <div className="flex justify-between">
                <span className="text-sw-muted">PM10</span>
                <span className="text-sw-text font-medium">{Math.round(city.pm10)} µg/m³</span>
              </div>
            )}
          </>
        )}
      </div>
    </Card>
  );
}
