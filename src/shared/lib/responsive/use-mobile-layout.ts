import { Platform, useWindowDimensions } from 'react-native';
import { resolvePreferMobileWebLayout } from './resolve-mobile-web-layout';

/**
 * True when the polished native-app layout should render:
 * always on native; on web when viewport width is below clientMobileWebMaxWidth (500px).
 */
export function useMobileLayout(): boolean {
  const { width } = useWindowDimensions();
  if (Platform.OS !== 'web') return true;
  return resolvePreferMobileWebLayout(width);
}
