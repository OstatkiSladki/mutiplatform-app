import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { reviewApi } from '../api/review-api';
import type { ReviewCreate, ReviewListParams, ReviewUpdate } from './types';

export const useReviewList = (params?: ReviewListParams) =>
  useQuery({
    queryKey: ['reviews', 'list', params ?? {}],
    queryFn: async () => {
      const { data } = await reviewApi.list(params);
      return data;
    },
  });

export const useReview = (id: number) =>
  useQuery({
    queryKey: ['reviews', 'detail', id],
    queryFn: async () => {
      const { data } = await reviewApi.getById(id);
      return data;
    },
    enabled: !!id,
  });

export const useCreateReview = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: ReviewCreate) => {
      const { data: review } = await reviewApi.create(data);
      return review;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reviews', 'list'] });
    },
  });
};

export const useUpdateReview = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, data }: { id: number; data: ReviewUpdate }) => {
      const { data: review } = await reviewApi.update(id, data);
      return review;
    },
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ['reviews', 'list'] });
      queryClient.invalidateQueries({ queryKey: ['reviews', 'detail', id] });
    },
  });
};

export const useDeleteReview = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      const { data } = await reviewApi.delete(id);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reviews', 'list'] });
    },
  });
};
