import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Icon } from '../../../../../shared/ui/icon';
import { theme } from '../../../../../shared/config/theme';

export interface BasketPickupSectionProps {
  title: string;
  value: string;
  onPress: () => void;
  onClearCart?: () => void;
  clearA11yLabel: string;
}

export const BasketPickupSection = ({
  title,
  value,
  onPress,
  onClearCart,
  clearA11yLabel,
}: BasketPickupSectionProps) => (
  <View style={styles.wrap}>
    <Text style={styles.title}>{title}</Text>
    <View style={styles.row}>
      <Pressable
        style={styles.selector}
        onPress={onPress}
        accessibilityRole="button"
        accessibilityLabel={value}
      >
        <Text style={styles.value}>{value}</Text>
        <Icon name="chevron-down" size={18} color={theme.client.colors.mutedForeground} />
      </Pressable>
      {onClearCart ? (
        <Pressable
          style={styles.trash}
          onPress={onClearCart}
          accessibilityRole="button"
          accessibilityLabel={clearA11yLabel}
        >
          <Icon name="trash-2" size={22} color={theme.client.colors.mutedForeground} />
        </Pressable>
      ) : null}
    </View>
  </View>
);

const styles = StyleSheet.create({
  wrap: {
    gap: theme.spacing[2],
    width: '100%',
  },
  title: {
    fontFamily: theme.client.typography.fontFamily,
    fontSize: theme.typography.fontSizes[4],
    lineHeight: theme.typography.fontSizes[4] * theme.typography.lineHeights.normal,
    fontWeight: '400',
    color: theme.client.colors.foreground,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing[3],
  },
  selector: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: theme.spacing[3],
    paddingVertical: theme.spacing[2],
    borderRadius: theme.spacing[5],
    backgroundColor: theme.colors.neutral[9],
    minHeight: theme.spacing[10],
  },
  value: {
    flex: 1,
    fontFamily: theme.client.typography.fontFamily,
    fontSize: theme.typography.fontSizes[6],
    lineHeight: theme.typography.fontSizes[6] * theme.typography.lineHeights.normal,
    fontWeight: '400',
    color: theme.client.colors.foreground,
  },
  trash: {
    padding: theme.spacing[2],
  },
});
