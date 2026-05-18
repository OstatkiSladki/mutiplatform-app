import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme } from '../../../../shared/config/theme';

const b = theme.business;

export interface PublishedCounterProps {
  label: string;
  count: number;
}

export const PublishedCounter = ({ label, count }: PublishedCounterProps) => (
  <View style={styles.box}>
    <Text style={styles.label}>{label}</Text>
    <Text style={styles.count}>{count}</Text>
  </View>
);

const styles = StyleSheet.create({
  box: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 24,
    backgroundColor: b.colors.surface,
    borderColor: b.colors.border,
    borderWidth: 1,
    borderRadius: b.radius.card,
    paddingHorizontal: 24,
    paddingVertical: 16,
    alignSelf: 'flex-start',
    ...b.shadows.soft,
  },
  label: {
    fontFamily: b.typography.fontFamilySemiBold,
    fontSize: 16,
    fontWeight: '400',
    color: b.colors.foreground,
  },
  count: {
    fontFamily: b.typography.fontFamilyBold,
    fontSize: 24,
    fontWeight: '400',
    color: b.colors.foreground,
    letterSpacing: -0.5,
  },
});
