import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api'
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const auth = {
  login: (email: string, password: string) => 
    api.post('/auth/login', { email, password }),
  register: (data: any) => 
    api.post('/auth/register', data),
};

export const orders = {
  getAll: () => api.get('/orders'),
  updateStatus: (id: string, status: string) => 
    api.patch(`/orders/${id}/status`, { status }),
};

export const services = {
  getAll: () => api.get('/services'),
  create: (data: any) => api.post('/services', data),
};

export default api;