import { apiClient } from '../../../shared/api';
import type {
  LoginRequest,
  MessageResponse,
  RegisterRequest,
  UserProfileResponse,
} from '../model/types';

export const authApi = {
  login: (data: LoginRequest) =>
    apiClient.post<UserProfileResponse>('/api/v1/auth/login', data),

  register: (data: RegisterRequest) =>
    apiClient.post<UserProfileResponse>('/api/v1/auth/register', data),

  logout: () =>
    apiClient.post<MessageResponse>('/api/v1/auth/logout'),

  refresh: () =>
    apiClient.post<MessageResponse>('/api/v1/auth/refresh'),

  getMe: () =>
    apiClient.get<UserProfileResponse>('/api/v1/users/me'),
};
