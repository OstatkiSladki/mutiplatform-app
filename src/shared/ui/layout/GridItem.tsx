import React from 'react';
import { View, ViewProps, StyleSheet } from 'react-native';
import { theme } from '../../config/theme';

export interface GridItemProps extends ViewProps {
  children: React.ReactNode;
  columns?: number;
  gap?: keyof typeof theme.spacing;
}

export const GridItem: React.FC<GridItemProps> = ({
  children,
  columns = 2,
  gap = 2,
  style,
  ...props
}) => {
  const gapValue = theme.spacing[gap];
  
  return (
    <View
      style={[
        styles.item,
        {
          width: `${100 / columns}%`,
          paddingHorizontal: gapValue / 2,
          paddingBottom: gapValue,
        },
        style,
      ]}
      {...props}
    >
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    flexGrow: 0,
    flexShrink: 0,
  },
});
