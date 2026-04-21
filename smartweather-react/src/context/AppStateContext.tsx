import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { AppState, City, HourlyData, Alert, ViewType, AccessibilityMode } from '../types';

// Initial state
const initialState: AppState = {
  city: null,
  hourly: [],
  alerts: [],
  view: 'overview',
  expandedForecastDay: null,
  sidebarOpen: false,
  rightPanelOpen: false,
  units: 'Imperial',
  theme: 'dark',
  a11y: 'none',
  largeText: false,
  highContrast: false,
  notifications: true,
  autoRefresh: true,
  refreshInterval: 10,
  loading: false,
  error: null,
  lastUpdated: null,
  radarLayer: 'reflectivity',
  radarOpacity: 0.7,
  searchQuery: '',
  searchResults: [],
};

// Action types
type AppAction =
  | { type: 'SET_CITY'; payload: City }
  | { type: 'UPDATE_CITY_DATA'; payload: Partial<City> }
  | { type: 'SET_HOURLY'; payload: HourlyData[] }
  | { type: 'SET_ALERTS'; payload: Alert[] }
  | { type: 'SET_VIEW'; payload: ViewType }
  | { type: 'SET_EXPANDED_FORECAST_DAY'; payload: number | null }
  | { type: 'TOGGLE_SIDEBAR' }
  | { type: 'TOGGLE_RIGHT_PANEL' }
  | { type: 'SET_UNITS'; payload: 'Imperial' | 'Metric' }
  | { type: 'SET_THEME'; payload: 'dark' | 'light' }
  | { type: 'SET_A11Y'; payload: AccessibilityMode }
  | { type: 'SET_LARGE_TEXT'; payload: boolean }
  | { type: 'SET_HIGH_CONTRAST'; payload: boolean }
  | { type: 'SET_NOTIFICATIONS'; payload: boolean }
  | { type: 'SET_AUTO_REFRESH'; payload: boolean }
  | { type: 'SET_REFRESH_INTERVAL'; payload: number }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_LAST_UPDATED'; payload: Date }
  | { type: 'SET_RADAR_LAYER'; payload: 'reflectivity' | 'satellite' | 'temperature' }
  | { type: 'SET_RADAR_OPACITY'; payload: number }
  | { type: 'SET_SEARCH_QUERY'; payload: string }
  | { type: 'SET_SEARCH_RESULTS'; payload: any[] }
  | { type: 'CLOSE_PANELS' };

// Reducer
function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'SET_CITY':
      return { ...state, city: action.payload, error: null };

    case 'UPDATE_CITY_DATA':
      return {
        ...state,
        city: state.city ? { ...state.city, ...action.payload } : null,
      };

    case 'SET_HOURLY':
      return { ...state, hourly: action.payload };

    case 'SET_ALERTS':
      return { ...state, alerts: action.payload };

    case 'SET_VIEW':
      return { ...state, view: action.payload };

    case 'SET_EXPANDED_FORECAST_DAY':
      return { ...state, expandedForecastDay: action.payload };

    case 'TOGGLE_SIDEBAR':
      return { ...state, sidebarOpen: !state.sidebarOpen };

    case 'TOGGLE_RIGHT_PANEL':
      return { ...state, rightPanelOpen: !state.rightPanelOpen };

    case 'SET_UNITS':
      return { ...state, units: action.payload };

    case 'SET_THEME':
      return { ...state, theme: action.payload };

    case 'SET_A11Y':
      return { ...state, a11y: action.payload };

    case 'SET_LARGE_TEXT':
      return { ...state, largeText: action.payload };

    case 'SET_HIGH_CONTRAST':
      return { ...state, highContrast: action.payload };

    case 'SET_NOTIFICATIONS':
      return { ...state, notifications: action.payload };

    case 'SET_AUTO_REFRESH':
      return { ...state, autoRefresh: action.payload };

    case 'SET_REFRESH_INTERVAL':
      return { ...state, refreshInterval: action.payload };

    case 'SET_LOADING':
      return { ...state, loading: action.payload };

    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false };

    case 'SET_LAST_UPDATED':
      return { ...state, lastUpdated: action.payload };

    case 'SET_RADAR_LAYER':
      return { ...state, radarLayer: action.payload };

    case 'SET_RADAR_OPACITY':
      return { ...state, radarOpacity: action.payload };

    case 'SET_SEARCH_QUERY':
      return { ...state, searchQuery: action.payload };

    case 'SET_SEARCH_RESULTS':
      return { ...state, searchResults: action.payload };

    case 'CLOSE_PANELS':
      return { ...state, sidebarOpen: false, rightPanelOpen: false };

    default:
      return state;
  }
}

// Context
interface AppStateContextType {
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
}

const AppStateContext = createContext<AppStateContextType | undefined>(undefined);

// Provider
interface AppStateProviderProps {
  children: ReactNode;
}

export function AppStateProvider({ children }: AppStateProviderProps) {
  const [state, dispatch] = useReducer(appReducer, initialState, (initial) => {
    // Load from localStorage
    try {
      const saved = localStorage.getItem('smartweather-state');
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          ...initial,
          units: parsed.units || initial.units,
          theme: parsed.theme || initial.theme,
          a11y: parsed.a11y || initial.a11y,
          largeText: parsed.largeText || initial.largeText,
          highContrast: parsed.highContrast || initial.highContrast,
          notifications: parsed.notifications ?? initial.notifications,
          autoRefresh: parsed.autoRefresh ?? initial.autoRefresh,
          refreshInterval: parsed.refreshInterval || initial.refreshInterval,
        };
      }
    } catch (error) {
      console.error('Failed to load state from localStorage:', error);
    }
    return initial;
  });

  // Persist preferences to localStorage
  useEffect(() => {
    try {
      const toSave = {
        units: state.units,
        theme: state.theme,
        a11y: state.a11y,
        largeText: state.largeText,
        highContrast: state.highContrast,
        notifications: state.notifications,
        autoRefresh: state.autoRefresh,
        refreshInterval: state.refreshInterval,
      };
      localStorage.setItem('smartweather-state', JSON.stringify(toSave));
    } catch (error) {
      console.error('Failed to save state to localStorage:', error);
    }
  }, [
    state.units,
    state.theme,
    state.a11y,
    state.largeText,
    state.highContrast,
    state.notifications,
    state.autoRefresh,
    state.refreshInterval,
  ]);

  return (
    <AppStateContext.Provider value={{ state, dispatch }}>
      {children}
    </AppStateContext.Provider>
  );
}

// Hook
export function useAppState() {
  const context = useContext(AppStateContext);
  if (context === undefined) {
    throw new Error('useAppState must be used within an AppStateProvider');
  }
  return context;
}
