import { create } from 'zustand';
import { tokenStorage } from '../../../shared/lib/storage';
import type { UserProfileResponse } from './types';

interface AuthState {
  user: UserProfileResponse | null;
  isAuthenticated: boolean;
  isInitializing: boolean;
  accessToken: string | null;
}

interface AuthActions {
  setUser: (user: UserProfileResponse, accessToken?: string) => void;
  setAccessToken: (accessToken: string | null) => void;
  clearAuth: () => void;
  setInitializing: (value: boolean) => void;
}

export const useAuthStore = create<AuthState & AuthActions>()((set, get) => ({
  user: null,
  isAuthenticated: false,
  isInitializing: true,
  accessToken: null,

  setUser: (user, accessToken) => {
    const token = accessToken ?? get().accessToken;
    set({ user, isAuthenticated: true, accessToken: token });
    if (accessToken) tokenStorage.save(accessToken);
  },

  setAccessToken: (accessToken) => {
    set({ accessToken });
    if (accessToken) tokenStorage.save(accessToken);
    else tokenStorage.clear();
  },

  clearAuth: () => {
    set({ user: null, isAuthenticated: false, accessToken: null });
    tokenStorage.clear();
  },

  setInitializing: (value) => set({ isInitializing: value }),
}));
