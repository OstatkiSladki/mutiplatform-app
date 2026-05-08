import React, { ReactNode, useEffect, useRef, useState } from 'react';
import { useGetMe } from '../../entities/auth/model/hooks';
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
  const accessToken = useAuthStore((s) => s.accessToken);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  const [hydrated, setHydrated] = useState(false);
  const prevAuthRef = useRef(isAuthenticated);

  useEffect(() => {
    if (prevAuthRef.current && !isAuthenticated) {
      useCartStore.getState().clearAll();
    }
    prevAuthRef.current = isAuthenticated;
  }, [isAuthenticated]);

  useEffect(() => {
    let cancelled = false;
    tokenStorage.load().then((token) => {
      if (cancelled) return;
      if (token) setAccessToken(token);
      setHydrated(true);
    });
    return () => {
      cancelled = true;
    };
  }, [setAccessToken]);

  // Try to fetch the current user only after hydration. If there is no token,
  // we still attempt — the API may rely on cookies for auth.
  const { data, isLoading, isError } = useGetMe({ enabled: hydrated });

  useEffect(() => {
    if (!hydrated) return;
    if (isLoading) return;
    if (data) {
      setUser(data, accessToken ?? undefined);
    } else if (isError) {
      clearAuth();
    }
    setInitializing(false);
  }, [hydrated, isLoading, isError, data, accessToken, setUser, clearAuth, setInitializing]);

  if (isInitializing) return <Loader fullScreen />;
  return <>{children}</>;
};
