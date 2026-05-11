import React from 'react';
import { Image, StyleSheet, ImageProps, View } from 'react-native';
import { theme } from '../../config/theme';

interface CardImageProps extends ImageProps {
  aspectRatio?: number;
}

export const CardImage: React.FC<CardImageProps> = ({ 
  style, 
  aspectRatio = 1,
  ...props 
}) => {
  return (
    <View style={[styles.container, { aspectRatio }]}>
      <Image style={[styles.image, style]} {...props} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: theme.colors.neutral[9],
    borderTopLeftRadius: theme.radius.md,
    borderTopRightRadius: theme.radius.md,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
});