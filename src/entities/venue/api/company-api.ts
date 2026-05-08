import { apiClient } from '../../../shared/api';
import type { OffsetPaginatedResponse } from '../../../shared/api';
import type { Company, CompanyCreate, CompanyListParams, CompanyUpdate } from '../model/types';

export const companyApi = {
  list: (params?: CompanyListParams) =>
    apiClient.get<OffsetPaginatedResponse<Company>>('/venues/api/v1/companies', { params }),

  getById: (id: number) =>
    apiClient.get<Company>(`/venues/api/v1/companies/${id}`),

  create: (data: CompanyCreate) =>
    apiClient.post<Company>('/venues/api/v1/companies', data),

  update: (id: number, data: CompanyUpdate) =>
    apiClient.patch<Company>(`/venues/api/v1/companies/${id}`, data),

  delete: (id: number) =>
    apiClient.delete<void>(`/venues/api/v1/companies/${id}`),
};
