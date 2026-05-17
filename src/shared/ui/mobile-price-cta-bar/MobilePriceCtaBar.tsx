import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { BookingCtaButton, BOOKING_CTA_HEIGHT } from '../booking-cta-button';
import { theme } from '../../config/theme';

/** Booking strip paddings (24 / 12 px — `spacing[6]` / `spacing[3]`). */
const PANEL_PAD_H = theme.spacing[6];
const PANEL_PAD_V = theme.spacing[3];

export interface MobilePriceCtaBarProps {
  priceLabel: string;
  ctaTitle: string;
  onCtaPress: () => void;
  disabled?: boolean;
  /** Defaults to 24px (`spacing[6]`). */
  horizontalPadding?: number;
  accessibilityLabel?: string;
}

/** Price left + flat orange CTA right (cart footer, product screen). Rounded top corners only. */
export const MobilePriceCtaBar = ({
  priceLabel,
  ctaTitle,
  onCtaPress,
  disabled,
  horizontalPadding = PANEL_PAD_H,
  accessibilityLabel,
}: MobilePriceCtaBarProps) => (
  <View style={[styles.panel, { paddingHorizontal: horizontalPadding }]}>
    <View style={styles.row}>
      <Text style={styles.price} numberOfLines={1}>
        {priceLabel}
      </Text>
      <BookingCtaButton
        title={ctaTitle}
        disabled={disabled}
        onPress={onCtaPress}
        accessibilityLabel={accessibilityLabel ?? ctaTitle}
        style={styles.cta}
      />
    </View>
  </View>
);

const styles = StyleSheet.create({
  panel: {
    backgroundColor: theme.client.colors.card,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: theme.colors.neutral[8],
    borderTopLeftRadius: theme.client.radius.lg,
    borderTopRightRadius: theme.client.radius.lg,
    paddingTop: PANEL_PAD_V,
    paddingBottom: PANEL_PAD_V,
    overflow: 'hidden',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: BOOKING_CTA_HEIGHT,
  },
  price: {
    flex: 1,
    minWidth: 0,
    fontFamily: theme.client.typography.fontFamily,
    fontSize: theme.typography.fontSizes[10],
    lineHeight: theme.typography.fontSizes[10] * theme.typography.lineHeights.tight,
    fontWeight: '700',
    color: theme.client.colors.foreground,
  },
  cta: {
    flexShrink: 0,
  },
});
