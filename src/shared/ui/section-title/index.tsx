import React from 'react';
import { Text, StyleSheet, TextProps } from 'react-native';
import { theme } from '../../config/theme';

export const SectionTitle: React.FC<TextProps> = ({ style, children, ...props }) => {
  return (
    <Text style={[styles.title, style]} {...props}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: theme.typography.fontSizes[7],
    fontWeight: theme.typography.fontWeights.interBold as any,
    color: theme.colors.neutral.black,
    marginBottom: theme.spacing[3],
  },
});