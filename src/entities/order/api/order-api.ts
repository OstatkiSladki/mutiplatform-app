import { apiClient } from '../../../shared/api';
import type { Order, OrderListParams, OrderListResponse, OrderStatusUpdate, PickupCode } from '../model/types';

export const orderApi = {
  list: (params?: OrderListParams) =>
    apiClient.get<OrderListResponse>('/orders/api/v1/orders', { params }),

  create: () =>
    apiClient.post<Order>('/orders/api/v1/orders'),

  getById: (id: number) =>
    apiClient.get<Order>(`/orders/api/v1/orders/${id}`),

  getPickupCode: (id: number) =>
    apiClient.get<PickupCode>(`/orders/api/v1/orders/${id}/pickup-code`),

  updateStatus: (id: number, data: OrderStatusUpdate) =>
    apiClient.patch<void>(`/orders/api/v1/management/orders/${id}/status`, data),
};
