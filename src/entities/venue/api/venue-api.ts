import { apiClient } from '../../../shared/api';
import type { OffsetPaginatedResponse } from '../../../shared/api';
import type { Venue, VenueCreate, VenueListParams, VenueUpdate } from '../model/types';

export const venueApi = {
  list: (params?: VenueListParams) =>
    apiClient.get<OffsetPaginatedResponse<Venue>>('/venues/api/v1/venues', { params }),

  getById: (id: number) =>
    apiClient.get<Venue>(`/venues/api/v1/venues/${id}`),

  create: (data: VenueCreate) =>
    apiClient.post<Venue>('/venues/api/v1/venues', data),

  update: (id: number, data: VenueUpdate) =>
    apiClient.patch<Venue>(`/venues/api/v1/venues/${id}`, data),

  delete: (id: number) =>
    apiClient.delete<void>(`/venues/api/v1/venues/${id}`),
};
