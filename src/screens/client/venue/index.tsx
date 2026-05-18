import { withMobileLayout } from '../../../shared/lib/responsive';
import { VenueScreen as WebVenueScreen } from './ui/VenueScreen';
import { VenueScreen as MobileVenueScreen } from './ui/VenueScreen.mobile';

export const VenueScreen = withMobileLayout(MobileVenueScreen, WebVenueScreen);
