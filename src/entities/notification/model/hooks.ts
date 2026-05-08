import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { notificationApi } from '../api/notification-api';
import type { NotificationListParams, UpdateNotificationRequest } from './types';

export const useNotificationList = (params?: NotificationListParams) =>
  useQuery({
    queryKey: ['notifications', 'list', params ?? {}],
    queryFn: async () => {
      const { data } = await notificationApi.list(params);
      return data;
    },
  });

export const useNotification = (id: number) =>
  useQuery({
    queryKey: ['notifications', 'detail', id],
    queryFn: async () => {
      const { data } = await notificationApi.getById(id);
      return data;
    },
    enabled: !!id,
  });

export const useUpdateNotification = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, data }: { id: number; data: UpdateNotificationRequest }) => {
      const { data: notification } = await notificationApi.update(id, data);
      return notification;
    },
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ['notifications', 'list'] });
      queryClient.invalidateQueries({ queryKey: ['notifications', 'detail', id] });
    },
  });
};

export const useDeleteNotification = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      const { data } = await notificationApi.delete(id);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications', 'list'] });
    },
  });
};

export const useMarkNotificationRead = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      const { data } = await notificationApi.markRead(id);
      return data;
    },
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ['notifications', 'list'] });
      queryClient.invalidateQueries({ queryKey: ['notifications', 'detail', id] });
    },
  });
};

export const useMarkAllNotificationsRead = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      const { data } = await notificationApi.markAllRead();
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications', 'list'] });
    },
  });
};
