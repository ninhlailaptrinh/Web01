'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { User } from '@/types/user';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Kiểm tra session/token và lấy thông tin user
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      // Thêm API call kiểm tra auth ở đây
      setIsLoading(false);
    } catch (error) {
      setUser(null);
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    // Thêm API call đăng nhập ở đây
    const mockUser: User = {
      id: '1',
      email,
      name: 'Test User',
      role: 'user',
      createdAt: new Date()
    };
    setUser(mockUser);
  };

  const logout = () => {
    // Thêm API call đăng xuất ở đây
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
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