import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import CreateUser from './CreateUser';
import UpdateUser from './UpdateUser';
import Login from './auth/Login';
import Signup from './auth/Signup';
import User from './User';

function App() {
  const { isAuthenticated } = useAuth();

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={isAuthenticated ? <User /> : <Navigate to="/login" />}
          />
          <Route path="/signup" element={<Signup />} />
          <Route path="/user" element={isAuthenticated ? <User /> : <Navigate to="/login" />} />
          <Route
            path="/login"
            element={!isAuthenticated ? <Login /> : <Navigate to="/user" />}
          />
          <Route
            path="/create"
            element={isAuthenticated ? <CreateUser /> : <Navigate to="/login" />}
          />
          <Route
            path="/update/:id"
            element={isAuthenticated ? <UpdateUser /> : <Navigate to="/login" />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
