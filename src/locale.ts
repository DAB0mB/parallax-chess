import { createContext, useContext } from 'react';

export const locale = {
  'winner': (name) => `${name} wins`,
  'play again': 'play again?',
} satisfies Record<string, string | ((...models: string[]) => string)>;

export const LocaleContext = createContext(locale);

export function useLocale() {
  return useContext(LocaleContext);
}
