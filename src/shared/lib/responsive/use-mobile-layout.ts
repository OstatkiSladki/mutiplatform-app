import { Platform, useWindowDimensions } from 'react-native';
import { theme } from '../../config/theme';

/**
 * True when the polished native-app layout should render:
 * always on native; on web only below the md breakpoint (768px).
 */
export function useMobileLayout(): boolean {
  const { width } = useWindowDimensions();
  if (Platform.OS !== 'web') return true;
  return width < theme.breakpoints.md;
}
