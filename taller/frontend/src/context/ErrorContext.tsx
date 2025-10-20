import React, { createContext, useContext, useState, ReactNode } from 'react';
import axios from 'axios';

interface ErrorInfo {
  id: string;
  message: string;
  type: 'error' | 'warning' | 'info';
  timestamp: Date;
  source?: string;
}

interface ErrorContextType {
  errors: ErrorInfo[];
  addError: (message: string, type?: 'error' | 'warning' | 'info', source?: string) => void;
  removeError: (id: string) => void;
  clearAllErrors: () => void;
}

const ErrorContext = createContext<ErrorContextType | undefined>(undefined);

interface ErrorProviderProps {
  children: ReactNode;
}

export const ErrorProvider: React.FC<ErrorProviderProps> = ({ children }) => {
  const [errors, setErrors] = useState<ErrorInfo[]>([]);

  const addError = (message: string, type: 'error' | 'warning' | 'info' = 'error', source?: string): void => {
    const newError: ErrorInfo = {
      id: Date.now().toString(),
      message,
      type,
      timestamp: new Date(),
      source
    };
    
    setErrors(prev => [...prev, newError]);
    
    // Auto-remove after 5 seconds for info messages
    if (type === 'info') {
      setTimeout(() => {
        removeError(newError.id);
      }, 5000);
    }
  };

  const removeError = (id: string): void => {
    setErrors(prev => prev.filter(error => error.id !== id));
  };

  const clearAllErrors = (): void => {
    setErrors([]);
  };

  const value: ErrorContextType = {
    errors,
    addError,
    removeError,
    clearAllErrors
  };

  return (
    <ErrorContext.Provider value={value}>
      {children}
    </ErrorContext.Provider>
  );
};

export const useError = (): ErrorContextType => {
  const context = useContext(ErrorContext);
  if (context === undefined) {
    throw new Error('useError must be used within an ErrorProvider');
  }
  return context;
};

// Global error handler for axios
export const setupGlobalErrorHandler = (addError: (message: string, type?: 'error' | 'warning' | 'info', source?: string) => void): void => {
  // Axios response interceptor
  axios.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response) {
        // Server responded with error status
        const status = error.response.status;
        const message = error.response.data?.error || error.response.data?.message || 'Error del servidor';
        
        let errorType: 'error' | 'warning' | 'info' = 'error';
        if (status >= 400 && status < 500) {
          errorType = 'warning';
        }
        
        addError(`${message} (${status})`, errorType, 'API');
      } else if (error.request) {
        // Network error
        addError('Error de conexión. Verifica tu conexión a internet.', 'error', 'Network');
      } else {
        // Other error
        addError('Error inesperado', 'error', 'System');
      }
      
      return Promise.reject(error);
    }
  );
};
