import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { cartApi } from '../api/cart-api';
import { orderApi } from '../api/order-api';
import type { CartItemCreate, OrderListParams, OrderStatusUpdate } from './types';
import { withMockFallback } from '../../../shared/dev/with-mock-fallback';
import { MOCK_ORDER_LIST_RESPONSE } from '../../../shared/dev/mocks';

const cartKeys = {
  root: ['cart'] as const,
};

const orderKeys = {
  list: (params?: OrderListParams) => ['orders', 'list', params ?? {}] as const,
  detail: (id: number) => ['orders', 'detail', id] as const,
  pickupCode: (id: number) => ['orders', id, 'pickup-code'] as const,
};

export const useCart = () =>
  useQuery({
    queryKey: cartKeys.root,
    queryFn: async () => {
      const { data } = await cartApi.get();
      return data;
    },
  });

export const useAddCartItem = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: CartItemCreate) => {
      const { data: item } = await cartApi.addItem(data);
      return item;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: cartKeys.root });
    },
  });
};

export const useClearCart = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      const { data } = await cartApi.clear();
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: cartKeys.root });
    },
  });
};

export const useOrders = (params?: OrderListParams) =>
  withMockFallback(
    useQuery({
      queryKey: orderKeys.list(params),
      queryFn: async () => {
        const { data } = await orderApi.list(params);
        return data;
      },
    }),
    MOCK_ORDER_LIST_RESPONSE,
  );

export const useOrder = (id: number) =>
  useQuery({
    queryKey: orderKeys.detail(id),
    queryFn: async () => {
      const { data } = await orderApi.getById(id);
      return data;
    },
    enabled: !!id,
  });

export const useCreateOrder = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      const { data } = await orderApi.create();
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders', 'list'] });
      queryClient.invalidateQueries({ queryKey: cartKeys.root });
    },
  });
};

export const usePickupCode = (orderId: number) =>
  useQuery({
    queryKey: orderKeys.pickupCode(orderId),
    queryFn: async () => {
      const { data } = await orderApi.getPickupCode(orderId);
      return data;
    },
    enabled: !!orderId,
  });

export const useUpdateOrderStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, data }: { id: number; data: OrderStatusUpdate }) => {
      const { data: order } = await orderApi.updateStatus(id, data);
      return order;
    },
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ['orders', 'list'] });
      queryClient.invalidateQueries({ queryKey: orderKeys.detail(id) });
    },
  });
};
