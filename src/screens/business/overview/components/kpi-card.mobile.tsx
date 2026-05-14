import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Icon } from '../../../../shared/ui/icon';
import { theme } from '../../../../shared/config/theme';
import type { KpiStat } from '../data';

const b = theme.business;

export interface KpiCardProps {
  stat: KpiStat;
  label: string;
  trailing: string;
}

export const KpiCard = ({ stat, label, trailing }: KpiCardProps) => {
  const deltaColor = stat.up ? '#059669' : '#ef4444';
  return (
    <View style={styles.card} accessibilityRole="summary">
      <View style={[styles.iconTile, { backgroundColor: stat.color }]}>
        <Icon name={stat.icon} size={20} color="#ffffff" />
      </View>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{stat.value}</Text>
      <View style={styles.deltaRow}>
        <Icon name={stat.up ? 'arrow-up-right' : 'arrow-down-right'} size={14} color={deltaColor} />
        <Text style={[styles.deltaText, { color: deltaColor }]} numberOfLines={2}>
          {stat.delta} {trailing}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    minWidth: 220,
    backgroundColor: b.colors.surface,
    borderRadius: b.radius.card,
    padding: 24,
    borderWidth: 1,
    borderColor: b.colors.border,
    ...b.shadows.card,
  },
  iconTile: {
    width: 48,
    height: 48,
    borderRadius: b.radius.lg,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
    ...b.shadows.soft,
  },
  label: {
    fontFamily: b.typography.fontFamily,
    fontSize: 14,
    color: b.colors.mutedForeground,
  },
  value: {
    fontFamily: b.typography.fontFamily,
    fontSize: 30,
    fontWeight: '700',
    color: b.colors.foreground,
    marginTop: 4,
    letterSpacing: -0.5,
  },
  deltaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 4,
    marginTop: 12,
    flexWrap: 'wrap',
  },
  deltaText: {
    fontFamily: b.typography.fontFamily,
    fontSize: 12,
    fontWeight: '500',
    flexShrink: 1,
  },
});
