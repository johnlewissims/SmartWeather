import React from 'react';
import { useAppState } from '../../context';
import { useClock } from '../../hooks';

export function LocalTimeClock() {
  const { state } = useAppState();
  const { timeString, dateString } = useClock(state.city?.tz);

  if (!state.city) {
    return null;
  }

  return (
    <div className="px-4 py-4 border-b border-sw-border bg-sw-surface">
      <div className="text-center">
        <div className="text-3xl font-bold text-sw-accent tabular-nums">
          {timeString}
        </div>
        <div className="text-sm text-sw-muted mt-1">
          {dateString}
        </div>
        <div className="text-xs text-sw-muted mt-1">
          {state.city.name}, {state.city.country}
        </div>
      </div>
    </div>
  );
}
