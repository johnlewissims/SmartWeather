import React from 'react';
import { useAppState } from '../context';
import { Spinner } from '../components/ui';
import { DailyCard } from '../components/cards';

export function ForecastView() {
  const { state, dispatch } = useAppState();

  if (!state.city) {
    return (
      <div className="flex items-center justify-center h-full p-8">
        <div className="text-center text-sw-muted">
          <p className="text-4xl mb-2">📅</p>
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

  const handleDayClick = (index: number) => {
    if (state.expandedForecastDay === index) {
      dispatch({ type: 'SET_EXPANDED_FORECAST_DAY', payload: null });
    } else {
      dispatch({ type: 'SET_EXPANDED_FORECAST_DAY', payload: index });
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-sw-text mb-2">10-Day Forecast</h1>
        <p className="text-sw-muted">Extended forecast for {state.city.name}</p>
      </div>

      <div className="space-y-3">
        {state.city.weekly?.map((day, index) => (
          <DailyCard
            key={index}
            data={day}
            expanded={state.expandedForecastDay === index}
            onClick={() => handleDayClick(index)}
          />
        ))}
      </div>
    </div>
  );
}
