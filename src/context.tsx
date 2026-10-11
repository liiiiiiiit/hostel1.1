import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { User } from './types';
import { t } from './i18n';
import { getCurrentUser, initializeStore } from './store';

interface AppContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  t: (key: string) => string;
  dir: 'rtl';
}

const AppContext = createContext<AppContextType>({
  user: null,
  setUser: () => {},
  t: (key: string) => key,
  dir: 'rtl',
});

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    initializeStore();
    const savedUser = getCurrentUser();
    if (savedUser) setUser(savedUser);
    
    // Always set RTL for Persian
    document.documentElement.lang = 'fa';
    document.documentElement.dir = 'rtl';
  }, []);

  return (
    <AppContext.Provider value={{ user, setUser, t, dir: 'rtl' }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}
