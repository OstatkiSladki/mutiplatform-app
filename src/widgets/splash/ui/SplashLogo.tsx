import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { theme } from '@/shared/config/theme';

export const SplashLogo = () => {
  return (
    <View style={styles.container}>
      {/* Assuming the splash-icon from assets corresponds to the orange heart-cutlery logo */}
      <Image 
        source={require('../../../../assets/splash-icon.png')} 
        style={styles.logo}
        resizeMode="contain"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing[4],
  },
  logo: {
    width: 160,
    height: 160,
    // Logo color will depend on the actual asset. 
    // In a real scenario, an SVG might be used to apply theme.colors.primary[100] exactly.
  },
});
