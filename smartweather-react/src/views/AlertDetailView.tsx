import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Alert } from '../types';
import { fetchAlertById } from '../services';
import { getAlertStyle, getAlertIcon, formatRemainingTime } from '../utils';
import { Card, Button, Badge, Spinner } from '../components/ui';

export function AlertDetailView() {
  const { alertId } = useParams<{ alertId: string }>();
  const navigate = useNavigate();
  const [alert, setAlert] = useState<Alert | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadAlert = async () => {
      if (!alertId) {
        setError('No alert ID provided');
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      const data = await fetchAlertById(alertId);
      if (data) {
        setAlert(data);
      } else {
        setError('Alert not found');
      }

      setLoading(false);
    };

    loadAlert();
  }, [alertId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Spinner size="lg" />
      </div>
    );
  }

  if (error || !alert) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-8">
        <p className="text-4xl mb-4">⚠️</p>
        <p className="text-xl text-sw-text mb-4">{error || 'Alert not found'}</p>
        <Button onClick={() => navigate(-1)}>Go Back</Button>
      </div>
    );
  }

  const style = getAlertStyle(alert.severity);
  const icon = getAlertIcon(alert.event);
  const remaining = formatRemainingTime(alert.expires);

  return (
    <div className="p-6 space-y-6 max-w-4xl mx-auto">
      <div>
        <Button variant="ghost" size="sm" onClick={() => navigate(-1)} className="mb-4">
          ← Back
        </Button>

        <div className="flex items-start gap-4 mb-4">
          <span className="text-5xl flex-shrink-0">{icon}</span>
          <div className="flex-1">
            <div className="flex items-start gap-3 mb-2">
              <h1 className="text-3xl font-bold text-sw-text flex-1">{alert.event}</h1>
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
            <p className="text-sw-muted">{alert.sender}</p>
          </div>
        </div>
      </div>

      {/* Headline */}
      <Card style={{ backgroundColor: style.bg, borderColor: style.border }}>
        <h2 className="text-xl font-semibold mb-2" style={{ color: style.text }}>
          {alert.headline}
        </h2>
        <div className="flex flex-wrap gap-4 text-sm" style={{ color: style.text }}>
          <div>
            <span className="opacity-70">Status:</span> {alert.status}
          </div>
          <div>
            <span className="opacity-70">Urgency:</span> {alert.urgency}
          </div>
          <div>
            <span className="opacity-70">Certainty:</span> {alert.certainty}
          </div>
          <div>
            <span className="opacity-70">Expires:</span> {remaining}
          </div>
        </div>
      </Card>

      {/* Description */}
      <Card>
        <h2 className="text-xl font-semibold text-sw-text mb-3">Description</h2>
        <p className="text-sw-text whitespace-pre-wrap">{alert.description}</p>
      </Card>

      {/* Instructions */}
      {alert.instruction && (
        <Card>
          <h2 className="text-xl font-semibold text-sw-text mb-3">Safety Instructions</h2>
          <p className="text-sw-text whitespace-pre-wrap">{alert.instruction}</p>
        </Card>
      )}

      {/* Affected Areas */}
      <Card>
        <h2 className="text-xl font-semibold text-sw-text mb-3">Affected Areas</h2>
        <p className="text-sw-text">{alert.areaDesc}</p>
      </Card>

      {/* Timing */}
      <Card>
        <h2 className="text-xl font-semibold text-sw-text mb-3">Timing</h2>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <div className="text-sw-muted mb-1">Effective</div>
            <div className="text-sw-text">
              {new Date(alert.onset).toLocaleString('en-US', {
                weekday: 'short',
                month: 'short',
                day: 'numeric',
                hour: 'numeric',
                minute: '2-digit',
              })}
            </div>
          </div>
          <div>
            <div className="text-sw-muted mb-1">Expires</div>
            <div className="text-sw-text">
              {new Date(alert.expires).toLocaleString('en-US', {
                weekday: 'short',
                month: 'short',
                day: 'numeric',
                hour: 'numeric',
                minute: '2-digit',
              })}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
