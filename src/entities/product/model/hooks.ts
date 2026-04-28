import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { productApi } from '../api/product-api';
import type { ProductCreate, ProductListParams, ProductUpdate } from './types';

export const useProductList = (params?: ProductListParams) =>
  useQuery({
    queryKey: ['products', 'list', params ?? {}],
    queryFn: async () => {
      const { data } = await productApi.list(params);
      return data;
    },
  });

export const useProduct = (id: number) =>
  useQuery({
    queryKey: ['products', 'detail', id],
    queryFn: async () => {
      const { data } = await productApi.getById(id);
      return data;
    },
    enabled: !!id,
  });

export const useCreateProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: ProductCreate) => {
      const { data: product } = await productApi.create(data);
      return product;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products', 'list'] });
    },
  });
};

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, data }: { id: number; data: ProductUpdate }) => {
      const { data: product } = await productApi.update(id, data);
      return product;
    },
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ['products', 'list'] });
      queryClient.invalidateQueries({ queryKey: ['products', 'detail', id] });
    },
  });
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      const { data } = await productApi.delete(id);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products', 'list'] });
    },
  });
};
