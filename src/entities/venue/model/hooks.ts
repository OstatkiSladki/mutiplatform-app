import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { companyApi } from '../api/company-api';
import { venueApi } from '../api/venue-api';
import { payoutApi } from '../api/payout-api';
import type {
  CompanyCreate,
  CompanyListParams,
  CompanyUpdate,
  PayoutCreate,
  PayoutListParams,
  PayoutStatusUpdate,
  VenueCreate,
  VenueListParams,
  VenueUpdate,
} from './types';

// --- Company hooks ---

export const useCompanyList = (params?: CompanyListParams) =>
  useQuery({
    queryKey: ['companies', 'list', params ?? {}],
    queryFn: async () => {
      const { data } = await companyApi.list(params);
      return data;
    },
  });

export const useCompany = (id: number) =>
  useQuery({
    queryKey: ['companies', 'detail', id],
    queryFn: async () => {
      const { data } = await companyApi.getById(id);
      return data;
    },
    enabled: !!id,
  });

export const useCreateCompany = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: CompanyCreate) => {
      const { data: company } = await companyApi.create(data);
      return company;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['companies', 'list'] });
    },
  });
};

export const useUpdateCompany = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, data }: { id: number; data: CompanyUpdate }) => {
      const { data: company } = await companyApi.update(id, data);
      return company;
    },
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ['companies', 'list'] });
      queryClient.invalidateQueries({ queryKey: ['companies', 'detail', id] });
    },
  });
};

export const useDeleteCompany = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      const { data } = await companyApi.delete(id);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['companies', 'list'] });
    },
  });
};

// --- Venue hooks ---

export const useVenueList = (params?: VenueListParams) =>
  useQuery({
    queryKey: ['venues', 'list', params ?? {}],
    queryFn: async () => {
      const { data } = await venueApi.list(params);
      return data;
    },
  });

export const useVenue = (id: number) =>
  useQuery({
    queryKey: ['venues', 'detail', id],
    queryFn: async () => {
      const { data } = await venueApi.getById(id);
      return data;
    },
    enabled: !!id,
  });

export const useCreateVenue = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: VenueCreate) => {
      const { data: venue } = await venueApi.create(data);
      return venue;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['venues', 'list'] });
    },
  });
};

export const useUpdateVenue = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, data }: { id: number; data: VenueUpdate }) => {
      const { data: venue } = await venueApi.update(id, data);
      return venue;
    },
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ['venues', 'list'] });
      queryClient.invalidateQueries({ queryKey: ['venues', 'detail', id] });
    },
  });
};

export const useDeleteVenue = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      const { data } = await venueApi.delete(id);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['venues', 'list'] });
    },
  });
};

// --- Payout hooks ---

export const usePayoutList = (venueId: number, params?: PayoutListParams) =>
  useQuery({
    queryKey: ['payouts', venueId, 'list', params ?? {}],
    queryFn: async () => {
      const { data } = await payoutApi.list(venueId, params);
      return data;
    },
    enabled: !!venueId,
  });

export const useCreatePayout = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ venueId, data }: { venueId: number; data: PayoutCreate }) => {
      const { data: payout } = await payoutApi.create(venueId, data);
      return payout;
    },
    onSuccess: (_, { venueId }) => {
      queryClient.invalidateQueries({ queryKey: ['payouts', venueId, 'list'] });
    },
  });
};

export const useUpdatePayoutStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      venueId,
      payoutId,
      data,
    }: {
      venueId: number;
      payoutId: number;
      data: PayoutStatusUpdate;
    }) => {
      const { data: payout } = await payoutApi.updateStatus(venueId, payoutId, data);
      return payout;
    },
    onSuccess: (_, { venueId }) => {
      queryClient.invalidateQueries({ queryKey: ['payouts', venueId, 'list'] });
    },
  });
};
