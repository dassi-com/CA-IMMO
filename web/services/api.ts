import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';

const isTokenExpired = (token: string): boolean => {
  try {
    const decoded = jwtDecode<{ exp: number }>(token);
    return decoded.exp * 1000 < Date.now();
  } catch {
    return true;
  }
};

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  timeout: 60000,
});

api.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem('accessToken');
    if (!token) return config;

    if (!isTokenExpired(token)) {
      config.headers.Authorization = `Bearer ${token}`;
      return config;
    }

    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) return config;

    try {
      const { data } = await axios.post(`${API_BASE_URL}/auth/refresh`, { refreshToken });
      const newToken = data?.data?.accessToken;
      const newRefresh = data?.data?.refreshToken;
      if (newToken) {
        localStorage.setItem('accessToken', newToken);
        if (newRefresh) localStorage.setItem('refreshToken', newRefresh);
        config.headers.Authorization = `Bearer ${newToken}`;
      }
    } catch {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
    }
    return config;
  },
  (error) => Promise.reject(error)
);

let refreshPromise: Promise<any> | null = null;

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error?.config;
    const status = error?.response?.status;

    if (!originalRequest) return Promise.reject(error);

    // Empêcher les boucles infinies sur /auth/refresh, /auth/login, /auth/register
    if (originalRequest.url?.includes('/auth/refresh') || originalRequest.url?.includes('/auth/login') || originalRequest.url?.includes('/auth/register')) {
      if (originalRequest.url?.includes('/auth/refresh')) {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
      }
      return Promise.reject(error);
    }

    if ((status === 401 || status === 403) && !originalRequest._retry) {
      if (refreshPromise) {
        await refreshPromise;
        originalRequest.headers.Authorization = `Bearer ${localStorage.getItem('accessToken')}`;
        return api(originalRequest);
      }

      originalRequest._retry = true;
      refreshPromise = (async () => {
        const refreshToken = localStorage.getItem('refreshToken');
        const response = await axios.post(`${API_BASE_URL}/auth/refresh`, { refreshToken });
        const accessToken = response?.data?.data?.accessToken;
        const newRefreshToken = response?.data?.data?.refreshToken;
        if (!accessToken) throw new Error('Invalid refresh response');
        localStorage.setItem('accessToken', accessToken);
        if (newRefreshToken) localStorage.setItem('refreshToken', newRefreshToken);
        return accessToken;
      })();

      try {
        const token = await refreshPromise;
        originalRequest.headers.Authorization = `Bearer ${token}`;
        return api(originalRequest);
      } catch (refreshError) {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        window.location.href = '/login';
        return Promise.reject(refreshError);
      } finally {
        refreshPromise = null;
      }
    }

    return Promise.reject(error);
  }
);
