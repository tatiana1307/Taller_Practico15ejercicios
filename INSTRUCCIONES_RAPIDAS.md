# ⚡ Instrucciones Rápidas de Ejecución

## 🚀 Ejecutar en 3 pasos

### 1. Backend (Terminal 1)
```bash
cd taller/backend
npm install
npm run build
node dist/index.js
```

### 2. Frontend (Terminal 2)
```bash
cd taller/frontend
npm install
npm start
```

### 3. Abrir en navegador
- **Frontend:** http://localhost:3000
- **Backend:** http://localhost:4000/health

## ✅ Verificar que funciona
- Backend responde: `{"status":"ok"}`
- Frontend muestra 15 pestañas
- Pestaña 5 (Usuarios) carga sin error 403
- Pestaña 9 (Productos) muestra precios en pesos colombianos

## 🐛 Si hay problemas
```bash
# Limpiar puertos
lsof -ti:3000 | xargs kill -9
lsof -ti:4000 | xargs kill -9

# Reinstalar dependencias
cd taller/backend && rm -rf node_modules && npm install
cd taller/frontend && rm -rf node_modules && npm install
```

**¡Listo para subir al repo! 🎉**
