import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Button } from '../../../../../shared/ui/button';
import { theme } from '../../../../../shared/config/theme';

export interface SurpriseBoxFooterProps {
  priceLabel: string;
  ctaLabel: string;
  onPay: () => void;
}

export const SurpriseBoxFooter = ({ priceLabel, ctaLabel, onPay }: SurpriseBoxFooterProps) => {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.wrap,
        {
          paddingBottom: Math.max(insets.bottom, theme.spacing[3]),
        },
      ]}
    >
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
    paddingTop: theme.spacing[4],
    paddingHorizontal: theme.spacing[4],
    borderTopWidth: 1,
    borderTopColor: theme.client.colors.border,
    backgroundColor: theme.client.colors.card,
    ...theme.shadows.tight[3],
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
