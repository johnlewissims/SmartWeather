import React from 'react';
import { BrandHeader } from './BrandHeader';
import { LocalTimeClock } from './LocalTimeClock';
import { CitySearchForm } from './CitySearchForm';
import { NavigationMenu } from './NavigationMenu';
import { StatusPanel } from './StatusPanel';

export function Sidebar() {
  return (
    <div className="flex flex-col h-full">
      <BrandHeader />
      <LocalTimeClock />

      <div className="px-4 py-3">
        <CitySearchForm />
      </div>

      <NavigationMenu />

      <div className="mt-auto">
        <StatusPanel />
      </div>
    </div>
  );
}
