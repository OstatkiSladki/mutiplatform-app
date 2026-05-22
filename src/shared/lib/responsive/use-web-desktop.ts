import { Platform, useWindowDimensions } from 'react-native';
import { resolvePreferMobileWebLayout } from './resolve-mobile-web-layout';

/** Desktop web layout (header, footer, wide grids) — never true on native. */
export function useWebDesktop(): boolean {
  const { width } = useWindowDimensions();
  if (Platform.OS !== 'web') return false;
  return !resolvePreferMobileWebLayout(width);
}
