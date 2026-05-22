import { buildVisualCircleRing, destinationPoint, type GeoPoint } from './geo-utils';
import { fetchWalkingDurationSeconds } from './walking-route.web';

const CIRCLE_SEGMENTS = 128;

/** Resolves walking distance (m) for target minutes via Yandex pedestrian routing. */
export async function resolveWalkingRadiusMeters(
  origin: GeoPoint,
  minutes: number,
): Promise<number> {
  const targetSeconds = minutes * 60;
  let low = 50;
  let high = Math.max(400, minutes * 130);
  let best = minutes * 80;

  for (let pass = 0; pass < 8; pass += 1) {
    const mid = (low + high) / 2;
    const dest = destinationPoint(origin, 90, mid);
    const durationSeconds = await fetchWalkingDurationSeconds(origin, dest);
    if (durationSeconds == null) {
      high = mid;
      continue;
    }
    best = mid;
    if (durationSeconds <= targetSeconds) low = mid;
    else high = mid;
  }

  return Math.max(50, best);
}

/** Smooth visual circle polygon [lon, lat][] for map overlay. */
export function buildWalkingCircleRing(
  origin: GeoPoint,
  radiusMeters: number,
): [number, number][] {
  return buildVisualCircleRing(origin, radiusMeters, CIRCLE_SEGMENTS);
}

export async function buildWalkingCircleRingForMinutes(
  origin: GeoPoint,
  minutes: number,
): Promise<[number, number][]> {
  const radiusMeters = await resolveWalkingRadiusMeters(origin, minutes);
  return buildWalkingCircleRing(origin, radiusMeters);
}
