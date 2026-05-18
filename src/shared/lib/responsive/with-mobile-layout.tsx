import React, { ComponentType } from 'react';
import { useMobileLayout } from './use-mobile-layout';

/**
 * Picks the Mobile vs Desktop screen variant at render time.
 * Re-renders on resize/orientation via useMobileLayout's useWindowDimensions.
 */
export function withMobileLayout<P extends object>(
  Mobile: ComponentType<P>,
  Desktop: ComponentType<P>,
): ComponentType<P> {
  const Selector = (props: P) => {
    const C = useMobileLayout() ? Mobile : Desktop;
    return <C {...props} />;
  };
  Selector.displayName = 'WithMobileLayout';
  return Selector;
}
