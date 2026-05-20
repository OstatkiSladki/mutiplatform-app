import { Platform } from 'react-native';
import * as SecureStore from 'expo-secure-store';

const ACCESS_TOKEN_KEY = 'auth.accessToken';

// Web: SecureStore is not reliable on web (limited platform support, loses
// state on hard reload). Use localStorage so Bearer header survives reload.
// Native: SecureStore (Keychain / Keystore).
const isWeb = Platform.OS === 'web';
const hasWindow = typeof window !== 'undefined' && !!window.localStorage;

export const tokenStorage = {
  async load(): Promise<string | null> {
    try {
      if (isWeb) {
        return hasWindow ? window.localStorage.getItem(ACCESS_TOKEN_KEY) : null;
      }
      return await SecureStore.getItemAsync(ACCESS_TOKEN_KEY);
    } catch {
      return null;
    }
  },

  async save(token: string): Promise<void> {
    try {
      if (isWeb) {
        if (hasWindow) window.localStorage.setItem(ACCESS_TOKEN_KEY, token);
        return;
      }
      await SecureStore.setItemAsync(ACCESS_TOKEN_KEY, token);
    } catch {
      // Silent: token persistence is best-effort; cookie-based auth keeps working.
    }
  },

  async clear(): Promise<void> {
    try {
      if (isWeb) {
        if (hasWindow) window.localStorage.removeItem(ACCESS_TOKEN_KEY);
        return;
      }
      await SecureStore.deleteItemAsync(ACCESS_TOKEN_KEY);
    } catch {
      // Silent
    }
  },
};
