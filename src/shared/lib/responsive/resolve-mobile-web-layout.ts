import { theme } from '../../config/theme';

/** True when the web client should render the native-style mobile layout. */
export function resolvePreferMobileWebLayout(width: number): boolean {
  return width < theme.layout.clientMobileWebMaxWidth;
}
