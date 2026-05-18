import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Icon } from '../../../../../shared/ui/icon';
import { theme } from '../../../../../shared/config/theme';

export interface OrdersPickupFooterProps {
  totalLabel: string;
  pickupLabel: string;
  onPressPickup: () => void;
}

/** Completed orders: neutral styling (no primary/orange purchase chrome). */
export const OrdersPickupFooter = ({
  totalLabel,
  pickupLabel,
  onPressPickup,
}: OrdersPickupFooterProps) => {
  return (
    <View style={styles.wrap}>
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
          <Text style={styles.slotText} numberOfLines={1}>
            {pickupLabel}
          </Text>
          <Icon name="chevron-down" size={18} color={theme.colors.neutral[5]} />
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
    paddingTop: theme.spacing[2],
    paddingBottom: theme.spacing[3],
    marginBottom: 0,
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
    fontSize: theme.typography.fontSizes[10],
    lineHeight: theme.typography.fontSizes[10] * theme.typography.lineHeights.tight,
    fontWeight: '600',
    color: theme.colors.neutral[5],
  },
  slot: {
    flexShrink: 0,
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing[2],
    paddingHorizontal: theme.spacing[4],
    paddingVertical: theme.spacing[2],
    borderRadius: theme.client.radius.pill,
    backgroundColor: theme.colors.neutral[9],
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: theme.colors.neutral[8],
    maxWidth: '52%',
  },
  slotText: {
    flexShrink: 1,
    fontFamily: theme.client.typography.fontFamily,
    fontSize: theme.typography.fontSizes[4],
    fontWeight: '400',
    color: theme.colors.neutral[5],
  },
});
