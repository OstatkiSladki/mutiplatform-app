import React, { ComponentProps } from 'react';
import { View, Text, StyleProp, ViewStyle } from 'react-native';
import { Image } from 'expo-image';
import { Icon } from '../icon';
import { theme } from '../../config/theme';
import { styles, sizeStyles } from './styles';

export type AvatarSize = 'sm' | 'md';
type ExpoImageSource = ComponentProps<typeof Image>['source'];

export interface AvatarProps {
  name?: string;
  source?: ExpoImageSource;
  size?: AvatarSize;
  style?: StyleProp<ViewStyle>;
}

const ICON_SIZE: Record<AvatarSize, number> = {
  sm: 20,
  md: 22,
};

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return '';
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
}

export const Avatar = ({ name, source, size = 'md', style }: AvatarProps) => {
  const sizeStyle = sizeStyles[size];

  if (source) {
    return (
      <Image
        source={source}
        style={[styles.image, sizeStyle, style]}
        contentFit="cover"
      />
    );
  }

  const initials = name ? getInitials(name) : '';

  return (
    <View style={[styles.fallback, sizeStyle, style]}>
      {initials ? (
        <Text
          style={styles.initials}
          numberOfLines={1}
          allowFontScaling={false}
        >
          {initials}
        </Text>
      ) : (
        <Icon
          name="user"
          size={ICON_SIZE[size]}
          color={theme.client.colors.mutedForeground}
        />
      )}
    </View>
  );
};
