import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { categoryApi } from '../api/category-api';
import type { CategoryCreate, CategoryListParams, CategoryUpdate } from './types';

export const useCategoryList = (params?: CategoryListParams) =>
  useQuery({
    queryKey: ['categories', 'list', params ?? {}],
    queryFn: async () => {
      const { data } = await categoryApi.list(params);
      return data;
    },
  });

export const useCategory = (id: number) =>
  useQuery({
    queryKey: ['categories', 'detail', id],
    queryFn: async () => {
      const { data } = await categoryApi.getById(id);
      return data;
    },
    enabled: !!id,
  });

export const useCreateCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: CategoryCreate) => {
      const { data: category } = await categoryApi.create(data);
      return category;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories', 'list'] });
    },
  });
};

export const useUpdateCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, data }: { id: number; data: CategoryUpdate }) => {
      const { data: category } = await categoryApi.update(id, data);
      return category;
    },
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ['categories', 'list'] });
      queryClient.invalidateQueries({ queryKey: ['categories', 'detail', id] });
    },
  });
};

export const useDeleteCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      const { data } = await categoryApi.delete(id);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories', 'list'] });
    },
  });
};
