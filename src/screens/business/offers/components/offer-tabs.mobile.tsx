import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Icon } from '../../../../shared/ui/icon';
import { theme } from '../../../../shared/config/theme';
import type { OfferStatus } from '../../../../entities/business-app/model/types';

const b = theme.business;

export type OfferTabValue = 'all' | OfferStatus;

export interface OfferTabsProps {
  options: { value: OfferTabValue; label: string }[];
  active: OfferTabValue;
  onChange: (next: OfferTabValue) => void;
  categoriesLabel: string;
}

export const OfferTabs = ({ options, active, onChange, categoriesLabel }: OfferTabsProps) => (
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
      <Icon name="filter" size={14} color={b.colors.mutedForeground} />
      <Text style={styles.categoriesText}>{categoriesLabel}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    columnGap: 8,
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
    fontFamily: b.typography.fontFamily,
    fontSize: 14,
    fontWeight: '600',
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
    paddingVertical: 8,
  },
  categoriesText: {
    fontFamily: b.typography.fontFamily,
    fontSize: 14,
    fontWeight: '500',
    color: b.colors.mutedForeground,
  },
});
