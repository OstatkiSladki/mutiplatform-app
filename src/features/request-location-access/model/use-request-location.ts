import { useState } from 'react';

export const useRequestLocation = (onSuccess?: () => void, onError?: (error: Error) => void) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const requestPermission = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      // In a real implementation this would call expo-location or react-native-permissions
      // e.g. const { status } = await Location.requestForegroundPermissionsAsync();
      // For now, we simulate an async permission request:
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const isGranted = true; // Simulated success

      if (isGranted) {
        onSuccess?.();
      } else {
        throw new Error('Location permission denied');
      }
    } catch (err) {
      const e = err instanceof Error ? err : new Error('Failed to request location');
      setError(e);
      onError?.(e);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    requestPermission,
    isLoading,
    error,
  };
};
