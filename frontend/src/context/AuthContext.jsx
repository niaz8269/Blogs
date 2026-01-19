import { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      api.get('/user')
        .then(({ data }) => setUser(data))
        .catch(() => {
          localStorage.removeItem('token');
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email, password) => {
    // Get CSRF cookie first
    await api.get('/sanctum/csrf-cookie').catch(() => {});
    
    const { data } = await api.post('/login', { email, password });
    localStorage.setItem('token', data.token);
    setUser(data.user);
    return data;
  };

  const register = async (name, email, password, password_confirmation) => {
    await api.get('/sanctum/csrf-cookie').catch(() => {});
    
    const { data } = await api.post('/register', {
      name,
      email,
      password,
      password_confirmation,
    });
    localStorage.setItem('token', data.token);
    setUser(data.user);
    return data;
  };

  const logout = async () => {
    try {
      await api.post('/logout');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      localStorage.removeItem('token');
      setUser(null);
    }
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    isAuthenticated: !!user,
    isAdmin: user?.role?.name === 'admin',
    isAuthor: user?.role?.name === 'author' || user?.role?.name === 'admin',
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
