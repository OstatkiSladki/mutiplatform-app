import { apiClient } from '../../../shared/api';
import type { Notification, NotificationListParams, NotificationListResponse, UpdateNotificationRequest } from '../model/types';

export const notificationApi = {
  list: (params?: NotificationListParams) =>
    apiClient.get<NotificationListResponse>('/notifications/api/v1/notifications', { params }),

  getById: (id: number) =>
    apiClient.get<Notification>(`/notifications/api/v1/notifications/${id}`),

  update: (id: number, data: UpdateNotificationRequest) =>
    apiClient.patch<Notification>(`/notifications/api/v1/notifications/${id}`, data),

  delete: (id: number) =>
    apiClient.delete<void>(`/notifications/api/v1/notifications/${id}`),

  markRead: (id: number) =>
    apiClient.patch<void>(`/notifications/api/v1/notifications/${id}/read`),

  markAllRead: () =>
    apiClient.post<void>('/notifications/api/v1/notifications/mark-all-read'),
};
