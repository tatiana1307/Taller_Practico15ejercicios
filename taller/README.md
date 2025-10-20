# React + TypeScript + Node.js - Ejercicios Completos

Este proyecto implementa 15 ejercicios completos de React con TypeScript y Node.js, incluyendo Context API, Custom Hooks, JWT, Axios, CRUD completo y más.

## 🚀 Características

### Frontend (React + TypeScript)
- ✅ Contador con useState tipado
- ✅ Formulario de login controlado con validación
- ✅ Todo List con Context API + TypeScript
- ✅ Custom Hook para temporizador regresivo
- ✅ Tabla de usuarios que consume API
- ✅ Lista de productos con Axios + TypeScript
- ✅ Formulario dinámico para registro de estudiantes
- ✅ Componente Card con props tipadas
- ✅ Sistema de búsqueda y filtros
- ✅ Formulario no controlado con useRef
- ✅ Autenticación JWT completa
- ✅ Hook personalizado para APIs
- ✅ Lista genérica tipada
- ✅ CRUD completo con React + Node.js
- ✅ Manejador de errores global

### Backend (Node.js + Express + TypeScript)
- ✅ API REST con Express
- ✅ Autenticación JWT
- ✅ Endpoints para usuarios, productos y estudiantes
- ✅ Middleware de manejo de errores
- ✅ CORS configurado
- ✅ Tipado completo con TypeScript

## 📁 Estructura del Proyecto

```
taller/
├── backend/                 # API Node.js + Express
│   ├── src/
│   │   ├── index.ts        # Servidor principal
│   │   ├── types/          # Tipos TypeScript
│   │   └── routes/         # Rutas de la API
│   ├── package.json
│   ├── tsconfig.json
│   └── nodemon.json
├── frontend/               # React + TypeScript
│   ├── src/
│   │   ├── components/     # 15 componentes implementados
│   │   ├── context/        # Context API
│   │   ├── hooks/          # Custom Hooks
│   │   └── types/          # Tipos TypeScript
│   ├── public/
│   ├── package.json
│   └── tsconfig.json
├── package.json            # Scripts principales
└── README.md
```

## 🛠️ Instalación y Configuración

### Prerrequisitos
- Node.js (versión 16 o superior)
- npm o yarn

### 1. Instalar todas las dependencias
```bash
npm run install:all
```

### 2. Ejecutar el proyecto completo
```bash
npm run dev
```

Esto ejecutará tanto el backend como el frontend simultáneamente.

### 3. Ejecutar por separado (opcional)

**Backend:**
```bash
npm run backend:dev
```
El backend estará disponible en `http://localhost:5000`

**Frontend:**
```bash
npm run frontend:dev
```
El frontend estará disponible en `http://localhost:3000`

## 🎯 Ejercicios Implementados

### 1. Contador con useState + TypeScript
- Estado tipado con TypeScript
- Funciones de incremento, decremento y reset
- Props opcionales tipadas

### 2. Formulario de Login Controlado
- Validación en tiempo real
- Manejo de errores tipado
- Estado controlado con TypeScript

### 3. Todo List con Context API
- Context API con TypeScript
- Reducer para manejo de estado
- Custom hook useTodos

### 4. Temporizador Regresivo (Custom Hook)
- Hook personalizado useCountdown
- Control de pausa/reanudación
- Formateo de tiempo

### 5. Tabla de Usuarios (API)
- Consumo de API con Axios
- Estados de loading y error
- Tabla responsive

### 6. Lista de Productos (API + Axios)
- Filtros por categoría y stock
- Búsqueda en tiempo real
- Grid responsive

### 7. Formulario Dinámico de Estudiantes
- Validación completa
- Lista dinámica de estudiantes
- Tipado estricto

### 8. Componente Card con Props Tipadas
- Props interface definida
- Hover effects
- Formateo de fechas

### 9. Búsqueda y Filtros Avanzados
- Múltiples filtros simultáneos
- Búsqueda en tiempo real
- Estados de filtro persistentes

### 10. Formulario No Controlado (useRef)
- Acceso directo a elementos DOM
- Validación manual
- Limpieza de campos individual

### 11. Autenticación JWT
- Context de autenticación
- Login/Register con JWT
- Persistencia en localStorage

### 12. Hook Personalizado para APIs
- useApi para GET requests
- useApiMutation para POST/PUT/DELETE
- useFormApi para formularios

### 13. Lista Genérica Tipada
- Componente genérico reutilizable
- Tipado con generics
- Estados de loading/error

### 14. CRUD Completo
- Create, Read, Update, Delete
- Formularios de edición inline
- Confirmación de eliminación

### 15. Manejador de Errores Global
- Context de errores global
- Notificaciones toast
- Interceptor de Axios

## 🔧 Tecnologías Utilizadas

### Frontend
- React 18
- TypeScript
- Context API
- Custom Hooks
- Axios
- CSS-in-JS

### Backend
- Node.js
- Express
- TypeScript
- JWT (jsonwebtoken)
- bcryptjs
- CORS

## 📚 Conceptos Aplicados

- **TypeScript**: Tipado estático en toda la aplicación
- **React Hooks**: useState, useEffect, useContext, useReducer, useRef
- **Context API**: Estado global con TypeScript
- **Custom Hooks**: Lógica reutilizable
- **API Integration**: Axios con interceptors
- **Authentication**: JWT con persistencia
- **Error Handling**: Manejo global de errores
- **CRUD Operations**: Operaciones completas de base de datos
- **Form Handling**: Controlados y no controlados
- **State Management**: Local y global

## 🚀 Scripts Disponibles

### Proyecto Principal
```bash
npm run dev              # Ejecutar backend y frontend
npm run install:all      # Instalar todas las dependencias
npm run backend:dev       # Solo backend
npm run frontend:dev      # Solo frontend
npm run backend:build     # Compilar backend
npm run frontend:build    # Build frontend
```

### Backend
```bash
cd backend
npm run dev      # Desarrollo con nodemon
npm run build    # Compilar TypeScript
npm start        # Ejecutar producción
```

### Frontend
```bash
cd frontend
npm start        # Desarrollo
npm run build    # Build para producción
npm test         # Ejecutar tests
```

## 📝 Notas Importantes

1. **Proxy**: El frontend está configurado para hacer proxy al backend en el puerto 5000
2. **CORS**: El backend tiene CORS habilitado para el frontend
3. **JWT**: Los tokens se almacenan en localStorage
4. **Error Handling**: Los errores se muestran globalmente en la esquina superior derecha
5. **TypeScript**: Configuración estricta en ambos proyectos

## 🎨 Características de UI/UX

- Diseño responsive
- Animaciones suaves
- Estados de loading
- Notificaciones de error
- Navegación intuitiva
- Formularios validados
- Tablas interactivas

## 🔍 Próximos Pasos

- [ ] Agregar tests unitarios
- [ ] Implementar base de datos real
- [ ] Agregar validación de esquemas
- [ ] Implementar paginación
- [ ] Agregar documentación de API
- [ ] Optimizar rendimiento
- [ ] Agregar PWA features

## 📞 Soporte

Para cualquier pregunta o problema, revisa la documentación de cada componente o crea un issue en el repositorio.