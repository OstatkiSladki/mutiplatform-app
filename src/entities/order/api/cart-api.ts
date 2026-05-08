import { apiClient } from '../../../shared/api';
import type { Cart, CartItemCreate } from '../model/types';

export const cartApi = {
  get: () =>
    apiClient.get<Cart>('/orders/api/v1/cart'),

  addItem: (data: CartItemCreate) =>
    apiClient.post<void>('/orders/api/v1/cart/items', data),

  clear: () =>
    apiClient.delete<void>('/orders/api/v1/cart'),
};
