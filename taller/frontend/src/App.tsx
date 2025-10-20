import React, { useState, useEffect } from 'react';
import { TodoProvider } from './context/TodoContext';
import { AuthProvider } from './context/AuthContext';
import { ErrorProvider, setupGlobalErrorHandler } from './context/ErrorContext';
import { useError } from './context/ErrorContext';

// Components from components directory
import Counter from './components/Counter';
import LoginForm from './components/LoginForm';
import TodoList from './components/TodoList';
import CountdownTimer from './components/CountdownTimer';
import UsersTable from './components/UsersTable';
import ProductsList from './components/ProductsList';
import StudentRegistrationForm from './components/StudentRegistrationForm';
import Card from './components/Card';
import SearchFilter from './components/SearchFilter';
import UncontrolledForm from './components/UncontrolledForm';
import AuthForm from './components/AuthForm';
import StudentCRUD from './components/StudentCRUD';
import ErrorDisplay from './components/ErrorDisplay';
import GenericList from './components/GenericList';

// Sample data for Card component
const sampleCards = [
  {
    id: 1,
    title: 'Proyecto React',
    description: 'Desarrollo de una aplicación web moderna con React y TypeScript',
    date: new Date().toISOString()
  },
  {
    id: 2,
    title: 'API Node.js',
    description: 'Backend robusto con Express, autenticación JWT y base de datos',
    date: new Date(Date.now() - 86400000).toISOString()
  },
  {
    id: 3,
    title: 'Base de Datos',
    description: 'Diseño e implementación de esquemas de base de datos relacionales',
    date: new Date(Date.now() - 172800000).toISOString()
  }
];

const AppContent: React.FC = () => {
  const { addError } = useError();
  const [activeExercise, setActiveExercise] = useState<number>(1);

  useEffect(() => {
    // Setup global error handler
    setupGlobalErrorHandler(addError);
  }, [addError]);

  const exercises = [
    { id: 1, title: 'Contador con useState + TypeScript', component: <Counter initialValue={0} step={1} /> },
    { id: 2, title: 'Formulario de Login Controlado', component: <LoginForm onSubmit={(credentials) => console.log('Login:', credentials)} /> },
    { id: 3, title: 'Todo List con Context API', component: <TodoList /> },
    { id: 4, title: 'Temporizador Regresivo (Custom Hook)', component: <CountdownTimer /> },
    { id: 5, title: 'Tabla de Usuarios (API)', component: <UsersTable /> },
    { id: 6, title: 'Lista de Productos (API + Axios)', component: <ProductsList /> },
    { id: 7, title: 'Formulario Dinámico de Estudiantes', component: <StudentRegistrationForm onSubmit={(students) => console.log('Estudiantes:', students)} /> },
    { id: 8, title: 'Componente Card con Props Tipadas', component: (
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
        {sampleCards.map(card => (
          <Card
            key={card.id}
            title={card.title}
            description={card.description}
            date={card.date}
            onClick={() => console.log('Card clicked:', card.title)}
          />
        ))}
      </div>
    )},
    { id: 9, title: 'Búsqueda y Filtros Avanzados', component: <SearchFilter /> },
    { id: 10, title: 'Formulario No Controlado (useRef)', component: <UncontrolledForm /> },
    { id: 11, title: 'Autenticación JWT', component: <AuthForm /> },
    { id: 12, title: 'Hook Personalizado para APIs', component: (
      <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '8px', maxWidth: '600px', margin: '20px auto' }}>
        <h2>Hook Personalizado para APIs</h2>
        <p>Este hook se utiliza en otros componentes como UsersTable, ProductsList, etc.</p>
        <p>Ver el código en <code>src/hooks/useApi.ts</code> para más detalles.</p>
      </div>
    )},
    { id: 13, title: 'Lista Genérica Tipada', component: (
      <GenericList
        items={sampleCards}
        renderItem={(card, index) => (
          <div key={card.id}>
            <h3>{card.title}</h3>
            <p>{card.description}</p>
            <small>{new Date(card.date).toLocaleDateString()}</small>
          </div>
        )}
        keyExtractor={(card) => card.id}
        emptyMessage="No hay elementos para mostrar"
      />
    )},
    { id: 14, title: 'CRUD Completo', component: <StudentCRUD /> },
    { id: 15, title: 'Manejador de Errores Global', component: (
      <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '8px', maxWidth: '600px', margin: '20px auto' }}>
        <h2>Manejador de Errores Global</h2>
        <p>Los errores se muestran automáticamente en la esquina superior derecha.</p>
        <p>Prueba hacer una petición a una API que no existe para ver el error.</p>
        <button
          onClick={() => addError('Este es un error de prueba', 'error', 'Test')}
          style={{
            padding: '10px 20px',
            backgroundColor: '#dc3545',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            marginRight: '10px'
          }}
        >
          Generar Error de Prueba
        </button>
        <button
          onClick={() => addError('Esta es una advertencia', 'warning', 'Test')}
          style={{
            padding: '10px 20px',
            backgroundColor: '#ffc107',
            color: 'black',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            marginRight: '10px'
          }}
        >
          Generar Advertencia
        </button>
        <button
          onClick={() => addError('Esta es una información', 'info', 'Test')}
          style={{
            padding: '10px 20px',
            backgroundColor: '#17a2b8',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Generar Info
        </button>
      </div>
    )}
  ];

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
      {/* Header */}
      <header style={{
        backgroundColor: '#343a40',
        color: 'white',
        padding: '20px',
        textAlign: 'center'
      }}>
        <h1>React + TypeScript + Node.js - Ejercicios Completos</h1>
        <p>Taller segundo corte:
          ESTUDIANTES: Tatiana Montenegro-Yuliana Paez-Javier Montero
          -Estefania Malagon-Brandon Bernal-Cristian Barrera
        </p>
      </header>

      {/* Navigation */}
      <nav style={{
        backgroundColor: '#495057',
        padding: '15px',
        display: 'flex',
        flexWrap: 'wrap',
        gap: '10px',
        justifyContent: 'center'
      }}>
        {exercises.map(exercise => (
          <button
            key={exercise.id}
            onClick={() => setActiveExercise(exercise.id)}
            style={{
              padding: '8px 12px',
              backgroundColor: activeExercise === exercise.id ? '#007bff' : '#6c757d',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '0.9rem',
              whiteSpace: 'nowrap'
            }}
          >
            {exercise.id}. {exercise.title}
          </button>
        ))}
      </nav>

      {/* Content */}
      <main style={{ padding: '20px' }}>
        <div style={{
          backgroundColor: 'white',
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          overflow: 'hidden'
        }}>
          <div style={{
            backgroundColor: '#e9ecef',
            padding: '15px',
            borderBottom: '1px solid #dee2e6'
          }}>
            <h2 style={{ margin: 0, color: '#495057' }}>
              {exercises.find(ex => ex.id === activeExercise)?.title}
            </h2>
          </div>
          <div style={{ padding: '20px' }}>
            {exercises.find(ex => ex.id === activeExercise)?.component}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer style={{
        backgroundColor: '#343a40',
        color: 'white',
        padding: '20px',
        textAlign: 'center',
        marginTop: '40px'
      }}>
        <p>Proyecto desarrollado con React, TypeScript, Node.js, Express y Context API</p>
        <p>Incluye: useState, useEffect, useRef, Custom Hooks, JWT, Axios, CRUD completo</p>
      </footer>

      {/* Error Display */}
      <ErrorDisplay />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <ErrorProvider>
      <AuthProvider>
        <TodoProvider>
          <AppContent />
        </TodoProvider>
      </AuthProvider>
    </ErrorProvider>
  );
};

export default App;