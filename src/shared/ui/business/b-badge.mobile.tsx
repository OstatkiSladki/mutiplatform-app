import React, { ReactNode } from 'react';
import { View, Text, StyleSheet, ViewStyle, ViewProps } from 'react-native';
import { theme } from '../../config/theme';

const b = theme.business;

export type BBadgeVariant = 'default' | 'secondary' | 'destructive' | 'outline';

interface BBadgeProps extends ViewProps {
  variant?: BBadgeVariant;
  children: ReactNode;
}

const VARIANT_STYLES: Record<BBadgeVariant, { container: ViewStyle; textColor: string }> = {
  default: {
    container: { backgroundColor: b.colors.primary },
    textColor: b.colors.primaryForeground,
  },
  secondary: {
    container: { backgroundColor: b.colors.secondary },
    textColor: b.colors.secondaryForeground,
  },
  destructive: {
    container: { backgroundColor: b.colors.destructive },
    textColor: b.colors.destructiveForeground,
  },
  outline: {
    container: { backgroundColor: 'transparent', borderColor: b.colors.border },
    textColor: b.colors.foreground,
  },
};

export const BBadge = ({ variant = 'default', style, children, ...props }: BBadgeProps) => {
  const variantStyle = VARIANT_STYLES[variant];
  return (
    <View style={[styles.badge, variantStyle.container, style]} {...props}>
      <Text style={[styles.label, { color: variantStyle.textColor }]}>{children}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    alignSelf: 'flex-start',
    borderRadius: b.radius.pill,
    paddingHorizontal: 10,
    paddingVertical: 2,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  label: {
    fontFamily: b.typography.fontFamilySemiBold,
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 20,
  },
});
