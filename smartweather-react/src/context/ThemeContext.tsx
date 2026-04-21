import React, { createContext, useContext, useEffect, ReactNode } from 'react';
import { useAppState } from './AppStateContext';

interface ThemeContextType {
  applyTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const { state } = useAppState();

  const applyTheme = () => {
    const root = document.documentElement;

    // Apply theme class
    if (state.theme === 'light') {
      root.classList.add('theme-light');
      root.classList.remove('theme-dark');
    } else {
      root.classList.add('theme-dark');
      root.classList.remove('theme-light');
    }

    // Apply accessibility mode (SVG filter)
    root.classList.remove('a11y-deut', 'a11y-prot', 'a11y-trit');
    if (state.a11y !== 'none') {
      root.classList.add(`a11y-${state.a11y}`);
    }

    // Apply large text
    if (state.largeText) {
      root.classList.add('large-text');
    } else {
      root.classList.remove('large-text');
    }

    // Apply high contrast
    if (state.highContrast) {
      root.classList.add('high-contrast');
    } else {
      root.classList.remove('high-contrast');
    }
  };

  useEffect(() => {
    applyTheme();
  }, [state.theme, state.a11y, state.largeText, state.highContrast]);

  return (
    <ThemeContext.Provider value={{ applyTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
