import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Icon, type IconName } from '../../../../shared/ui/icon';
import { theme } from '../../../../shared/config/theme';

export interface ProfileMenuItemProps {
  icon: IconName;
  label: string;
  onPress: () => void;
  destructive?: boolean;
}

export const ProfileMenuItem = ({ icon, label, onPress, destructive }: ProfileMenuItemProps) => {
  const color = destructive ? theme.colors.status.error : theme.colors.neutral[1];
  return (
    <TouchableOpacity
      style={styles.menuRow}
      activeOpacity={0.7}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={label}
    >
      <Icon name={icon} size={20} color={color} />
      <Text style={[styles.menuLabel, { color }]}>{label}</Text>
      {!destructive ? (
        <Icon name="chevron-right" size={18} color={theme.colors.neutral[5]} />
      ) : null}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  menuRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing[3],
    paddingVertical: theme.spacing[3],
    paddingHorizontal: theme.spacing[2],
  },
  menuLabel: {
    flex: 1,
    fontFamily: theme.typography.fontFamilies.inter,
    fontSize: theme.typography.fontSizes[5],
    color: theme.colors.neutral[1],
  },
});
