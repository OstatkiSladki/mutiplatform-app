import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Image } from 'expo-image';
import { Icon } from '../../../../../shared/ui/icon';
import { theme } from '../../../../../shared/config/theme';

export interface ProductHeroProps {
  imageUri?: string | null;
}

export const ProductHero = ({ imageUri }: ProductHeroProps) => (
  <View style={styles.wrap}>
    <View style={styles.frame}>
      {imageUri ? (
        <Image source={{ uri: imageUri }} style={styles.image} contentFit="contain" />
      ) : (
        <View style={styles.placeholder}>
          <Icon name="gift" size={56} color={theme.client.colors.mutedForeground} />
        </View>
      )}
    </View>
  </View>
);

const styles = StyleSheet.create({
  wrap: {
    width: '100%',
    alignItems: 'center',
  },
  frame: {
    width: '100%',
    maxWidth: '100%',
    aspectRatio: 1,
    borderRadius: theme.client.radius.lg,
    backgroundColor: theme.client.colors.card,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  placeholder: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.client.colors.secondaryMuted,
  },
});
