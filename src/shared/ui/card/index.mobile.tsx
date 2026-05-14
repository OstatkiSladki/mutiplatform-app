import React from 'react';
import { View, ViewProps, StyleSheet, ViewStyle } from 'react-native';
import { theme } from '../../config/theme';

export type CardPadding = 'none' | 'sm' | 'md' | 'lg';

export interface CardProps extends ViewProps {
  variant?: 'elevated' | 'outlined' | 'flat';
  elevation?: keyof typeof theme.shadows.tight;
  padding?: CardPadding;
}

export const Card = ({
  variant = 'elevated',
  elevation = 2,
  padding = 'sm',
  style,
  children,
  ...props
}: CardProps) => {
  let cardVariantStyle: ViewStyle;
  if (variant === 'elevated') {
    cardVariantStyle = theme.shadows.tight[elevation];
  } else if (variant === 'outlined') {
    cardVariantStyle = styles.outlined;
  } else {
    cardVariantStyle = styles.flat;
  }

  const paddingStyle = paddingStyles[padding];

  return (
    <View style={[styles.card, cardVariantStyle, paddingStyle, style]} {...props}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.neutral.white,
    borderRadius: theme.radius.lg,
  },
  outlined: {
    borderWidth: 1,
    borderColor: theme.colors.neutral[8],
  },
  flat: {
    backgroundColor: theme.colors.neutral[9],
  },
});

const paddingStyles = StyleSheet.create({
  none: {
    padding: theme.spacing[0],
  },
  sm: {
    padding: theme.spacing[4],
  },
  md: {
    padding: theme.spacing[5],
  },
  lg: {
    padding: theme.spacing[6],
  },
});
