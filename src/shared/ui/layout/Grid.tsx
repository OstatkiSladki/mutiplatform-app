import React from 'react';
import { View, ViewProps, StyleSheet } from 'react-native';
import { theme } from '../../config/theme';

export interface GridProps extends ViewProps {
  children: React.ReactNode;
  columns?: number;
  gap?: keyof typeof theme.spacing;
}

export const Grid: React.FC<GridProps> = ({
  children,
  columns = 2,
  gap = 2, // 8px by default
  style,
  ...props
}) => {
  const gapValue = theme.spacing[gap];

  return (
    <View
      style={[
        styles.grid,
        {
          marginHorizontal: -gapValue / 2,
        },
        style,
      ]}
      {...props}
    >
      {React.Children.map(children, (child) => {
        if (!React.isValidElement(child)) return null;

        // Calculate card width percentage based on columns and gap
        // Using flexBasis directly
        return (
          <View
            style={[
              styles.item,
              {
                width: `${100 / columns}%`,
                paddingHorizontal: gapValue / 2,
                paddingBottom: gapValue,
              },
            ]}
          >
            {child}
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  item: {
    flexGrow: 0,
    flexShrink: 0,
  },
});