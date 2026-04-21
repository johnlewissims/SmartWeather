import React from 'react';
import { Alert } from '../../types';
import { getAlertStyle, getAlertIcon, formatRemainingTime } from '../../utils';
import { Card, Badge } from '../ui';

interface AlertCardProps {
  alert: Alert;
  onClick?: () => void;
}

export function AlertCard({ alert, onClick }: AlertCardProps) {
  const style = getAlertStyle(alert.severity);
  const icon = getAlertIcon(alert.event);
  const remaining = formatRemainingTime(alert.expires);

  return (
    <Card
      padding="md"
      hover={!!onClick}
      onClick={onClick}
      className="cursor-pointer"
      style={{
        backgroundColor: style.bg,
        borderColor: style.border,
      }}
    >
      <div className="flex items-start gap-3">
        <span className="text-3xl flex-shrink-0">{icon}</span>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-2">
            <h3
              className="font-semibold text-lg leading-tight"
              style={{ color: style.text }}
            >
              {alert.event}
            </h3>
            <Badge
              variant={
                alert.severity.toLowerCase() === 'extreme'
                  ? 'danger'
                  : alert.severity.toLowerCase() === 'severe'
                  ? 'warning'
                  : 'default'
              }
            >
              {alert.severity.toUpperCase()}
            </Badge>
          </div>

          <p
            className="text-sm mb-3 line-clamp-3"
            style={{ color: style.text }}
          >
            {alert.headline}
          </p>

          <div className="flex items-center gap-4 text-xs" style={{ color: style.text }}>
            <div className="flex items-center gap-1">
              <span>⏱️</span>
              <span>Expires: {remaining}</span>
            </div>
            <div className="flex items-center gap-1">
              <span>📍</span>
              <span className="truncate">{alert.areaDesc.split(';')[0]}</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
