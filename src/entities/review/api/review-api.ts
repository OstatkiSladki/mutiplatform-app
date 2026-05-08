import { apiClient } from '../../../shared/api';
import type { PaginatedResponse } from '../../../shared/api';
import type { Review, ReviewCreate, ReviewListParams, ReviewUpdate } from '../model/types';

export const reviewApi = {
  list: (params?: ReviewListParams) =>
    apiClient.get<PaginatedResponse<Review>>('/catalog/api/v1/reviews', { params }),

  getById: (id: number) =>
    apiClient.get<Review>(`/catalog/api/v1/reviews/${id}`),

  create: (data: ReviewCreate) =>
    apiClient.post<Review>('/catalog/api/v1/reviews', data),

  update: (id: number, data: ReviewUpdate) =>
    apiClient.patch<Review>(`/catalog/api/v1/reviews/${id}`, data),

  delete: (id: number) =>
    apiClient.delete<void>(`/catalog/api/v1/reviews/${id}`),
};
