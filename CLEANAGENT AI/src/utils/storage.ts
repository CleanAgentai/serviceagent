const STORAGE_PREFIX = 'cleanagent_';

interface StorageItem<T> {
  value: T;
  timestamp: number;
  expiry?: number; // in milliseconds
}

export function setStorageItem<T>(key: string, value: T, expiry?: number): void {
  const item: StorageItem<T> = {
    value,
    timestamp: Date.now(),
    expiry
  };

  try {
    localStorage.setItem(STORAGE_PREFIX + key, JSON.stringify(item));
  } catch (error) {
    console.error('Error saving to localStorage:', error);
  }
}

export function getStorageItem<T>(key: string): T | null {
  try {
    const item = localStorage.getItem(STORAGE_PREFIX + key);
    if (!item) return null;

    const parsed: StorageItem<T> = JSON.parse(item);

    // Check if item has expired
    if (parsed.expiry && Date.now() - parsed.timestamp > parsed.expiry) {
      localStorage.removeItem(STORAGE_PREFIX + key);
      return null;
    }

    return parsed.value;
  } catch (error) {
    console.error('Error reading from localStorage:', error);
    return null;
  }
}

export function removeStorageItem(key: string): void {
  try {
    localStorage.removeItem(STORAGE_PREFIX + key);
  } catch (error) {
    console.error('Error removing from localStorage:', error);
  }
}

export function clearStorage(): void {
  try {
    Object.keys(localStorage).forEach(key => {
      if (key.startsWith(STORAGE_PREFIX)) {
        localStorage.removeItem(key);
      }
    });
  } catch (error) {
    console.error('Error clearing localStorage:', error);
  }
}

// User preferences interface
export interface UserPreferences {
  sidebarOpen: boolean;
  dashboardLayout: string[];
  shortcuts: boolean;
  notifications: boolean;
  emailDigest: boolean;
}

// Default user preferences
export const defaultPreferences: UserPreferences = {
  sidebarOpen: true,
  dashboardLayout: ['quickStats', 'recentActivity', 'automations', 'recommendations'],
  shortcuts: true,
  notifications: true,
  emailDigest: true
};

// User preferences storage key
const PREFERENCES_KEY = 'preferences';

// User preferences functions
export function getUserPreferences(): UserPreferences {
  return {
    ...defaultPreferences,
    ...getStorageItem<UserPreferences>(PREFERENCES_KEY)
  };
}

export function setUserPreferences(preferences: Partial<UserPreferences>): void {
  const current = getUserPreferences();
  setStorageItem(PREFERENCES_KEY, {
    ...current,
    ...preferences
  });
}

// Session storage for temporary data
export function setSessionItem<T>(key: string, value: T): void {
  try {
    sessionStorage.setItem(STORAGE_PREFIX + key, JSON.stringify(value));
  } catch (error) {
    console.error('Error saving to sessionStorage:', error);
  }
}

export function getSessionItem<T>(key: string): T | null {
  try {
    const item = sessionStorage.getItem(STORAGE_PREFIX + key);
    return item ? JSON.parse(item) : null;
  } catch (error) {
    console.error('Error reading from sessionStorage:', error);
    return null;
  }
}

export function removeSessionItem(key: string): void {
  try {
    sessionStorage.removeItem(STORAGE_PREFIX + key);
  } catch (error) {
    console.error('Error removing from sessionStorage:', error);
  }
}

export function clearSessionStorage(): void {
  try {
    Object.keys(sessionStorage).forEach(key => {
      if (key.startsWith(STORAGE_PREFIX)) {
        sessionStorage.removeItem(key);
      }
    });
  } catch (error) {
    console.error('Error clearing sessionStorage:', error);
  }
} 