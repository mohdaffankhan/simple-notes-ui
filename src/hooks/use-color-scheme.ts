import React, { createContext, useContext, useMemo, useState, type ReactNode } from 'react';
import { useColorScheme as useRNColorScheme } from 'react-native';

type AppColorScheme = 'light' | 'dark';
type ColorSchemePreference = AppColorScheme | 'system';

type ColorSchemeContextValue = {
  colorScheme: AppColorScheme;
  toggleColorScheme: () => void;
};

const ColorSchemeContext = createContext<ColorSchemeContextValue | null>(null);

function normalizeSystemColorScheme(scheme: ReturnType<typeof useRNColorScheme>): AppColorScheme {
  return scheme === 'dark' ? 'dark' : 'light';
}

export function ColorSchemeProvider({ children }: { children: ReactNode }) {
  const systemScheme = useRNColorScheme();
  const [preference, setPreference] = useState<ColorSchemePreference>('system');
  const normalizedSystemScheme = normalizeSystemColorScheme(systemScheme);

  const value = useMemo<ColorSchemeContextValue>(() => {
    const colorScheme = preference === 'system' ? normalizedSystemScheme : preference;
    return {
      colorScheme,
      toggleColorScheme: () => {
        setPreference((currentPreference) => {
          const currentScheme =
            currentPreference === 'system' ? normalizedSystemScheme : currentPreference;
          return currentScheme === 'dark' ? 'light' : 'dark';
        });
      },
    };
  }, [normalizedSystemScheme, preference]);

  return React.createElement(ColorSchemeContext.Provider, { value }, children);
}

function useColorSchemeContext() {
  const context = useContext(ColorSchemeContext);
  if (!context) {
    throw new Error('useColorScheme must be used within ColorSchemeProvider');
  }
  return context;
}

export function useColorScheme() {
  return useColorSchemeContext().colorScheme;
}

export function useColorSchemePreference() {
  return useColorSchemeContext();
}
