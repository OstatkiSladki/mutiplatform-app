import React from 'react';
import { StyleSheet, View } from 'react-native';
import {
  MobilePriceCtaBar,
  MOBILE_PRICE_CTA_SCROLL_PADDING,
} from '../../../../../shared/ui/mobile-price-cta-bar';

/** Matches fixed footer height for list bottom inset. */
export const BOOKING_STICKY_SCROLL_PADDING = MOBILE_PRICE_CTA_SCROLL_PADDING;

export interface BasketFooterProps {
  totalLabel: string;
  ctaTitle: string;
  onCheckout: () => void;
  disabled?: boolean;
  horizontalPadding?: number;
}

/**
 * Tab scene layout ends above tab_menu — anchor `bottom: 0` is flush with the tab bar top edge.
 */
export const BasketFooter = ({
  totalLabel,
  ctaTitle,
  onCheckout,
  disabled,
  horizontalPadding,
}: BasketFooterProps) => {
  return (
    <View pointerEvents="box-none" style={styles.anchor}>
      <MobilePriceCtaBar
        priceLabel={totalLabel}
        ctaTitle={ctaTitle}
        onCtaPress={onCheckout}
        disabled={disabled}
        horizontalPadding={horizontalPadding}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  anchor: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'transparent',
  },
});
