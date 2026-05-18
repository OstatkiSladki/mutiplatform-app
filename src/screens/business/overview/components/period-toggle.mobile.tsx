import React from 'react';
import { View, Pressable, Text, StyleSheet } from 'react-native';
import { theme } from '../../../../shared/config/theme';
import type { OverviewPeriod } from '../data';

const b = theme.business;

export interface PeriodToggleProps {
  options: { value: OverviewPeriod; label: string }[];
  active: OverviewPeriod;
  onChange: (next: OverviewPeriod) => void;
  size?: 'large' | 'compact';
}

export const PeriodToggle = ({ options, active, onChange, size = 'large' }: PeriodToggleProps) => {
  const isCompact = size === 'compact';
  return (
    <View style={[styles.bar, isCompact ? styles.barCompact : styles.barLarge]} accessibilityRole="tablist">
      {options.map((opt) => {
        const isActive = active === opt.value;
        return (
          <Pressable
            key={opt.value}
            onPress={() => onChange(opt.value)}
            style={[
              isCompact ? styles.btnCompact : styles.btnLarge,
              isActive && styles.btnActive,
            ]}
            accessibilityRole="tab"
            accessibilityState={{ selected: isActive }}
          >
            <Text
              style={[
                isCompact ? styles.labelCompact : styles.labelLarge,
                isActive ? styles.labelActive : styles.labelInactive,
              ]}
            >
              {opt.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  bar: {
    flexDirection: 'row',
    alignSelf: 'center',
    borderRadius: b.radius.pill,
    padding: 4,
  },
  barLarge: {
    backgroundColor: b.colors.surface,
    borderWidth: 1,
    borderColor: b.colors.border,
    ...b.shadows.soft,
  },
  barCompact: {
    backgroundColor: b.colors.muted,
  },
  btnLarge: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: b.radius.pill,
  },
  btnCompact: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: b.radius.pill,
  },
  btnActive: {
    backgroundColor: b.colors.foreground,
  },
  labelLarge: {
    fontFamily: b.typography.fontFamilySemiBold,
    fontSize: 14,
    fontWeight: '400',
  },
  labelCompact: {
    fontFamily: b.typography.fontFamilySemiBold,
    fontSize: 12,
    fontWeight: '400',
  },
  labelActive: {
    color: b.colors.background,
  },
  labelInactive: {
    color: b.colors.mutedForeground,
  },
});
