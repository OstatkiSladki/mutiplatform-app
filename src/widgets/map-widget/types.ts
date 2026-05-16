import type { ViewStyle } from 'react-native';
import type { Venue } from '../../entities/venue';

export interface MapWidgetProps {
  venues?: Venue[];
  style?: ViewStyle;
  initialCenter?: { lat: number; lon: number };
  onVenuePress?: (venue: Venue) => void;
}
