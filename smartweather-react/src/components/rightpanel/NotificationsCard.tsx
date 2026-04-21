import React from 'react';
import { useAppState } from '../../context';
import { useNotifications } from '../../hooks';
import { Card, Button, Badge } from '../ui';

export function NotificationsCard() {
  const { state, dispatch } = useAppState();
  const { permission, supported, requestPermission, enabled } = useNotifications();

  if (!supported) {
    return null;
  }

  const handleToggle = async () => {
    if (!enabled && permission === 'default') {
      const result = await requestPermission();
      if (result === 'granted') {
        dispatch({ type: 'SET_NOTIFICATIONS', payload: true });
      }
    } else {
      dispatch({ type: 'SET_NOTIFICATIONS', payload: !state.notifications });
    }
  };

  const handleRequestPermission = async () => {
    await requestPermission();
  };

  return (
    <Card>
      <h2 className="text-lg font-semibold text-sw-text mb-3">Notifications</h2>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm font-medium text-sw-text">Alert Notifications</div>
            <div className="text-xs text-sw-muted">
              Get notified of severe weather
            </div>
          </div>
          <Badge variant={enabled ? 'success' : 'default'}>
            {enabled ? 'ON' : 'OFF'}
          </Badge>
        </div>

        {permission === 'denied' && (
          <div className="text-xs text-red-400 bg-red-500 bg-opacity-10 border border-red-500 rounded-lg p-2">
            Browser notifications are blocked. Please enable them in your browser settings.
          </div>
        )}

        {permission === 'default' && (
          <Button
            variant="primary"
            size="sm"
            fullWidth
            onClick={handleRequestPermission}
          >
            Enable Notifications
          </Button>
        )}

        {permission === 'granted' && (
          <Button
            variant={state.notifications ? 'secondary' : 'primary'}
            size="sm"
            fullWidth
            onClick={handleToggle}
          >
            {state.notifications ? 'Disable' : 'Enable'} Notifications
          </Button>
        )}
      </div>
    </Card>
  );
}
