import React from 'react';
import { Image } from 'expo-image';
import { StyleSheet, View } from 'react-native';
import { theme } from '../../../../../shared/config/theme';

const heroImage = require('../../../../../../assets/surbricebox.png');

export const SurpriseBoxHero = () => (
  <View style={styles.wrap}>
    <Image source={heroImage} style={styles.image} contentFit="cover" accessibilityIgnoresInvertColors />
  </View>
);

const styles = StyleSheet.create({
  wrap: {
    width: '100%',
    borderRadius: theme.client.radius.md,
    overflow: 'hidden',
    backgroundColor: theme.colors.neutral[9],
    aspectRatio: 358 / 214,
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
