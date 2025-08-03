import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Credenciales del administrador (en producción esto debería estar en el backend)
  const ADMIN_CREDENTIALS = {
    username: "admin",
    password: "natura2024"
  };

  useEffect(() => {
    // Verificar si hay una sesión activa
    const authToken = localStorage.getItem("natura_admin_token");
    if (authToken === "authenticated") {
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, []);

  const login = (username, password) => {
    if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
      setIsAuthenticated(true);
      localStorage.setItem("natura_admin_token", "authenticated");
      return { success: true };
    }
    return { success: false, error: "Credenciales incorrectas" };
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("natura_admin_token");
  };

  const value = {
    isAuthenticated,
    isLoading,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};