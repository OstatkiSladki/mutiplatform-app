import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from '../../../../../shared/ui/button';
import { theme } from '../../../../../shared/config/theme';
import { PickupTimeSelector } from '../../../../../shared/ui/mobile/pickup-time-selector';
import { useMobileBottomNavHeight } from '../../../../../widgets/mobile-bottom-nav';

export interface SurpriseBoxFooterProps {
  pickupTitle: string;
  pickupLabel: string;
  onPickupPress: () => void;
  priceLabel: string;
  ctaLabel: string;
  onPay: () => void;
}

export const SurpriseBoxFooter = ({
  pickupTitle,
  pickupLabel,
  onPickupPress,
  priceLabel,
  ctaLabel,
  onPay,
}: SurpriseBoxFooterProps) => {
  const bottomPad = useMobileBottomNavHeight() + theme.spacing[2];

  return (
    <View style={[styles.wrap, { paddingBottom: bottomPad }]}>
      <PickupTimeSelector title={pickupTitle} value={pickupLabel} onPress={onPickupPress} />
      <View style={styles.row}>
        <Text style={styles.price}>{priceLabel}</Text>
        <Button
          title={ctaLabel}
          variant="primary"
          size="large"
          onPress={onPay}
          style={styles.cta}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrap: {
    gap: theme.spacing[3],
    paddingTop: theme.spacing[3],
    paddingHorizontal: theme.spacing[4],
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: theme.colors.neutral[8],
    backgroundColor: theme.client.colors.card,
    marginBottom: 0,
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
