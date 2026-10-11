import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { User, Locale } from './types';
import { translations, getDirection } from './i18n';
import { getCurrentUser, getLocale, setLocale as saveLocale, initializeStore } from './store';

interface AppContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
  dir: 'ltr' | 'rtl';
}

const AppContext = createContext<AppContextType>({
  user: null,
  setUser: () => {},
  locale: 'en',
  setLocale: () => {},
  t: (key: string) => key,
  dir: 'ltr',
});

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [locale, setLocaleState] = useState<Locale>('en');

  useEffect(() => {
    initializeStore();
    const savedUser = getCurrentUser();
    if (savedUser) setUser(savedUser);
    const savedLocale = getLocale() as Locale;
    setLocaleState(savedLocale);
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = getDirection(locale);
  }, [locale]);

  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale);
    saveLocale(newLocale as string);
  }, []);

  const t = useCallback((key: string): string => {
    return translations[locale]?.[key] || translations.en[key] || key;
  }, [locale]);

  const dir = getDirection(locale);

  return (
    <AppContext.Provider value={{ user, setUser, locale, setLocale, t, dir }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}
