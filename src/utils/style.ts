import { CSSProperties } from 'react';

export function withVars(vars: Record<string, unknown>) {
  const cssVars: Record<string, unknown> = {};

  for (const key in vars) {
    const cssKey = `--${key}`;
    cssVars[cssKey] = vars[key];
  }

  return cssVars as CSSProperties;
}
