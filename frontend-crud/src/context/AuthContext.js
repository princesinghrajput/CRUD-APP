import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const storedAuth = localStorage.getItem('isAuthenticated');
    return storedAuth ? JSON.parse(storedAuth) : false;
  });

  const login = () => {
    setIsAuthenticated(true);
    localStorage.setItem('isAuthenticated', JSON.stringify(true));
    broadcastChange(true);
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('isAuthenticated');
    broadcastChange(false);
  };

  const broadcastChange = (value) => {
    // Broadcast the change to other tabs/windows
    localStorage.setItem('authChange', JSON.stringify(value));
  };

  useEffect(() => {
    const handleStorageChange = (event) => {
      if (event.key === 'authChange') {
        // Update the isAuthenticated state based on the broadcasted change
        setIsAuthenticated(JSON.parse(event.newValue));
      }
    };

    // Listen for changes in localStorage
    window.addEventListener('storage', handleStorageChange);

    return () => {
      // Remove the event listener when the component is unmounted
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  useEffect(() => {
    // Listen for changes in isAuthenticated and update localStorage
    localStorage.setItem('isAuthenticated', JSON.stringify(isAuthenticated));
  }, [isAuthenticated]);

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
