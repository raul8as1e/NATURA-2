import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import HerbDirectory from "./pages/HerbDirectory";
import Recipes from "./pages/Recipes";
import Benefits from "./pages/Benefits";
import AdminDashboard from "./pages/AdminDashboard";
import AdminLogin from "./components/AdminLogin";
import Navbar from "./components/Navbar";
import { Toaster } from "./components/ui/toaster";
import { AuthProvider, useAuth } from "./contexts/AuthContext";

// Componente protegido para rutas de admin
const ProtectedAdminRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-emerald-600"></div>
      </div>
    );
  }

  return isAuthenticated ? children : <AdminLogin />;
};

// Componente principal de la aplicación
const AppContent = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="App min-h-screen bg-gradient-to-br from-green-50 to-emerald-50">
      <BrowserRouter>
        <Routes>
          {/* Rutas públicas */}
          <Route
            path="/"
            element={
              <>
                <Navbar />
                <HomePage />
              </>
            }
          />
          <Route
            path="/hierbas"
            element={
              <>
                <Navbar />
                <HerbDirectory />
              </>
            }
          />
          <Route
            path="/recetas"
            element={
              <>
                <Navbar />
                <Recipes />
              </>
            }
          />
          <Route
            path="/beneficios"
            element={
              <>
                <Navbar />
                <Benefits />
              </>
            }
          />
          
          {/* Rutas de administración */}
          <Route
            path="/admin/login"
            element={<AdminLogin />}
          />
          <Route
            path="/admin"
            element={
              <ProtectedAdminRoute>
                <AdminDashboard />
              </ProtectedAdminRoute>
            }
          />
        </Routes>
        <Toaster />
      </BrowserRouter>
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;