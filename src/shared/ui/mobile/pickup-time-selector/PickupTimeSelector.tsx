import React, { type ReactNode } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { theme } from '../../../config/theme';
import { Icon } from '../../icon';

export interface PickupTimeSelectorProps {
  title: string;
  value: string;
  onPress: () => void;
  /** e.g. basket clear-control — rendered after the dropdown row */
  accessoryRight?: ReactNode;
}

/** Shared pickup-time row (Surprise Box + Basket): identical layout and typography. */
export const PickupTimeSelector = ({
  title,
  value,
  onPress,
  accessoryRight,
}: PickupTimeSelectorProps) => (
  <View style={styles.section}>
    <Text style={styles.title}>{title}</Text>
    <View style={styles.row}>
      <Pressable
        style={styles.dropdown}
        onPress={onPress}
        accessibilityRole="button"
        accessibilityLabel={value}
      >
        <Text style={styles.value} numberOfLines={1}>
          {value}
        </Text>
        <Icon name="chevron-down" size={20} color={theme.client.colors.mutedForeground} />
      </Pressable>
      {accessoryRight}
    </View>
  </View>
);

const styles = StyleSheet.create({
  section: {
    gap: theme.spacing[3],
    width: '100%',
  },
  title: {
    fontFamily: theme.client.typography.fontFamily,
    fontWeight: '400',
    fontSize: theme.typography.fontSizes[5],
    lineHeight: theme.typography.fontSizes[5] * theme.typography.lineHeights.normal,
    color: theme.client.colors.foreground,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing[3],
    width: '100%',
  },
  dropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: theme.spacing[3],
    paddingHorizontal: theme.spacing[4],
    paddingVertical: theme.spacing[3],
    borderRadius: theme.client.radius.sm,
    backgroundColor: theme.colors.neutral[9],
    minHeight: theme.spacing[8],
    flex: 1,
    minWidth: 0,
  },
  value: {
    flex: 1,
    fontFamily: theme.client.typography.fontFamily,
    fontWeight: '400',
    fontSize: theme.typography.fontSizes[5],
    lineHeight: theme.typography.fontSizes[5] * theme.typography.lineHeights.normal,
    color: theme.client.colors.foreground,
  },
});
