import React from 'react';
import { useAppState } from '../../context';
import { useWeatherData } from '../../hooks';
import { Button } from '../ui';

export function StatusPanel() {
  const { state } = useAppState();
  const { refreshWeatherData, loading } = useWeatherData();

  const formatLastUpdated = (date: Date | null): string => {
    if (!date) return 'Never';

    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);

    if (minutes < 1) return 'Just now';
    if (minutes === 1) return '1 minute ago';
    if (minutes < 60) return `${minutes} minutes ago`;

    const hours = Math.floor(minutes / 60);
    if (hours === 1) return '1 hour ago';
    if (hours < 24) return `${hours} hours ago`;

    const days = Math.floor(hours / 24);
    if (days === 1) return '1 day ago';
    return `${days} days ago`;
  };

  return (
    <div className="px-4 py-4 border-t border-sw-border">
      {state.city && (
        <div className="mb-3">
          <Button
            variant="secondary"
            size="sm"
            fullWidth
            onClick={refreshWeatherData}
            disabled={loading}
          >
            {loading ? '↻ Refreshing...' : '↻ Refresh Data'}
          </Button>
        </div>
      )}

      <div className="space-y-2 text-xs text-sw-muted">
        <div className="flex items-center justify-between">
          <span>Status</span>
          <span className="flex items-center gap-1">
            <span className={`w-2 h-2 rounded-full ${state.error ? 'bg-red-500' : 'bg-green-500'} ${!state.error ? 'animate-pulse-slow' : ''}`} />
            {state.error ? 'Error' : 'Connected'}
          </span>
        </div>

        {state.lastUpdated && (
          <div className="flex items-center justify-between">
            <span>Last updated</span>
            <span>{formatLastUpdated(state.lastUpdated)}</span>
          </div>
        )}

        {state.autoRefresh && (
          <div className="flex items-center justify-between">
            <span>Auto-refresh</span>
            <span>Every {state.refreshInterval} min</span>
          </div>
        )}
      </div>
    </div>
  );
}
