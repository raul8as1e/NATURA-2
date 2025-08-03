import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import HerbDirectory from "./pages/HerbDirectory";
import Recipes from "./pages/Recipes";
import Benefits from "./pages/Benefits";
import Navbar from "./components/Navbar";
import { Toaster } from "./components/ui/toaster";

function App() {
  return (
    <div className="App min-h-screen bg-gradient-to-br from-green-50 to-emerald-50">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/hierbas" element={<HerbDirectory />} />
          <Route path="/recetas" element={<Recipes />} />
          <Route path="/beneficios" element={<Benefits />} />
        </Routes>
        <Toaster />
      </BrowserRouter>
    </div>
  );
}

export default App;