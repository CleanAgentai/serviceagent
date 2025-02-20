import React, { createContext, useContext, useState, useEffect } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  user: any | null;
  login: (credentials: { email: string; password: string }) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<any | null>(null);

  useEffect(() => {
    // Check for existing session
    const checkAuth = async () => {
      try {
        // Add your session validation logic here
        const token = localStorage.getItem('auth_token');
        if (token) {
          // Validate token with your backend
          setIsAuthenticated(true);
          // Set user data
          setUser({ /* user data */ });
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        setIsAuthenticated(false);
        setUser(null);
      }
    };

    checkAuth();
  }, []);

  const login = async (credentials: { email: string; password: string }) => {
    try {
      // Add your login logic here
      // Make API call to your authentication endpoint
      // const response = await api.login(credentials);
      
      // Store token
      // localStorage.setItem('auth_token', response.token);
      
      setIsAuthenticated(true);
      // setUser(response.user);
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('auth_token');
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 