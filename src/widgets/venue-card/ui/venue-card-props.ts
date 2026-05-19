import type { StyleProp, ViewStyle } from 'react-native';
import type { Venue } from '../../../entities/venue';

export interface VenueCardProps {
  venue: Venue;
  onPress: (venueId: number) => void;
  /** Web desktop — home establishments row vs carousel. Native ignores. */
  webCardLayout?: 'carousel' | 'rowFluid';
  style?: StyleProp<ViewStyle>;
}
