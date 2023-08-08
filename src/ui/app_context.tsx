import { createState } from '@/events';
import { createContext, useContext } from 'react';

export const enum RenderMode {
  '2D' = '2D',
  '3D' = '3D'
};

export class App {
  readonly renderMode = createState<RenderMode>(RenderMode['2D']);
}

export const AppContext = createContext<App | null>(null);

export function useApp() {
  const app = useContext(AppContext);
  if (!app) {
    throw new Error('App was not provided');
  }

  return app;
}
