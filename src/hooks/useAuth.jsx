import { useState, useEffect } from 'react';
import api from '../lib/api.js';

export default function useAuth() {
  const [user, setUser] = useState(null);
  const [loadings, setLoadings] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

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
        localStorage.removeItem("token"); 
        
        setAuthenticated(false);
        setUser(null);
      } finally {
        setLoadings(false);
      }
    }

    checkAuth();
  }, []);

  return { user, loadings, authenticated };
}