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
  const user = useAuthStore((s) => s.user);

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

  const shouldHydrateUser = hydrated && !!accessToken && !user;
  const { data, isLoading, isError } = useGetMe({
    accessToken,
    enabled: shouldHydrateUser,
  });

  useEffect(() => {
    if (!hydrated) return;
    if (!accessToken) {
      setInitializing(false);
      return;
    }
    if (isAuthenticated) {
      setInitializing(false);
      return;
    }
    if (shouldHydrateUser && isLoading) return;
    if (data) {
      setUser(data, accessToken ?? undefined);
    } else if (shouldHydrateUser && isError) {
      clearAuth();
    }
    setInitializing(false);
  }, [
    hydrated,
    accessToken,
    isAuthenticated,
    shouldHydrateUser,
    isLoading,
    isError,
    data,
    setUser,
    clearAuth,
    setInitializing,
  ]);

  if (isInitializing) return <Loader fullScreen />;
  return <>{children}</>;
};
