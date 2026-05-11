import React from 'react';
import { View, ViewProps } from 'react-native';
import { theme } from '../../config/theme';

export interface SpacerProps extends ViewProps {
  size?: keyof typeof theme.spacing;
  horizontal?: boolean;
  flex?: number;
}

export const Spacer: React.FC<SpacerProps> = ({
  size,
  horizontal = false,
  flex,
  style,
  ...props
}) => {
  return (
    <View
      style={[
        flex !== undefined ? { flex } : {},
        size !== undefined
          ? horizontal
            ? { width: theme.spacing[size] }
            : { height: theme.spacing[size] }
          : { flex: 1 },
        style,
      ]}
      {...props}
    />
  );
};
