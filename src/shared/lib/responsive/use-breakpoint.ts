import { Platform, useWindowDimensions } from 'react-native';
import { theme } from '../../config/theme';

export type BreakpointKey = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface BreakpointInfo {
  width: number;
  height: number;
  bp: BreakpointKey;
  isWeb: boolean;
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  isAtLeast: (key: Exclude<BreakpointKey, 'xs'>) => boolean;
}

function resolveBp(width: number): BreakpointKey {
  const { sm, md, lg, xl } = theme.breakpoints;
  if (width >= xl) return 'xl';
  if (width >= lg) return 'lg';
  if (width >= md) return 'md';
  if (width >= sm) return 'sm';
  return 'xs';
}

export function useBreakpoint(): BreakpointInfo {
  const { width, height } = useWindowDimensions();
  const { md, lg } = theme.breakpoints;

  return {
    width,
    height,
    bp: resolveBp(width),
    isWeb: Platform.OS === 'web',
    isMobile: width < md,
    isTablet: width >= md && width < lg,
    isDesktop: width >= lg,
    isAtLeast: (key) => width >= theme.breakpoints[key],
  };
}
