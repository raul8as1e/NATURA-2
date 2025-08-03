import React, { useState, useEffect } from "react";
import { Plus, Edit, Trash2, Save, X, BookOpen, ArrowUp, ArrowDown } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { toast } from "../../hooks/use-toast";
import { mockMagazinePages } from "../../data/mockData";

const EditMagazine = () => {
  const [pages, setPages] = useState([]);
  const [editingPage, setEditingPage] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const emptyPage = {
    id: Date.now(),
    title: "",
    content: "",
    image: ""
  };

  useEffect(() => {
    const savedPages = localStorage.getItem("natura_magazine_data");
    if (savedPages) {
      setPages(JSON.parse(savedPages));
    } else {
      setPages(mockMagazinePages);
    }
  }, []);

  const savePages = (newPages) => {
    localStorage.setItem("natura_magazine_data", JSON.stringify(newPages));
    setPages(newPages);
  };

  const handleSavePage = (pageData) => {
    const updatedPage = { ...pageData };

    let newPages;
    if (editingPage && editingPage.id !== emptyPage.id) {
      newPages = pages.map(page => 
        page.id === editingPage.id ? updatedPage : page
      );
      toast({
        title: "¡Página actualizada!",
        description: `"${updatedPage.title}" se ha actualizado correctamente.`,
      });
    } else {
      updatedPage.id = Date.now();
      newPages = [...pages, updatedPage];
      toast({
        title: "¡Nueva página agregada!",
        description: `"${updatedPage.title}" se ha agregado a la revista.`,
      });
    }

    savePages(newPages);
    setEditingPage(null);
    setIsDialogOpen(false);
  };

  const handleDeletePage = (pageId) => {
    const pageToDelete = pages.find(p => p.id === pageId);
    const newPages = pages.filter(page => page.id !== pageId);
    savePages(newPages);
    
    toast({
      title: "Página eliminada",
      description: `"${pageToDelete.title}" se ha eliminado de la revista.`,
    });
  };

  const handleMovePage = (pageId, direction) => {
    const currentIndex = pages.findIndex(p => p.id === pageId);
    if (
      (direction === 'up' && currentIndex === 0) ||
      (direction === 'down' && currentIndex === pages.length - 1)
    ) {
      return;
    }

    const newPages = [...pages];
    const targetIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
    
    // Intercambiar elementos
    [newPages[currentIndex], newPages[targetIndex]] = [newPages[targetIndex], newPages[currentIndex]];
    
    savePages(newPages);
    toast({
      title: "Orden actualizado",
      description: "Se ha cambiado el orden de las páginas de la revista.",
    });
  };

  const openEditDialog = (page = null) => {
    setEditingPage(page || emptyPage);
    setIsDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Gestionar Revista Virtual
          </h2>
          <p className="text-gray-600">
            Administra las páginas del efecto revista con animación flip
          </p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button 
              onClick={() => openEditDialog()}
              className="bg-emerald-600 hover:bg-emerald-700"
            >
              <Plus className="h-4 w-4 mr-2" />
              Nueva Página
            </Button>
          </DialogTrigger>
          
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingPage && editingPage.id !== emptyPage.id ? 'Editar Página' : 'Nueva Página'}
              </DialogTitle>
            </DialogHeader>
            
            {editingPage && (
              <PageForm 
                page={editingPage}
                onSave={handleSavePage}
                onCancel={() => setIsDialogOpen(false)}
              />
            )}
          </DialogContent>
        </Dialog>
      </div>

      {/* Lista de Páginas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {pages.map((page, index) => (
          <Card key={page.id} className="overflow-hidden">
            <div className="relative">
              <img
                src={page.image}
                alt={page.title}
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-2 right-2 flex space-x-2">
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => openEditDialog(page)}
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => handleDeletePage(page.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              <div className="absolute top-2 left-2 bg-emerald-600 text-white px-2 py-1 rounded text-sm font-medium">
                Página {index + 1}
              </div>
            </div>
            
            <CardContent className="p-4">
              <h3 className="font-semibold text-lg text-emerald-800 mb-2">
                {page.title}
              </h3>
              
              <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                {page.content}
              </p>
              
              <div className="flex items-center justify-between">
                <div className="flex space-x-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleMovePage(page.id, 'up')}
                    disabled={index === 0}
                  >
                    <ArrowUp className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleMovePage(page.id, 'down')}
                    disabled={index === pages.length - 1}
                  >
                    <ArrowDown className="h-4 w-4" />
                  </Button>
                </div>
                
                <span className="text-xs text-gray-500">
                  {page.content.length} caracteres
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Información de ayuda */}
      <Card className="bg-emerald-50 border-emerald-200">
        <CardContent className="p-6">
          <div className="flex items-start space-x-3">
            <BookOpen className="h-6 w-6 text-emerald-600 mt-1" />
            <div>
              <h4 className="font-semibold text-emerald-800 mb-2">
                Consejos para la Revista Virtual
              </h4>
              <ul className="text-sm text-emerald-700 space-y-1">
                <li>• Las páginas se muestran en pares (izquierda-derecha) en el efecto flip</li>
                <li>• Usa el orden de las páginas para controlar la secuencia de lectura</li>
                <li>• Recomendado: máximo 300 caracteres por página para mejor legibilidad</li>
                <li>• Las imágenes deben ser de alta calidad y relacionadas con el contenido</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// Componente del formulario de página
const PageForm = ({ page, onSave, onCancel }) => {
  const [formData, setFormData] = useState(page);

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
          Título de la Página *
        </label>
        <Input
          value={formData.title}
          onChange={(e) => handleChange('title', e.target.value)}
          placeholder="Ej: Bienvenidos a Natura Revista"
          required
        />
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
          Contenido de la Página *
        </label>
        <Textarea
          value={formData.content}
          onChange={(e) => handleChange('content', e.target.value)}
          placeholder="Escribe el contenido que aparecerá en esta página de la revista..."
          rows={6}
          required
        />
        <p className="text-xs text-gray-500 mt-1">
          Caracteres: {formData.content.length} / 300 (recomendado)
        </p>
      </div>
      
      <div className="flex justify-end space-x-3 pt-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          <X className="h-4 w-4 mr-2" />
          Cancelar
        </Button>
        <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700">
          <Save className="h-4 w-4 mr-2" />
          Guardar Página
        </Button>
      </div>
    </form>
  );
};

export default EditMagazine;