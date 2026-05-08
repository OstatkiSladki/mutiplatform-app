import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { styles } from './styles';

export interface ChipProps {
  label: string;
  active?: boolean;
  onPress?: () => void;
}

export const Chip = ({ label, active = false, onPress }: ChipProps) => {
  const content = (
    <Text style={[styles.text, active && styles.textActive]}>{label}</Text>
  );

  if (onPress) {
    return (
      <TouchableOpacity
        style={[styles.chip, active && styles.chipActive]}
        onPress={onPress}
        activeOpacity={0.7}
      >
        {content}
      </TouchableOpacity>
    );
  }

  return <View style={[styles.chip, active && styles.chipActive]}>{content}</View>;
};
