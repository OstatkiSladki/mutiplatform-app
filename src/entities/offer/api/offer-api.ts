import { apiClient } from '../../../shared/api';
import type { PaginatedResponse } from '../../../shared/api';
import type { Offer, OfferCreate, OfferListParams, OfferUpdate } from '../model/types';

export const offerApi = {
  list: (params?: OfferListParams) =>
    apiClient.get<PaginatedResponse<Offer>>('/catalog/api/v1/offers', { params }),

  getById: (id: number) =>
    apiClient.get<Offer>(`/catalog/api/v1/offers/${id}`),

  create: (data: OfferCreate) =>
    apiClient.post<Offer>('/catalog/api/v1/offers', data),

  update: (id: number, data: OfferUpdate) =>
    apiClient.patch<Offer>(`/catalog/api/v1/offers/${id}`, data),

  cancel: (id: number) =>
    apiClient.delete<void>(`/catalog/api/v1/offers/${id}`),
};
