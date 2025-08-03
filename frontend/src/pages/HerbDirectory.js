import React, { useState, useEffect } from "react";
import { Search, Filter, Leaf } from "lucide-react";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { mockHerbs } from "../data/mockData";

const HerbDirectory = () => {
  const [herbs, setHerbs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBenefit, setSelectedBenefit] = useState("");
  const [filteredHerbs, setFilteredHerbs] = useState([]);

  useEffect(() => {
    // Simular carga de datos
    setHerbs(mockHerbs);
    setFilteredHerbs(mockHerbs);
  }, []);

  useEffect(() => {
    const filtered = herbs.filter(herb => {
      const matchesSearch = herb.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           herb.scientificName.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesBenefit = selectedBenefit === "" || 
                            herb.benefits.some(benefit => 
                              benefit.toLowerCase().includes(selectedBenefit.toLowerCase())
                            );
      return matchesSearch && matchesBenefit;
    });
    setFilteredHerbs(filtered);
  }, [searchTerm, selectedBenefit, herbs]);

  const allBenefits = [...new Set(herbs.flatMap(herb => herb.benefits))];

  return (
    <div className="min-h-screen pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-emerald-800 mb-4">
            Directorio de Hierbas
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Explora nuestra completa base de datos de plantas medicinales con información detallada sobre cada una
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  placeholder="Buscar hierbas por nombre o nombre científico..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Filter className="text-gray-500 h-5 w-5" />
              <select
                value={selectedBenefit}
                onChange={(e) => setSelectedBenefit(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              >
                <option value="">Todos los beneficios</option>
                {allBenefits.map(benefit => (
                  <option key={benefit} value={benefit}>{benefit}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredHerbs.map((herb) => (
            <Card
              key={herb.id}
              className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 overflow-hidden"
            >
              <div className="relative overflow-hidden">
                <img
                  src={herb.image}
                  alt={herb.name}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  <Badge className="bg-emerald-600 text-white">
                    <Leaf className="w-3 h-3 mr-1" />
                    Medicinal
                  </Badge>
                </div>
              </div>
              
              <CardHeader>
                <CardTitle className="text-emerald-800">{herb.name}</CardTitle>
                <p className="text-sm text-gray-500 italic">{herb.scientificName}</p>
              </CardHeader>
              
              <CardContent>
                <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                  {herb.description}
                </p>
                
                <div className="mb-4">
                  <h4 className="font-semibold text-emerald-700 mb-2">Beneficios:</h4>
                  <div className="flex flex-wrap gap-1">
                    {herb.benefits.map((benefit, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {benefit}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div className="mb-4">
                  <h4 className="font-semibold text-emerald-700 mb-2">Usos:</h4>
                  <p className="text-sm text-gray-600">{herb.uses}</p>
                </div>
                
                {herb.precautions && (
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                    <h4 className="font-semibold text-yellow-800 mb-1 text-sm">Precauciones:</h4>
                    <p className="text-xs text-yellow-700">{herb.precautions}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredHerbs.length === 0 && (
          <div className="text-center py-12">
            <Leaf className="mx-auto h-16 w-16 text-gray-300 mb-4" />
            <h3 className="text-lg font-medium text-gray-600 mb-2">
              No se encontraron hierbas
            </h3>
            <p className="text-gray-500">
              Intenta ajustar los filtros de búsqueda
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default HerbDirectory;