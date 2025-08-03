import React, { useState, useEffect } from "react";
import { Heart, Wind, Brain, Shield } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { mockBenefits } from "../data/mockData";

const Benefits = () => {
  const [benefits, setBenefits] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    setBenefits(mockBenefits);
  }, []);

  const getCategoryIcon = (category) => {
    switch (category) {
      case "Sistema Digestivo": return <Heart className="h-8 w-8 text-orange-600" />;
      case "Sistema Respiratorio": return <Wind className="h-8 w-8 text-blue-600" />;
      case "Sistema Nervioso": return <Brain className="h-8 w-8 text-purple-600" />;
      case "Cuidado de la Piel": return <Shield className="h-8 w-8 text-green-600" />;
      default: return <Heart className="h-8 w-8 text-emerald-600" />;
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case "Sistema Digestivo": return "from-orange-500 to-red-500";
      case "Sistema Respiratorio": return "from-blue-500 to-cyan-500";
      case "Sistema Nervioso": return "from-purple-500 to-pink-500";
      case "Cuidado de la Piel": return "from-green-500 to-emerald-500";
      default: return "from-emerald-500 to-teal-500";
    }
  };

  return (
    <div className="min-h-screen pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-emerald-800 mb-4">
            Beneficios y Propiedades
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Descubre cómo las plantas medicinales pueden beneficiar diferentes sistemas de tu cuerpo
          </p>
        </div>

        {selectedCategory ? (
          // Detailed Category View
          <div className="max-w-4xl mx-auto">
            <Button
              onClick={() => setSelectedCategory(null)}
              variant="outline"
              className="mb-6"
            >
              ← Volver a categorías
            </Button>
            
            <Card className="overflow-hidden">
              <div className="relative">
                <img
                  src={selectedCategory.image}
                  alt={selectedCategory.category}
                  className="w-full h-64 object-cover"
                />
                <div className={`absolute inset-0 bg-gradient-to-r ${getCategoryColor(selectedCategory.category)} opacity-80`} />
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex items-center gap-3 mb-2">
                    {getCategoryIcon(selectedCategory.category)}
                    <h1 className="text-3xl font-bold text-white">
                      {selectedCategory.category}
                    </h1>
                  </div>
                </div>
              </div>
              
              <CardContent className="p-8">
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                  {selectedCategory.description}
                </p>
                
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-semibold text-emerald-800 mb-4">
                      Hierbas Recomendadas
                    </h3>
                    <div className="space-y-3">
                      {selectedCategory.herbs.map((herb, index) => (
                        <div key={index} className="flex items-center p-3 bg-emerald-50 rounded-lg">
                          <div className="w-2 h-2 bg-emerald-600 rounded-full mr-3" />
                          <span className="font-medium text-emerald-800">{herb}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold text-emerald-800 mb-4">
                      Síntomas que Alivia
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedCategory.symptoms.map((symptom, index) => (
                        <Badge key={index} variant="secondary" className="text-sm py-2 px-3">
                          {symptom}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        ) : (
          // Categories Grid
          <div>
            <div className="grid md:grid-cols-2 gap-6 mb-12">
              {benefits.map((benefit) => (
                <Card
                  key={benefit.id}
                  className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer overflow-hidden"
                  onClick={() => setSelectedCategory(benefit)}
                >
                  <div className="relative">
                    <img
                      src={benefit.image}
                      alt={benefit.category}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-r ${getCategoryColor(benefit.category)} opacity-60 group-hover:opacity-70 transition-opacity`} />
                    <div className="absolute top-4 left-4">
                      {getCategoryIcon(benefit.category)}
                    </div>
                  </div>
                  
                  <CardHeader>
                    <CardTitle className="text-emerald-800 group-hover:text-emerald-600 transition-colors">
                      {benefit.category}
                    </CardTitle>
                  </CardHeader>
                  
                  <CardContent>
                    <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                      {benefit.description}
                    </p>
                    
                    <div className="mb-4">
                      <h4 className="font-semibold text-emerald-700 mb-2 text-sm">Hierbas principales:</h4>
                      <div className="flex flex-wrap gap-1">
                        {benefit.herbs.slice(0, 3).map((herb, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {herb}
                          </Badge>
                        ))}
                        {benefit.herbs.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{benefit.herbs.length - 3} más
                          </Badge>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-emerald-600 font-medium">
                        {benefit.symptoms.length} síntomas tratados
                      </span>
                      <span className="text-sm text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity">
                        Explorar →
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Info Section */}
            <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl p-8">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-emerald-800 mb-4">
                  ¿Sabías que...?
                </h2>
                <p className="text-gray-600 max-w-3xl mx-auto">
                  Las plantas medicinales han sido utilizadas durante más de 5,000 años y siguen siendo 
                  la base de muchos medicamentos modernos. La OMS estima que el 80% de la población 
                  mundial utiliza medicina tradicional basada en plantas.
                </p>
              </div>
              
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                  <div className="text-3xl font-bold text-emerald-600 mb-2">5,000+</div>
                  <p className="text-sm text-gray-600">Años de uso tradicional</p>
                </div>
                <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                  <div className="text-3xl font-bold text-emerald-600 mb-2">80%</div>
                  <p className="text-sm text-gray-600">Población mundial las usa</p>
                </div>
                <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                  <div className="text-3xl font-bold text-emerald-600 mb-2">40%</div>
                  <p className="text-sm text-gray-600">Medicamentos provienen de plantas</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Benefits;