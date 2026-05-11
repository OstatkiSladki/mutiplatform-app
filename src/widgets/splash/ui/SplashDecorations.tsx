import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { theme } from '@/shared/config/theme';

const { width, height } = Dimensions.get('window');

// Number of rays and their configuration
const TOP_LEFT_RAYS = 12;
const BOTTOM_RIGHT_RAYS = 15;
const RAY_LENGTH = width * 0.5;

export const SplashDecorations = () => {
  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none">
      {/* Top Left Decoration (Light Gray) */}
      <View style={[styles.cornerContainer, styles.topLeftContainer]}>
        {Array.from({ length: TOP_LEFT_RAYS }).map((_, i) => {
          const angle = i * 6; // Spread rays slightly
          return (
            <View
              key={`tl-${i}`}
              style={[
                styles.rayLine,
                { backgroundColor: theme.colors.neutral[8] },
                {
                  transform: [
                    { translateX: -RAY_LENGTH / 2 },
                    { rotate: `${angle}deg` },
                    { translateX: RAY_LENGTH / 2 },
                  ],
                },
              ]}
            />
          );
        })}
      </View>

      {/* Bottom Right Decoration (Orange) */}
      <View style={[styles.cornerContainer, styles.bottomRightContainer]}>
        {Array.from({ length: BOTTOM_RIGHT_RAYS }).map((_, i) => {
          // Spread rays over 90 degrees
          const angle = -180 + (i * 6);
          return (
            <View
              key={`br-${i}`}
              style={[
                styles.rayLine,
                { backgroundColor: theme.colors.primary[100] },
                {
                  transform: [
                    { translateX: RAY_LENGTH / 2 },
                    { rotate: `${angle}deg` },
                    { translateX: -RAY_LENGTH / 2 },
                  ],
                },
              ]}
            />
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cornerContainer: {
    position: 'absolute',
    width: 0,
    height: 0,
  },
  topLeftContainer: {
    top: 0,
    left: 0,
  },
  bottomRightContainer: {
    bottom: 0,
    right: 0,
  },
  rayLine: {
    position: 'absolute',
    height: 3,
    width: RAY_LENGTH,
    borderRadius: theme.radius.full,
    left: -RAY_LENGTH / 2,
    top: -1.5,
  },
});
