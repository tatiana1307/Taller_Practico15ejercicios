# 🚀 Taller de React + TypeScript + Node.js

## 📋 Descripción
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

## 📦 Instalación

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
**✅ Debería mostrar:** `Server is running on port 4000`

#### Terminal 2 - Frontend
```bash
cd taller/frontend
npm start
```
**✅ Debería abrir:** `http://localhost:3000`

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

## 🌟 Características Destacadas

### Frontend
- ✅ **TypeScript completo** con tipado estricto
- ✅ **Context API** para estado global
- ✅ **Custom Hooks** reutilizables
- ✅ **Axios** configurado con interceptores
- ✅ **Manejo de errores** global
- ✅ **Interfaz en español** con precios en pesos colombianos

### Backend
- ✅ **API REST** completa con Express
- ✅ **JWT Authentication** con bcryptjs
- ✅ **CORS** configurado
- ✅ **CRUD** para usuarios, productos y estudiantes
- ✅ **Manejo de errores** centralizado
- ✅ **Datos en español** con precios colombianos

## 🐛 Solución de Problemas

### Error: Puerto 3000 ocupado
```bash
lsof -ti:3000 | xargs kill -9
cd taller/frontend
npm start
```

### Error: Puerto 4000 ocupado
```bash
lsof -ti:4000 | xargs kill -9
cd taller/backend
node dist/index.js
```

### Error: Módulos no encontrados
```bash
# Backend
cd taller/backend
rm -rf node_modules package-lock.json
npm install
npm run build

# Frontend
cd taller/frontend
rm -rf node_modules package-lock.json
npm install
```

### Error: 403 en Tabla de Usuarios
1. Verifica que el backend esté en puerto 4000
2. Verifica que el frontend tenga proxy a `http://localhost:4000`
3. Haz hard reload en el navegador (Cmd+Shift+R)

## 📁 Archivos Importantes

### Configuración
- `taller/frontend/package.json` - Dependencias del frontend
- `taller/backend/package.json` - Dependencias del backend
- `taller/frontend/src/lib/api.ts` - Configuración de Axios

### Componentes Principales
- `taller/frontend/src/App.tsx` - Aplicación principal
- `taller/frontend/src/components/` - Todos los componentes
- `taller/backend/src/routes/` - Rutas de la API

### Ejercicios Individuales
- `taller/ejercicios/01-counter/` - Código del ejercicio 1
- `taller/ejercicios/02-login-form/` - Código del ejercicio 2
- ... (y así sucesivamente)

## 🎯 Uso en Clase

### Para Estudiantes
1. Clona el repositorio
2. Sigue las instrucciones de instalación
3. Ejecuta ambos servicios
4. Navega por las 15 pestañas
5. Revisa el código en `taller/ejercicios/`

### Para Profesores
- Cada ejercicio está documentado con comentarios
- El código está organizado por carpetas
- Incluye ejemplos de TypeScript, React Hooks, Context API
- Backend completo con autenticación JWT

## 📞 Soporte

Si tienes problemas:
1. Verifica que ambos puertos (3000 y 4000) estén libres
2. Revisa que las dependencias estén instaladas
3. Asegúrate de estar en las carpetas correctas
4. Revisa los logs en la consola

## 🏆 Logros del Proyecto

- ✅ **15 ejercicios** completos y funcionales
- ✅ **TypeScript** en todo el proyecto
- ✅ **API REST** completa
- ✅ **Autenticación JWT** implementada
- ✅ **Interfaz en español** con contenido colombiano
- ✅ **Código limpio** y bien documentado
- ✅ **Estructura profesional** lista para producción

---

**¡Proyecto listo para presentar! 🎉**
