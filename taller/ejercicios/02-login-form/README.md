# Ejercicio 2: Formulario de Login Controlado

## 📋 Descripción
Implementación de un formulario de login controlado con validación en tiempo real usando React y TypeScript.

## 🎯 Objetivos
- Aprender a manejar formularios controlados
- Implementar validación en tiempo real
- Manejar errores de formulario con TypeScript
- Crear una experiencia de usuario fluida

## 🛠️ Tecnologías
- React 18
- TypeScript
- useState Hook
- Formularios controlados

## 📁 Archivos
- `LoginForm.tsx` - Componente principal del formulario

## 🚀 Funcionalidades
- ✅ Formulario controlado con estado
- ✅ Validación en tiempo real
- ✅ Manejo de errores tipado
- ✅ Limpieza de errores al escribir
- ✅ Mensaje de éxito al enviar
- ✅ Reset del formulario

## 💡 Conceptos Aplicados
- **Formularios Controlados**: Estado sincronizado con inputs
- **Validación**: Validación de campos requeridos y longitud
- **Manejo de Errores**: Estado de errores tipado
- **Event Handlers**: Manejo de eventos de input y submit
- **TypeScript**: Tipado de formularios y errores

## 🎨 Validaciones
- **Username**: Mínimo 3 caracteres
- **Password**: Mínimo 6 caracteres
- **Campos requeridos**: Ambos campos son obligatorios

## 🔧 Uso
```tsx
import LoginForm from './LoginForm';

// En tu componente
<LoginForm />
```

## 📝 Estructura del Estado
```typescript
interface LoginForm {
  username: string;
  password: string;
}

interface Errors {
  username?: string;
  password?: string;
}
```

## 📝 Notas
- Los errores se limpian automáticamente al escribir
- El formulario se resetea después del envío exitoso
- La validación se ejecuta al enviar el formulario
