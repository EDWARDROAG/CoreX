// Archivo: AuthContext.jsx
// CoreX - Generado automáticamente

// frontend/src/services/api.js
import axios from 'axios';
import { APP_ENV } from '../config/env';

const api = axios.create({
  baseURL: APP_ENV.API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para manejar errores de autenticación
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      delete api.defaults.headers.common['Authorization'];
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;