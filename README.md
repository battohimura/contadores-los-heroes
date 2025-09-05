# Contadores Los Héroes

Una aplicación web moderna de gestión de contadores construida con Nuxt 3 y Vue 3. Permite crear, editar, filtrar y gestionar múltiples contadores con persistencia de datos y una interfaz de usuario elegante con tema oscuro.

## 🚀 Características

- **Gestión de Contadores**: Crear, editar, incrementar/decrementar hasta 20 contadores
- **Validación Inteligente**: Límites de 0-20 para valores y 3-20 caracteres para nombres
- **Filtrado Avanzado**: Buscar por nombre, filtrar por valor, ordenar por nombre o valor
- **Persistencia de Datos**: LocalStorage para contadores, SessionStorage para filtros
- **Edición Inline**: Click en nombres de contadores para editar directamente
- **Interfaz Moderna**: Diseño responsivo con tema oscuro y metodología BEM CSS
- **Arquitectura Modular**: Componentes Vue separados y store Vuex estructurado

## 📋 Requisitos

- **Node.js**: Versión 22 o superior
- **npm**: Incluido con Node.js

## 🛠️ Instalación y Configuración

### 1. Clonar el repositorio

```bash
git clone <repository-url>
cd contadores-los-heroes
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Iniciar servidor de desarrollo

```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:3000`

## 🏗️ Scripts Disponibles

```bash
# Desarrollo
npm run dev

# Construcción para producción
npm run build

# Generar sitio estático
npm run generate

# Vista previa de producción
npm run preview

# Linting
npm run lint
```

## 🏛️ Arquitectura del Proyecto

### Estructura de Directorios

```text
app/
├── assets/css/          # Estilos CSS con metodología BEM
├── components/          # Componentes Vue reutilizables
│   ├── app/            # Componentes específicos de la aplicación
│   ├── forms/          # Componentes de formularios
│   └── ui/             # Componentes de interfaz de usuario
├── composables/        # Composables de Vue 3
├── constants/          # Constantes y configuraciones
├── layouts/            # Layouts de Nuxt
├── pages/              # Páginas de la aplicación
└── plugins/            # Plugins y store Vuex
```

### Tecnologías Utilizadas

- **Frontend**: Vue 3, Nuxt 3
- **Estado**: Vuex 4 con arquitectura modular
- **Estilos**: CSS personalizado con metodología BEM
- **Iconos**: @nuxt/icon
- **Validación**: Esquemas de validación personalizados
- **Persistencia**: LocalStorage y SessionStorage

## 🎯 Funcionalidades Principales

### Gestión de Contadores

- Crear hasta 20 contadores simultáneos
- Valores limitados entre 0 y 20
- Nombres de 3-20 caracteres
- Edición inline haciendo click en el nombre
- Botones de incremento/decremento

### Sistema de Filtros

- **Búsqueda por nombre**: Filtrado en tiempo real
- **Filtro por valor**: Mayor que / Menor que
- **Ordenamiento**: Por nombre o valor (ascendente/descendente)
- **Persistencia**: Los filtros se mantienen entre sesiones
- **Limpiar filtros**: Botón para resetear todos los filtros

### Interfaz de Usuario

- **Tema oscuro**: Diseño moderno y elegante
- **Responsive**: Adaptable a diferentes tamaños de pantalla
- **Componentes modulares**: Arquitectura limpia y mantenible
- **Animaciones**: Transiciones suaves y feedback visual

## 🚀 Despliegue

### GitHub Pages

El proyecto incluye un workflow de GitHub Actions para despliegue automático:

```bash
# El despliegue se ejecuta automáticamente en:
# - Push a la rama main
# - Ejecución manual del workflow
```

### Construcción Local

```bash
# Generar sitio estático
npm run generate

# Los archivos se generan en ./dist/
```

## 🧪 Desarrollo

### Estructura del Store (Vuex)

```text
plugins/store/contadores/
├── index.js        # Módulo principal
├── state.js        # Estado inicial
├── mutations.js    # Mutaciones síncronas
├── actions.js      # Acciones asíncronas
└── getters.js      # Propiedades computadas
```

### Componentes Principales

- `ListaContadores.vue`: Componente principal con lista de contadores
- `ContadorCard.vue`: Tarjeta individual de contador
- `ContadoresFiltros.vue`: Panel de filtros colapsible
- `ContadoresResumen.vue`: Resumen con totales
- `ContadorModal.vue`: Modal para crear/editar contadores

## 📝 Notas de Desarrollo

- Los contadores se persisten en `localStorage`
- Los filtros se guardan en `sessionStorage`
- La aplicación usa metodología BEM para CSS
- Todos los componentes siguen patrones de Vue 3
- El store Vuex está completamente tipado y modularizado

