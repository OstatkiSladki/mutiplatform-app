import React from 'react';
import { View, ViewProps, FlexStyle } from 'react-native';
import { theme } from '../../config/theme';

export interface HStackProps extends ViewProps {
  children?: React.ReactNode;
  gap?: keyof typeof theme.spacing;
  alignItems?: FlexStyle['alignItems'];
  justifyContent?: FlexStyle['justifyContent'];
  flex?: FlexStyle['flex'];
  wrap?: FlexStyle['flexWrap'];
}

export const HStack: React.FC<HStackProps> = ({
  children,
  gap = 0,
  alignItems = 'center',
  justifyContent = 'flex-start',
  flex,
  wrap = 'nowrap',
  style,
  ...props
}) => {
  return (
    <View
      style={[
        {
          flexDirection: 'row',
          alignItems,
          justifyContent,
          flexWrap: wrap,
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
