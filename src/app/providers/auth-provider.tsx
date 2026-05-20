import React, { ReactNode, useEffect, useRef } from 'react';
import { authApi } from '../../entities/auth/api/auth-api';
import { useAuthStore } from '../../entities/auth/model/store';
import { useCartStore } from '../../entities/order';
import { tokenStorage } from '../../shared/lib/storage';
import { Loader } from '../../shared/ui/loader';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const setUser = useAuthStore((s) => s.setUser);
  const setAccessToken = useAuthStore((s) => s.setAccessToken);
  const clearAuth = useAuthStore((s) => s.clearAuth);
  const setInitializing = useAuthStore((s) => s.setInitializing);
  const isInitializing = useAuthStore((s) => s.isInitializing);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  const prevAuthRef = useRef(isAuthenticated);

  useEffect(() => {
    if (prevAuthRef.current && !isAuthenticated) {
      useCartStore.getState().clearAll();
    }
    prevAuthRef.current = isAuthenticated;
  }, [isAuthenticated]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const stored = await tokenStorage.load();
        if (cancelled) return;
        if (stored) setAccessToken(stored);
        try {
          // Boot session restore. _skipAuthRefresh keeps this call out of the
          // refresh-retry chain so AuthProvider stays the sole auth authority
          // during boot; the interceptor must not wipe state here.
          const { data } = await authApi.getMe({ _skipAuthRefresh: true });
          if (!cancelled) {
            setUser(data, useAuthStore.getState().accessToken ?? undefined);
          }
        } catch {
          if (!cancelled) clearAuth();
        }
      } finally {
        if (!cancelled) setInitializing(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [setAccessToken, setUser, clearAuth, setInitializing]);

  if (isInitializing) return <Loader fullScreen />;
  return <>{children}</>;
};
