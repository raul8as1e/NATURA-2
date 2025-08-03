import React, { useState, useEffect } from "react";
import { Plus, Edit, Trash2, Save, X, Leaf } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { toast } from "../../hooks/use-toast";
import { mockHerbs } from "../../data/mockData";

const EditHerbs = () => {
  const [herbs, setHerbs] = useState([]);
  const [editingHerb, setEditingHerb] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const emptyHerb = {
    id: Date.now(),
    name: "",
    scientificName: "",
    image: "",
    description: "",
    benefits: [],
    uses: "",
    precautions: ""
  };

  useEffect(() => {
    // Cargar hierbas guardadas o usar datos por defecto
    const savedHerbs = localStorage.getItem("natura_herbs_data");
    if (savedHerbs) {
      setHerbs(JSON.parse(savedHerbs));
    } else {
      setHerbs(mockHerbs);
    }
  }, []);

  const saveHerbs = (newHerbs) => {
    localStorage.setItem("natura_herbs_data", JSON.stringify(newHerbs));
    setHerbs(newHerbs);
  };

  const handleSaveHerb = (herbData) => {
    const benefitsArray = typeof herbData.benefits === 'string' 
      ? herbData.benefits.split(',').map(b => b.trim()).filter(b => b.length > 0)
      : herbData.benefits;

    const updatedHerb = {
      ...herbData,
      benefits: benefitsArray
    };

    let newHerbs;
    if (editingHerb && editingHerb.id !== emptyHerb.id) {
      // Editando hierba existente
      newHerbs = herbs.map(herb => 
        herb.id === editingHerb.id ? updatedHerb : herb
      );
      toast({
        title: "¡Hierba actualizada!",
        description: `${updatedHerb.name} se ha actualizado correctamente.`,
      });
    } else {
      // Nueva hierba
      updatedHerb.id = Date.now();
      newHerbs = [...herbs, updatedHerb];
      toast({
        title: "¡Nueva hierba agregada!",
        description: `${updatedHerb.name} se ha agregado al directorio.`,
      });
    }

    saveHerbs(newHerbs);
    setEditingHerb(null);
    setIsDialogOpen(false);
  };

  const handleDeleteHerb = (herbId) => {
    const herbToDelete = herbs.find(h => h.id === herbId);
    const newHerbs = herbs.filter(herb => herb.id !== herbId);
    saveHerbs(newHerbs);
    
    toast({
      title: "Hierba eliminada",
      description: `${herbToDelete.name} se ha eliminado del directorio.`,
    });
  };

  const openEditDialog = (herb = null) => {
    setEditingHerb(herb || emptyHerb);
    setIsDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Gestionar Hierbas
          </h2>
          <p className="text-gray-600">
            Administra el directorio de plantas medicinales
          </p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button 
              onClick={() => openEditDialog()}
              className="bg-emerald-600 hover:bg-emerald-700"
            >
              <Plus className="h-4 w-4 mr-2" />
              Nueva Hierba
            </Button>
          </DialogTrigger>
          
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingHerb && editingHerb.id !== emptyHerb.id ? 'Editar Hierba' : 'Nueva Hierba'}
              </DialogTitle>
            </DialogHeader>
            
            {editingHerb && (
              <HerbForm 
                herb={editingHerb}
                onSave={handleSaveHerb}
                onCancel={() => setIsDialogOpen(false)}
              />
            )}
          </DialogContent>
        </Dialog>
      </div>

      {/* Lista de Hierbas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {herbs.map((herb) => (
          <Card key={herb.id} className="overflow-hidden">
            <div className="relative">
              <img
                src={herb.image}
                alt={herb.name}
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-2 right-2 flex space-x-2">
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => openEditDialog(herb)}
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => handleDeleteHerb(herb.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <CardContent className="p-4">
              <h3 className="font-semibold text-lg text-emerald-800 mb-1">
                {herb.name}
              </h3>
              <p className="text-sm text-gray-500 italic mb-2">
                {herb.scientificName}
              </p>
              <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                {herb.description}
              </p>
              
              <div className="flex flex-wrap gap-1 mb-3">
                {herb.benefits.slice(0, 3).map((benefit, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {benefit}
                  </Badge>
                ))}
                {herb.benefits.length > 3 && (
                  <Badge variant="secondary" className="text-xs">
                    +{herb.benefits.length - 3} más
                  </Badge>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

// Componente del formulario de hierba
const HerbForm = ({ herb, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    ...herb,
    benefits: Array.isArray(herb.benefits) ? herb.benefits.join(', ') : herb.benefits
  });

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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium text-gray-700 mb-2 block">
            Nombre de la Hierba *
          </label>
          <Input
            value={formData.name}
            onChange={(e) => handleChange('name', e.target.value)}
            placeholder="Ej: Manzanilla"
            required
          />
        </div>
        
        <div>
          <label className="text-sm font-medium text-gray-700 mb-2 block">
            Nombre Científico *
          </label>
          <Input
            value={formData.scientificName}
            onChange={(e) => handleChange('scientificName', e.target.value)}
            placeholder="Ej: Matricaria chamomilla"
            required
          />
        </div>
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
          placeholder="Descripción detallada de la hierba..."
          rows={3}
          required
        />
      </div>
      
      <div>
        <label className="text-sm font-medium text-gray-700 mb-2 block">
          Beneficios (separados por comas) *
        </label>
        <Input
          value={formData.benefits}
          onChange={(e) => handleChange('benefits', e.target.value)}
          placeholder="Relajante, Antiinflamatoria, Digestiva"
          required
        />
      </div>
      
      <div>
        <label className="text-sm font-medium text-gray-700 mb-2 block">
          Usos *
        </label>
        <Textarea
          value={formData.uses}
          onChange={(e) => handleChange('uses', e.target.value)}
          placeholder="Cómo se usa esta hierba..."
          rows={2}
          required
        />
      </div>
      
      <div>
        <label className="text-sm font-medium text-gray-700 mb-2 block">
          Precauciones
        </label>
        <Textarea
          value={formData.precautions}
          onChange={(e) => handleChange('precautions', e.target.value)}
          placeholder="Precauciones importantes..."
          rows={2}
        />
      </div>
      
      <div className="flex justify-end space-x-3 pt-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          <X className="h-4 w-4 mr-2" />
          Cancelar
        </Button>
        <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700">
          <Save className="h-4 w-4 mr-2" />
          Guardar Hierba
        </Button>
      </div>
    </form>
  );
};

export default EditHerbs;