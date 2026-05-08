import { apiClient } from '../../../shared/api';
import type { PaginatedResponse } from '../../../shared/api';
import type { Product, ProductCreate, ProductListParams, ProductUpdate } from '../model/types';

export const productApi = {
  list: (params?: ProductListParams) =>
    apiClient.get<PaginatedResponse<Product>>('/catalog/api/v1/products', { params }),

  getById: (id: number) =>
    apiClient.get<Product>(`/catalog/api/v1/products/${id}`),

  create: (data: ProductCreate) =>
    apiClient.post<Product>('/catalog/api/v1/products', data),

  update: (id: number, data: ProductUpdate) =>
    apiClient.patch<Product>(`/catalog/api/v1/products/${id}`, data),

  delete: (id: number) =>
    apiClient.delete<void>(`/catalog/api/v1/products/${id}`),
};
