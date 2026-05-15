import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Button } from '../../../../../shared/ui/button';
import { theme } from '../../../../../shared/config/theme';

export interface BasketFooterProps {
  totalLabel: string;
  ctaTitle: string;
  onCheckout: () => void;
  disabled?: boolean;
  horizontalPadding?: number;
}

export const BasketFooter = ({
  totalLabel,
  ctaTitle,
  onCheckout,
  disabled,
  horizontalPadding = theme.spacing[4],
}: BasketFooterProps) => {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.wrap,
        {
          paddingHorizontal: horizontalPadding,
          paddingBottom: Math.max(insets.bottom, theme.spacing[2]),
        },
      ]}
    >
      <View style={styles.row}>
        <Text style={styles.total} numberOfLines={1}>
          {totalLabel}
        </Text>
        <Button
          title={ctaTitle}
          variant="primary"
          size="large"
          disabled={disabled}
          onPress={onCheckout}
          style={styles.cta}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrap: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: theme.colors.neutral[8],
    backgroundColor: theme.client.colors.card,
    paddingTop: theme.spacing[3],
    ...theme.shadows.tight[9],
    shadowOpacity: 0.12,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing[4],
  },
  total: {
    flex: 1,
    minWidth: 0,
    fontFamily: theme.client.typography.fontFamily,
    fontSize: theme.typography.fontSizes[13],
    lineHeight: theme.typography.fontSizes[13] * theme.typography.lineHeights.tight,
    fontWeight: '700',
    color: theme.client.colors.foreground,
  },
  cta: {
    flexShrink: 0,
    borderRadius: theme.client.radius.lg,
    paddingHorizontal: theme.spacing[6],
  },
});
