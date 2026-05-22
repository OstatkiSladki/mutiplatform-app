import type { ViewStyle } from 'react-native';
import type { Venue } from '../../entities/venue';
import type { WalkingRadiusMinutes } from '../../entities/location';

export interface MapWidgetProps {
  venues?: Venue[];
  style?: ViewStyle;
  initialCenter?: { lat: number; lon: number };
  userLocation?: { lat: number; lon: number; address?: string };
  walkingRadiusRing?: [number, number][];
  walkingRadiusMinutes?: WalkingRadiusMinutes;
  onWalkingRadiusChange?: (minutes: WalkingRadiusMinutes) => void;
  onVenuePress?: (venue: Venue) => void;
}
