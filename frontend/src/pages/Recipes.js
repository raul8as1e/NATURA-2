import React, { useState, useEffect } from "react";
import { Clock, Users, ChefHat, Star } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { mockRecipes } from "../data/mockData";

const Recipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  useEffect(() => {
    setRecipes(mockRecipes);
  }, []);

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "Fácil": return "bg-green-100 text-green-800";
      case "Intermedio": return "bg-yellow-100 text-yellow-800";
      case "Avanzado": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-emerald-800 mb-4">
            Recetas Naturales
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Descubre preparaciones tradicionales y modernas para aprovechar el poder curativo de las plantas
          </p>
        </div>

        {selectedRecipe ? (
          // Detailed Recipe View
          <div className="max-w-4xl mx-auto">
            <Button
              onClick={() => setSelectedRecipe(null)}
              variant="outline"
              className="mb-6"
            >
              ← Volver a recetas
            </Button>
            
            <Card className="overflow-hidden">
              <div className="relative">
                <img
                  src={selectedRecipe.image}
                  alt={selectedRecipe.name}
                  className="w-full h-64 object-cover"
                />
                <div className="absolute bottom-4 left-4 right-4">
                  <h1 className="text-3xl font-bold text-white mb-2 drop-shadow-lg">
                    {selectedRecipe.name}
                  </h1>
                  <div className="flex items-center gap-4 text-white">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span className="text-sm">{selectedRecipe.time}</span>
                    </div>
                    <Badge className={getDifficultyColor(selectedRecipe.difficulty)}>
                      {selectedRecipe.difficulty}
                    </Badge>
                  </div>
                </div>
              </div>
              
              <CardContent className="p-8">
                <div className="mb-6">
                  <h3 className="text-xl font-semibold text-emerald-800 mb-2">Beneficios</h3>
                  <p className="text-gray-600">{selectedRecipe.benefits}</p>
                </div>
                
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-semibold text-emerald-800 mb-4 flex items-center">
                      <ChefHat className="h-5 w-5 mr-2" />
                      Ingredientes
                    </h3>
                    <ul className="space-y-2">
                      {selectedRecipe.ingredients.map((ingredient, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-emerald-600 mr-2">•</span>
                          <span className="text-gray-700">{ingredient}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold text-emerald-800 mb-4">
                      Instrucciones
                    </h3>
                    <ol className="space-y-3">
                      {selectedRecipe.instructions.map((instruction, index) => (
                        <li key={index} className="flex items-start">
                          <span className="bg-emerald-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5 flex-shrink-0">
                            {index + 1}
                          </span>
                          <span className="text-gray-700">{instruction}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        ) : (
          // Recipe Grid
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recipes.map((recipe) => (
              <Card
                key={recipe.id}
                className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer overflow-hidden"
                onClick={() => setSelectedRecipe(recipe)}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={recipe.image}
                    alt={recipe.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 right-4">
                    <Badge className={getDifficultyColor(recipe.difficulty)}>
                      {recipe.difficulty}
                    </Badge>
                  </div>
                </div>
                
                <CardHeader>
                  <CardTitle className="text-emerald-800 group-hover:text-emerald-600 transition-colors">
                    {recipe.name}
                  </CardTitle>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{recipe.time}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span>4.8</span>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <p className="text-gray-600 mb-4 text-sm">
                    {recipe.benefits}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-emerald-600 font-medium">
                      {recipe.ingredients.length} ingredientes
                    </span>
                    <Button
                      size="sm"
                      variant="outline"
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      Ver receta
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Tips Section */}
        <div className="mt-16 bg-emerald-50 rounded-xl p-8">
          <h2 className="text-2xl font-bold text-emerald-800 mb-4 text-center">
            Consejos para Preparaciones Herbales
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-emerald-600 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                <ChefHat className="h-6 w-6" />
              </div>
              <h3 className="font-semibold text-emerald-800 mb-2">Calidad de Ingredientes</h3>
              <p className="text-sm text-gray-600">
                Utiliza siempre hierbas frescas o secas de alta calidad para obtener mejores resultados.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-emerald-600 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                <Clock className="h-6 w-6" />
              </div>
              <h3 className="font-semibold text-emerald-800 mb-2">Tiempos de Infusión</h3>
              <p className="text-sm text-gray-600">
                Respeta los tiempos recomendados para extraer todas las propiedades medicinales.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-emerald-600 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                <Star className="h-6 w-6" />
              </div>
              <h3 className="font-semibold text-emerald-800 mb-2">Almacenamiento</h3>
              <p className="text-sm text-gray-600">
                Guarda las preparaciones en recipientes de vidrio oscuro para preservar sus propiedades.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Recipes;