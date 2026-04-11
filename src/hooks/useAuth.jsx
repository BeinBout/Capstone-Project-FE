import { useContext } from 'react';
import { AuthContext } from '../context/auth-context.js';

export default function useAuth() {
  const auth = useContext(AuthContext);

  if (!auth) {
    throw new Error('useAuth harus digunakan di dalam AuthProvider');
  }

  return auth;
}