import axios from 'axios';
import store from '../store/index'


const baseURL = process.env.VUE_APP_API_URL

const axiosInstance = axios.create({
  baseURL,
  timeout: 1000,
  headers: { Authorization: `Bearer ${store.getters.token}` }
});

axiosInstance.interceptors.request.use(
  async config => {
    const jsonwebtoken = localStorage.getItem('token');
    config.headers = {
      'Authorization': `Bearer ${jsonwebtoken}`,
      'Accept': 'application/json',
    }
    return config;
  },
  error => {
    Promise.reject(error)
  });

axiosInstance.interceptors.response.use((response) => {
  const token = response?.data.token;
  if (token) localStorage.setItem('token', token)
  return response
}, function (error) {
  const originalRequest = error.config;
  if (error.response.status === 403 && !originalRequest._retry) {
    originalRequest._retry = true;
    const access_token = localStorage.getItem('token');
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + access_token;
    return axiosInstance(originalRequest);
  }
  return Promise.reject(error);
});

export default axiosInstance;

