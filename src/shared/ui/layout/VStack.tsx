import React from 'react';
import { View, ViewProps, StyleSheet, FlexStyle } from 'react-native';
import { theme } from '../../config/theme';

export interface VStackProps extends ViewProps {
  children?: React.ReactNode;
  gap?: keyof typeof theme.spacing;
  alignItems?: FlexStyle['alignItems'];
  justifyContent?: FlexStyle['justifyContent'];
  flex?: FlexStyle['flex'];
}

export const VStack: React.FC<VStackProps> = ({
  children,
  gap = 0,
  alignItems = 'stretch',
  justifyContent = 'flex-start',
  flex,
  style,
  ...props
}) => {
  return (
    <View
      style={[
        {
          flexDirection: 'column',
          alignItems,
          justifyContent,
          gap: theme.spacing[gap],
          flex,
        },
        style,
      ]}
      {...props}
    >
      {children}
    </View>
  );
};
