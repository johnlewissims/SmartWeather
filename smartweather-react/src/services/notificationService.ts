import { Alert } from '../types';
import { getAlertIcon } from '../utils';

export type NotificationPermission = 'granted' | 'denied' | 'default';

export async function requestNotificationPermission(): Promise<NotificationPermission> {
  if (!('Notification' in window)) {
    console.warn('Browser does not support notifications');
    return 'denied';
  }

  if (Notification.permission === 'granted') {
    return 'granted';
  }

  if (Notification.permission === 'denied') {
    return 'denied';
  }

  try {
    const permission = await Notification.requestPermission();
    return permission as NotificationPermission;
  } catch (error) {
    console.error('Failed to request notification permission:', error);
    return 'denied';
  }
}

export function getNotificationPermission(): NotificationPermission {
  if (!('Notification' in window)) {
    return 'denied';
  }
  return Notification.permission as NotificationPermission;
}

export function sendAlertNotification(alert: Alert): void {
  if (!('Notification' in window)) {
    console.warn('Browser does not support notifications');
    return;
  }

  if (Notification.permission !== 'granted') {
    console.warn('Notification permission not granted');
    return;
  }

  try {
    const icon = getAlertIcon(alert.event);
    const notification = new Notification(alert.event, {
      body: alert.headline,
      icon: '/icon-192.png',
      badge: '/icon-192.png',
      tag: alert.id,
      requireInteraction: alert.severity.toLowerCase() === 'extreme',
      data: {
        alertId: alert.id,
        severity: alert.severity,
      },
    });

    notification.onclick = () => {
      window.focus();
      notification.close();
      // Navigate to alert detail - will be handled by app routing
      window.location.hash = `#/alert/${alert.id}`;
    };
  } catch (error) {
    console.error('Failed to send notification:', error);
  }
}

export function sendWeatherNotification(title: string, body: string, options?: NotificationOptions): void {
  if (!('Notification' in window)) {
    console.warn('Browser does not support notifications');
    return;
  }

  if (Notification.permission !== 'granted') {
    console.warn('Notification permission not granted');
    return;
  }

  try {
    const notification = new Notification(title, {
      body,
      icon: '/icon-192.png',
      badge: '/icon-192.png',
      ...options,
    });

    notification.onclick = () => {
      window.focus();
      notification.close();
    };
  } catch (error) {
    console.error('Failed to send notification:', error);
  }
}

export function isNotificationSupported(): boolean {
  return 'Notification' in window;
}
