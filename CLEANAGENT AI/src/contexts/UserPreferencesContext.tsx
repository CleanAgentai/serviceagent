import React, { createContext, useContext, useEffect, useState, useCallback, useMemo } from 'react';
import { 
  UserPreferences, 
  defaultPreferences, 
  getUserPreferences, 
  setUserPreferences 
} from '../utils/storage';
import { StorageError, handleError } from '../utils/errors';

interface UserPreferencesContextType {
  preferences: UserPreferences;
  updatePreferences: (newPreferences: Partial<UserPreferences>) => void;
  resetPreferences: () => void;
  error: Error | null;
  clearError: () => void;
  isLoading: boolean;
}

const UserPreferencesContext = createContext<UserPreferencesContextType | undefined>(undefined);

const STORAGE_KEY = 'cleanagent_user_preferences';
const DEBOUNCE_SAVE_DELAY = 1000; // 1 second

export function UserPreferencesProvider({ children }: { children: React.ReactNode }) {
  const [preferences, setPreferences] = useState<UserPreferences>(defaultPreferences);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [saveTimeout, setSaveTimeout] = useState<NodeJS.Timeout | null>(null);

  // Load preferences on mount
  useEffect(() => {
    const loadPreferences = () => {
      try {
        setIsLoading(true);
        const loaded = getUserPreferences();
        setPreferences(loaded);
        setError(null);
      } catch (err) {
        const error = handleError(err);
        console.error('Error loading preferences:', error);
        setError(error);
        // Keep default preferences on error
        setPreferences(defaultPreferences);
      } finally {
        setIsLoading(false);
      }
    };

    loadPreferences();

    // Cleanup any pending saves on unmount
    return () => {
      if (saveTimeout) {
        clearTimeout(saveTimeout);
      }
    };
  }, []);

  // Debounced save function
  const debouncedSave = useCallback((newPreferences: UserPreferences) => {
    if (saveTimeout) {
      clearTimeout(saveTimeout);
    }

    const timeoutId = setTimeout(() => {
      try {
        setUserPreferences(newPreferences);
        setError(null);
      } catch (err) {
        const error = new StorageError('Failed to save preferences', STORAGE_KEY);
        console.error('Error saving preferences:', error);
        setError(error);
      }
    }, DEBOUNCE_SAVE_DELAY);

    setSaveTimeout(timeoutId);
  }, [saveTimeout]);

  const updatePreferences = useCallback((newPreferences: Partial<UserPreferences>) => {
    setPreferences(prev => {
      const updated = { ...prev, ...newPreferences };
      debouncedSave(updated);
      return updated;
    });
  }, [debouncedSave]);

  const resetPreferences = useCallback(() => {
    try {
      setPreferences(defaultPreferences);
      setUserPreferences(defaultPreferences);
      setError(null);
    } catch (err) {
      const error = new StorageError('Failed to reset preferences', STORAGE_KEY);
      console.error('Error resetting preferences:', error);
      setError(error);
    }
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const value = useMemo(() => ({
    preferences,
    updatePreferences,
    resetPreferences,
    error,
    clearError,
    isLoading
  }), [preferences, updatePreferences, resetPreferences, error, clearError, isLoading]);

  return (
    <UserPreferencesContext.Provider value={value}>
      {children}
    </UserPreferencesContext.Provider>
  );
}

export function useUserPreferences() {
  const context = useContext(UserPreferencesContext);
  if (context === undefined) {
    throw new StorageError('useUserPreferences must be used within a UserPreferencesProvider');
  }
  return context;
}

// Utility hooks for specific preferences
export function useDashboardLayout() {
  const { preferences, updatePreferences, isLoading } = useUserPreferences();
  
  const updateLayout = useCallback((newLayout: string[]) => {
    updatePreferences({ dashboardLayout: newLayout });
  }, [updatePreferences]);

  return useMemo(() => ({
    layout: preferences.dashboardLayout,
    updateLayout,
    isLoading
  }), [preferences.dashboardLayout, updateLayout, isLoading]);
}

export function useNotificationPreferences() {
  const { preferences, updatePreferences, isLoading } = useUserPreferences();
  
  const toggleNotifications = useCallback(() => {
    updatePreferences({ notifications: !preferences.notifications });
  }, [preferences.notifications, updatePreferences]);

  const toggleEmailDigest = useCallback(() => {
    updatePreferences({ emailDigest: !preferences.emailDigest });
  }, [preferences.emailDigest, updatePreferences]);

  return useMemo(() => ({
    notifications: preferences.notifications,
    emailDigest: preferences.emailDigest,
    toggleNotifications,
    toggleEmailDigest,
    isLoading
  }), [
    preferences.notifications,
    preferences.emailDigest,
    toggleNotifications,
    toggleEmailDigest,
    isLoading
  ]);
}

export function useShortcutsPreference() {
  const { preferences, updatePreferences, isLoading } = useUserPreferences();
  
  const toggleShortcuts = useCallback(() => {
    updatePreferences({ shortcuts: !preferences.shortcuts });
  }, [preferences.shortcuts, updatePreferences]);

  return useMemo(() => ({
    shortcuts: preferences.shortcuts,
    toggleShortcuts,
    isLoading
  }), [preferences.shortcuts, toggleShortcuts, isLoading]);
} 