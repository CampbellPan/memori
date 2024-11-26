import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';

interface AuthContextType {
  isLoggedIn: boolean;
  login: (token: string) => void;
  logout: () => void;

  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
    setIsLoading(false); // 加载完成
  }, []);


  useEffect(() => {
    // 检查 localStorage 是否存在 token
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token); // 如果 token 存在，设置 isLoggedIn 为 true
  }, []);
  // 连续两个感叹号 !! 是将一个值转换为布尔值的常用方式

  const login = (token: string) => {
    localStorage.setItem('token', token); // 将 token 存储到 localStorage
    setIsLoggedIn(true); // 更新状态为已登录
  };

  const logout = () => {
    localStorage.removeItem('token'); // 清除 token
    setIsLoggedIn(false); // 更新状态为未登录
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

// 创建一个自定义 Hook 用于访问 AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
