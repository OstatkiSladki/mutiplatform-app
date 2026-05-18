import React, { useMemo } from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import { theme } from '../../config/theme';

const PILL_W = 20;
const PILL_H = 4;
const CORNER_R = 2;

export interface OnboardingPaginationProps {
  count: number;
  scrollX: Animated.Value;
  slideWidth: number;
}

/**
 * «Плавающая» активная полоска: позиция синхронизирована со свайпом (scrollX).
 * Неактивные дорожки — Neutral 8, активная — Primary 100%.
 */
export const OnboardingPagination = ({
  count,
  scrollX,
  slideWidth,
}: OnboardingPaginationProps) => {
  const gap = theme.spacing[3];
  const step = PILL_W + gap;
  const last = Math.max(0, count - 1);
  const maxScroll = last * slideWidth;

  const translateX = useMemo(
    () =>
      scrollX.interpolate({
        inputRange: [0, maxScroll],
        outputRange: [0, last * step],
        extrapolate: 'clamp',
      }),
    [scrollX, maxScroll, last, step],
  );

  const trackWidth = count * PILL_W + Math.max(0, count - 1) * gap;

  if (count <= 1) {
    return (
      <View style={styles.wrap} accessibilityRole="tablist">
        <View
          style={[styles.inactive, { backgroundColor: theme.colors.primary[100] }]}
          accessibilityLabel="Шаг 1 из 1"
        />
      </View>
    );
  }

  return (
    <View style={styles.wrap} accessibilityRole="tablist">
      <View style={[styles.track, { width: trackWidth }]}>
        <View style={styles.row}>
          {Array.from({ length: count }, (_, i) => (
            <View
              key={i}
              style={[styles.inactive, i > 0 ? { marginLeft: gap } : undefined]}
              accessibilityElementsHidden
              importantForAccessibility="no-hide-descendants"
            />
          ))}
        </View>
        <Animated.View
          pointerEvents="none"
          style={[styles.active, { transform: [{ translateX }] }]}
          accessibilityLabel="Индикатор шага"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrap: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  track: {
    height: PILL_H,
    position: 'relative',
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  inactive: {
    width: PILL_W,
    height: PILL_H,
    borderRadius: CORNER_R,
    backgroundColor: theme.colors.neutral[8],
  },
  active: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: PILL_W,
    height: PILL_H,
    borderRadius: CORNER_R,
    backgroundColor: theme.colors.primary[100],
  },
});
