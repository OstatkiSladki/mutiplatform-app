import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Icon } from '../../../../../shared/ui/icon';
import { theme } from '../../../../../shared/config/theme';

export interface OrdersPickupFooterProps {
  totalLabel: string;
  pickupLabel: string;
  onPressPickup: () => void;
}

export const OrdersPickupFooter = ({
  totalLabel,
  pickupLabel,
  onPressPickup,
}: OrdersPickupFooterProps) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.wrap, { paddingBottom: Math.max(insets.bottom, theme.spacing[2]) }]}>
      <View style={styles.row}>
        <Text style={styles.total} numberOfLines={1}>
          {totalLabel}
        </Text>
        <Pressable
          style={styles.slot}
          onPress={onPressPickup}
          accessibilityRole="button"
          accessibilityLabel={pickupLabel}
        >
          <Text style={styles.slotText}>{pickupLabel}</Text>
          <Icon name="chevron-down" size={18} color={theme.client.colors.primaryForeground} />
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrap: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: theme.colors.neutral[8],
    backgroundColor: theme.client.colors.card,
    paddingHorizontal: theme.spacing[4],
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
  slot: {
    flexShrink: 0,
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing[2],
    paddingHorizontal: theme.spacing[5],
    paddingVertical: theme.spacing[3],
    borderRadius: theme.client.radius.pill,
    backgroundColor: theme.client.colors.primary,
  },
  slotText: {
    fontFamily: theme.client.typography.fontFamily,
    fontSize: theme.typography.fontSizes[5],
    fontWeight: '600',
    color: theme.client.colors.primaryForeground,
  },
});
