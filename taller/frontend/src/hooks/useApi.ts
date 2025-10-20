import { useState, useEffect, useCallback } from 'react';
import axios, { AxiosResponse, AxiosError } from 'axios';
import { UseApiReturn } from '../types';

export const useApi = <T>(url: string, immediate: boolean = true): UseApiReturn<T> => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async (): Promise<void> => {
    try {
      setLoading(true);
      setError(null);
      const response: AxiosResponse<T> = await axios.get(url);
      setData(response.data);
    } catch (err) {
      const axiosError = err as AxiosError;
      setError(axiosError.message || 'Error al cargar los datos');
      setData(null);
    } finally {
      setLoading(false);
    }
  }, [url]);

  const refetch = useCallback((): void => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    if (immediate) {
      fetchData();
    }
  }, [fetchData, immediate]);

  return {
    data,
    loading,
    error,
    refetch
  };
};

// Hook específico para operaciones CRUD
export const useApiMutation = <T, R = any>() => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const mutate = useCallback(async (
    url: string, 
    method: 'POST' | 'PUT' | 'DELETE' = 'POST', 
    data?: T
  ): Promise<R | null> => {
    try {
      setLoading(true);
      setError(null);
      
      let response: AxiosResponse<R>;
      
      switch (method) {
        case 'POST':
          response = await axios.post(url, data);
          break;
        case 'PUT':
          response = await axios.put(url, data);
          break;
        case 'DELETE':
          response = await axios.delete(url);
          break;
        default:
          throw new Error(`Método HTTP no soportado: ${method}`);
      }
      
      return response.data;
    } catch (err) {
      const axiosError = err as AxiosError;
      setError(axiosError.message || 'Error en la operación');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    mutate,
    loading,
    error
  };
};

// Hook para manejar formularios con API
export const useFormApi = <T, R = any>(url: string, method: 'POST' | 'PUT' = 'POST') => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const submit = useCallback(async (data: T): Promise<R | null> => {
    try {
      setLoading(true);
      setError(null);
      setSuccess(false);
      
      const response: AxiosResponse<R> = await axios({
        method,
        url,
        data
      });
      
      setSuccess(true);
      return response.data;
    } catch (err) {
      const axiosError = err as AxiosError;
      setError(axiosError.message || 'Error al enviar el formulario');
      setSuccess(false);
      return null;
    } finally {
      setLoading(false);
    }
  }, [url, method]);

  const reset = useCallback((): void => {
    setError(null);
    setSuccess(false);
  }, []);

  return {
    submit,
    loading,
    error,
    success,
    reset
  };
};
