import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Leaf, Menu, X, Settings } from "lucide-react";
import { Button } from "./ui/button";
import { useAuth } from "../contexts/AuthContext";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { path: "/", label: "Inicio" },
    { path: "/hierbas", label: "Directorio" },
    { path: "/recetas", label: "Recetas" },
    { path: "/beneficios", label: "Beneficios" }
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/90 backdrop-blur-md shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center space-x-2 text-emerald-700 hover:text-emerald-800 transition-colors"
          >
            <Leaf className="h-8 w-8" />
            <span className="text-xl font-bold">Natura Revista</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-sm font-medium transition-all duration-200 hover:text-emerald-600 relative ${
                  location.pathname === item.path
                    ? "text-emerald-700"
                    : "text-gray-700"
                }`}
              >
                {item.label}
                {location.pathname === item.path && (
                  <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-emerald-600 rounded-full" />
                )}
              </Link>
            ))}
            
            {/* Admin Access */}
            {isAuthenticated ? (
              <Link
                to="/admin"
                className="flex items-center space-x-1 text-sm font-medium text-emerald-700 hover:text-emerald-800 transition-colors"
              >
                <Settings className="h-4 w-4" />
                <span>Admin</span>
              </Link>
            ) : (
              <Link
                to="/admin/login"
                className="flex items-center space-x-1 text-sm font-medium text-gray-600 hover:text-emerald-600 transition-colors"
              >
                <Settings className="h-4 w-4" />
                <span>Admin</span>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white/95 backdrop-blur-md rounded-lg mt-2 py-4 px-4 shadow-lg">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`block py-2 text-sm font-medium transition-colors ${
                  location.pathname === item.path
                    ? "text-emerald-700"
                    : "text-gray-700 hover:text-emerald-600"
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            
            {/* Mobile Admin Access */}
            <Link
              to={isAuthenticated ? "/admin" : "/admin/login"}
              className="flex items-center space-x-2 py-2 text-sm font-medium text-emerald-700 hover:text-emerald-800 transition-colors border-t border-gray-200 mt-2 pt-4"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Settings className="h-4 w-4" />
              <span>Panel Admin</span>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;