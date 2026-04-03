import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../lib/api.js';

export default function useAuth() {
  const [user, setUser] = useState(null);
  const [loadings, setLoadings] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const navigate = useNavigate();

  const logout = useCallback(() => {
      localStorage.clear();
      setUser(null);
      setAuthenticated(false);
      
      if (navigate) navigate('/');
    }, [navigate]);

  useEffect(() => {
    async function checkAuth() {
      const token = localStorage.getItem("token");
      
      if (!token) {
        setAuthenticated(false);
        setLoadings(false);
        return;
      }

      try {
        const res = await api.get("/auth/verify/me", {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        if (res.data?.status === "success") {
          setUser(res.data.data);
          setAuthenticated(true);
        } else {
          throw new Error("Invalid token format");
        }
      } catch (e) {
        console.error("Auth Error:", e.response?.data?.message || e.message);
        logout();
      } finally {
        setLoadings(false);
      }
    }

    checkAuth();
  }, [logout]);

  return { user, loadings, authenticated, logout };
}