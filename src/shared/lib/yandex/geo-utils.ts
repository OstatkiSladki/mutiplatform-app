export interface GeoPoint {
  lat: number;
  lon: number;
}

const EARTH_RADIUS_M = 6_371_000;

const toRad = (deg: number) => (deg * Math.PI) / 180;
const toDeg = (rad: number) => (rad * 180) / Math.PI;

/** Destination point from origin, bearing (deg clockwise from north) and distance (m). */
export function destinationPoint(
  origin: GeoPoint,
  bearingDeg: number,
  distanceM: number,
): GeoPoint {
  const bearing = toRad(bearingDeg);
  const lat1 = toRad(origin.lat);
  const lon1 = toRad(origin.lon);
  const angular = distanceM / EARTH_RADIUS_M;

  const lat2 = Math.asin(
    Math.sin(lat1) * Math.cos(angular) + Math.cos(lat1) * Math.sin(angular) * Math.cos(bearing),
  );
  const lon2 =
    lon1 +
    Math.atan2(
      Math.sin(bearing) * Math.sin(angular) * Math.cos(lat1),
      Math.cos(angular) - Math.sin(lat1) * Math.sin(lat2),
    );

  return { lat: toDeg(lat2), lon: toDeg(lon2) };
}

/** LngLat ring for Yandex Maps — closed polygon. */
export function closeRing(ring: [number, number][]): [number, number][] {
  if (ring.length === 0) return ring;
  const [firstLon, firstLat] = ring[0];
  const [lastLon, lastLat] = ring[ring.length - 1];
  if (firstLon === lastLon && firstLat === lastLat) return ring;
  return [...ring, ring[0]];
}

/**
 * Circle ring that looks visually round on Web Mercator at the given latitude.
 * Uses local meters → degree conversion (better than pure geodesic for map overlay).
 */
export function buildVisualCircleRing(
  origin: GeoPoint,
  radiusMeters: number,
  segments = 128,
): [number, number][] {
  const latRad = toRad(origin.lat);
  const metersPerDegLat =
    111_132.954 - 559.822 * Math.cos(2 * latRad) + 1.175 * Math.cos(4 * latRad);
  const metersPerDegLon = Math.max(1, 111_132.954 * Math.cos(latRad));

  const ring: [number, number][] = [];
  for (let i = 0; i < segments; i += 1) {
    const bearing = toRad((360 * i) / segments);
    const eastM = radiusMeters * Math.sin(bearing);
    const northM = radiusMeters * Math.cos(bearing);
    ring.push([origin.lon + eastM / metersPerDegLon, origin.lat + northM / metersPerDegLat]);
  }

  return closeRing(ring);
}

/** Great-circle distance in meters. */
export function haversineDistanceMeters(a: GeoPoint, b: GeoPoint): number {
  const lat1 = toRad(a.lat);
  const lat2 = toRad(b.lat);
  const dLat = lat2 - lat1;
  const dLon = toRad(b.lon - a.lon);
  const sinLat = Math.sin(dLat / 2);
  const sinLon = Math.sin(dLon / 2);
  const h = sinLat * sinLat + Math.cos(lat1) * Math.cos(lat2) * sinLon * sinLon;
  return 2 * EARTH_RADIUS_M * Math.asin(Math.min(1, Math.sqrt(h)));
}

export async function mapPool<TItem, TResult>(
  items: TItem[],
  limit: number,
  mapper: (item: TItem, index: number) => Promise<TResult>,
): Promise<TResult[]> {
  const results: TResult[] = new Array(items.length);
  let cursor = 0;

  const workers = Array.from({ length: Math.min(limit, items.length) }, async () => {
    while (cursor < items.length) {
      const index = cursor++;
      results[index] = await mapper(items[index], index);
    }
  });

  await Promise.all(workers);
  return results;
}
