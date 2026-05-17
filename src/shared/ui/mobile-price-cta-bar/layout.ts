import { StyleSheet } from 'react-native';
import { theme } from '../../config/theme';
import { BOOKING_CTA_HEIGHT } from '../booking-cta-button';

const PANEL_PAD_V = theme.spacing[3];

/** Bottom inset for scroll areas that sit above the fixed price+CTA strip (matches panel height). */
export const MOBILE_PRICE_CTA_SCROLL_PADDING =
  StyleSheet.hairlineWidth + PANEL_PAD_V + PANEL_PAD_V + BOOKING_CTA_HEIGHT;
