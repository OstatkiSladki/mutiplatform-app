import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { authApi } from '../api/auth-api';
import { getAccessTokenFromResponse } from './access-token';
import { useAuthStore } from './store';

export const useLogin = () =>
  useMutation({
    mutationFn: async (data: Parameters<typeof authApi.login>[0]) => {
      const response = await authApi.login(data);
      return {
        user: response.data,
        accessToken: getAccessTokenFromResponse(response),
      };
    },
    onSuccess: ({ user, accessToken }) =>
      useAuthStore.getState().setUser(user, accessToken),
  });

export const useRegister = () =>
  useMutation({
    mutationFn: async (data: Parameters<typeof authApi.register>[0]) => {
      const response = await authApi.register(data);
      return {
        user: response.data,
        accessToken: getAccessTokenFromResponse(response),
      };
    },
    onSuccess: ({ user, accessToken }) =>
      useAuthStore.getState().setUser(user, accessToken),
  });

export const useLogout = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      const { data } = await authApi.logout();
      return data;
    },
    onSuccess: () => {
      useAuthStore.getState().clearAuth();
      queryClient.clear();
    },
  });
};

interface UseGetMeOptions {
  enabled?: boolean;
  accessToken?: string | null;
}

export const useGetMe = ({
  enabled = true,
  accessToken = null,
}: UseGetMeOptions = {}) =>
  useQuery({
    queryKey: ['auth', 'me', accessToken],
    queryFn: async () => {
      const { data } = await authApi.getMe();
      return data;
    },
    retry: false,
    staleTime: Infinity,
    enabled,
  });
