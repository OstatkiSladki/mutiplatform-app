import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
  TouchableOpacityProps,
} from 'react-native';
import { theme } from '../../config/theme';

export interface ButtonProps extends TouchableOpacityProps {
  title: string;
  variant?: 'primary' | 'secondary' | 'neutral';
  size?: 'small' | 'medium' | 'large';
  isLoading?: boolean;
}

export const Button = ({
  title,
  variant = 'primary',
  size = 'medium',
  isLoading = false,
  disabled,
  style,
  ...props
}: ButtonProps) => {
  const isPrimary = variant === 'primary';
  const isSecondary = variant === 'secondary';

  const backgroundColor = disabled
    ? theme.colors.neutral[6]
    : isPrimary
    ? theme.colors.actionPrimary.default
    : isSecondary
    ? theme.colors.actionSecondary.default
    : theme.colors.actionNeutral.default;

  const textColor = isPrimary || isSecondary ? theme.colors.neutral.white : theme.colors.neutral[1];

  return (
    <TouchableOpacity
      style={[
        styles.button,
        styles[size],
        { backgroundColor },
        disabled && styles.disabled,
        style as ViewStyle,
      ]}
      disabled={disabled || isLoading}
      activeOpacity={0.8}
      {...props}
    >
      {isLoading ? (
        <ActivityIndicator color={textColor} />
      ) : (
        <Text style={[styles.text, { color: textColor } as TextStyle]}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: theme.radius.md,
  },
  small: {
    paddingVertical: theme.spacing[2],
    paddingHorizontal: theme.spacing[3],
  },
  medium: {
    paddingVertical: theme.spacing[3],
    paddingHorizontal: theme.spacing[4],
  },
  large: {
    paddingVertical: theme.spacing[4],
    paddingHorizontal: theme.spacing[6],
  },
  disabled: {
    opacity: 0.6,
  },
  text: {
    fontFamily: theme.typography.fontFamilies.inter,
    fontWeight: '600',
    fontSize: theme.typography.fontSizes[4],
  },
});
