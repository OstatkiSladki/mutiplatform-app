import { YANDEX_MAPS_JS_KEY } from '../../config/env';
import { mapPool, type GeoPoint } from './geo-utils';
import { ensureYmapsReady } from './inject-yandex-script';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyRoute = any;

let ymapsPromise: Promise<AnyRoute> | null = null;

const getYmaps = () => {
  if (!YANDEX_MAPS_JS_KEY) {
    return Promise.reject(new Error('YANDEX_MAPS_JS_KEY is missing'));
  }
  ymapsPromise ??= ensureYmapsReady(YANDEX_MAPS_JS_KEY);
  return ymapsPromise;
};

const toLngLat = (point: GeoPoint): [number, number] => [point.lon, point.lat];

const readDurationSeconds = (routeResponse: AnyRoute): number | null => {
  const route = routeResponse?.toRoute?.() ?? routeResponse;
  const duration = route?.properties?.duration;
  if (typeof duration === 'number' && Number.isFinite(duration) && duration > 0) {
    return duration;
  }
  return null;
};

/** Pedestrian route duration via Yandex Maps JS Router API (`ymaps3.route`). */
export async function fetchWalkingDurationSeconds(
  origin: GeoPoint,
  destination: GeoPoint,
): Promise<number | null> {
  try {
    const ymaps3 = await getYmaps();
    const routes = await ymaps3.route({
      points: [toLngLat(origin), toLngLat(destination)],
      type: 'walking',
      bounds: false,
    });
    if (!routes?.[0]) return null;
    return readDurationSeconds(routes[0]);
  } catch {
    return null;
  }
}

export interface VenueWalkingTime {
  venueId: number;
  durationSeconds: number | null;
}

export async function fetchVenueWalkingTimes(
  origin: GeoPoint,
  venues: Array<{ id: number; latitude?: string | null; longitude?: string | null }>,
): Promise<Record<number, number | null>> {
  const withCoords = venues.filter((v) => v.latitude && v.longitude);
  const results = await mapPool(withCoords, 4, async (venue) => {
    const durationSeconds = await fetchWalkingDurationSeconds(origin, {
      lat: parseFloat(venue.latitude!),
      lon: parseFloat(venue.longitude!),
    });
    return { venueId: venue.id, durationSeconds };
  });

  const map: Record<number, number | null> = {};
  for (const row of results) {
    map[row.venueId] = row.durationSeconds;
  }
  return map;
}
