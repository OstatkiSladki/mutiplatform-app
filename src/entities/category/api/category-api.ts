import { apiClient } from '../../../shared/api';
import type { Category, CategoryCreate, CategoryListParams, CategoryUpdate } from '../model/types';

export const categoryApi = {
  list: (params?: CategoryListParams) =>
    apiClient.get<Category[]>('/catalog/api/v1/categories', { params }),

  getById: (id: number) =>
    apiClient.get<Category>(`/catalog/api/v1/categories/${id}`),

  create: (data: CategoryCreate) =>
    apiClient.post<Category>('/catalog/api/v1/categories', data),

  update: (id: number, data: CategoryUpdate) =>
    apiClient.patch<Category>(`/catalog/api/v1/categories/${id}`, data),

  delete: (id: number) =>
    apiClient.delete<void>(`/catalog/api/v1/categories/${id}`),
};
