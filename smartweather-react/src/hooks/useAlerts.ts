import { useEffect, useCallback } from 'react';
import { useAppState } from '../context';
import { fetchAlerts } from '../services';
import { sortAlerts, isCriticalAlert } from '../utils';
import { sendAlertNotification } from '../services';

export function useAlerts() {
  const { state, dispatch } = useAppState();

  const loadAlerts = useCallback(async () => {
    if (!state.city) return;

    try {
      const alerts = await fetchAlerts(state.city.lat, state.city.lon);
      const sorted = sortAlerts(alerts);

      // Check for new critical alerts
      if (state.notifications && state.alerts.length > 0) {
        const existingIds = new Set(state.alerts.map((a) => a.id));
        const newAlerts = sorted.filter((a) => !existingIds.has(a.id));
        const newCritical = newAlerts.filter(isCriticalAlert);

        newCritical.forEach((alert) => {
          sendAlertNotification(alert);
        });
      }

      dispatch({ type: 'SET_ALERTS', payload: sorted });
    } catch (error) {
      console.error('Failed to fetch alerts:', error);
    }
  }, [state.city, state.alerts, state.notifications, dispatch]);

  // Load alerts when city changes
  useEffect(() => {
    if (state.city) {
      loadAlerts();
    }
  }, [state.city?.lat, state.city?.lon]);

  // Auto-refresh alerts every 5 minutes
  useEffect(() => {
    if (!state.city || !state.autoRefresh) return;

    const interval = setInterval(loadAlerts, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, [state.city, state.autoRefresh, loadAlerts]);

  return {
    alerts: state.alerts,
    loadAlerts,
  };
}
