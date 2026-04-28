import { create } from 'zustand';
import type { UserProfileResponse } from './types';

interface AuthState {
  user: UserProfileResponse | null;
  isAuthenticated: boolean;
  isInitializing: boolean;
  accessToken: string | null;
}

interface AuthActions {
  setUser: (user: UserProfileResponse, accessToken?: string) => void;
  clearAuth: () => void;
  setInitializing: (value: boolean) => void;
}

export const useAuthStore = create<AuthState & AuthActions>()((set) => ({
  user: null,
  isAuthenticated: false,
  isInitializing: true,
  accessToken: null,

  setUser: (user, accessToken) =>
    set({ user, isAuthenticated: true, accessToken: accessToken ?? null }),

  clearAuth: () =>
    set({ user: null, isAuthenticated: false, accessToken: null }),

  setInitializing: (value) =>
    set({ isInitializing: value }),
}));
