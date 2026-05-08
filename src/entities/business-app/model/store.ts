import { create } from 'zustand';

import { mockForecast } from '../dev/forecast';
import { mockOffers } from '../dev/offers';
import { mockOrders } from '../dev/orders';
import type { BusinessOffer, BusinessOrder, ForecastItem, OrderStatus } from './types';

type OfferPatch = Partial<Pick<BusinessOffer, 'price' | 'stock' | 'oldPrice' | 'name'>>;

interface BusinessAppState {
  forecast: ForecastItem[];
  offers: BusinessOffer[];
  orders: BusinessOrder[];
  addOfferFromForecast: (item: ForecastItem) => void;
  publishOffer: (id: string) => void;
  removeOffer: (id: string) => void;
  updateOffer: (id: string, patch: OfferPatch) => void;
  advanceOrder: (id: string) => void;
  cancelOrder: (id: string) => void;
  addOrder: (o: Omit<BusinessOrder, 'id' | 'minutesAgo'>) => void;
}

const NEXT_ORDER_STATUS: Partial<Record<OrderStatus, OrderStatus>> = {
  'Ожидает': 'Подтверждён',
  'Подтверждён': 'Выполнен',
};

export const useBusinessAppStore = create<BusinessAppState>((set) => ({
  forecast: __DEV__ ? mockForecast : [],
  offers: __DEV__ ? mockOffers : [],
  orders: __DEV__ ? mockOrders : [],

  addOfferFromForecast: (item) =>
    set((state) => {
      if (state.offers.some((o) => o.sku === item.sku)) return state;
      const newOffer: BusinessOffer = {
        id: `o${Date.now()}`,
        name: item.name,
        sku: item.sku,
        category: item.category,
        stock: item.stock,
        oldPrice: 400,
        price: 240,
        status: 'Черновик',
      };
      return { offers: [newOffer, ...state.offers] };
    }),

  publishOffer: (id) =>
    set((state) => ({
      offers: state.offers.map((o) => (o.id === id ? { ...o, status: 'Опубликовано' } : o)),
    })),

  removeOffer: (id) =>
    set((state) => ({ offers: state.offers.filter((o) => o.id !== id) })),

  updateOffer: (id, patch) =>
    set((state) => ({
      offers: state.offers.map((o) => (o.id === id ? { ...o, ...patch } : o)),
    })),

  advanceOrder: (id) =>
    set((state) => ({
      orders: state.orders.map((o) => {
        if (o.id !== id) return o;
        const nextStatus = NEXT_ORDER_STATUS[o.status];
        return nextStatus ? { ...o, status: nextStatus } : o;
      }),
    })),

  cancelOrder: (id) =>
    set((state) => ({
      orders: state.orders.map((o) =>
        o.id === id && o.status !== 'Выполнен' ? { ...o, status: 'Отменён' } : o
      ),
    })),

  addOrder: (o) =>
    set((state) => ({
      orders: [{ ...o, id: String(Date.now()), minutesAgo: 0 }, ...state.orders],
    })),
}));
