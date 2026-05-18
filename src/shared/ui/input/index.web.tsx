import React from 'react';
import {
  View,
  TextInput,
  TextInputProps,
  StyleSheet,
  Text,
  StyleProp,
  ViewStyle,
  TouchableOpacity,
} from 'react-native';
import { theme } from '../../config/theme';
import { Icon, IconName } from '../icon';

export type InputVariant = 'default' | 'pill';

export interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  containerStyle?: StyleProp<ViewStyle>;
  variant?: InputVariant;
  leadingIcon?: IconName;
  onClear?: () => void;
  /** На native см. `index.mobile.tsx`; на web не используется. */
  showPasswordToggle?: boolean;
}

export const Input = ({
  label,
  error,
  style,
  containerStyle,
  variant = 'default',
  leadingIcon,
  onClear,
  value,
  showPasswordToggle: _showPasswordToggle,
  ...props
}: InputProps) => {
  const isPill = variant === 'pill';
  const hasValue = typeof value === 'string' && value.length > 0;
  const showClear = isPill && onClear && hasValue;

  if (isPill) {
    return (
      <View style={[styles.container, containerStyle]}>
        {label && <Text style={styles.label}>{label}</Text>}
        <View style={[styles.pillWrap, error ? styles.pillWrapError : null]}>
          {leadingIcon && (
            <Icon
              name={leadingIcon}
              size={18}
              color={theme.client.colors.mutedForeground}
            />
          )}
          <TextInput
            style={[styles.pillInput, style]}
            placeholderTextColor={theme.client.colors.mutedForeground}
            value={value}
            {...props}
          />
          {showClear && (
            <TouchableOpacity
              onPress={onClear}
              hitSlop={8}
              accessibilityRole="button"
              accessibilityLabel="Clear"
            >
              <Icon name="x" size={18} color={theme.client.colors.mutedForeground} />
            </TouchableOpacity>
          )}
        </View>
        {error && <Text style={styles.errorText}>{error}</Text>}
      </View>
    );
  }

  return (
    <View style={[styles.container, containerStyle]}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        style={[styles.input, error ? styles.inputError : null, style]}
        placeholderTextColor={theme.colors.neutral[6]}
        value={value}
        {...props}
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: theme.spacing[3],
  },
  label: {
    fontFamily: theme.typography.fontFamilies.inter,
    fontSize: theme.typography.fontSizes[4],
    color: theme.colors.neutral[1],
    marginBottom: theme.spacing[1],
    fontWeight: '500',
  },
  input: {
    fontFamily: theme.typography.fontFamilies.inter,
    fontSize: theme.typography.fontSizes[5],
    color: theme.colors.neutral[1],
    backgroundColor: theme.colors.neutral.white,
    borderWidth: 1,
    borderColor: theme.colors.neutral[7],
    borderRadius: theme.radius.md,
    paddingHorizontal: theme.spacing[3],
    paddingVertical: theme.spacing[3],
  },
  inputError: {
    borderColor: theme.colors.status.error,
  },
  errorText: {
    fontFamily: theme.typography.fontFamilies.inter,
    fontSize: theme.typography.fontSizes[3],
    color: theme.colors.status.error,
    marginTop: theme.spacing[1],
  },
  pillWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing[2],
    height: 44,
    paddingHorizontal: theme.spacing[4],
    backgroundColor: theme.client.colors.secondary,
    borderRadius: theme.client.radius.pill,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  pillWrapError: {
    borderColor: theme.colors.status.error,
  },
  pillInput: {
    flex: 1,
    fontFamily: theme.typography.fontFamilies.inter,
    fontSize: theme.typography.fontSizes[4],
    color: theme.client.colors.foreground,
    paddingVertical: 0,
  },
});
