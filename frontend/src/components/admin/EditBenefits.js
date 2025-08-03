import React, { useState, useEffect } from "react";
import { Plus, Edit, Trash2, Save, X, Heart, Wind, Brain, Shield } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { toast } from "../../hooks/use-toast";
import { mockBenefits } from "../../data/mockData";

const EditBenefits = () => {
  const [benefits, setBenefits] = useState([]);
  const [editingBenefit, setEditingBenefit] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const emptyBenefit = {
    id: Date.now(),
    category: "",
    herbs: [],
    description: "",
    symptoms: [],
    image: ""
  };

  const categoryOptions = [
    "Sistema Digestivo",
    "Sistema Respiratorio", 
    "Sistema Nervioso",
    "Cuidado de la Piel",
    "Sistema Inmunitario",
    "Sistema Circulatorio"
  ];

  useEffect(() => {
    const savedBenefits = localStorage.getItem("natura_benefits_data");
    if (savedBenefits) {
      setBenefits(JSON.parse(savedBenefits));
    } else {
      setBenefits(mockBenefits);
    }
  }, []);

  const saveBenefits = (newBenefits) => {
    localStorage.setItem("natura_benefits_data", JSON.stringify(newBenefits));
    setBenefits(newBenefits);
  };

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

  const handleSaveBenefit = (benefitData) => {
    const herbsArray = typeof benefitData.herbs === 'string' 
      ? benefitData.herbs.split(',').map(h => h.trim()).filter(h => h.length > 0)
      : benefitData.herbs;

    const symptomsArray = typeof benefitData.symptoms === 'string'
      ? benefitData.symptoms.split(',').map(s => s.trim()).filter(s => s.length > 0)
      : benefitData.symptoms;

    const updatedBenefit = {
      ...benefitData,
      herbs: herbsArray,
      symptoms: symptomsArray
    };

    let newBenefits;
    if (editingBenefit && editingBenefit.id !== emptyBenefit.id) {
      newBenefits = benefits.map(benefit => 
        benefit.id === editingBenefit.id ? updatedBenefit : benefit
      );
      toast({
        title: "¡Categoría actualizada!",
        description: `${updatedBenefit.category} se ha actualizado correctamente.`,
      });
    } else {
      updatedBenefit.id = Date.now();
      newBenefits = [...benefits, updatedBenefit];
      toast({
        title: "¡Nueva categoría agregada!",
        description: `${updatedBenefit.category} se ha agregado a los beneficios.`,
      });
    }

    saveBenefits(newBenefits);
    setEditingBenefit(null);
    setIsDialogOpen(false);
  };

  const handleDeleteBenefit = (benefitId) => {
    const benefitToDelete = benefits.find(b => b.id === benefitId);
    const newBenefits = benefits.filter(benefit => benefit.id !== benefitId);
    saveBenefits(newBenefits);
    
    toast({
      title: "Categoría eliminada",
      description: `${benefitToDelete.category} se ha eliminado de los beneficios.`,
    });
  };

  const openEditDialog = (benefit = null) => {
    const benefitToEdit = benefit || emptyBenefit;
    if (benefit) {
      benefitToEdit.herbs = benefit.herbs.join(', ');
      benefitToEdit.symptoms = benefit.symptoms.join(', ');
    }
    setEditingBenefit(benefitToEdit);
    setIsDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Gestionar Beneficios
          </h2>
          <p className="text-gray-600">
            Administra las categorías de beneficios por sistemas del cuerpo
          </p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button 
              onClick={() => openEditDialog()}
              className="bg-emerald-600 hover:bg-emerald-700"
            >
              <Plus className="h-4 w-4 mr-2" />
              Nueva Categoría
            </Button>
          </DialogTrigger>
          
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingBenefit && editingBenefit.id !== emptyBenefit.id ? 'Editar Categoría' : 'Nueva Categoría'}
              </DialogTitle>
            </DialogHeader>
            
            {editingBenefit && (
              <BenefitForm 
                benefit={editingBenefit}
                categoryOptions={categoryOptions}
                onSave={handleSaveBenefit}
                onCancel={() => setIsDialogOpen(false)}
              />
            )}
          </DialogContent>
        </Dialog>
      </div>

      {/* Lista de Beneficios */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {benefits.map((benefit) => (
          <Card key={benefit.id} className="overflow-hidden">
            <div className="relative">
              <img
                src={benefit.image}
                alt={benefit.category}
                className="w-full h-48 object-cover"
              />
              <div className={`absolute inset-0 bg-gradient-to-r ${getCategoryColor(benefit.category)} opacity-60`} />
              <div className="absolute top-4 left-4">
                {getCategoryIcon(benefit.category)}
              </div>
              <div className="absolute top-2 right-2 flex space-x-2">
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => openEditDialog(benefit)}
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => handleDeleteBenefit(benefit.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <CardContent className="p-4">
              <h3 className="font-semibold text-lg text-emerald-800 mb-2">
                {benefit.category}
              </h3>
              
              <p className="text-sm text-gray-600 mb-4 line-clamp-2">
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
              
              <div className="flex items-center justify-between text-sm">
                <span className="text-emerald-600 font-medium">
                  {benefit.symptoms.length} síntomas tratados
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

// Componente del formulario de beneficio
const BenefitForm = ({ benefit, categoryOptions, onSave, onCancel }) => {
  const [formData, setFormData] = useState(benefit);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="text-sm font-medium text-gray-700 mb-2 block">
          Categoría del Sistema *
        </label>
        <select
          value={formData.category}
          onChange={(e) => handleChange('category', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
          required
        >
          <option value="">Selecciona una categoría</option>
          {categoryOptions.map(option => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
      </div>
      
      <div>
        <label className="text-sm font-medium text-gray-700 mb-2 block">
          URL de Imagen *
        </label>
        <Input
          value={formData.image}
          onChange={(e) => handleChange('image', e.target.value)}
          placeholder="https://images.unsplash.com/..."
          required
        />
      </div>
      
      <div>
        <label className="text-sm font-medium text-gray-700 mb-2 block">
          Descripción *
        </label>
        <Textarea
          value={formData.description}
          onChange={(e) => handleChange('description', e.target.value)}
          placeholder="Descripción detallada de los beneficios..."
          rows={3}
          required
        />
      </div>
      
      <div>
        <label className="text-sm font-medium text-gray-700 mb-2 block">
          Hierbas Principales (separadas por comas) *
        </label>
        <Input
          value={formData.herbs}
          onChange={(e) => handleChange('herbs', e.target.value)}
          placeholder="Manzanilla, Jengibre, Menta, Hinojo"
          required
        />
      </div>
      
      <div>
        <label className="text-sm font-medium text-gray-700 mb-2 block">
          Síntomas que Trata (separados por comas) *
        </label>
        <Input
          value={formData.symptoms}
          onChange={(e) => handleChange('symptoms', e.target.value)}
          placeholder="Indigestión, Náuseas, Gases, Dolor estomacal"
          required
        />
      </div>
      
      <div className="flex justify-end space-x-3 pt-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          <X className="h-4 w-4 mr-2" />
          Cancelar
        </Button>
        <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700">
          <Save className="h-4 w-4 mr-2" />
          Guardar Categoría
        </Button>
      </div>
    </form>
  );
};

export default EditBenefits;