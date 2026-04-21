import { useState, useEffect, useCallback } from 'react';
import {
  requestNotificationPermission,
  getNotificationPermission,
  isNotificationSupported,
  NotificationPermission,
} from '../services';

export function useNotifications() {
  const [permission, setPermission] = useState<NotificationPermission>(getNotificationPermission());
  const [supported, setSupported] = useState(isNotificationSupported());

  useEffect(() => {
    setPermission(getNotificationPermission());
    setSupported(isNotificationSupported());
  }, []);

  const requestPermission = useCallback(async () => {
    const result = await requestNotificationPermission();
    setPermission(result);
    return result;
  }, []);

  return {
    permission,
    supported,
    requestPermission,
    enabled: permission === 'granted',
  };
}
