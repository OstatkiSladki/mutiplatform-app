import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { createAsyncStorage } from '../../../shared/lib/storage';

export interface UserAddress {
  address: string;
  lat: number;
  lon: number;
}

/** Default — Ростов-на-Дону, ул. Текучева 140 */
export const DEFAULT_USER_ADDRESS: UserAddress = {
  address: 'ул. Текучева 140',
  lat: 47.2357,
  lon: 39.7015,
};

export const WALKING_RADIUS_OPTIONS_MIN = [5, 10, 15, 20, 30] as const;
export type WalkingRadiusMinutes = (typeof WALKING_RADIUS_OPTIONS_MIN)[number];
export const DEFAULT_WALKING_RADIUS_MIN: WalkingRadiusMinutes = 15;

interface AddressState {
  deliveryAddress: UserAddress;
  walkingRadiusMinutes: WalkingRadiusMinutes;
}

interface AddressActions {
  setDeliveryAddress: (next: UserAddress) => void;
  setWalkingRadiusMinutes: (minutes: WalkingRadiusMinutes) => void;
}

export const useUserAddressStore = create<AddressState & AddressActions>()(
  persist(
    (set) => ({
      deliveryAddress: DEFAULT_USER_ADDRESS,
      walkingRadiusMinutes: DEFAULT_WALKING_RADIUS_MIN,
      setDeliveryAddress: (next) => set({ deliveryAddress: next }),
      setWalkingRadiusMinutes: (minutes) => set({ walkingRadiusMinutes: minutes }),
    }),
    {
      name: 'user-delivery-address',
      storage: createAsyncStorage(),
    },
  ),
);

export const selectDeliveryAddress = (s: AddressState) => s.deliveryAddress;
export const selectWalkingRadiusMinutes = (s: AddressState) =>
  s.walkingRadiusMinutes ?? DEFAULT_WALKING_RADIUS_MIN;
