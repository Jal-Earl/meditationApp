import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { Platform } from 'react-native';

type ThemeMode = 'light' | 'dark';

type StoredUser = {
  username: string;
  email: string;
  password: string;
};

type SessionUser = {
  username: string;
  email: string;
};

type AppStorage = {
  registeredUser: StoredUser | null;
  currentUser: SessionUser | null;
  favorites: string[];
  reminders: string[];
  theme: ThemeMode;
};

type AppContextValue = {
  loading: boolean;
  theme: ThemeMode;
  registeredUser: StoredUser | null;
  currentUser: SessionUser | null;
  favorites: string[];
  reminders: string[];
  registerUser: (user: StoredUser) => Promise<void>;
  loginUser: (username: string, password: string) => Promise<boolean>;
  logoutUser: () => Promise<void>;
  toggleFavorite: (id: string) => void;
  addReminder: (date: string) => void;
  removeReminder: (date: string) => void;
  toggleTheme: () => void;
};

const STORAGE_KEY = 'meditation-app-storage-v1';

// Storage abstraction for cross-platform support
const storage = {
  async getItem(key: string): Promise<string | null> {
    try {
      if (Platform.OS === 'web') {
        return localStorage.getItem(key);
      }
      return await AsyncStorage.getItem(key);
    } catch {
      return null;
    }
  },
  async setItem(key: string, value: string): Promise<void> {
    try {
      if (Platform.OS === 'web') {
        localStorage.setItem(key, value);
      } else {
        await AsyncStorage.setItem(key, value);
      }
    } catch (error) {
      console.warn('Storage error:', error);
    }
  },
};

const defaultState: AppStorage = {
  registeredUser: null,
  currentUser: null,
  favorites: [],
  reminders: [],
  theme: 'light',
};

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [registeredUser, setRegisteredUser] = useState<StoredUser | null>(null);
  const [currentUser, setCurrentUser] = useState<SessionUser | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [reminders, setReminders] = useState<string[]>([]);
  const [theme, setTheme] = useState<ThemeMode>('light');

  useEffect(() => {
    const hydrate = async () => {
      try {
        const raw = await storage.getItem(STORAGE_KEY);
        if (!raw) {
          setLoading(false);
          return;
        }

        const parsed: AppStorage = JSON.parse(raw);
        setRegisteredUser(parsed.registeredUser ?? null);
        setCurrentUser(parsed.currentUser ?? null);
        setFavorites(parsed.favorites ?? []);
        setReminders(parsed.reminders ?? []);
        setTheme(parsed.theme ?? 'light');
      } catch {
        setRegisteredUser(defaultState.registeredUser);
        setCurrentUser(defaultState.currentUser);
        setFavorites(defaultState.favorites);
        setReminders(defaultState.reminders);
        setTheme(defaultState.theme);
      } finally {
        setLoading(false);
      }
    };

    hydrate();
  }, []);

  useEffect(() => {
    if (loading) {
      return;
    }

    const persist = async () => {
      const payload: AppStorage = {
        registeredUser,
        currentUser,
        favorites,
        reminders,
        theme,
      };
      await storage.setItem(STORAGE_KEY, JSON.stringify(payload));
    };

    persist();
  }, [registeredUser, currentUser, favorites, reminders, theme, loading]);

  const value = useMemo<AppContextValue>(
    () => ({
      loading,
      theme,
      registeredUser,
      currentUser,
      favorites,
      reminders,
      registerUser: async (user) => {
        setRegisteredUser(user);
        setCurrentUser({ username: user.username, email: user.email });
      },
      loginUser: async (username, password) => {
        if (!registeredUser) {
          return false;
        }
        const isValid =
          registeredUser.username.trim().toLowerCase() === username.trim().toLowerCase() &&
          registeredUser.password === password;

        if (isValid) {
          setCurrentUser({ username: registeredUser.username, email: registeredUser.email });
          return true;
        }

        return false;
      },
      logoutUser: async () => {
        setCurrentUser(null);
      },
      toggleFavorite: (id) => {
        setFavorites((previous) =>
          previous.includes(id) ? previous.filter((item) => item !== id) : [...previous, id],
        );
      },
      addReminder: (date) => {
        setReminders((previous) => {
          if (previous.includes(date)) {
            return previous;
          }
          return [...previous, date].sort();
        });
      },
      removeReminder: (date) => {
        setReminders((previous) => previous.filter((item) => item !== date));
      },
      toggleTheme: () => {
        setTheme((previous) => (previous === 'light' ? 'dark' : 'light'));
      },
    }),
    [loading, theme, registeredUser, currentUser, favorites, reminders],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within AppProvider');
  }
  return context;
}
