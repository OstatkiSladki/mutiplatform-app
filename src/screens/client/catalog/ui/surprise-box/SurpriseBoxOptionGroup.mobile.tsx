import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { theme } from '../../../../../shared/config/theme';

export interface SurpriseBoxOptionGroupProps {
  title: string;
  options: readonly { key: string; label: string }[];
  selectedKey: string;
  onSelect: (key: string) => void;
}

export const SurpriseBoxOptionGroup = ({
  title,
  options,
  selectedKey,
  onSelect,
}: SurpriseBoxOptionGroupProps) => (
  <View style={styles.section}>
    <Text style={styles.groupTitle}>{title}</Text>
    <View style={styles.pills}>
      {options.map(({ key, label }) => {
        const active = selectedKey === key;
        return (
          <TouchableOpacity
            key={key}
            style={[styles.pill, active && styles.pillActive]}
            onPress={() => onSelect(key)}
            activeOpacity={0.85}
            accessibilityRole="button"
            accessibilityState={{ selected: active }}
          >
            <Text style={[styles.pillLabel, active && styles.pillLabelActive]}>{label}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  </View>
);

const styles = StyleSheet.create({
  section: {
    gap: theme.spacing[3],
  },
  groupTitle: {
    fontFamily: theme.client.typography.fontFamily,
    fontWeight: '600',
    fontSize: theme.typography.fontSizes[5],
    lineHeight: theme.typography.fontSizes[5] * theme.typography.lineHeights.normal,
    color: theme.client.colors.foreground,
  },
  pills: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing[2],
  },
  pill: {
    paddingHorizontal: theme.spacing[4],
    paddingVertical: theme.spacing[2],
    borderRadius: theme.client.radius.pill,
    backgroundColor: theme.colors.neutral[9],
    minHeight: theme.spacing[7],
    justifyContent: 'center',
  },
  pillActive: {
    backgroundColor: theme.client.colors.primary,
  },
  pillLabel: {
    fontFamily: theme.client.typography.fontFamily,
    fontWeight: '400',
    fontSize: theme.typography.fontSizes[5],
    lineHeight: theme.typography.fontSizes[5] * theme.typography.lineHeights.normal,
    color: theme.client.colors.foreground,
  },
  pillLabelActive: {
    color: theme.client.colors.primaryForeground,
  },
});
