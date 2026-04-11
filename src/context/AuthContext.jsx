import { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../lib/api.js';
import { AuthContext } from './auth-context.js';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loadings, setLoadings] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const navigate = useNavigate();

  const clearAuthStorage = useCallback(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('quiz_answers');
    localStorage.removeItem('quiz_result');
  }, []);

  const logout = useCallback(
    (redirectTo = '/') => {
      clearAuthStorage();
      setUser(null);
      setAuthenticated(false);

      if (redirectTo) {
        navigate(redirectTo, { replace: true });
      }
    },
    [clearAuthStorage, navigate]
  );

  const checkAuth = useCallback(async () => {
    setLoadings(true);
    const token = localStorage.getItem('token');

    if (!token) {
      setAuthenticated(false);
      setUser(null);
      setLoadings(false);
      return false;
    }

    try {
      const res = await api.get('/auth/verify/me', {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.data?.status === 'success') {
        setUser(res.data.data);
        setAuthenticated(true);
        return true;
      } else {
        throw new Error('Invalid token format');
      }
    } catch (e) {
      console.error('Auth Error:', e.response?.data?.message || e.message);
      logout('/');
      return false;
    } finally {
      setLoadings(false);
    }
  }, [logout]);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    const responseInterceptor = api.interceptors.response.use(
      (response) => response,
      (error) => {
        const status = error?.response?.status;
        const hasToken = Boolean(localStorage.getItem('token'));
        const requestUrl = error?.config?.url || '';

        if (status === 401 && hasToken && !requestUrl.includes('/auth/verify/me')) {
          logout('/login');
        }

        return Promise.reject(error);
      }
    );

    return () => {
      api.interceptors.response.eject(responseInterceptor);
    };
  }, [logout]);

  const value = useMemo(
    () => ({
      user,
      loadings,
      authenticated,
      logout,
      refreshAuth: checkAuth,
    }),
    [user, loadings, authenticated, logout, checkAuth]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
