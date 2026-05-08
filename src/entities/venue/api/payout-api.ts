import { apiClient } from '../../../shared/api';
import type { OffsetPaginatedResponse } from '../../../shared/api';
import type { Payout, PayoutCreate, PayoutListParams, PayoutStatusUpdate } from '../model/types';

export const payoutApi = {
  list: (venueId: number, params?: PayoutListParams) =>
    apiClient.get<OffsetPaginatedResponse<Payout>>(`/venues/api/v1/venues/${venueId}/payouts`, { params }),

  create: (venueId: number, data: PayoutCreate) =>
    apiClient.post<Payout>(`/venues/api/v1/venues/${venueId}/payouts`, data),

  updateStatus: (venueId: number, payoutId: number, data: PayoutStatusUpdate) =>
    apiClient.patch<Payout>(`/venues/api/v1/venues/${venueId}/payouts/${payoutId}`, data),
};
