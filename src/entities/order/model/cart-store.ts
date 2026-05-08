import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { createAsyncStorage } from '../../../shared/lib/storage';
import { DEV_MOCKS_ENABLED } from '../../../shared/dev';
import { MOCK_CARTS } from '../../../shared/dev/mocks';

export interface DraftCartItem {
  productId: number | string;
  offerId: number;
  name: string;
  price: number;
  quantity: number;
  imageUrl?: string;
  maxQuantity?: number;
}

export interface DraftVenueCart {
  venueId: number | string;
  venueName: string;
  items: DraftCartItem[];
}

interface CartState {
  carts: Record<string, DraftVenueCart>;
}

interface CartActions {
  addItem: (
    venueId: number | string,
    venueName: string,
    item: Omit<DraftCartItem, 'quantity'> & { quantity?: number },
  ) => void;
  setQuantity: (
    venueId: number | string,
    productId: DraftCartItem['productId'],
    quantity: number,
  ) => void;
  removeItem: (
    venueId: number | string,
    productId: DraftCartItem['productId'],
  ) => void;
  clearVenueCart: (venueId: number | string) => void;
  clearAll: () => void;
}

const key = (id: number | string) => String(id);

export const useCartStore = create<CartState & CartActions>()(
  persist(
    (set) => ({
      carts: DEV_MOCKS_ENABLED ? (MOCK_CARTS as CartState['carts']) : {},

      addItem: (venueId, venueName, item) =>
        set((state) => {
          const id = key(venueId);
          const current = state.carts[id] ?? { venueId, venueName, items: [] };
          const existing = current.items.find((i) => i.productId === item.productId);
          const addQty = item.quantity ?? 1;
          const cap = item.maxQuantity ?? existing?.maxQuantity;

          const clamp = (q: number) => (cap != null ? Math.min(q, cap) : q);

          const items = existing
            ? current.items.map((i) =>
                i.productId === item.productId
                  ? { ...i, quantity: clamp(i.quantity + addQty) }
                  : i,
              )
            : [...current.items, { ...item, quantity: clamp(addQty) }];

          return {
            carts: {
              ...state.carts,
              [id]: { ...current, venueName, items },
            },
          };
        }),

      setQuantity: (venueId, productId, quantity) =>
        set((state) => {
          const id = key(venueId);
          const current = state.carts[id];
          if (!current) return state;

          if (quantity <= 0) {
            const items = current.items.filter((i) => i.productId !== productId);
            if (items.length === 0) {
              const { [id]: _removed, ...rest } = state.carts;
              return { carts: rest };
            }
            return { carts: { ...state.carts, [id]: { ...current, items } } };
          }

          const items = current.items.map((i) =>
            i.productId === productId ? { ...i, quantity } : i,
          );
          return { carts: { ...state.carts, [id]: { ...current, items } } };
        }),

      removeItem: (venueId, productId) =>
        set((state) => {
          const id = key(venueId);
          const current = state.carts[id];
          if (!current) return state;
          const items = current.items.filter((i) => i.productId !== productId);
          if (items.length === 0) {
            const { [id]: _removed, ...rest } = state.carts;
            return { carts: rest };
          }
          return { carts: { ...state.carts, [id]: { ...current, items } } };
        }),

      clearVenueCart: (venueId) =>
        set((state) => {
          const id = key(venueId);
          const { [id]: _removed, ...rest } = state.carts;
          return { carts: rest };
        }),

      clearAll: () => set({ carts: {} }),
    }),
    {
      name: 'cart-store',
      storage: createAsyncStorage<CartState>(),
      partialize: (state) => ({ carts: state.carts }) as CartState,
    },
  ),
);

export const selectVenueCart =
  (venueId: number | string) =>
  (state: CartState): DraftVenueCart | undefined =>
    state.carts[key(venueId)];

export const selectVenueTotal =
  (venueId: number | string) =>
  (state: CartState): number => {
    const cart = state.carts[key(venueId)];
    if (!cart) return 0;
    return cart.items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  };

export const selectVenueItemCount =
  (venueId: number | string) =>
  (state: CartState): number => {
    const cart = state.carts[key(venueId)];
    if (!cart) return 0;
    return cart.items.reduce((sum, i) => sum + i.quantity, 0);
  };

export const selectTotalItemCount = (state: CartState): number =>
  Object.values(state.carts).reduce(
    (sum, cart) => sum + cart.items.reduce((s, i) => s + i.quantity, 0),
    0,
  );
