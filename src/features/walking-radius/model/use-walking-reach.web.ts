import { useQuery } from '@tanstack/react-query';
import type { Venue } from '../../../entities/venue';
import { haversineDistanceMeters, type GeoPoint } from '../../../shared/lib/yandex/geo-utils';
import {
  buildWalkingCircleRing,
  resolveWalkingRadiusMeters,
} from '../../../shared/lib/yandex/walking-circle.web';
import { fetchVenueWalkingTimes } from '../../../shared/lib/yandex/walking-route.web';

import type { WalkingReachResult } from './walking-reach.types';

export type { WalkingReachResult } from './walking-reach.types';

export function useWalkingReach(
  origin: GeoPoint | null,
  minutes: number,
  venues: Venue[] | undefined,
  enabled = true,
) {
  const venueIdsKey = (venues ?? [])
    .map((v) => v.id)
    .sort((a, b) => a - b)
    .join(',');

  return useQuery({
    queryKey: ['walking-reach', origin?.lat, origin?.lon, minutes, venueIdsKey],
    enabled: enabled && origin != null && minutes > 0,
    staleTime: 5 * 60 * 1000,
    queryFn: async (): Promise<WalkingReachResult> => {
      if (!origin) throw new Error('origin required');
      const radiusMeters = await resolveWalkingRadiusMeters(origin, minutes);
      const [ring, venueDurationSeconds] = await Promise.all([
        Promise.resolve(buildWalkingCircleRing(origin, radiusMeters)),
        fetchVenueWalkingTimes(origin, venues ?? []),
      ]);
      return { ring, radiusMeters, venueDurationSeconds };
    },
  });
}

export function filterVenuesWithinWalkingMinutes(
  venues: Venue[] | undefined,
  venueDurationSeconds: Record<number, number | null> | undefined,
  minutes: number,
  origin?: GeoPoint | null,
  radiusMeters?: number,
): Venue[] {
  if (!venues?.length) return [];
  if (!venueDurationSeconds) return venues;

  const limitSeconds = minutes * 60;
  return venues.filter((venue) => {
    const duration = venueDurationSeconds[venue.id];
    if (duration != null) return duration <= limitSeconds;

    if (origin && radiusMeters && venue.latitude && venue.longitude) {
      const distance = haversineDistanceMeters(origin, {
        lat: parseFloat(venue.latitude),
        lon: parseFloat(venue.longitude),
      });
      return distance <= radiusMeters;
    }

    return true;
  });
}
