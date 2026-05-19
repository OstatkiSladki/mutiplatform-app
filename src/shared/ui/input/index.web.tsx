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
  /** Pill search in desktop header — 34px tall, r20, Neutral 9 (matches mobile spec). */
  pillTone?: 'default' | 'headerSearch';
  leadingIcon?: IconName;
  onClear?: () => void;
  showPasswordToggle?: boolean;
}

export const Input = ({
  label,
  error,
  style,
  containerStyle,
  variant = 'default',
  pillTone = 'default',
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
        {label ? <Text style={styles.label}>{label}</Text> : null}
        <View
          style={[
            styles.pillWrap,
            pillTone === 'headerSearch' && styles.pillWrapHeaderSearch,
            error ? styles.pillWrapError : null,
          ]}
        >
          {leadingIcon ? (
            <Icon
              name={leadingIcon}
              size={16}
              color={theme.client.colors.mutedForeground}
            />
          ) : null}
          <TextInput
            style={[styles.pillInput, pillTone === 'headerSearch' && styles.pillInputHeaderSearch, style]}
            placeholderTextColor={theme.client.colors.mutedForeground}
            value={value}
            {...props}
          />
          {showClear ? (
            <TouchableOpacity
              onPress={onClear}
              hitSlop={8}
              accessibilityRole="button"
              accessibilityLabel="Clear"
            >
              <Icon name="x" size={16} color={theme.client.colors.mutedForeground} />
            </TouchableOpacity>
          ) : null}
        </View>
        {error ? <Text style={styles.errorText}>{error}</Text> : null}
      </View>
    );
  }

  return (
    <View style={[styles.container, containerStyle]}>
      {label ? <Text style={styles.label}>{label}</Text> : null}
      <TextInput
        style={[styles.input, error ? styles.inputError : null, style]}
        placeholderTextColor={theme.colors.neutral[6]}
        value={value}
        {...props}
      />
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: theme.spacing[3],
  },
  label: {
    fontFamily: theme.typography.fontFamilies.sourceSansProRegular,
    fontSize: theme.typography.fontSizes[4],
    color: theme.colors.neutral[1],
    marginBottom: theme.spacing[1],
    fontWeight: '500',
  },
  input: {
    fontFamily: theme.typography.fontFamilies.sourceSansProRegular,
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
    fontFamily: theme.typography.fontFamilies.sourceSansProRegular,
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
  pillWrapHeaderSearch: {
    height: theme.client.chrome.headerBarHeight,
    borderRadius: theme.spacing[5],
    backgroundColor: theme.colors.neutral[9],
    borderColor: theme.colors.neutral[8],
    paddingHorizontal: theme.spacing[3],
  },
  pillWrapError: {
    borderColor: theme.colors.status.error,
  },
  pillInput: {
    flex: 1,
    fontFamily: theme.typography.fontFamilies.sourceSansProRegular,
    fontSize: theme.typography.fontSizes[4],
    color: theme.client.colors.foreground,
    paddingVertical: 0,
  },
  pillInputHeaderSearch: {
    fontSize: theme.typography.fontSizes[3],
  },
});
