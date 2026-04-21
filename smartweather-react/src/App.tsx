import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppStateProvider, ThemeProvider, useAppState } from './context';
import { Layout } from './components/layout';
import { Sidebar } from './components/sidebar';
import { RightPanel } from './components/rightpanel';
import { ToastContainer } from './components/notifications';
import {
  OverviewView,
  Hourly24View,
  ForecastView,
  RadarView,
  SettingsView,
  AlertDetailView,
} from './views';

function ViewRouter() {
  const { state } = useAppState();

  // Map view state to components
  const getViewComponent = () => {
    switch (state.view) {
      case 'overview':
        return <OverviewView />;
      case 'hourly':
        return <Hourly24View />;
      case 'forecast':
        return <ForecastView />;
      case 'radar':
        return <RadarView />;
      case 'settings':
        return <SettingsView />;
      default:
        return <OverviewView />;
    }
  };

  return (
    <Routes>
      <Route path="/" element={getViewComponent()} />
      <Route path="/alert/:alertId" element={<AlertDetailView />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

function AppContent() {
  const { state } = useAppState();

  // Load default city on first mount if none selected
  useEffect(() => {
    if (!state.city) {
      // You could load a default city here or from localStorage
      // For now, we'll just show the welcome screen
    }
  }, []);

  return (
    <>
      <Layout
        sidebar={<Sidebar />}
        main={<ViewRouter />}
        rightPanel={<RightPanel />}
      />
      <ToastContainer />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppStateProvider>
        <ThemeProvider>
          <AppContent />
        </ThemeProvider>
      </AppStateProvider>
    </BrowserRouter>
  );
}

export default App;
