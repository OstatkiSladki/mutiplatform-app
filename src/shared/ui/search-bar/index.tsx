import React from 'react';
import { View, StyleSheet, TextInput, TextInputProps } from 'react-native';
import { theme } from '../../config/theme';

export const SearchBar: React.FC<TextInputProps> = (props) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholderTextColor={theme.colors.neutral[6]}
        {...props}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.neutral[9],
    borderRadius: theme.radius.md,
    paddingHorizontal: theme.spacing[4],
    paddingVertical: theme.spacing[3],
    marginBottom: theme.spacing[4],
  },
  input: {
    color: theme.colors.neutral.black,
    fontSize: theme.typography.fontSizes[5],
  },
});
