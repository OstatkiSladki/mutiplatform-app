import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { BookingCtaButton } from '../../../../../shared/ui/booking-cta-button';
import { theme } from '../../../../../shared/config/theme';

/** Inline checkout row for Surprise Box — scrolls with content (not fixed above tab bar). */
export interface SurpriseBoxCheckoutBarProps {
  priceLabel: string;
  ctaLabel: string;
  onPay: () => void;
}

export const SurpriseBoxCheckoutBar = ({ priceLabel, ctaLabel, onPay }: SurpriseBoxCheckoutBarProps) => (
  <View style={styles.wrap}>
    <View style={styles.row}>
      <Text style={styles.price}>{priceLabel}</Text>
      <BookingCtaButton title={ctaLabel} onPress={onPay} style={styles.cta} />
    </View>
  </View>
);

const styles = StyleSheet.create({
  wrap: {
    marginTop: theme.spacing[4],
    paddingTop: theme.spacing[4],
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: theme.colors.neutral[8],
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: theme.spacing[4],
  },
  price: {
    flexShrink: 1,
    fontFamily: theme.client.typography.fontFamily,
    fontWeight: '700',
    fontSize: theme.typography.fontSizes[10],
    lineHeight: theme.typography.fontSizes[10] * theme.typography.lineHeights.tight,
    color: theme.client.colors.foreground,
  },
  cta: {
    flexGrow: 1,
    maxWidth: '52%',
  },
});
