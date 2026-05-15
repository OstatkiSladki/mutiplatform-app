import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { theme } from '../../../../shared/config/theme';
import type { ProfileMenuIconName } from './profile-menu-icons';
import { ProfileMenuAssetIcon } from './profile-menu-icons';

export interface ProfileScreenMenuRowProps {
  icon: ProfileMenuIconName;
  label: string;
  onPress: () => void;
  destructive?: boolean;
}

export const ProfileScreenMenuRow = ({
  icon,
  label,
  onPress,
  destructive,
}: ProfileScreenMenuRowProps) => {
  const color = destructive ? theme.colors.status.error : theme.colors.neutral[1];

  return (
    <TouchableOpacity
      style={styles.row}
      activeOpacity={0.7}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={label}
    >
      <ProfileMenuAssetIcon name={icon} color={color} />
      <Text style={[styles.label, { color }]}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing[2],
    minHeight: theme.spacing[8],
  },
  label: {
    flex: 1,
    fontFamily: theme.client.typography.fontFamily,
    fontSize: theme.typography.fontSizes[5],
    lineHeight: theme.typography.fontSizes[5] * theme.typography.lineHeights.normal,
    fontWeight: '400',
  },
});
