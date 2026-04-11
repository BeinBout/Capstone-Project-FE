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
    const token = localStorage.getItem('token');

    if (!token) {
      setAuthenticated(false);
      setUser(null);
      setLoadings(false);
      return;
    }

    try {
      const res = await api.get('/auth/verify/me', {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.data?.status === 'success') {
        setUser(res.data.data);
        setAuthenticated(true);
      } else {
        throw new Error('Invalid token format');
      }
    } catch (e) {
      console.error('Auth Error:', e.response?.data?.message || e.message);
      logout('/');
    } finally {
      setLoadings(false);
    }
  }, [logout]);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

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
