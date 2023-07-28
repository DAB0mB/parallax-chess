import { createContext, useContext } from 'react';

export type Locale = typeof locale;

export const locale = {
  'you win': 'You win',
  'you loose': 'You loose'
} satisfies Record<string, string | ((...models: string[]) => string)>;

export const LocaleContext = createContext<Locale>(locale);

export function useLocale() {
  return useContext(LocaleContext);
}
