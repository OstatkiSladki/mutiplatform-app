import React from 'react';
import { Text as RNText, TextProps as RNTextProps, StyleSheet } from 'react-native';
import { theme } from '../../config/theme';

export interface TextProps extends RNTextProps {
  variant?: 'title' | 'body' | 'caption';
  weight?: 'regular' | 'medium' | 'bold';
  color?: string;
  align?: 'left' | 'center' | 'right';
}

export const Text = ({
  variant = 'body',
  weight = 'regular',
  color = theme.colors.neutral[1],
  align = 'left',
  style,
  children,
  ...props
}: TextProps) => {
  return (
    <RNText
      style={[
        styles.base,
        styles[variant],
        styles[weight],
        { color, textAlign: align },
        style,
      ]}
      {...props}
    >
      {children}
    </RNText>
  );
};

const styles = StyleSheet.create({
  base: {
    fontFamily: theme.typography.fontFamilies.sourceSansProRegular,
  },
  title: {
    fontSize: theme.typography.fontSizes[9],
    lineHeight: theme.typography.fontSizes[9] * theme.typography.lineHeights.normal,
  },
  body: {
    fontSize: theme.typography.fontSizes[5],
    lineHeight: theme.typography.fontSizes[5] * theme.typography.lineHeights.loose,
  },
  caption: {
    fontSize: theme.typography.fontSizes[3],
    lineHeight: theme.typography.fontSizes[3] * theme.typography.lineHeights.tight,
  },
  regular: {
    fontWeight: '400',
  },
  medium: {
    fontFamily: theme.typography.fontFamilies.sourceSansProSemiBold,
    fontWeight: '400',
  },
  bold: {
    fontFamily: theme.typography.fontFamilies.sourceSansProBold,
    fontWeight: '400',
  },
});
