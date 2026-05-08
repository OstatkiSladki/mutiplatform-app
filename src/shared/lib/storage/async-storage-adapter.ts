import AsyncStorage from '@react-native-async-storage/async-storage';
import type { PersistStorage, StorageValue } from 'zustand/middleware';

export const createAsyncStorage = <T,>(): PersistStorage<T> => ({
  getItem: async (name) => {
    const raw = await AsyncStorage.getItem(name);
    return raw ? (JSON.parse(raw) as StorageValue<T>) : null;
  },
  setItem: async (name, value) => {
    await AsyncStorage.setItem(name, JSON.stringify(value));
  },
  removeItem: async (name) => {
    await AsyncStorage.removeItem(name);
  },
});
