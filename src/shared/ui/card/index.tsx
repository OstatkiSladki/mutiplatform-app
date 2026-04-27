import React from 'react';
import { View, ViewProps, StyleSheet, ViewStyle } from 'react-native';
import { theme } from '../../config/theme';

export interface CardProps extends ViewProps {
  variant?: 'elevated' | 'outlined' | 'flat';
  elevation?: keyof typeof theme.shadows.tight;
}

export const Card = ({
  variant = 'elevated',
  elevation = '2',
  style,
  children,
  ...props
}: CardProps) => {
  const isElevated = variant === 'elevated';
  const isOutlined = variant === 'outlined';

  const CardStyle: ViewStyle = isElevated
    ? theme.shadows.tight[elevation]
    : isOutlined
    ? styles.outlined
    : styles.flat;

  return (
    <View style={[styles.card, CardStyle, style]} {...props}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.neutral.white,
    borderRadius: theme.radius.lg,
    padding: theme.spacing[4],
  },
  outlined: {
    borderWidth: 1,
    borderColor: theme.colors.neutral[8],
  },
  flat: {
    backgroundColor: theme.colors.neutral[9],
  },
});
