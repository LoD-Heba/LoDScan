import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Añade interceptors para manejar errores globalmente
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      // Puedes redirigir a login o limpiar el estado de autenticación
      console.log('No autorizado, redirigiendo...');
    }
    return Promise.reject(error);
  }
);

export default api;