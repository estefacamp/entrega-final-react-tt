import React, { createContext, useState, useContext, useEffect } from 'react';
import { logearG as logearGmail } from '../auth/firebase';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [admin, setAdmin] = useState(false);

  const login = (email) => {
    localStorage.setItem('authToken', `fake-token-${email}`);
    setUser(email);
    if (email === "admin@gmail.com") {
      setAdmin(true);
    } else {
      setAdmin(false);
    }
    console.log("Login hecho. User:", email, "Admin:", email === "admin@gmail.com");
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    setUser(null);
    setAdmin(false);
    console.log("Logout. User:", null, "Admin:", false);
  };

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      const email = token.replace('fake-token-', '');
      setUser(email);
      if (email === "admin@gmail.com") {
        setAdmin(true);
      } else {
        setAdmin(false);
      }
      console.log("Verificación localStorage. User:", email, "Admin:", email === "admin@gmail.com");
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, admin, login, logout, logearGmail }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuthContext = () => useContext(AuthContext);
