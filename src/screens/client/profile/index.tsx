import { withMobileLayout } from '../../../shared/lib/responsive';
import { ProfileScreenWeb } from './ProfileScreen.web';
import { ProfileScreenMobile } from './ui/ProfileScreen.mobile';

export const ProfileScreen = withMobileLayout(ProfileScreenMobile, ProfileScreenWeb);
