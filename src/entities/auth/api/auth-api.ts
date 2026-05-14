import { Platform } from 'react-native';
import { apiClient } from '../../../shared/api';
import { mockAuthApi } from './mock-auth-api';
import type {
  LoginRequest,
  MessageResponse,
  RegisterRequest,
  UserProfileResponse,
} from '../model/types';

const useMockAuth =
  Platform.OS !== 'web' &&
  process.env.EXPO_PUBLIC_USE_MOCK_AUTH !== 'false' &&
  (__DEV__ || process.env.EXPO_PUBLIC_USE_MOCK_AUTH === 'true');

export const authApi = {
  login: (data: LoginRequest) =>
    useMockAuth
      ? mockAuthApi.login(data)
      : apiClient.post<UserProfileResponse>('/auth/api/v1/auth/login', data),

  register: (data: RegisterRequest) =>
    useMockAuth
      ? mockAuthApi.register(data)
      : apiClient.post<UserProfileResponse>('/auth/api/v1/auth/register', data),

  logout: () =>
    useMockAuth
      ? mockAuthApi.logout()
      : apiClient.post<MessageResponse>('/auth/api/v1/auth/logout'),

  refresh: () =>
    useMockAuth
      ? mockAuthApi.refresh()
      : apiClient.post<MessageResponse>('/auth/api/v1/auth/refresh'),

  getMe: () =>
    useMockAuth
      ? mockAuthApi.getMe()
      : apiClient.get<UserProfileResponse>('/auth/api/v1/users/me'),
};