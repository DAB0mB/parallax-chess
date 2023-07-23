import { createContext, useContext, useMemo } from 'react';

export const theme = {
  blackPiece: '#000',
  whitePiece: '#fff',
  lightChecker: '#ffcf9f',
  darkChecker: '#d18b47',
  axis: '#fff',
  selection: '#008000',
} satisfies Record<string, string | number>;

export const ThemeContext = createContext(theme);

export function useTheme() {
  return useContext(ThemeContext);
}

export function useThemeCssVars() {
  const theme = useTheme();

  return useMemo(() => {
    const style: Record<string, unknown> = {};

    Object.entries(theme).forEach(([key, value]) => {
      style[`--${key}`] = value;
    });

    return style;
  }, [theme]);
}
