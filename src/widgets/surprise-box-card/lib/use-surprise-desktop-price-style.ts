import { useMemo } from 'react';
import type { TextStyle } from 'react-native';
import { useBreakpoint } from '../../../shared/lib/responsive';
import { theme } from '../../../shared/config/theme';
import { clientTextSurpriseDesktopPriceDisplay } from '../../../shared/config/theme/client-text-styles';

/**
 * Цена в десктоп-карточке: до 48px SemiBold на wide, меньше на узких desktop-колонках.
 */
export function useSurpriseDesktopPriceStyle(): TextStyle {
  const { isAtLeast } = useBreakpoint();

  return useMemo(() => {
    const fontSize = isAtLeast('wide')
      ? theme.typography.fontSizes[18]
      : isAtLeast('lg')
        ? theme.typography.fontSizes[13]
        : theme.typography.fontSizes[10];

    return {
      ...clientTextSurpriseDesktopPriceDisplay,
      fontSize,
      lineHeight: fontSize,
    };
  }, [isAtLeast]);
}
