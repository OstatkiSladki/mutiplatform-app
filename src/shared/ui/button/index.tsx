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
import { useBreakpoint } from '../../lib/responsive';

export type ButtonSize = 'small' | 'medium' | 'large';
export type ButtonDensity = 'comfortable' | 'compact';

export interface ButtonProps extends TouchableOpacityProps {
  title: string;
  variant?: 'primary' | 'secondary' | 'neutral';
  size?: ButtonSize;
  isLoading?: boolean;
  density?: ButtonDensity;
}

function effectiveSize(
  size: ButtonSize,
  density: ButtonDensity | undefined,
  isWebDesktop: boolean,
): ButtonSize {
  if (density === 'comfortable') return size;
  if (density === 'compact') {
    if (size === 'large') return 'medium';
    if (size === 'medium') return 'small';
    return 'small';
  }
  if (isWebDesktop) {
    if (size === 'large') return 'medium';
    if (size === 'medium') return 'small';
  }
  return size;
}

export const Button = ({
  title,
  variant = 'primary',
  size = 'medium',
  isLoading = false,
  density,
  disabled,
  style,
  ...props
}: ButtonProps) => {
  const { isWeb, isAtLeast } = useBreakpoint();
  const sized = effectiveSize(size, density, isWeb && isAtLeast('md'));

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
  const textSizeStyle = sized === 'small' ? styles.textSmall : styles.text;

  return (
    <TouchableOpacity
      style={[
        styles.button,
        styles[sized],
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
        <Text style={[textSizeStyle, { color: textColor } as TextStyle]}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: theme.radius.lg,
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
  textSmall: {
    fontFamily: theme.typography.fontFamilies.inter,
    fontWeight: '600',
    fontSize: theme.typography.fontSizes[3],
  },
});
