import React from 'react';
import { View, StyleSheet } from 'react-native';
import { SplashDecorations } from './SplashDecorations';
import { SplashLogo } from './SplashLogo';
import { SplashBrandText } from './SplashBrandText';
import { VStack } from '@/shared/ui/layout';

import { theme } from '@/shared/config/theme';

export const SplashContent = () => {
  return (
    <View style={styles.container}>
      <SplashDecorations />
      
      <View style={styles.centerContainer}>
        <VStack gap={4} alignItems="center">
          <SplashLogo />
          <SplashBrandText />
        </VStack>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.neutral.white,
  },
  centerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
});
