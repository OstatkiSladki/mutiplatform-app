import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Icon } from '../../../../../shared/ui/icon';
import { theme } from '../../../../../shared/config/theme';

export interface SurpriseBoxPickupSectionProps {
  title: string;
  selectedLabel: string;
  onPress: () => void;
}

export const SurpriseBoxPickupSection = ({
  title,
  selectedLabel,
  onPress,
}: SurpriseBoxPickupSectionProps) => (
  <View style={styles.section}>
    <Text style={styles.title}>{title}</Text>
    <TouchableOpacity
      style={styles.dropdown}
      onPress={onPress}
      activeOpacity={0.8}
      accessibilityRole="button"
      accessibilityLabel={selectedLabel}
    >
      <Text style={styles.value}>{selectedLabel}</Text>
      <Icon name="chevron-down" size={20} color={theme.client.colors.mutedForeground} />
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  section: {
    gap: theme.spacing[3],
  },
  title: {
    fontFamily: theme.client.typography.fontFamily,
    fontWeight: '400',
    fontSize: theme.typography.fontSizes[5],
    lineHeight: theme.typography.fontSizes[5] * theme.typography.lineHeights.normal,
    color: theme.client.colors.foreground,
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
