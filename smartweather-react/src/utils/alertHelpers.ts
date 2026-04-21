import { Alert } from '../types';

export function getAlertStyle(severity: string): { bg: string; border: string; text: string } {
  switch (severity.toLowerCase()) {
    case 'extreme':
      return { bg: '#7f1d1d', border: '#dc2626', text: '#fca5a5' };
    case 'severe':
      return { bg: '#7c2d12', border: '#ea580c', text: '#fdba74' };
    case 'moderate':
      return { bg: '#713f12', border: '#ca8a04', text: '#fde047' };
    case 'minor':
      return { bg: '#164e63', border: '#0891b2', text: '#67e8f9' };
    default:
      return { bg: 'var(--sw-surface)', border: 'var(--sw-border)', text: 'var(--sw-text)' };
  }
}

export function isCriticalAlert(alert: Alert): boolean {
  return (
    alert.severity.toLowerCase() === 'extreme' ||
    (alert.severity.toLowerCase() === 'severe' && alert.urgency.toLowerCase() === 'immediate')
  );
}

export function formatRemainingTime(expiresIso: string): string {
  const now = new Date().getTime();
  const expires = new Date(expiresIso).getTime();
  const diff = expires - now;

  if (diff <= 0) return 'Expired';

  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

  if (hours > 48) {
    const days = Math.floor(hours / 24);
    return `${days}d`;
  }
  if (hours > 0) {
    return minutes > 0 ? `${hours}h ${minutes}m` : `${hours}h`;
  }
  return `${minutes}m`;
}

export function getSeverityRank(severity: string): number {
  const map: Record<string, number> = {
    extreme: 4,
    severe: 3,
    moderate: 2,
    minor: 1,
    unknown: 0,
  };
  return map[severity.toLowerCase()] || 0;
}

export function getUrgencyRank(urgency: string): number {
  const map: Record<string, number> = {
    immediate: 4,
    expected: 3,
    future: 2,
    past: 1,
    unknown: 0,
  };
  return map[urgency.toLowerCase()] || 0;
}

export function getCertaintyRank(certainty: string): number {
  const map: Record<string, number> = {
    observed: 4,
    likely: 3,
    possible: 2,
    unlikely: 1,
    unknown: 0,
  };
  return map[certainty.toLowerCase()] || 0;
}

export function getEventPriority(event: string): number {
  const highPriority = [
    'tornado',
    'hurricane',
    'extreme wind',
    'flash flood',
    'severe thunderstorm',
    'blizzard',
  ];
  const mediumPriority = [
    'winter storm',
    'flood',
    'high wind',
    'heat',
    'fire weather',
  ];

  const eventLower = event.toLowerCase();
  if (highPriority.some((p) => eventLower.includes(p))) return 3;
  if (mediumPriority.some((p) => eventLower.includes(p))) return 2;
  return 1;
}

export function calculateAlertScore(alert: Alert): number {
  const severityScore = getSeverityRank(alert.severity) * 100;
  const urgencyScore = getUrgencyRank(alert.urgency) * 10;
  const certaintyScore = getCertaintyRank(alert.certainty) * 5;
  const eventScore = getEventPriority(alert.event) * 20;

  return severityScore + urgencyScore + certaintyScore + eventScore;
}

export function sortAlerts(alerts: Alert[]): Alert[] {
  return [...alerts].sort((a, b) => {
    const scoreA = calculateAlertScore(a);
    const scoreB = calculateAlertScore(b);
    if (scoreB !== scoreA) return scoreB - scoreA;
    return new Date(a.onset).getTime() - new Date(b.onset).getTime();
  });
}

export function getAlertIcon(event: string): string {
  const eventLower = event.toLowerCase();
  if (eventLower.includes('tornado')) return '🌪️';
  if (eventLower.includes('hurricane') || eventLower.includes('tropical')) return '🌀';
  if (eventLower.includes('flood')) return '🌊';
  if (eventLower.includes('fire')) return '🔥';
  if (eventLower.includes('winter') || eventLower.includes('blizzard') || eventLower.includes('ice')) return '❄️';
  if (eventLower.includes('thunder') || eventLower.includes('storm')) return '⛈️';
  if (eventLower.includes('wind')) return '💨';
  if (eventLower.includes('heat')) return '🌡️';
  if (eventLower.includes('fog')) return '🌫️';
  if (eventLower.includes('snow')) return '🌨️';
  if (eventLower.includes('rain')) return '🌧️';
  return '⚠️';
}

export function truncateDescription(desc: string, maxLength: number): string {
  if (desc.length <= maxLength) return desc;
  return desc.slice(0, maxLength - 3) + '...';
}
