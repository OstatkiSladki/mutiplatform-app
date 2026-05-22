import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Icon } from '../icon';
import { theme } from '../../config/theme';
import { styles } from './styles';

export type StepperSize = 'sm' | 'md' | 'lg';

export interface StepperProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  size?: StepperSize;
  spread?: boolean;
  /** Minus muted, plus primary — product modal desktop. */
  accentIncrement?: boolean;
}

const ICON_SIZE: Record<StepperSize, number> = {
  sm: 14,
  md: 16,
  lg: 18,
};

export const Stepper = ({
  value,
  onChange,
  min = 0,
  max = 99,
  step = 1,
  size = 'md',
  spread = false,
  accentIncrement = false,
}: StepperProps) => {
  const decrement = () => onChange(Math.max(min, value - step));
  const increment = () => onChange(Math.min(max, value + step));
  const decDisabled = value <= min;
  const incDisabled = value >= max;

  const isLg = size === 'lg';
  const useDarkIcon = (isLg || spread) && !accentIncrement;

  const decButtonStyle = [
    styles.button,
    size === 'sm' && styles.buttonSm,
    isLg && styles.buttonLg,
    spread && !isLg && !accentIncrement && styles.buttonSecondary,
    accentIncrement && styles.buttonAccentMuted,
  ];
  const incButtonStyle = [
    styles.button,
    size === 'sm' && styles.buttonSm,
    isLg && styles.buttonLg,
    spread && !isLg && !accentIncrement && styles.buttonSecondary,
    accentIncrement && styles.buttonAccentPrimary,
  ];
  const buttonDisabledStyle = isLg ? styles.buttonLgDisabled : styles.buttonDisabled;
  const valueStyle = [
    styles.value,
    isLg && styles.valueLg,
    size === 'sm' && styles.valueSm,
    spread && !isLg && styles.valueSpread,
  ];
  const decIconColor = accentIncrement
    ? theme.client.colors.mutedForeground
    : useDarkIcon
      ? theme.client.colors.foreground
      : theme.colors.neutral.white;
  const incIconColor = accentIncrement
    ? theme.client.colors.primaryForeground
    : useDarkIcon
      ? theme.client.colors.foreground
      : theme.colors.neutral.white;

  return (
    <View style={[styles.row, spread && styles.rowSpread, isLg && styles.rowLg]}>
      <TouchableOpacity
        style={[decButtonStyle, decDisabled && buttonDisabledStyle]}
        onPress={decrement}
        disabled={decDisabled}
        activeOpacity={0.8}
        accessibilityRole="button"
        accessibilityLabel="Уменьшить"
      >
        <Icon name="minus" size={ICON_SIZE[size]} color={decIconColor} />
      </TouchableOpacity>
      <Text style={valueStyle}>{value}</Text>
      <TouchableOpacity
        style={[incButtonStyle, incDisabled && buttonDisabledStyle]}
        onPress={increment}
        disabled={incDisabled}
        activeOpacity={0.8}
        accessibilityRole="button"
        accessibilityLabel="Увеличить"
      >
        <Icon name="plus" size={ICON_SIZE[size]} color={incIconColor} />
      </TouchableOpacity>
    </View>
  );
};
