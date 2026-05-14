import React from 'react';
import { ActivityIndicator, ActivityIndicatorProps, StyleSheet, View } from 'react-native';
import { theme } from '../../config/theme';

export interface LoaderProps extends ActivityIndicatorProps {
  fullScreen?: boolean;
}

export const Loader = ({ size = 'large', color = theme.colors.primary[100], fullScreen, style, ...props }: LoaderProps) => {
  if (fullScreen) {
    return (
      <View style={[styles.fullScreen, style]}>
        <ActivityIndicator size={size} color={color} {...props} />
      </View>
    );
  }

  return <ActivityIndicator size={size} color={color} style={style} {...props} />;
};

const styles = StyleSheet.create({
  fullScreen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.neutral.white,
  },
});
