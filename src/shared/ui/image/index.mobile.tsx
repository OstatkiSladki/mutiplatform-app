import React from 'react';
import { Image as ExpoImage, ImageProps as ExpoImageProps, ImageContentFit } from 'expo-image';
import { theme } from '../../config/theme';

export interface ImageProps extends Omit<ExpoImageProps, 'contentFit'> {
  contentFit?: ImageContentFit;
}

export const Image = ({
  contentFit = 'cover',
  transition = 200,
  style,
  placeholderContentFit = 'cover',
  ...props
}: ImageProps) => (
  <ExpoImage
    contentFit={contentFit}
    transition={transition}
    placeholderContentFit={placeholderContentFit}
    style={[{ backgroundColor: theme.colors.neutral[9] }, style]}
    {...props}
  />
);
