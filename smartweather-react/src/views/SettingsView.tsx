import React from 'react';
import { useAppState } from '../context';
import { Card, Button, Badge } from '../components/ui';
import { AccessibilityMode } from '../types';

export function SettingsView() {
  const { state, dispatch } = useAppState();

  const handleUnitsChange = (units: 'Imperial' | 'Metric') => {
    dispatch({ type: 'SET_UNITS', payload: units });
  };

  const handleThemeChange = (theme: 'dark' | 'light') => {
    dispatch({ type: 'SET_THEME', payload: theme });
  };

  const handleA11yChange = (mode: AccessibilityMode) => {
    dispatch({ type: 'SET_A11Y', payload: mode });
  };

  const handleLargeTextToggle = () => {
    dispatch({ type: 'SET_LARGE_TEXT', payload: !state.largeText });
  };

  const handleHighContrastToggle = () => {
    dispatch({ type: 'SET_HIGH_CONTRAST', payload: !state.highContrast });
  };

  const handleAutoRefreshToggle = () => {
    dispatch({ type: 'SET_AUTO_REFRESH', payload: !state.autoRefresh });
  };

  const handleRefreshIntervalChange = (interval: number) => {
    dispatch({ type: 'SET_REFRESH_INTERVAL', payload: interval });
  };

  return (
    <div className="p-6 space-y-6 max-w-4xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold text-sw-text mb-2">Settings</h1>
        <p className="text-sw-muted">Customize your SmartWeather experience</p>
      </div>

      {/* Units */}
      <Card>
        <h2 className="text-xl font-semibold text-sw-text mb-4">Units</h2>
        <div className="flex gap-3">
          <Button
            variant={state.units === 'Imperial' ? 'primary' : 'secondary'}
            onClick={() => handleUnitsChange('Imperial')}
          >
            Imperial (°F, mph)
          </Button>
          <Button
            variant={state.units === 'Metric' ? 'primary' : 'secondary'}
            onClick={() => handleUnitsChange('Metric')}
          >
            Metric (°C, km/h)
          </Button>
        </div>
      </Card>

      {/* Theme */}
      <Card>
        <h2 className="text-xl font-semibold text-sw-text mb-4">Theme</h2>
        <div className="flex gap-3">
          <Button
            variant={state.theme === 'dark' ? 'primary' : 'secondary'}
            onClick={() => handleThemeChange('dark')}
          >
            🌙 Dark
          </Button>
          <Button
            variant={state.theme === 'light' ? 'primary' : 'secondary'}
            onClick={() => handleThemeChange('light')}
          >
            ☀️ Light
          </Button>
        </div>
      </Card>

      {/* Accessibility */}
      <Card>
        <h2 className="text-xl font-semibold text-sw-text mb-4">Accessibility</h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-sw-text mb-2">
              Color Vision Mode
            </label>
            <div className="flex flex-wrap gap-2">
              {(['none', 'deut', 'prot', 'trit'] as AccessibilityMode[]).map((mode) => (
                <Button
                  key={mode}
                  variant={state.a11y === mode ? 'primary' : 'secondary'}
                  size="sm"
                  onClick={() => handleA11yChange(mode)}
                >
                  {mode === 'none' ? 'None' : mode === 'deut' ? 'Deuteranopia' : mode === 'prot' ? 'Protanopia' : 'Tritanopia'}
                </Button>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-medium text-sw-text">Large Text</div>
              <div className="text-xs text-sw-muted">Increase font sizes</div>
            </div>
            <Button
              variant={state.largeText ? 'primary' : 'secondary'}
              size="sm"
              onClick={handleLargeTextToggle}
            >
              {state.largeText ? 'ON' : 'OFF'}
            </Button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-medium text-sw-text">High Contrast</div>
              <div className="text-xs text-sw-muted">Enhance contrast for better visibility</div>
            </div>
            <Button
              variant={state.highContrast ? 'primary' : 'secondary'}
              size="sm"
              onClick={handleHighContrastToggle}
            >
              {state.highContrast ? 'ON' : 'OFF'}
            </Button>
          </div>
        </div>
      </Card>

      {/* Auto-Refresh */}
      <Card>
        <h2 className="text-xl font-semibold text-sw-text mb-4">Data Refresh</h2>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-medium text-sw-text">Auto-Refresh</div>
              <div className="text-xs text-sw-muted">Automatically update weather data</div>
            </div>
            <Button
              variant={state.autoRefresh ? 'primary' : 'secondary'}
              size="sm"
              onClick={handleAutoRefreshToggle}
            >
              {state.autoRefresh ? 'ON' : 'OFF'}
            </Button>
          </div>

          {state.autoRefresh && (
            <div>
              <label className="block text-sm font-medium text-sw-text mb-2">
                Refresh Interval
              </label>
              <div className="flex flex-wrap gap-2">
                {[5, 10, 15, 30].map((interval) => (
                  <Button
                    key={interval}
                    variant={state.refreshInterval === interval ? 'primary' : 'secondary'}
                    size="sm"
                    onClick={() => handleRefreshIntervalChange(interval)}
                  >
                    {interval} min
                  </Button>
                ))}
              </div>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
