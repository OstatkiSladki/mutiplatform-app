import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { paymentApi } from '../api/payment-api';
import { promoApi } from '../api/promo-api';
import type {
  PaymentCreateRequest,
  PaymentListParams,
  PaymentRefundRequest,
  PromoValidateRequest,
} from './types';

const paymentKeys = {
  root: ['payments'] as const,
  lists: () => [...paymentKeys.root, 'list'] as const,
  list: (params: PaymentListParams) => [...paymentKeys.lists(), params] as const,
  details: () => [...paymentKeys.root, 'detail'] as const,
  detail: (id: number) => [...paymentKeys.details(), id] as const,
};

export const usePaymentList = (params?: PaymentListParams) =>
  useQuery({
    queryKey: paymentKeys.list(params ?? {}),
    queryFn: async () => {
      const { data } = await paymentApi.list(params);
      return data;
    },
  });

export const usePayment = (paymentId: number) =>
  useQuery({
    queryKey: paymentKeys.detail(paymentId),
    queryFn: async () => {
      const { data } = await paymentApi.getById(paymentId);
      return data;
    },
    enabled: !!paymentId,
  });

export const useCreatePayment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: PaymentCreateRequest) => {
      const { data: payment } = await paymentApi.create(data);
      return payment;
    },
    onSuccess: (payment) => {
      queryClient.invalidateQueries({ queryKey: paymentKeys.lists() });
      queryClient.invalidateQueries({ queryKey: ['orders', 'list'] });
      queryClient.invalidateQueries({ queryKey: ['orders', 'detail', payment.order_id] });
    },
  });
};

export const useRefundPayment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ paymentId, data }: { paymentId: number; data?: PaymentRefundRequest }) => {
      const { data: payment } = await paymentApi.refund(paymentId, data);
      return payment;
    },
    onSuccess: (_, { paymentId }) => {
      queryClient.invalidateQueries({ queryKey: paymentKeys.lists() });
      queryClient.invalidateQueries({ queryKey: paymentKeys.detail(paymentId) });
    },
  });
};

export const useValidatePromo = () =>
  useMutation({
    mutationFn: async (data: PromoValidateRequest) => {
      const { data: result } = await promoApi.validate(data);
      return result;
    },
  });
