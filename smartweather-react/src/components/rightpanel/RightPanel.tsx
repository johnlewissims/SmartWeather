import React from 'react';
import { CurrentConditionsCard } from './CurrentConditionsCard';
import { AlertsPanel } from './AlertsPanel';
import { NotificationsCard } from './NotificationsCard';
import { LocationInfoCard } from './LocationInfoCard';

export function RightPanel() {
  return (
    <div className="flex flex-col h-full overflow-y-auto">
      <div className="p-4 space-y-4">
        <CurrentConditionsCard />
        <AlertsPanel />
        <NotificationsCard />
        <LocationInfoCard />
      </div>
    </div>
  );
}
