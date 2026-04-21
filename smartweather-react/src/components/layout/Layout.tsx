import React, { ReactNode } from 'react';
import { useAppState } from '../../context';
import { useIsMobile } from '../../hooks';
import { MobileTopBar } from './MobileTopBar';
import { MobileBackdrop } from './MobileBackdrop';

interface LayoutProps {
  sidebar: ReactNode;
  main: ReactNode;
  rightPanel: ReactNode;
}

export function Layout({ sidebar, main, rightPanel }: LayoutProps) {
  const { state, dispatch } = useAppState();
  const isMobile = useIsMobile();

  const handleBackdropClick = () => {
    dispatch({ type: 'CLOSE_PANELS' });
  };

  if (isMobile) {
    return (
      <div className="flex flex-col h-screen bg-sw-bg text-sw-text overflow-hidden">
        <MobileTopBar />

        <main className="flex-1 overflow-y-auto">
          {main}
        </main>

        {/* Sidebar panel */}
        <div
          className={`fixed inset-y-0 left-0 w-[272px] bg-sw-bg border-r border-sw-border transform transition-transform duration-300 z-40 ${
            state.sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          {sidebar}
        </div>

        {/* Right panel */}
        <div
          className={`fixed inset-y-0 right-0 w-[344px] bg-sw-bg border-l border-sw-border transform transition-transform duration-300 z-40 ${
            state.rightPanelOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          {rightPanel}
        </div>

        {/* Backdrop */}
        {(state.sidebarOpen || state.rightPanelOpen) && (
          <MobileBackdrop onClick={handleBackdropClick} />
        )}
      </div>
    );
  }

  // Desktop layout
  return (
    <div className="flex h-screen bg-sw-bg text-sw-text overflow-hidden">
      {/* Sidebar */}
      <aside className="w-[272px] border-r border-sw-border overflow-y-auto flex-shrink-0">
        {sidebar}
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto">
        {main}
      </main>

      {/* Right panel */}
      <aside className="w-[344px] border-l border-sw-border overflow-y-auto flex-shrink-0">
        {rightPanel}
      </aside>
    </div>
  );
}
