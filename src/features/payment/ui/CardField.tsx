import React, { forwardRef } from 'react';
import { StyleSheet, Text, TextInput, type TextInputProps, View } from 'react-native';
import { MaskedTextInput } from 'react-native-mask-text';
import { theme } from '../../../shared/config/theme';

export interface CardFieldProps extends Omit<TextInputProps, 'onChangeText'> {
  label: string;
  error?: string;
  mask?: string;
  onChangeText: (raw: string, masked: string) => void;
}

export const CardField = forwardRef<TextInput, CardFieldProps>(
  ({ label, error, mask, onChangeText, style, ...props }, ref) => (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      {mask ? (
        <MaskedTextInput
          ref={ref as never}
          mask={mask}
          onChangeText={(masked, raw) => onChangeText(raw, masked)}
          style={[styles.input, error ? styles.inputError : null, style]}
          placeholderTextColor={theme.colors.neutral[6]}
          {...props}
        />
      ) : (
        <TextInput
          ref={ref}
          onChangeText={(value) => onChangeText(value, value)}
          style={[styles.input, error ? styles.inputError : null, style]}
          placeholderTextColor={theme.colors.neutral[6]}
          {...props}
        />
      )}
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  ),
);

CardField.displayName = 'CardField';

const styles = StyleSheet.create({
  container: {
    gap: theme.spacing[1],
  },
  label: {
    fontFamily: theme.typography.fontFamilies.sourceSansProRegular,
    fontSize: theme.typography.fontSizes[3],
    color: theme.colors.neutral[3],
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
  error: {
    fontFamily: theme.typography.fontFamilies.sourceSansProRegular,
    fontSize: theme.typography.fontSizes[2],
    color: theme.colors.status.error,
  },
});
