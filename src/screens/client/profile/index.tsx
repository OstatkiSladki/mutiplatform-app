import { Platform } from 'react-native';
import { ProfileScreenWeb } from './ProfileScreen.web';
import { ProfileScreenMobile } from './ui/ProfileScreen.mobile';

export const ProfileScreen = Platform.OS === 'web' ? ProfileScreenWeb : ProfileScreenMobile;
