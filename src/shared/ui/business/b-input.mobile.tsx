import React, { forwardRef } from 'react';
import { View, Text, TextInput, StyleSheet, TextInputProps } from 'react-native';
import { theme } from '../../config/theme';

const b = theme.business;

export interface BInputProps extends TextInputProps {
  label?: string;
  error?: string;
}

export const BInput = forwardRef<TextInput, BInputProps>(({ label, error, style, ...props }, ref) => (
  <View style={styles.wrapper}>
    {label ? <Text style={styles.label}>{label}</Text> : null}
    <TextInput
      ref={ref}
      style={[styles.input, error ? styles.inputError : styles.inputNormal, style]}
      placeholderTextColor={b.colors.mutedForeground}
      accessibilityState={{ disabled: props.editable === false }}
      accessibilityInvalid={!!error}
      {...props}
    />
    {error ? <Text style={styles.errorText} accessibilityRole="alert">{error}</Text> : null}
  </View>
));

BInput.displayName = 'BInput';

const styles = StyleSheet.create({
  wrapper: {
    rowGap: 6,
  },
  label: {
    fontFamily: b.typography.fontFamily,
    fontSize: 13,
    fontWeight: '500',
    color: b.colors.foreground,
  },
  input: {
    height: 44,
    borderRadius: b.radius.md,
    borderWidth: 1,
    paddingHorizontal: 12,
    fontFamily: b.typography.fontFamily,
    fontSize: 14,
    color: b.colors.foreground,
    backgroundColor: b.colors.background,
  },
  inputNormal: {
    borderColor: b.colors.input,
  },
  inputError: {
    borderColor: b.colors.destructive,
  },
  errorText: {
    fontFamily: b.typography.fontFamily,
    fontSize: 12,
    color: b.colors.destructive,
  },
});
