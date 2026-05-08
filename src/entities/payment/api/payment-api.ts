import { apiClient } from '../../../shared/api';
import type {
  PaymentCreateRequest,
  PaymentListParams,
  PaymentListResponse,
  PaymentRefundRequest,
  PaymentResponse,
} from '../model/types';

export const paymentApi = {
  list: (params?: PaymentListParams) =>
    apiClient.get<PaymentListResponse>('/payments/api/v1/payments', { params }),

  create: (data: PaymentCreateRequest) =>
    apiClient.post<PaymentResponse>('/payments/api/v1/payments', data),

  getById: (paymentId: number) =>
    apiClient.get<PaymentResponse>(`/payments/api/v1/payments/${paymentId}`),

  refund: (paymentId: number, data?: PaymentRefundRequest) =>
    apiClient.post<PaymentResponse>(`/payments/api/v1/payments/${paymentId}/refund`, data),
};
