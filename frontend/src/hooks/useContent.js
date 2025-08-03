import { useState, useEffect } from "react";
import { mockHerbs, mockRecipes, mockBenefits, mockMagazinePages } from "../data/mockData";

// Hook personalizado para manejar el contenido dinámico desde localStorage
export const useContent = () => {
  const [content, setContent] = useState({
    homepage: {},
    herbs: [],
    recipes: [],
    benefits: [],
    magazinePages: []
  });

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadContent();
  }, []);

  const loadContent = () => {
    try {
      // Cargar página principal
      const homeData = localStorage.getItem("natura_homepage_data");
      const homepage = homeData ? JSON.parse(homeData) : {
        title: "Natura",
        subtitle: "Revista",
        description: "Descubre el poder curativo de la naturaleza a través de nuestra revista virtual interactiva",
        buttonText: "Explorar Revista",
        heroTitle: "Experimenta la Revista Virtual",
        heroSubtitle: "Navega de manera fluida a través de nuestro contenido interactivo"
      };

      // Cargar hierbas
      const herbsData = localStorage.getItem("natura_herbs_data");
      const herbs = herbsData ? JSON.parse(herbsData) : mockHerbs;

      // Cargar recetas
      const recipesData = localStorage.getItem("natura_recipes_data");
      const recipes = recipesData ? JSON.parse(recipesData) : mockRecipes;

      // Cargar beneficios
      const benefitsData = localStorage.getItem("natura_benefits_data");
      const benefits = benefitsData ? JSON.parse(benefitsData) : mockBenefits;

      // Cargar páginas de revista
      const magazineData = localStorage.getItem("natura_magazine_data");
      const magazinePages = magazineData ? JSON.parse(magazineData) : mockMagazinePages;

      setContent({
        homepage,
        herbs,
        recipes,
        benefits,
        magazinePages
      });
    } catch (error) {
      console.error("Error loading content:", error);
      // En caso de error, usar datos por defecto
      setContent({
        homepage: {
          title: "Natura",
          subtitle: "Revista",
          description: "Descubre el poder curativo de la naturaleza a través de nuestra revista virtual interactiva",
          buttonText: "Explorar Revista",
          heroTitle: "Experimenta la Revista Virtual",
          heroSubtitle: "Navega de manera fluida a través de nuestro contenido interactivo"
        },
        herbs: mockHerbs,
        recipes: mockRecipes,
        benefits: mockBenefits,
        magazinePages: mockMagazinePages
      });
    } finally {
      setIsLoading(false);
    }
  };

  const refreshContent = () => {
    loadContent();
  };

  return {
    content,
    isLoading,
    refreshContent
  };
};