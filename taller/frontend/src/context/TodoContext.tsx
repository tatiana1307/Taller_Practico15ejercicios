import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { TodoItem, TodoContextType } from '../types';

// Action types
type TodoAction =
  | { type: 'ADD_TODO'; payload: string }
  | { type: 'TOGGLE_TODO'; payload: number }
  | { type: 'DELETE_TODO'; payload: number }
  | { type: 'EDIT_TODO'; payload: { id: number; text: string } };

// Initial state
const initialState: TodoItem[] = [
  {
    id: 1,
    text: 'Aprender React con TypeScript',
    completed: false,
    createdAt: new Date().toISOString()
  },
  {
    id: 2,
    text: 'Implementar Context API',
    completed: true,
    createdAt: new Date().toISOString()
  }
];

// Reducer
const todoReducer = (state: TodoItem[], action: TodoAction): TodoItem[] => {
  switch (action.type) {
    case 'ADD_TODO':
      const newTodo: TodoItem = {
        id: Date.now(),
        text: action.payload,
        completed: false,
        createdAt: new Date().toISOString()
      };
      return [...state, newTodo];

    case 'TOGGLE_TODO':
      return state.map(todo =>
        todo.id === action.payload
          ? { ...todo, completed: !todo.completed }
          : todo
      );

    case 'DELETE_TODO':
      return state.filter(todo => todo.id !== action.payload);

    case 'EDIT_TODO':
      return state.map(todo =>
        todo.id === action.payload.id
          ? { ...todo, text: action.payload.text }
          : todo
      );

    default:
      return state;
  }
};

// Context
const TodoContext = createContext<TodoContextType | undefined>(undefined);

// Provider component
interface TodoProviderProps {
  children: ReactNode;
}

export const TodoProvider: React.FC<TodoProviderProps> = ({ children }) => {
  const [todos, dispatch] = useReducer(todoReducer, initialState);

  const addTodo = (text: string): void => {
    dispatch({ type: 'ADD_TODO', payload: text });
  };

  const toggleTodo = (id: number): void => {
    dispatch({ type: 'TOGGLE_TODO', payload: id });
  };

  const deleteTodo = (id: number): void => {
    dispatch({ type: 'DELETE_TODO', payload: id });
  };

  const editTodo = (id: number, text: string): void => {
    dispatch({ type: 'EDIT_TODO', payload: { id, text } });
  };

  const value: TodoContextType = {
    todos,
    addTodo,
    toggleTodo,
    deleteTodo,
    editTodo
  };

  return (
    <TodoContext.Provider value={value}>
      {children}
    </TodoContext.Provider>
  );
};

// Custom hook
export const useTodos = (): TodoContextType => {
  const context = useContext(TodoContext);
  if (context === undefined) {
    throw new Error('useTodos must be used within a TodoProvider');
  }
  return context;
};
