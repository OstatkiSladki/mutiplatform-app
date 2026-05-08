import React from 'react';
import { View } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { theme } from '../../config/theme';
import { styles } from './styles';

export interface StarsProps {
  rating: number;
  size?: number;
  color?: string;
  emptyColor?: string;
  max?: number;
}

export const Stars = ({
  rating,
  size = 14,
  color = theme.colors.status.warning,
  emptyColor = theme.colors.neutral[7],
  max = 5,
}: StarsProps) => {
  const rounded = Math.round(rating);
  return (
    <View style={styles.row}>
      {Array.from({ length: max }).map((_, i) => (
        <FontAwesome
          key={i}
          name="star"
          size={size}
          color={i < rounded ? color : emptyColor}
        />
      ))}
    </View>
  );
};
