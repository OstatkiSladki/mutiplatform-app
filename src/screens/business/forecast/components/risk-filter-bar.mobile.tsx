import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Icon } from '../../../../shared/ui/icon';
import { theme } from '../../../../shared/config/theme';
import type { RiskLevel } from '../../../../entities/business-app/model/types';

const b = theme.business;

export type RiskFilterValue = 'all' | RiskLevel;

export interface RiskFilterBarProps {
  options: { value: RiskFilterValue; label: string }[];
  active: RiskFilterValue;
  onChange: (next: RiskFilterValue) => void;
  categoriesLabel: string;
}

export const RiskFilterBar = ({ options, active, onChange, categoriesLabel }: RiskFilterBarProps) => (
  <View style={styles.row}>
    <View style={styles.tabs}>
      {options.map((opt) => {
        const isActive = active === opt.value;
        return (
          <Pressable
            key={opt.value}
            onPress={() => onChange(opt.value)}
            style={[styles.tab, isActive && styles.tabActive]}
            accessibilityRole="tab"
            accessibilityState={{ selected: isActive }}
          >
            <Text style={[styles.tabLabel, isActive && styles.tabLabelActive]}>{opt.label}</Text>
          </Pressable>
        );
      })}
    </View>
    <View style={styles.categoriesBtn}>
      <Icon name="filter" size={14} color={b.colors.foreground} />
      <Text style={styles.categoriesText}>{categoriesLabel}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    columnGap: 12,
    rowGap: 12,
    marginBottom: 24,
  },
  tabs: {
    flexDirection: 'row',
    backgroundColor: 'rgba(244, 240, 236, 0.6)',
    borderRadius: b.radius.pill,
    padding: 4,
    columnGap: 4,
  },
  tab: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: b.radius.pill,
  },
  tabActive: {
    backgroundColor: b.colors.surface,
    ...b.shadows.soft,
  },
  tabLabel: {
    fontFamily: b.typography.fontFamilySemiBold,
    fontSize: 14,
    fontWeight: '400',
    color: b.colors.mutedForeground,
  },
  tabLabelActive: {
    color: b.colors.foreground,
  },
  categoriesBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 8,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: b.radius.pill,
    borderWidth: 1,
    borderColor: b.colors.border,
    backgroundColor: b.colors.surface,
  },
  categoriesText: {
    fontFamily: b.typography.fontFamilySemiBold,
    fontSize: 14,
    fontWeight: '400',
    color: b.colors.foreground,
  },
});
