import React from 'react';
import { useAppState } from '../../context';
import { ViewType } from '../../types';
import { VIEW_TITLES } from '../../utils';

interface NavItemProps {
  view: ViewType;
  label: string;
  icon: string;
  current: boolean;
  onClick: () => void;
}

function NavItem({ view, label, icon, current, onClick }: NavItemProps) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-all duration-200 ${
        current
          ? 'bg-sw-accent bg-opacity-10 text-sw-accent border-l-4 border-sw-accent'
          : 'text-sw-text hover:bg-sw-surface border-l-4 border-transparent'
      }`}
    >
      <span className="text-xl">{icon}</span>
      <span className="font-medium">{label}</span>
    </button>
  );
}

export function NavigationMenu() {
  const { state, dispatch } = useAppState();

  const handleNavigate = (view: ViewType) => {
    dispatch({ type: 'SET_VIEW', payload: view });
    // Close mobile panels
    dispatch({ type: 'CLOSE_PANELS' });
  };

  const navItems: Array<{ view: ViewType; icon: string }> = [
    { view: 'overview', icon: '📊' },
    { view: 'hourly', icon: '⏰' },
    { view: 'forecast', icon: '📅' },
    { view: 'radar', icon: '🗺️' },
    { view: 'settings', icon: '⚙️' },
  ];

  return (
    <nav className="py-4 border-b border-sw-border">
      <div className="space-y-1">
        {navItems.map(({ view, icon }) => (
          <NavItem
            key={view}
            view={view}
            label={VIEW_TITLES[view]}
            icon={icon}
            current={state.view === view}
            onClick={() => handleNavigate(view)}
          />
        ))}
      </div>
    </nav>
  );
}
