import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { selectVenueItemCount, selectVenueTotal, useCartStore } from '../../../entities/order';
import { BookingCtaButton } from '../../../shared/ui/booking-cta-button';
import { formatPrice } from '../../../shared/lib/format';
import { theme } from '../../../shared/config/theme';

export interface CartDockProps {
  venueId: number;
  onPressCheckout: () => void;
}

/** Venue dock — shared `BookingCtaButton`, pinned above tab bar. */
export const CartDock = ({ venueId, onPressCheckout }: CartDockProps) => {
  const { t } = useTranslation('catalog');
  const total = useCartStore(selectVenueTotal(venueId));
  const count = useCartStore(selectVenueItemCount(venueId));

  if (count === 0) return null;

  return (
    <View style={[styles.dock, { bottom: theme.spacing[3] }]}>
      <View style={styles.dockInfo}>
        <Text style={styles.dockCount}>{t('cart.venueItemsCount', { count })}</Text>
        <Text style={styles.dockTotal}>{formatPrice(total)}</Text>
      </View>
      <BookingCtaButton
        title={t('bookCta')}
        onPress={onPressCheckout}
        accessibilityLabel={t('bookCta')}
        style={styles.dockCta}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  dock: {
    position: 'absolute',
    left: theme.spacing[3],
    right: theme.spacing[3],
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing[3],
    backgroundColor: theme.client.colors.card,
    borderRadius: theme.client.radius.card,
    paddingHorizontal: theme.spacing[4],
    paddingVertical: theme.spacing[3],
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: theme.colors.neutral[8],
    ...theme.client.shadows.card,
  },
  dockInfo: {
    flex: 1,
    minWidth: 0,
  },
  dockCount: {
    fontFamily: theme.client.typography.fontFamily,
    fontSize: theme.typography.fontSizes[3],
    color: theme.client.colors.mutedForeground,
  },
  dockTotal: {
    fontFamily: theme.client.typography.fontFamily,
    fontWeight: '700',
    fontSize: theme.typography.fontSizes[7],
    color: theme.client.colors.foreground,
  },
  dockCta: {
    flexShrink: 0,
  },
});
