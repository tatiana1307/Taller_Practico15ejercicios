import axios from 'axios';

// With CRA proxy set to http://localhost:4000, using '/api' will target the backend.
export const api = axios.create({
  baseURL: '/api',
  withCredentials: true
});

// Optional: basic response error logging
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Surface status for quick debugging (e.g., 403)
    if (error?.response?.status) {
      // eslint-disable-next-line no-console
      console.warn('API error status:', error.response.status);
    }
    return Promise.reject(error);
  }
);

export default api;


