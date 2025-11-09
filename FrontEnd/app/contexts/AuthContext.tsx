'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import * as authService from '@/services/authService';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
  avatar_url?: string; 
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  login: (credentials: any) => Promise<void>;
  register: (userData: any) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    try {
      const storedToken = localStorage.getItem('authToken');
      const storedUser = localStorage.getItem('user');
      
      if (storedToken && storedUser) {
        setToken(storedToken);
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("Failed to load auth state", error);
    }
    setIsLoading(false);
  }, []);

  const login = async (credentials: any) => {
    const data = await authService.login(credentials);
    setUser(data.user);
    setToken(data.token);
  };

  const register = async (userData: any) => {
    const data = await authService.register(userData);
    setUser(data.user);
    setToken(data.token);
  };

  const logout = async () => {
    await authService.logout();
    setUser(null);
    setToken(null);
    window.location.href = '/login'; 
  };

  return (
    <AuthContext.Provider value={{ user, token, isLoading, login, register, logout }}>
      {!isLoading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};