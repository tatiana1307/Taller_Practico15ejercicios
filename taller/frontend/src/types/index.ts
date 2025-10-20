export interface User {
  id: number;
  username: string;
  email: string;
  createdAt: string;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  inStock: boolean;
  createdAt: string;
}

export interface Student {
  id: number;
  name: string;
  email: string;
  age: number;
  course: string;
  grade: number;
  createdAt: string;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface RegisterData {
  username: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface CardProps {
  title: string;
  description: string;
  date: string;
  onClick?: () => void;
}

export interface TodoItem {
  id: number;
  text: string;
  completed: boolean;
  createdAt: string;
}

export interface TodoContextType {
  todos: TodoItem[];
  addTodo: (text: string) => void;
  toggleTodo: (id: number) => void;
  deleteTodo: (id: number) => void;
  editTodo: (id: number, text: string) => void;
}

export interface UseApiReturn<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export interface GenericListItem {
  id: number;
  [key: string]: any;
}

export interface SearchFilters {
  query: string;
  category?: string;
  inStock?: boolean;
}
