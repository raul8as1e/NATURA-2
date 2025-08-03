import React, { useState, useEffect } from "react";
import { Plus, Edit, Trash2, Save, X, ChefHat, Clock, Star } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { toast } from "../../hooks/use-toast";
import { mockRecipes } from "../../data/mockData";

const EditRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [editingRecipe, setEditingRecipe] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const emptyRecipe = {
    id: Date.now(),
    name: "",
    image: "",
    ingredients: [],
    instructions: [],
    benefits: "",
    difficulty: "Fácil",
    time: ""
  };

  useEffect(() => {
    const savedRecipes = localStorage.getItem("natura_recipes_data");
    if (savedRecipes) {
      setRecipes(JSON.parse(savedRecipes));
    } else {
      setRecipes(mockRecipes);
    }
  }, []);

  const saveRecipes = (newRecipes) => {
    localStorage.setItem("natura_recipes_data", JSON.stringify(newRecipes));
    setRecipes(newRecipes);
  };

  const handleSaveRecipe = (recipeData) => {
    const ingredientsArray = typeof recipeData.ingredients === 'string' 
      ? recipeData.ingredients.split('\n').filter(i => i.trim().length > 0)
      : recipeData.ingredients;

    const instructionsArray = typeof recipeData.instructions === 'string'
      ? recipeData.instructions.split('\n').filter(i => i.trim().length > 0)
      : recipeData.instructions;

    const updatedRecipe = {
      ...recipeData,
      ingredients: ingredientsArray,
      instructions: instructionsArray
    };

    let newRecipes;
    if (editingRecipe && editingRecipe.id !== emptyRecipe.id) {
      newRecipes = recipes.map(recipe => 
        recipe.id === editingRecipe.id ? updatedRecipe : recipe
      );
      toast({
        title: "¡Receta actualizada!",
        description: `${updatedRecipe.name} se ha actualizado correctamente.`,
      });
    } else {
      updatedRecipe.id = Date.now();
      newRecipes = [...recipes, updatedRecipe];
      toast({
        title: "¡Nueva receta agregada!",
        description: `${updatedRecipe.name} se ha agregado a la colección.`,
      });
    }

    saveRecipes(newRecipes);
    setEditingRecipe(null);
    setIsDialogOpen(false);
  };

  const handleDeleteRecipe = (recipeId) => {
    const recipeToDelete = recipes.find(r => r.id === recipeId);
    const newRecipes = recipes.filter(recipe => recipe.id !== recipeId);
    saveRecipes(newRecipes);
    
    toast({
      title: "Receta eliminada",
      description: `${recipeToDelete.name} se ha eliminado de la colección.`,
    });
  };

  const openEditDialog = (recipe = null) => {
    const recipeToEdit = recipe || emptyRecipe;
    if (recipe) {
      recipeToEdit.ingredients = recipe.ingredients.join('\n');
      recipeToEdit.instructions = recipe.instructions.join('\n');
    }
    setEditingRecipe(recipeToEdit);
    setIsDialogOpen(true);
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "Fácil": return "bg-green-100 text-green-800";
      case "Intermedio": return "bg-yellow-100 text-yellow-800";
      case "Avanzado": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Gestionar Recetas
          </h2>
          <p className="text-gray-600">
            Administra las recetas naturales y preparaciones
          </p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button 
              onClick={() => openEditDialog()}
              className="bg-emerald-600 hover:bg-emerald-700"
            >
              <Plus className="h-4 w-4 mr-2" />
              Nueva Receta
            </Button>
          </DialogTrigger>
          
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingRecipe && editingRecipe.id !== emptyRecipe.id ? 'Editar Receta' : 'Nueva Receta'}
              </DialogTitle>
            </DialogHeader>
            
            {editingRecipe && (
              <RecipeForm 
                recipe={editingRecipe}
                onSave={handleSaveRecipe}
                onCancel={() => setIsDialogOpen(false)}
              />
            )}
          </DialogContent>
        </Dialog>
      </div>

      {/* Lista de Recetas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recipes.map((recipe) => (
          <Card key={recipe.id} className="overflow-hidden">
            <div className="relative">
              <img
                src={recipe.image}
                alt={recipe.name}
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-2 right-2 flex space-x-2">
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => openEditDialog(recipe)}
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => handleDeleteRecipe(recipe.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              <div className="absolute top-2 left-2">
                <Badge className={getDifficultyColor(recipe.difficulty)}>
                  {recipe.difficulty}
                </Badge>
              </div>
            </div>
            
            <CardContent className="p-4">
              <h3 className="font-semibold text-lg text-emerald-800 mb-2">
                {recipe.name}
              </h3>
              
              <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>{recipe.time}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span>4.8</span>
                </div>
              </div>
              
              <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                {recipe.benefits}
              </p>
              
              <div className="flex items-center justify-between text-sm">
                <span className="text-emerald-600 font-medium">
                  {recipe.ingredients.length} ingredientes
                </span>
                <span className="text-gray-500">
                  {recipe.instructions.length} pasos
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

// Componente del formulario de receta
const RecipeForm = ({ recipe, onSave, onCancel }) => {
  const [formData, setFormData] = useState(recipe);

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
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium text-gray-700 mb-2 block">
            Nombre de la Receta *
          </label>
          <Input
            value={formData.name}
            onChange={(e) => handleChange('name', e.target.value)}
            placeholder="Ej: Té Relajante de Manzanilla"
            required
          />
        </div>
        
        <div>
          <label className="text-sm font-medium text-gray-700 mb-2 block">
            Tiempo de Preparación *
          </label>
          <Input
            value={formData.time}
            onChange={(e) => handleChange('time', e.target.value)}
            placeholder="Ej: 10 minutos"
            required
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
            Dificultad *
          </label>
          <select
            value={formData.difficulty}
            onChange={(e) => handleChange('difficulty', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            required
          >
            <option value="Fácil">Fácil</option>
            <option value="Intermedio">Intermedio</option>
            <option value="Avanzado">Avanzado</option>
          </select>
        </div>
      </div>
      
      <div>
        <label className="text-sm font-medium text-gray-700 mb-2 block">
          Beneficios *
        </label>
        <Textarea
          value={formData.benefits}
          onChange={(e) => handleChange('benefits', e.target.value)}
          placeholder="Describe los beneficios de esta receta..."
          rows={2}
          required
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium text-gray-700 mb-2 block">
            Ingredientes (uno por línea) *
          </label>
          <Textarea
            value={formData.ingredients}
            onChange={(e) => handleChange('ingredients', e.target.value)}
            placeholder="2 cucharaditas de flores secas de manzanilla&#10;1 taza de agua caliente&#10;Miel al gusto"
            rows={6}
            required
          />
        </div>
        
        <div>
          <label className="text-sm font-medium text-gray-700 mb-2 block">
            Instrucciones (un paso por línea) *
          </label>
          <Textarea
            value={formData.instructions}
            onChange={(e) => handleChange('instructions', e.target.value)}
            placeholder="Hierve el agua y deja enfriar por 2 minutos&#10;Agrega las flores de manzanilla al agua&#10;Deja reposar por 5-7 minutos"
            rows={6}
            required
          />
        </div>
      </div>
      
      <div className="flex justify-end space-x-3 pt-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          <X className="h-4 w-4 mr-2" />
          Cancelar
        </Button>
        <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700">
          <Save className="h-4 w-4 mr-2" />
          Guardar Receta
        </Button>
      </div>
    </form>
  );
};

export default EditRecipes;