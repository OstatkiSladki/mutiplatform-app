import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { offerApi } from '../api/offer-api';
import type { OfferCreate, OfferListParams, OfferUpdate } from './types';
import { withMockFallback } from '../../../shared/dev/with-mock-fallback';
import { MOCK_OFFER_LIST_RESPONSE } from '../../../shared/dev/mocks';

export const useOfferList = (params?: OfferListParams) =>
  withMockFallback(
    useQuery({
      queryKey: ['offers', 'list', params ?? {}],
      queryFn: async () => {
        const { data } = await offerApi.list(params);
        return data;
      },
    }),
    MOCK_OFFER_LIST_RESPONSE,
  );

export const useOffer = (id: number) =>
  useQuery({
    queryKey: ['offers', 'detail', id],
    queryFn: async () => {
      const { data } = await offerApi.getById(id);
      return data;
    },
    enabled: !!id,
  });

export const useCreateOffer = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: OfferCreate) => {
      const { data: offer } = await offerApi.create(data);
      return offer;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['offers', 'list'] });
    },
  });
};

export const useUpdateOffer = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, data }: { id: number; data: OfferUpdate }) => {
      const { data: offer } = await offerApi.update(id, data);
      return offer;
    },
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ['offers', 'list'] });
      queryClient.invalidateQueries({ queryKey: ['offers', 'detail', id] });
    },
  });
};

export const useCancelOffer = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      const { data } = await offerApi.cancel(id);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['offers', 'list'] });
    },
  });
};
