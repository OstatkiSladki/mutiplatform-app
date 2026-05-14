import { Platform } from 'react-native';
import { HomeScreen as WebHomeScreen } from './ui/HomeScreen';
import { HomeScreen as MobileHomeScreen } from './ui/HomeScreen.mobile';

export const HomeScreen =
  Platform.OS === 'web' ? WebHomeScreen : MobileHomeScreen;
