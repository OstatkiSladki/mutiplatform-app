import React, { useEffect } from 'react';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  cancelAnimation,
} from 'react-native-reanimated';
import { StyleSheet, StyleProp, ViewStyle, DimensionValue } from 'react-native';
import { theme } from '../../config/theme';

const b = theme.business;

export interface BSkeletonProps {
  width?: DimensionValue;
  height?: number;
  borderRadius?: number;
  style?: StyleProp<ViewStyle>;
}

export const BSkeleton = ({ width = '100%', height = 20, borderRadius = b.radius.sm, style }: BSkeletonProps) => {
  const opacity = useSharedValue(1);

  useEffect(() => {
    opacity.value = withRepeat(withTiming(0.35, { duration: 800 }), -1, true);
    return () => { cancelAnimation(opacity); };
  }, [opacity]);

  const animatedStyle = useAnimatedStyle(() => ({ opacity: opacity.value }));

  return (
    <Animated.View
      style={[styles.base, { width, height, borderRadius }, animatedStyle, style]}
      accessibilityRole="progressbar"
      accessibilityLabel="Загрузка"
    />
  );
};

const styles = StyleSheet.create({
  base: {
    backgroundColor: b.colors.muted,
  },
});
