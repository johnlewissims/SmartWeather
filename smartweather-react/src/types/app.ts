import { City, HourlyData } from './weather';
import { Alert } from './alerts';

export interface AppState {
  // Weather data
  city: City | null;
  hourly: HourlyData[];
  alerts: Alert[];

  // UI state
  view: ViewType;
  expandedForecastDay: number | null;
  sidebarOpen: boolean;
  rightPanelOpen: boolean;

  // User preferences
  units: 'Imperial' | 'Metric';
  theme: 'dark' | 'light';
  a11y: AccessibilityMode;
  largeText: boolean;
  highContrast: boolean;
  notifications: boolean;
  autoRefresh: boolean;
  refreshInterval: number;

  // App state
  loading: boolean;
  error: string | null;
  lastUpdated: Date | null;

  // Radar
  radarLayer: RadarLayer;
  radarOpacity: number;

  // Search
  searchQuery: string;
  searchResults: any[];
}

export type ViewType = 'overview' | 'hourly' | 'forecast' | 'radar' | 'settings';
export type RadarLayer = 'reflectivity' | 'satellite' | 'temperature';
export type AccessibilityMode = 'none' | 'deut' | 'prot' | 'trit';
