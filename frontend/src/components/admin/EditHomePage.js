import React, { useState, useEffect } from "react";
import { Save, RotateCcw, Eye } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { toast } from "../../hooks/use-toast";

const EditHomePage = () => {
  const [homeData, setHomeData] = useState({
    title: "Natura",
    subtitle: "Revista",
    description: "Descubre el poder curativo de la naturaleza a través de nuestra revista virtual interactiva",
    buttonText: "Explorar Revista",
    heroTitle: "Experimenta la Revista Virtual",
    heroSubtitle: "Navega de manera fluida a través de nuestro contenido interactivo"
  });

  const [originalData, setOriginalData] = useState({});
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    // Cargar datos guardados del localStorage
    const savedData = localStorage.getItem("natura_homepage_data");
    if (savedData) {
      const parsed = JSON.parse(savedData);
      setHomeData(parsed);
      setOriginalData(parsed);
    } else {
      setOriginalData(homeData);
    }
  }, []);

  useEffect(() => {
    // Detectar cambios
    const changed = JSON.stringify(homeData) !== JSON.stringify(originalData);
    setHasChanges(changed);
  }, [homeData, originalData]);

  const handleInputChange = (field, value) => {
    setHomeData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    // Guardar en localStorage (en producción sería una llamada al backend)
    localStorage.setItem("natura_homepage_data", JSON.stringify(homeData));
    setOriginalData(homeData);
    
    toast({
      title: "¡Cambios guardados!",
      description: "La página principal se ha actualizado correctamente.",
    });
  };

  const handleReset = () => {
    setHomeData(originalData);
    toast({
      title: "Cambios descartados",
      description: "Se han restaurado los valores originales.",
    });
  };

  const handlePreview = () => {
    // Abrir la página principal en una nueva pestaña
    window.open('/', '_blank');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Editar Página Principal
          </h2>
          <p className="text-gray-600">
            Personaliza el contenido de la página de inicio
          </p>
        </div>
        
        <div className="flex items-center space-x-3">
          <Button
            onClick={handlePreview}
            variant="outline"
            size="sm"
          >
            <Eye className="h-4 w-4 mr-2" />
            Vista Previa
          </Button>
          
          {hasChanges && (
            <>
              <Button
                onClick={handleReset}
                variant="outline"
                size="sm"
              >
                <RotateCcw className="h-4 w-4 mr-2" />
                Descartar
              </Button>
              
              <Button
                onClick={handleSave}
                size="sm"
                className="bg-emerald-600 hover:bg-emerald-700"
              >
                <Save className="h-4 w-4 mr-2" />
                Guardar Cambios
              </Button>
            </>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Hero Section */}
        <Card>
          <CardHeader>
            <CardTitle>Sección Principal (Hero)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                Título Principal
              </label>
              <Input
                value={homeData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                placeholder="Natura"
              />
            </div>
            
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                Subtítulo
              </label>
              <Input
                value={homeData.subtitle}
                onChange={(e) => handleInputChange('subtitle', e.target.value)}
                placeholder="Revista"
              />
            </div>
            
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                Descripción
              </label>
              <Textarea
                value={homeData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="Descripción principal..."
                rows={3}
              />
            </div>
            
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                Texto del Botón
              </label>
              <Input
                value={homeData.buttonText}
                onChange={(e) => handleInputChange('buttonText', e.target.value)}
                placeholder="Explorar Revista"
              />
            </div>
          </CardContent>
        </Card>

        {/* Magazine Section */}
        <Card>
          <CardHeader>
            <CardTitle>Sección de Revista Virtual</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                Título de la Revista
              </label>
              <Input
                value={homeData.heroTitle}
                onChange={(e) => handleInputChange('heroTitle', e.target.value)}
                placeholder="Experimenta la Revista Virtual"
              />
            </div>
            
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                Subtítulo de la Revista
              </label>
              <Textarea
                value={homeData.heroSubtitle}
                onChange={(e) => handleInputChange('heroSubtitle', e.target.value)}
                placeholder="Navega de manera fluida..."
                rows={2}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Vista Previa */}
      <Card>
        <CardHeader>
          <CardTitle>Vista Previa</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-gradient-to-br from-emerald-50 to-teal-50 p-8 rounded-lg text-center">
            <h1 className="text-4xl font-bold text-emerald-800 mb-4">
              {homeData.title}
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600">
                {homeData.subtitle}
              </span>
            </h1>
            <p className="text-lg text-gray-700 mb-6 max-w-2xl mx-auto">
              {homeData.description}
            </p>
            <div className="bg-emerald-600 text-white px-6 py-2 rounded-full inline-block">
              {homeData.buttonText}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EditHomePage;