import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  View,
  ViewStyle,
  TextStyle,
  TouchableOpacityProps,
} from 'react-native';
import { theme } from '../../config/theme';
import { useBreakpoint } from '../../lib/responsive';
import { Icon, IconName } from '../icon';

export type ButtonSize = 'small' | 'medium' | 'large';
export type ButtonDensity = 'comfortable' | 'compact';
export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'neutral'
  | 'pill'
  | 'ghost'
  | 'iconCircle';

export interface ButtonProps extends TouchableOpacityProps {
  title?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  density?: ButtonDensity;
  icon?: IconName;
  iconColor?: string;
  iconSize?: number;
  /** Merged into title `Text` for default filled variants (primary / secondary / neutral). */
  titleStyle?: TextStyle;
}

function effectiveSize(
  size: ButtonSize,
  density: ButtonDensity | undefined,
  isWebDesktop: boolean,
): ButtonSize {
  if (density === 'comfortable') return size;
  if (density === 'compact') {
    if (size === 'large') return 'medium';
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
  icon,
  iconColor,
  iconSize,
  titleStyle,
  style,
  ...props
}: ButtonProps) => {
  const { isWeb, isAtLeast } = useBreakpoint();
  const isWebDesktop = isWeb && isAtLeast('md');
  const sized = effectiveSize(size, density, isWebDesktop);

  if (variant === 'pill') {
    const heightStyle = isWebDesktop ? styles.pillWeb : styles.pillMobile;
    const textColor = theme.client.colors.foreground;
    return (
      <TouchableOpacity
        style={[
          styles.pill,
          heightStyle,
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
          <View style={styles.row}>
            {icon && (
              <Icon name={icon} size={iconSize ?? 18} color={iconColor ?? textColor} />
            )}
            {title && (
              <Text style={[styles.pillText, { color: textColor } as TextStyle]}>
                {title}
              </Text>
            )}
          </View>
        )}
      </TouchableOpacity>
    );
  }

  if (variant === 'ghost') {
    const textColor = theme.client.colors.foreground;
    return (
      <TouchableOpacity
        style={[
          styles.ghost,
          styles[sized],
          disabled && styles.disabled,
          style as ViewStyle,
        ]}
        disabled={disabled || isLoading}
        activeOpacity={0.7}
        {...props}
      >
        {isLoading ? (
          <ActivityIndicator color={textColor} />
        ) : (
          <View style={styles.row}>
            {icon && (
              <Icon name={icon} size={iconSize ?? 18} color={iconColor ?? textColor} />
            )}
            {title && (
              <Text
                style={[
                  sized === 'small' ? styles.textSmall : styles.text,
                  { color: textColor } as TextStyle,
                ]}
              >
                {title}
              </Text>
            )}
          </View>
        )}
      </TouchableOpacity>
    );
  }

  if (variant === 'iconCircle') {
    const fg = theme.client.colors.foreground;
    const iconA11yLabel = props.accessibilityLabel ?? icon;
    return (
      <TouchableOpacity
        {...props}
        accessibilityRole="button"
        accessibilityLabel={iconA11yLabel}
        style={[
          styles.iconCircle,
          disabled && styles.disabled,
          style as ViewStyle,
        ]}
        disabled={disabled || isLoading}
        activeOpacity={0.7}
      >
        {isLoading ? (
          <ActivityIndicator color={fg} />
        ) : icon ? (
          <Icon name={icon} size={iconSize ?? 20} color={iconColor ?? fg} />
        ) : null}
      </TouchableOpacity>
    );
  }

  const isPrimary = variant === 'primary';
  const isSecondary = variant === 'secondary';

  let backgroundColor: string;
  if (disabled) {
    backgroundColor = theme.colors.neutral[6];
  } else if (isPrimary) {
    backgroundColor = theme.colors.actionPrimary.default;
  } else if (isSecondary) {
    backgroundColor = theme.colors.actionSecondary.default;
  } else {
    backgroundColor = theme.colors.actionNeutral.default;
  }

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
        <Text style={[textSizeStyle, { color: textColor } as TextStyle, titleStyle]}>{title}</Text>
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
    fontFamily: theme.typography.fontFamilies.sourceSansProSemiBold,
    fontWeight: '400',
    fontSize: theme.typography.fontSizes[4],
  },
  textSmall: {
    fontFamily: theme.typography.fontFamilies.sourceSansProSemiBold,
    fontWeight: '400',
    fontSize: theme.typography.fontSizes[3],
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing[2],
  },
  pill: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: theme.client.radius.pill,
    backgroundColor: theme.colors.neutral[9],
    borderWidth: 1,
    borderColor: theme.colors.neutral[8],
    paddingHorizontal: theme.spacing[4],
  },
  pillMobile: {
    height: 44,
  },
  pillWeb: {
    height: theme.spacing[9],
  },
  pillText: {
    fontFamily: theme.typography.fontFamilies.sourceSansProSemiBold,
    fontWeight: '400',
    fontSize: theme.typography.fontSizes[4],
  },
  ghost: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: theme.client.radius.lg,
    backgroundColor: 'transparent',
  },
  iconCircle: {
    width: theme.spacing[9],
    height: theme.spacing[9],
    borderRadius: theme.client.radius.pill,
    backgroundColor: theme.colors.neutral[9],
    borderWidth: 1,
    borderColor: theme.colors.neutral[8],
    alignItems: 'center',
    justifyContent: 'center',
  },
});
