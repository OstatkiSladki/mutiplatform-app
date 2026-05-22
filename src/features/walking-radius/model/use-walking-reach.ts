import { useQuery } from '@tanstack/react-query';
import type { Venue } from '../../../entities/venue';
import type { GeoPoint } from '../../../shared/lib/yandex/geo-utils';
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
    queryFn: async (): Promise<WalkingReachResult> => ({
      ring: [],
      radiusMeters: 0,
      venueDurationSeconds: {},
    }),
  });
}

export function filterVenuesWithinWalkingMinutes(
  venues: Venue[] | undefined,
  _venueDurationSeconds: Record<number, number | null> | undefined,
  _minutes: number,
  _origin?: GeoPoint | null,
  _radiusMeters?: number,
): Venue[] {
  return venues ?? [];
}
