import { useEffect, useCallback } from 'react';
import { useAppState } from '../context';
import { buildCityData } from '../services';

export function useWeatherData() {
  const { state, dispatch } = useAppState();

  const fetchWeatherForCity = useCallback(
    async (name: string, country: string, lat: number, lon: number, timezone: string) => {
      dispatch({ type: 'SET_LOADING', payload: true });
      dispatch({ type: 'SET_ERROR', payload: null });

      try {
        const cityData = await buildCityData(name, country, lat, lon, timezone);

        dispatch({
          type: 'SET_CITY',
          payload: cityData as any, // Will be fully typed in the actual city object
        });

        if (cityData.hourly) {
          dispatch({ type: 'SET_HOURLY', payload: cityData.hourly });
        }

        dispatch({ type: 'SET_LAST_UPDATED', payload: new Date() });
      } catch (error) {
        console.error('Failed to fetch weather data:', error);
        dispatch({
          type: 'SET_ERROR',
          payload: error instanceof Error ? error.message : 'Failed to load weather data',
        });
      } finally {
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    },
    [dispatch]
  );

  const refreshWeatherData = useCallback(async () => {
    if (!state.city) return;

    const { name, country, lat, lon, tz } = state.city;
    await fetchWeatherForCity(name, country, lat, lon, tz);
  }, [state.city, fetchWeatherForCity]);

  // Auto-refresh effect
  useEffect(() => {
    if (!state.autoRefresh || !state.city) return;

    const intervalMs = state.refreshInterval * 60 * 1000; // Convert minutes to ms
    const interval = setInterval(refreshWeatherData, intervalMs);

    return () => clearInterval(interval);
  }, [state.autoRefresh, state.refreshInterval, state.city, refreshWeatherData]);

  return {
    city: state.city,
    hourly: state.hourly,
    loading: state.loading,
    error: state.error,
    lastUpdated: state.lastUpdated,
    fetchWeatherForCity,
    refreshWeatherData,
  };
}
