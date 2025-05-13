import React from 'react';
import { Navigate } from 'react-router-dom'; // Import Navigate
import { useAuth } from './auth-context'; // Hook untuk mendapatkan status autentikasi

const PrivateRoute = ({ element }) => {
  const { isAuthenticated } = useAuth(); // Ambil status autentikasi dari context

  // Jika tidak terautentikasi, arahkan ke halaman login
  return isAuthenticated ? element : <Navigate to="/login" replace />;
};

export default PrivateRoute;
