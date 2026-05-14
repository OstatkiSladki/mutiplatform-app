import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { styles } from './styles';

export type ChipVariant = 'default' | 'accent' | 'success';

export interface ChipProps {
  label: string;
  active?: boolean;
  variant?: ChipVariant;
  onPress?: () => void;
}

export const Chip = ({ label, active = false, variant = 'default', onPress }: ChipProps) => {
  const containerStyle = [
    styles.chip,
    variant === 'accent' && styles.chipAccent,
    variant === 'success' && styles.chipSuccess,
    active && styles.chipActive,
  ];

  const textStyle = [
    styles.text,
    variant === 'accent' && styles.textAccent,
    variant === 'success' && styles.textSuccess,
    active && styles.textActive,
  ];

  const content = <Text style={textStyle}>{label}</Text>;

  if (onPress) {
    return (
      <TouchableOpacity style={containerStyle} onPress={onPress} activeOpacity={0.7}>
        {content}
      </TouchableOpacity>
    );
  }

  return <View style={containerStyle}>{content}</View>;
};
