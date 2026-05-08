import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { authApi } from '../api/auth-api';
import { useAuthStore } from './store';

export const useLogin = () =>
  useMutation({
    mutationFn: async (data: Parameters<typeof authApi.login>[0]) => {
      const { data: user } = await authApi.login(data);
      return user;
    },
    onSuccess: (user) => useAuthStore.getState().setUser(user),
  });

export const useRegister = () =>
  useMutation({
    mutationFn: async (data: Parameters<typeof authApi.register>[0]) => {
      const { data: user } = await authApi.register(data);
      return user;
    },
    onSuccess: (user) => useAuthStore.getState().setUser(user),
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
}

export const useGetMe = ({ enabled = true }: UseGetMeOptions = {}) =>
  useQuery({
    queryKey: ['auth', 'me'],
    queryFn: async () => {
      const { data } = await authApi.getMe();
      return data;
    },
    retry: false,
    staleTime: Infinity,
    enabled,
  });
