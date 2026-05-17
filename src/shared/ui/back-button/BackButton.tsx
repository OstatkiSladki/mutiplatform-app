import React from 'react';
import { Pressable, StyleSheet, ViewStyle } from 'react-native';
import { theme } from '../../config/theme';
import { Icon } from '../icon';

export interface BackButtonProps {
  onPress: () => void;
  accessibilityLabel?: string;
  style?: ViewStyle;
}

/** Кнопка «назад»: квадрат со скруглением 8px (mobile auth); стрелка на общем фоне. */
export const BackButton = ({
  onPress,
  accessibilityLabel = 'Назад',
  style,
}: BackButtonProps) => (
  <Pressable
    onPress={onPress}
    accessibilityRole="button"
    accessibilityLabel={accessibilityLabel}
    hitSlop={12}
    style={({ pressed }) => [
      styles.hit,
      pressed && styles.hitPressed,
      style,
    ]}
  >
    <Icon name="arrow-left" size={22} color={theme.colors.neutral[1]} />
  </Pressable>
);

const SIZE = 44;

const styles = StyleSheet.create({
  hit: {
    width: SIZE,
    height: SIZE,
    borderRadius: theme.spacing[2],
    backgroundColor: theme.colors.neutral.white,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  hitPressed: {
    opacity: 0.88,
    transform: [{ scale: 0.96 }],
  },
});
