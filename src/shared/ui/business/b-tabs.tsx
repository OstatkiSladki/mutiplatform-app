import React, { ReactNode } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { theme } from '../../config/theme';

const b = theme.business;

export interface BTabItem {
  key: string;
  label: string;
  count?: number;
}

export interface BTabsProps {
  tabs: BTabItem[];
  activeTab: string;
  onChange: (key: string) => void;
  children: ReactNode;
}

export const BTabs = ({ tabs, activeTab, onChange, children }: BTabsProps) => (
  <View style={styles.root}>
    <View style={styles.tabBar} accessibilityRole="tablist">
      {tabs.map(({ key, label, count }) => {
        const isActive = activeTab === key;
        return (
          <Pressable
            key={key}
            style={[styles.tab, isActive && styles.tabActive]}
            onPress={() => onChange(key)}
            accessibilityRole="tab"
            accessibilityState={{ selected: isActive }}
          >
            <Text style={isActive ? styles.labelActive : styles.labelInactive}>
              {label}
              {count !== undefined ? ` (${count})` : ''}
            </Text>
          </Pressable>
        );
      })}
    </View>
    <View style={styles.content}>{children}</View>
  </View>
);

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  tabBar: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: b.colors.border,
    columnGap: 4,
  },
  tab: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
    marginBottom: -1,
  },
  tabActive: {
    borderBottomColor: b.colors.primary,
  },
  labelActive: {
    fontFamily: b.typography.fontFamilySemiBold,
    fontSize: 14,
    fontWeight: '400',
    color: b.colors.primary,
  },
  labelInactive: {
    fontFamily: b.typography.fontFamily,
    fontSize: 14,
    fontWeight: '400',
    color: b.colors.mutedForeground,
  },
  content: {
    flex: 1,
    paddingTop: 16,
  },
});
