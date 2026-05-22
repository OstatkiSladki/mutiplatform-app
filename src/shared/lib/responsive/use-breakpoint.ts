import { Platform, useWindowDimensions } from 'react-native';
import { theme } from '../../config/theme';
import { resolvePreferMobileWebLayout } from './resolve-mobile-web-layout';

export type BreakpointKey = 'xs' | 'sm' | 'md' | 'lg' | 'wide' | 'xl';

export interface BreakpointInfo {
  width: number;
  height: number;
  bp: BreakpointKey;
  isWeb: boolean;
  /** Desktop web chrome — viewport ≥ clientMobileWebMaxWidth (500px). */
  isWebDesktop: boolean;
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  isAtLeast: (key: Exclude<BreakpointKey, 'xs'>) => boolean;
}

function resolveBp(width: number): BreakpointKey {
  const { sm, md, lg, wide, xl } = theme.breakpoints;
  if (width >= xl) return 'xl';
  if (width >= wide) return 'wide';
  if (width >= lg) return 'lg';
  if (width >= md) return 'md';
  if (width >= sm) return 'sm';
  return 'xs';
}

export function useBreakpoint(): BreakpointInfo {
  const { width, height } = useWindowDimensions();
  const { md, lg } = theme.breakpoints;
  const isWeb = Platform.OS === 'web';
  const preferMobileWeb = isWeb && resolvePreferMobileWebLayout(width);

  return {
    width,
    height,
    bp: resolveBp(width),
    isWeb,
    isWebDesktop: isWeb && !preferMobileWeb,
    isMobile: isWeb ? preferMobileWeb : width < md,
    isTablet: isWeb
      ? !preferMobileWeb && width >= theme.layout.clientMobileWebMaxWidth && width < lg
      : width >= md && width < lg,
    isDesktop: width >= lg,
    isAtLeast: (key) => width >= theme.breakpoints[key],
  };
}
