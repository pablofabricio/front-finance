// services/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_FINANCE,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    console.log(`${token} opaa`);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
