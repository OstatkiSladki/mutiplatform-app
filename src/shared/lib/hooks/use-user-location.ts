import { useEffect, useState } from 'react';
import * as Location from 'expo-location';

export type UserLocationStatus =
  | 'idle'
  | 'requesting'
  | 'granted'
  | 'denied'
  | 'error';

export interface UserCoords {
  lat: number;
  lon: number;
}

export interface UseUserLocationResult {
  coords: UserCoords | null;
  status: UserLocationStatus;
}

export const useUserLocation = (): UseUserLocationResult => {
  const [coords, setCoords] = useState<UserCoords | null>(null);
  const [status, setStatus] = useState<UserLocationStatus>('idle');

  useEffect(() => {
    let cancelled = false;
    setStatus('requesting');

    (async () => {
      try {
        const { status: permission } =
          await Location.requestForegroundPermissionsAsync();
        if (cancelled) return;

        if (permission !== 'granted') {
          setStatus('denied');
          return;
        }

        const position = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.Balanced,
        });
        if (cancelled) return;

        setCoords({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
        setStatus('granted');
      } catch {
        if (!cancelled) setStatus('error');
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  return { coords, status };
};
