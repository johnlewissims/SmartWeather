import React from 'react';
import { useAppState } from '../../context';

export function MobileTopBar() {
  const { state, dispatch } = useAppState();

  return (
    <header className="flex items-center justify-between h-14 px-4 border-b border-sw-border bg-sw-bg flex-shrink-0">
      {/* Menu button - opens sidebar */}
      <button
        onClick={() => dispatch({ type: 'TOGGLE_SIDEBAR' })}
        className="p-2 hover:bg-sw-surface rounded-lg transition-colors"
        aria-label="Toggle menu"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="3" y1="12" x2="21" y2="12" />
          <line x1="3" y1="6" x2="21" y2="6" />
          <line x1="3" y1="18" x2="21" y2="18" />
        </svg>
      </button>

      {/* App title */}
      <h1 className="text-lg font-semibold text-sw-accent">SmartWeather</h1>

      {/* Info button - opens right panel */}
      <button
        onClick={() => dispatch({ type: 'TOGGLE_RIGHT_PANEL' })}
        className="p-2 hover:bg-sw-surface rounded-lg transition-colors"
        aria-label="Toggle info panel"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="16" x2="12" y2="12" />
          <line x1="12" y1="8" x2="12.01" y2="8" />
        </svg>
      </button>
    </header>
  );
}
