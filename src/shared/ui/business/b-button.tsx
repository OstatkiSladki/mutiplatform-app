import React, { ReactNode } from 'react';
import {
  Pressable,
  Text,
  ActivityIndicator,
  StyleSheet,
  ViewStyle,
  TextStyle,
  StyleProp,
  PressableProps,
} from 'react-native';
import { theme } from '../../config/theme';

const b = theme.business;

export type BButtonVariant = 'default' | 'outline' | 'ghost' | 'destructive';
export type BButtonSize = 'sm' | 'default' | 'lg' | 'icon';

export interface BButtonProps extends Omit<PressableProps, 'style'> {
  variant?: BButtonVariant;
  size?: BButtonSize;
  isLoading?: boolean;
  style?: StyleProp<ViewStyle>;
  children: ReactNode;
}

interface VariantStyle {
  container: ViewStyle;
  text: { color: string };
}

const VARIANT_STYLES: Record<BButtonVariant, VariantStyle> = {
  default: {
    container: { backgroundColor: b.colors.primary },
    text: { color: b.colors.primaryForeground },
  },
  outline: {
    container: { backgroundColor: 'transparent', borderWidth: 1, borderColor: b.colors.border },
    text: { color: b.colors.foreground },
  },
  ghost: {
    container: { backgroundColor: 'transparent' },
    text: { color: b.colors.foreground },
  },
  destructive: {
    container: { backgroundColor: b.colors.destructive },
    text: { color: b.colors.destructiveForeground },
  },
};

const SIZE_STYLES: Record<BButtonSize, { container: ViewStyle; text: TextStyle }> = {
  sm: {
    container: { height: 36, paddingHorizontal: 12, borderRadius: b.radius.md },
    text: { fontSize: 13 },
  },
  default: {
    container: { height: 40, paddingHorizontal: 16, borderRadius: b.radius.md },
    text: { fontSize: 14 },
  },
  lg: {
    container: { height: 44, paddingHorizontal: 32, borderRadius: b.radius.md },
    text: { fontSize: 15 },
  },
  icon: {
    container: { width: 40, height: 40, borderRadius: b.radius.md },
    text: { fontSize: 14 },
  },
};

const HIT_SLOP: Record<BButtonSize, number> = { sm: 8, default: 4, lg: 0, icon: 4 };

export const BButton = ({
  variant = 'default',
  size = 'default',
  isLoading = false,
  disabled,
  style,
  children,
  ...props
}: BButtonProps) => {
  const variantStyle = VARIANT_STYLES[variant];
  const sizeStyle = SIZE_STYLES[size];
  const isDisabled = !!disabled || isLoading;

  return (
    <Pressable
      style={[
        styles.base,
        variantStyle.container,
        sizeStyle.container,
        isDisabled && styles.disabled,
        style,
      ]}
      disabled={isDisabled}
      hitSlop={HIT_SLOP[size]}
      accessibilityRole="button"
      accessibilityState={{ disabled: isDisabled, busy: isLoading }}
      {...props}
    >
      {isLoading ? (
        <ActivityIndicator color={variantStyle.text.color} size="small" />
      ) : typeof children === 'string' ? (
        <Text style={[styles.label, variantStyle.text, sizeStyle.text]}>{children}</Text>
      ) : (
        children
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    columnGap: 8,
  },
  label: {
    fontSize: b.typography.button.fontSize,
    fontFamily: b.typography.button.fontFamily,
    fontWeight: b.typography.button.fontWeight,
  },
  disabled: {
    opacity: 0.5,
  },
});
