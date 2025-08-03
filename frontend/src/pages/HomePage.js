import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronRight, Leaf, Sparkles, BookOpen } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import MagazineFlip from "../components/MagazineFlip";

const HomePage = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const features = [
    {
      icon: <Leaf className="h-8 w-8 text-emerald-600" />,
      title: "Directorio de Hierbas",
      description: "Explora nuestra extensa colección de plantas medicinales con información detallada sobre cada una.",
      link: "/hierbas"
    },
    {
      icon: <BookOpen className="h-8 w-8 text-emerald-600" />,
      title: "Recetas Naturales",
      description: "Descubre preparaciones tradicionales y modernas para aprovechar el poder curativo de la naturaleza.",
      link: "/recetas"
    },
    {
      icon: <Sparkles className="h-8 w-8 text-emerald-600" />,
      title: "Beneficios y Propiedades",
      description: "Conoce las propiedades medicinales y beneficios respaldados por la sabiduría ancestral.",
      link: "/beneficios"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/20 via-green-800/10 to-teal-900/20" />
        
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${3 + Math.random() * 4}s`
              }}
            >
              <Leaf 
                className="text-emerald-300/20 transform rotate-12" 
                size={16 + Math.random() * 24}
              />
            </div>
          ))}
        </div>

        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <div
            className={`transform transition-all duration-1000 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }`}
          >
            <h1 className="text-5xl md:text-7xl font-bold text-emerald-800 mb-6">
              Natura
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600">
                Revista
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-2xl mx-auto">
              Descubre el poder curativo de la naturaleza a través de nuestra revista virtual interactiva
            </p>
            <Button
              asChild
              size="lg"
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 text-lg rounded-full transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <Link to="/hierbas">
                Explorar Revista
                <ChevronRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Magazine Preview Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-emerald-800 mb-4">
              Experimenta la Revista Virtual
            </h2>
            <p className="text-xl text-gray-600">
              Navega de manera fluida a través de nuestro contenido interactivo
            </p>
          </div>
          <MagazineFlip />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-white/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-emerald-800 mb-4">
              Explora Nuestras Secciones
            </h2>
            <p className="text-xl text-gray-600">
              Todo lo que necesitas saber sobre hierbas curativas
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer border-0 bg-white"
              >
                <CardContent className="p-8 text-center">
                  <div className="mb-6 group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-emerald-800 mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 mb-6">
                    {feature.description}
                  </p>
                  <Button
                    asChild
                    variant="outline"
                    className="border-emerald-600 text-emerald-600 hover:bg-emerald-600 hover:text-white"
                  >
                    <Link to={feature.link}>
                      Explorar
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-emerald-900 text-white py-12">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center mb-4">
            <Leaf className="h-8 w-8 mr-2" />
            <span className="text-2xl font-bold">Natura Revista</span>
          </div>
          <p className="text-emerald-200">
            Conectando con la sabiduría ancestral de las plantas medicinales
          </p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;