import React, { createContext, useContext, useState } from 'react';

interface UserPreferences {
  theme: 'light' | 'dark';
  language: string;
}

interface UserPreferencesContextType {
  preferences: UserPreferences;
  updatePreferences: (newPreferences: Partial<UserPreferences>) => void;
}

const defaultPreferences: UserPreferences = {
  theme: 'light',
  language: 'en',
};

const UserPreferencesContext = createContext<UserPreferencesContextType | undefined>(undefined);

export function UserPreferencesProvider({ children }: { children: React.ReactNode }) {
  const [preferences, setPreferences] = useState<UserPreferences>(defaultPreferences);

  const updatePreferences = (newPreferences: Partial<UserPreferences>) => {
    setPreferences(prev => ({
      ...prev,
      ...newPreferences,
    }));
  };

  return (
    <UserPreferencesContext.Provider value={{ preferences, updatePreferences }}>
      {children}
    </UserPreferencesContext.Provider>
  );
}

export function useUserPreferences() {
  const context = useContext(UserPreferencesContext);
  if (context === undefined) {
    throw new Error('useUserPreferences must be used within a UserPreferencesProvider');
  }
  return context;
} 