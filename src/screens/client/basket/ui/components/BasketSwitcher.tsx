import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { theme } from '../../../../../shared/config/theme';

export type BasketMainTab = 'basket' | 'orders';

export interface BasketSwitcherProps {
  active: BasketMainTab;
  onChange: (tab: BasketMainTab) => void;
  labelBasket: string;
  labelOrders: string;
}

export const BasketSwitcher = ({
  active,
  onChange,
  labelBasket,
  labelOrders,
}: BasketSwitcherProps) => (
  <View style={styles.row}>
    <Pressable
      onPress={() => onChange('basket')}
      accessibilityRole="tab"
      accessibilityState={{ selected: active === 'basket' }}
      style={styles.tabPress}
    >
      <View style={styles.tabInner}>
        <Text style={[styles.tabText, active === 'basket' ? styles.tabActive : styles.tabInactive]}>
          {labelBasket}
        </Text>
        <View
          style={[styles.underline, active === 'basket' ? styles.underlineOn : styles.underlineOff]}
        />
      </View>
    </Pressable>
    <Pressable
      onPress={() => onChange('orders')}
      accessibilityRole="tab"
      accessibilityState={{ selected: active === 'orders' }}
      style={styles.tabPress}
    >
      <View style={styles.tabInner}>
        <Text style={[styles.tabText, active === 'orders' ? styles.tabActive : styles.tabInactive]}>
          {labelOrders}
        </Text>
        <View
          style={[styles.underline, active === 'orders' ? styles.underlineOn : styles.underlineOff]}
        />
      </View>
    </Pressable>
  </View>
);

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
    gap: theme.spacing[4],
  },
  tabPress: {
    alignItems: 'center',
  },
  tabInner: {
    alignItems: 'center',
  },
  tabText: {
    fontFamily: theme.client.typography.fontFamily,
    fontSize: theme.typography.fontSizes[9],
    lineHeight: theme.typography.fontSizes[9] * theme.typography.lineHeights.normal,
    fontWeight: '700',
    paddingBottom: theme.spacing[2],
  },
  tabActive: {
    color: theme.colors.neutral[1],
  },
  tabInactive: {
    fontWeight: '700',
    color: theme.colors.neutral[7],
  },
  underline: {
    height: theme.spacing[2],
    width: '100%',
    borderRadius: theme.radius.sm,
  },
  underlineOn: {
    backgroundColor: theme.colors.neutral[1],
  },
  underlineOff: {
    backgroundColor: 'transparent',
  },
});
