import { withMobileLayout } from '../../../shared/lib/responsive';
import { BookingScreen as WebBookingScreen } from './ui/BookingScreen';
import { BookingScreen as MobileBookingScreen } from './ui/BookingScreen.mobile';

export const BookingScreen = withMobileLayout(MobileBookingScreen, WebBookingScreen);
