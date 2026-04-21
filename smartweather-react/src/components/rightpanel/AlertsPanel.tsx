import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppState } from '../../context';
import { useAlerts } from '../../hooks';
import { getAlertStyle, getAlertIcon, isCriticalAlert } from '../../utils';
import { Card, Badge } from '../ui';

export function AlertsPanel() {
  const { state } = useAppState();
  const { alerts } = useAlerts();
  const navigate = useNavigate();

  if (!state.city) {
    return null;
  }

  if (alerts.length === 0) {
    return (
      <Card>
        <h2 className="text-lg font-semibold text-sw-text mb-3">Weather Alerts</h2>
        <div className="text-center text-sw-muted py-4">
          <p className="text-3xl mb-2">✅</p>
          <p className="text-sm">No active alerts</p>
        </div>
      </Card>
    );
  }

  const handleAlertClick = (alertId: string) => {
    navigate(`/alert/${alertId}`);
  };

  return (
    <Card>
      <h2 className="text-lg font-semibold text-sw-text mb-3">Weather Alerts</h2>
      <div className="space-y-2">
        {alerts.slice(0, 3).map((alert) => {
          const style = getAlertStyle(alert.severity);
          const icon = getAlertIcon(alert.event);
          const critical = isCriticalAlert(alert);

          return (
            <button
              key={alert.id}
              onClick={() => handleAlertClick(alert.id)}
              className="w-full text-left p-3 rounded-lg border transition-all duration-200 hover:opacity-80"
              style={{
                backgroundColor: style.bg,
                borderColor: style.border,
              }}
            >
              <div className="flex items-start gap-2">
                <span className="text-xl flex-shrink-0">{icon}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold text-sm" style={{ color: style.text }}>
                      {alert.event}
                    </span>
                    {critical && (
                      <Badge variant="danger" className="text-xs">
                        CRITICAL
                      </Badge>
                    )}
                  </div>
                  <p className="text-xs line-clamp-2" style={{ color: style.text }}>
                    {alert.headline}
                  </p>
                </div>
              </div>
            </button>
          );
        })}

        {alerts.length > 3 && (
          <button
            onClick={() => navigate('/alerts')}
            className="w-full text-center text-sm text-sw-accent hover:underline py-2"
          >
            View all {alerts.length} alerts →
          </button>
        )}
      </div>
    </Card>
  );
}
