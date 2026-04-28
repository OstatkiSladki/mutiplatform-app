import axios, { AxiosInstance, InternalAxiosRequestConfig, AxiosRequestConfig } from 'axios';

interface RetryableRequestConfig extends AxiosRequestConfig {
  _retry?: boolean;
}

const BASE_URL = process.env.EXPO_PUBLIC_API_URL ?? 'http://localhost:8000';

export const apiClient: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

const getAuthStore = () =>
  require('../../entities/auth/model/store').useAuthStore;

let isRefreshing = false;
let pendingQueue: Array<{
  resolve: (token: string | null) => void;
  reject: (err: unknown) => void;
}> = [];

const flushQueue = (token: string | null, error: unknown = null) => {
  pendingQueue.forEach(({ resolve, reject }) => {
    if (error) reject(error);
    else resolve(token);
  });
  pendingQueue = [];
};

apiClient.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const store = getAuthStore();
  const token: string | null = store.getState().accessToken;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const original: RetryableRequestConfig = error.config;

    if (error.response?.status !== 401 || original._retry) {
      return Promise.reject(error);
    }

    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        pendingQueue.push({ resolve, reject });
      }).then((token) => {
        if (original.headers) {
          original.headers.Authorization = `Bearer ${token}`;
        }
        return apiClient(original);
      });
    }

    original._retry = true;
    isRefreshing = true;

    try {
      await apiClient.post('/api/v1/auth/refresh');
      const store = getAuthStore();
      const newToken: string | null = store.getState().accessToken;
      flushQueue(newToken);
      if (newToken && original.headers) {
        original.headers.Authorization = `Bearer ${newToken}`;
      }
      return apiClient(original);
    } catch (refreshError) {
      flushQueue(null, refreshError);
      const store = getAuthStore();
      store.getState().clearAuth();
      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  },
);
