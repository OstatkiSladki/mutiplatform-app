import { apiClient } from '../../../shared/api';
import type { PromoValidateRequest, PromoValidateResponse } from '../model/types';

export const promoApi = {
  validate: (data: PromoValidateRequest) =>
    apiClient.post<PromoValidateResponse>('/payments/api/v1/promo/validate', data),
};
