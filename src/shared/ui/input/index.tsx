import React from 'react';
import { View, TextInput, TextInputProps, StyleSheet, Text } from 'react-native';
import { theme } from '../../config/theme';

export interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
}

export const Input = ({ label, error, style, ...props }: InputProps) => {
  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        style={[
          styles.input,
          error ? styles.inputError : null,
          style
        ]}
        placeholderTextColor={theme.colors.neutral[6]}
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
});
