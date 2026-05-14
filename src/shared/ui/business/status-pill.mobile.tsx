import React, { ReactNode } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme } from '../../config/theme';

const b = theme.business;

export type StatusPillVariant =
  | 'pending'
  | 'confirmed'
  | 'done'
  | 'cancelled'
  | 'high'
  | 'mid'
  | 'low'
  | 'draft';

interface StatusPillProps {
  variant: StatusPillVariant;
  children: ReactNode;
  dot?: boolean;
}

export const StatusPill = ({ variant, children, dot = true }: StatusPillProps) => {
  const token = b.colors.status[variant];
  return (
    <View style={[styles.pill, { backgroundColor: token.bg }]}>
      {dot && <View style={[styles.dot, { backgroundColor: token.fg }]} />}
      <Text style={[styles.label, { color: token.fg }]}>{children}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    borderRadius: b.radius.pill,
    paddingHorizontal: 12,
    paddingVertical: 4,
    columnGap: 6,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  label: {
    fontFamily: b.typography.fontFamily,
    fontSize: b.typography.pill.fontSize,
    fontWeight: b.typography.pill.fontWeight,
  },
});
