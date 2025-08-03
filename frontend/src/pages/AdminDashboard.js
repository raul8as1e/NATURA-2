import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { 
  Settings, 
  FileText, 
  Leaf, 
  ChefHat, 
  Heart, 
  BookOpen, 
  LogOut,
  Users,
  BarChart3,
  Edit
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Badge } from "../components/ui/badge";

// Importar los componentes de edición
import EditHomePage from "../components/admin/EditHomePage";
import EditHerbs from "../components/admin/EditHerbs";
import EditRecipes from "../components/admin/EditRecipes";
import EditBenefits from "../components/admin/EditBenefits";
import EditMagazine from "../components/admin/EditMagazine";

const AdminDashboard = () => {
  const { logout } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");

  const stats = [
    { title: "Hierbas Registradas", value: "6", icon: Leaf, color: "text-green-600" },
    { title: "Recetas Disponibles", value: "3", icon: ChefHat, color: "text-orange-600" },
    { title: "Categorías de Beneficios", value: "4", icon: Heart, color: "text-red-600" },
    { title: "Páginas de Revista", value: "6", icon: BookOpen, color: "text-blue-600" }
  ];

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="bg-emerald-600 text-white rounded-lg p-2">
                <Settings className="h-6 w-6" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">
                  Panel de Administración
                </h1>
                <p className="text-sm text-gray-500">Natura Revista</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Badge variant="secondary" className="bg-emerald-100 text-emerald-800">
                <Users className="h-4 w-4 mr-2" />
                Administrador
              </Badge>
              <Button
                onClick={handleLogout}
                variant="outline"
                size="sm"
                className="text-red-600 border-red-200 hover:bg-red-50"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Cerrar Sesión
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid grid-cols-6 w-full lg:w-auto">
            <TabsTrigger value="overview" className="flex items-center space-x-2">
              <BarChart3 className="h-4 w-4" />
              <span className="hidden sm:inline">Resumen</span>
            </TabsTrigger>
            <TabsTrigger value="homepage" className="flex items-center space-x-2">
              <FileText className="h-4 w-4" />
              <span className="hidden sm:inline">Inicio</span>
            </TabsTrigger>
            <TabsTrigger value="herbs" className="flex items-center space-x-2">
              <Leaf className="h-4 w-4" />
              <span className="hidden sm:inline">Hierbas</span>
            </TabsTrigger>
            <TabsTrigger value="recipes" className="flex items-center space-x-2">
              <ChefHat className="h-4 w-4" />
              <span className="hidden sm:inline">Recetas</span>
            </TabsTrigger>
            <TabsTrigger value="benefits" className="flex items-center space-x-2">
              <Heart className="h-4 w-4" />
              <span className="hidden sm:inline">Beneficios</span>
            </TabsTrigger>
            <TabsTrigger value="magazine" className="flex items-center space-x-2">
              <BookOpen className="h-4 w-4" />
              <span className="hidden sm:inline">Revista</span>
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Resumen del Sistema
              </h2>
              <p className="text-gray-600 mb-6">
                Gestiona todo el contenido de tu revista virtual desde este panel centralizado.
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">
                          {stat.title}
                        </p>
                        <p className="text-3xl font-bold text-gray-900">
                          {stat.value}
                        </p>
                      </div>
                      <stat.icon className={`h-8 w-8 ${stat.color}`} />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Edit className="h-5 w-5" />
                  <span>Acciones Rápidas</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <Button
                    onClick={() => setActiveTab("homepage")}
                    variant="outline"
                    className="justify-start h-auto p-4"
                  >
                    <div className="text-left">
                      <div className="font-medium">Editar Página Principal</div>
                      <div className="text-sm text-gray-500">Título, descripción y hero</div>
                    </div>
                  </Button>
                  
                  <Button
                    onClick={() => setActiveTab("herbs")}
                    variant="outline"
                    className="justify-start h-auto p-4"
                  >
                    <div className="text-left">
                      <div className="font-medium">Gestionar Hierbas</div>
                      <div className="text-sm text-gray-500">Agregar, editar o eliminar</div>
                    </div>
                  </Button>
                  
                  <Button
                    onClick={() => setActiveTab("recipes")}
                    variant="outline"
                    className="justify-start h-auto p-4"
                  >
                    <div className="text-left">
                      <div className="font-medium">Administrar Recetas</div>
                      <div className="text-sm text-gray-500">Ingredientes e instrucciones</div>
                    </div>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Content Management Tabs */}
          <TabsContent value="homepage">
            <EditHomePage />
          </TabsContent>
          
          <TabsContent value="herbs">
            <EditHerbs />
          </TabsContent>
          
          <TabsContent value="recipes">
            <EditRecipes />
          </TabsContent>
          
          <TabsContent value="benefits">
            <EditBenefits />
          </TabsContent>
          
          <TabsContent value="magazine">
            <EditMagazine />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;