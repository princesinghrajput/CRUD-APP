// PrivateRoute.js
import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PrivateRoute = ({ element, ...props }) => {
  const { user } = useAuth();

  return user ? <Route {...props} element={element} /> : <Navigate to="/login" />;
};

export default PrivateRoute;
