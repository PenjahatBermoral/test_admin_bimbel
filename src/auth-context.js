import React, { createContext, useState, useContext, useEffect } from 'react';

// Membuat Context untuk autentikasi
const AuthContext = createContext();

// Hook untuk mengakses autentikasi
export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  // Cek apakah sudah ada status autentikasi di localStorage
  const storedAuthStatus = localStorage.getItem('isAuthenticated') === 'true';

  const [isAuthenticated, setIsAuthenticated] = useState(storedAuthStatus);

  const login = () => {
    setIsAuthenticated(true);
    localStorage.setItem('isAuthenticated', 'true'); // Simpan status login di localStorage
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('isAuthenticated'); // Hapus status login dari localStorage
  };

  // Memastikan status autentikasi tetap terjaga pada refresh
  useEffect(() => {
    // Jika status autentikasi berubah, simpan di localStorage
    localStorage.setItem('isAuthenticated', isAuthenticated ? 'true' : 'false');
  }, [isAuthenticated]);

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
