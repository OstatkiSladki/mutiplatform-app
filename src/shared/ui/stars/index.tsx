import React from 'react';
import { View } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { theme } from '../../config/theme';
import { styles } from './styles';

export type StarsVariant = 'sm' | 'md';

export interface StarsProps {
  rating: number;
  size?: number;
  variant?: StarsVariant;
  color?: string;
  emptyColor?: string;
  max?: number;
}

const VARIANT_SIZE: Record<StarsVariant, number> = {
  sm: 13,
  md: 16,
};

export const Stars = ({
  rating,
  size,
  variant,
  color = theme.colors.status.warning,
  emptyColor = theme.colors.neutral[7],
  max = 5,
}: StarsProps) => {
  const resolvedSize = size ?? (variant ? VARIANT_SIZE[variant] : 14);
  const rounded = Math.round(rating);
  return (
    <View style={styles.row}>
      {Array.from({ length: max }).map((_, i) => (
        <FontAwesome
          key={i}
          name="star"
          size={resolvedSize}
          color={i < rounded ? color : emptyColor}
        />
      ))}
    </View>
  );
};
