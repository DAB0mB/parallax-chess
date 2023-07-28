import { createContext, useContext, useMemo } from 'react';

export type Theme = typeof light;

export const light = {
  background: '#eee',
  blackPiece: '#000',
  whitePiece: '#fff',
  lightChecker: '#ffcf9f',
  darkChecker: '#d18b47',
  axis: '#fff',
  availableMove: '#00ff00',
  selectedPiece: '#ffff00',
} satisfies Record<string, string>;

export const dark: Theme = {
  ...light,
  background: '#333',
  lightChecker: '#e8eaed',
  darkChecker: '#768191',
  availableMove: '#00ffff',
};

export const ThemeContext = createContext<Theme | null>(null);

export function useTheme() {
  const theme = useContext(ThemeContext);
  if (!theme) {
    throw new Error('Theme was not provided');
  }

  return theme;
}

export function useThemeCssVars(theme: Theme) {
  return useMemo(() => {
    const style: Record<string, unknown> = {};

    Object.entries(theme).forEach(([key, value]) => {
      style[`--${key}`] = value;
    });

    return style;
  }, [theme]);
}
