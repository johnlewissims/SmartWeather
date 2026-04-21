import React from 'react';

export function BrandHeader() {
  return (
    <div className="px-4 py-6 border-b border-sw-border">
      <h1 className="text-2xl font-bold text-sw-accent flex items-center gap-2">
        <span className="text-3xl">🌦️</span>
        SmartWeather
      </h1>
      <p className="text-sm text-sw-muted mt-1">Real-time weather intelligence</p>
    </div>
  );
}
