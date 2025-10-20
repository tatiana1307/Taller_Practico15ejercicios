# 🚀 Taller de React + TypeScript + Node.js
## ESTUDIANTES
Tatiana Montenegro
Yuliana paez
Brandon bernal
javier montero
estefania malagon
Cristian Barrera

## Descripción
Proyecto completo con 15 ejercicios de React, TypeScript y Node.js que incluye:
- **Frontend:** React con TypeScript, Context API, Custom Hooks, Axios
- **Backend:** Node.js con Express, JWT, CRUD completo
- **Ejercicios:** useState, useEffect, useRef, Context API, JWT, Axios, CRUD

## 🏗️ Estructura del Proyecto
```
taller/
├── frontend/          # React app (puerto 3000)
├── backend/           # Node.js API (puerto 4000)
└── ejercicios/        # Código individual de cada ejercicio
```

## 🛠️ Tecnologías Utilizadas
- **Frontend:** React 18, TypeScript, Axios, Context API
- **Backend:** Node.js, Express, JWT, bcryptjs, CORS
- **Herramientas:** npm, nodemon, ts-node

##  Instalación

### 1. Clonar el repositorio
```bash
git clone <url-del-repositorio>
cd taller-segundo-corte
```

### 2. Instalar dependencias del Backend
```bash
cd taller/backend
npm install
```

### 3. Instalar dependencias del Frontend
```bash
cd taller/frontend
npm install
```

## 🚀 Ejecución Manual

### Opción 1: Ejecutar por separado (Recomendado)

#### Terminal 1 - Backend
```bash
cd taller/backend
npm run build
node dist/index.js
```
**Debería mostrar:** `Server is running on port 4000`

#### Terminal 2 - Frontend
```bash
cd taller/frontend
npm start
```
**Debería abrir:** `http://localhost:3000`

### Opción 2: Scripts automatizados

#### Desde la raíz del proyecto
```bash
# Instalar todas las dependencias
npm run install-all

# Ejecutar ambos servicios
npm run dev
```

## 🔍 Verificación

### 1. Verificar Backend
- Abre: `http://localhost:4000/health`
- Debe mostrar: `{"status":"ok"}`

### 2. Verificar Frontend
- Abre: `http://localhost:3000`
- Debe mostrar la aplicación con 15 pestañas

### 3. Verificar API
- Abre: `http://localhost:4000/api/users`
- Debe mostrar JSON con usuarios
- Abre: `http://localhost:4000/api/products`
- Debe mostrar productos en español con precios en pesos colombianos

## 📚 Ejercicios Incluidos

| # | Ejercicio | Descripción |
|---|-----------|-------------|
| 1 | Contador | useState + TypeScript |
| 2 | Login Form | Formulario controlado con validación |
| 3 | Todo List | Context API + Estado global |
| 4 | Timer Hook | Custom Hook para temporizador |
| 5 | Users Table | Tabla de usuarios desde API |
| 6 | Products List | Lista de productos con Axios |
| 7 | Student Form | Formulario dinámico de estudiantes |
| 8 | Card Component | Componente reutilizable con props |
| 9 | Search Filter | Búsqueda y filtros avanzados |
| 10 | Uncontrolled Form | Formulario con useRef |
| 11 | JWT Auth | Sistema de autenticación |
| 12 | API Hook | Hook personalizado para APIs |
| 13 | Generic List | Lista genérica tipada |
| 14 | CRUD System | CRUD completo de estudiantes |
| 15 | Error Handler | Manejador global de errores |



