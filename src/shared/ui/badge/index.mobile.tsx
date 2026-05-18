import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { theme } from '../../config/theme';

export interface BadgeProps {
  label: string;
  variant?: 'primary' | 'success' | 'warning' | 'error' | 'neutral';
  style?: ViewStyle;
}

export const Badge = ({ label, variant = 'primary', style }: BadgeProps) => {
  const getBackgroundColor = () => {
    switch (variant) {
      case 'success': return theme.colors.status.successBg;
      case 'warning': return theme.colors.status.warningBg;
      case 'error': return theme.colors.status.errorBg;
      case 'neutral': return theme.colors.neutral[8];
      case 'primary':
      default:
        return theme.colors.primary[20];
    }
  };

  const getTextColor = () => {
    switch (variant) {
      case 'success': return theme.colors.status.success;
      case 'warning': return theme.colors.status.warning;
      case 'error': return theme.colors.status.error;
      case 'neutral': return theme.colors.neutral[2];
      case 'primary':
      default:
        return theme.colors.primary[100];
    }
  };

  return (
    <View style={[styles.badge, { backgroundColor: getBackgroundColor() }, style]}>
      <Text style={[styles.text, { color: getTextColor() }]}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: theme.spacing[2],
    paddingVertical: theme.spacing[1],
    borderRadius: theme.radius.sm,
    alignSelf: 'flex-start',
  },
  text: {
    fontFamily: theme.typography.fontFamilies.inter,
    fontSize: theme.typography.fontSizes[2],
    fontWeight: '600',
    textTransform: 'uppercase',
  },
});
