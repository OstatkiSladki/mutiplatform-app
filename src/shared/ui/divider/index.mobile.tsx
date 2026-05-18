import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { theme } from '../../config/theme';

export interface DividerProps {
  style?: ViewStyle;
  color?: string;
  thickness?: number;
}

export const Divider = ({ 
  style, 
  color = theme.colors.neutral[8], 
  thickness = 1 
}: DividerProps) => {
  return (
    <View style={[
      styles.divider, 
      { backgroundColor: color, height: thickness }, 
      style
    ]} />
  );
};

const styles = StyleSheet.create({
  divider: {
    width: '100%',
    marginVertical: theme.spacing[2],
  },
});
