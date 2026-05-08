import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Icon } from '../icon';
import { theme } from '../../config/theme';
import { styles } from './styles';

export interface StepperProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
}

export const Stepper = ({
  value,
  onChange,
  min = 0,
  max = 99,
  step = 1,
}: StepperProps) => {
  const decrement = () => onChange(Math.max(min, value - step));
  const increment = () => onChange(Math.min(max, value + step));
  const decDisabled = value <= min;
  const incDisabled = value >= max;

  return (
    <View style={styles.row}>
      <TouchableOpacity
        style={[styles.button, decDisabled && styles.buttonDisabled]}
        onPress={decrement}
        disabled={decDisabled}
        activeOpacity={0.8}
        accessibilityRole="button"
        accessibilityLabel="Уменьшить"
      >
        <Icon name="minus" size={16} color={theme.colors.neutral.white} />
      </TouchableOpacity>
      <Text style={styles.value}>{value}</Text>
      <TouchableOpacity
        style={[styles.button, incDisabled && styles.buttonDisabled]}
        onPress={increment}
        disabled={incDisabled}
        activeOpacity={0.8}
        accessibilityRole="button"
        accessibilityLabel="Увеличить"
      >
        <Icon name="plus" size={16} color={theme.colors.neutral.white} />
      </TouchableOpacity>
    </View>
  );
};
