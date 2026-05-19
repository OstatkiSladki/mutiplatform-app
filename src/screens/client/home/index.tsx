import { withMobileLayout } from '../../../shared/lib/responsive';
import { HomeScreen as WebHomeScreen } from './ui/HomeScreen';
import { HomeScreen as MobileHomeScreen } from './ui/HomeScreen.mobile';

export const HomeScreen = withMobileLayout(MobileHomeScreen, WebHomeScreen);
