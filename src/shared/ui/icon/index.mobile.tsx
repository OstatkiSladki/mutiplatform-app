import React from 'react';
import { Feather } from '@expo/vector-icons';
import type { ComponentProps } from 'react';
import { theme } from '../../config/theme';

export type IconName = ComponentProps<typeof Feather>['name'];

export interface IconProps {
  name: IconName;
  size?: number;
  color?: string;
}

export const Icon = ({ name, size = 20, color = theme.colors.neutral[1] }: IconProps) => (
  <Feather name={name} size={size} color={color} />
);
