# Natura Revista - Contratos de API y Plan de Integración

## A. Contratos de API

### 1. Hierbas (Herbs) - `/api/herbs`

**GET /api/herbs**
- Retorna todas las hierbas disponibles
- Incluye filtros por beneficios y búsqueda por nombre
- Query parameters: `search`, `benefit`

```json
{
  "id": "string",
  "name": "string",
  "scientificName": "string", 
  "image": "url",
  "description": "string",
  "benefits": ["string"],
  "uses": "string",
  "precautions": "string"
}
```

**GET /api/herbs/:id**
- Retorna detalles de una hierba específica

### 2. Recetas (Recipes) - `/api/recipes`

**GET /api/recipes**
- Retorna todas las recetas disponibles

```json
{
  "id": "string",
  "name": "string",
  "image": "url",
  "ingredients": ["string"],
  "instructions": ["string"],
  "benefits": "string",
  "difficulty": "string",
  "time": "string"
}
```

**GET /api/recipes/:id**
- Retorna detalles de una receta específica

### 3. Beneficios (Benefits) - `/api/benefits`

**GET /api/benefits**
- Retorna categorías de beneficios organizadas por sistemas del cuerpo

```json
{
  "id": "string",
  "category": "string",
  "herbs": ["string"],
  "description": "string", 
  "symptoms": ["string"],
  "image": "url"
}
```

### 4. Páginas de Revista (Magazine Pages) - `/api/magazine-pages`

**GET /api/magazine-pages**
- Retorna contenido para el componente de revista virtual

```json
{
  "id": "string",
  "title": "string",
  "content": "string",
  "image": "url"
}
```

## B. Datos Mockeados a Reemplazar

Los siguientes datos en `/app/frontend/src/data/mockData.js` serán reemplazados:

1. **mockHerbs** → Datos de MongoDB collection `herbs`
2. **mockRecipes** → Datos de MongoDB collection `recipes`  
3. **mockBenefits** → Datos de MongoDB collection `benefits`
4. **mockMagazinePages** → Datos de MongoDB collection `magazine_pages`

## C. Implementación Backend

### Modelos MongoDB (usando Motor/PyMongo):

1. **Herb Model**
   - Campos: name, scientific_name, image, description, benefits, uses, precautions
   - Índices: name, benefits (para búsquedas eficientes)

2. **Recipe Model**
   - Campos: name, image, ingredients, instructions, benefits, difficulty, time
   - Índices: name, difficulty

3. **Benefit Model**
   - Campos: category, herbs, description, symptoms, image
   - Índices: category

4. **MagazinePage Model**
   - Campos: title, content, image, order
   - Índices: order (para mantener secuencia de páginas)

### Endpoints FastAPI a Crear:

- `GET /api/herbs` - Listar hierbas con filtros
- `GET /api/herbs/{herb_id}` - Detalle de hierba
- `GET /api/recipes` - Listar recetas
- `GET /api/recipes/{recipe_id}` - Detalle de receta
- `GET /api/benefits` - Listar beneficios por categoría
- `GET /api/magazine-pages` - Contenido de revista virtual

### Características Especiales:

- Filtros de búsqueda en hierbas por nombre/beneficios
- Paginación si es necesaria (para grandes volúmenes de datos)
- Validación de datos con Pydantic
- Manejo de errores consistente
- CORS configurado para frontend

## D. Integración Frontend & Backend

### Pasos de Integración:

1. **Eliminar mock data** de componentes
2. **Crear API service layer** en `/app/frontend/src/services/api.js`
3. **Usar axios** para llamadas HTTP (ya instalado)
4. **Actualizar state management** en componentes para usar datos reales
5. **Añadir loading states** y error handling
6. **Mantener funcionalidad de filtros** y búsqueda

### Archivos a Modificar:

- `/app/frontend/src/pages/HerbDirectory.js` - Reemplazar mockHerbs
- `/app/frontend/src/pages/Recipes.js` - Reemplazar mockRecipes  
- `/app/frontend/src/pages/Benefits.js` - Reemplazar mockBenefits
- `/app/frontend/src/components/MagazineFlip.js` - Reemplazar mockMagazinePages

### API Service Structure:

```javascript
// /app/frontend/src/services/api.js
const API_BASE = process.env.REACT_APP_BACKEND_URL + '/api';

export const herbsAPI = {
  getAll: (params) => axios.get(`${API_BASE}/herbs`, { params }),
  getById: (id) => axios.get(`${API_BASE}/herbs/${id}`)
};

export const recipesAPI = {
  getAll: () => axios.get(`${API_BASE}/recipes`),
  getById: (id) => axios.get(`${API_BASE}/recipes/${id}`)
};

export const benefitsAPI = {
  getAll: () => axios.get(`${API_BASE}/benefits`)
};

export const magazineAPI = {
  getPages: () => axios.get(`${API_BASE}/magazine-pages`)
};
```

## E. Consideraciones Técnicas

1. **Poblado de Base de Datos**: Script para insertar datos iniciales
2. **Optimización de Imágenes**: URLs optimizadas de Unsplash
3. **SEO**: Meta tags apropiados para cada sección
4. **Performance**: Lazy loading para imágenes
5. **Error Handling**: Estados de error user-friendly
6. **Loading States**: Skeletons para mejor UX

Este plan asegura una transición fluida de mock data a implementación backend completa manteniendo toda la funcionalidad interactiva.