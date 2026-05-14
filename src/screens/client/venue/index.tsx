import { Platform } from 'react-native';
import { VenueScreen as WebVenueScreen } from './ui/VenueScreen';
import { VenueScreen as MobileVenueScreen } from './ui/VenueScreen.mobile';

export const VenueScreen =
  Platform.OS === 'web' ? WebVenueScreen : MobileVenueScreen;
