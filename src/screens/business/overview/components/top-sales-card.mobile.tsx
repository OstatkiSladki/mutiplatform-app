import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { theme } from '../../../../shared/config/theme';
import type { TopSaleRow } from '../data';

const b = theme.business;

export interface TopSalesCardProps {
  rows: TopSaleRow[];
  title: string;
  subtitle: string;
  cta: string;
  headers: { rank: string; position: string; revenue: string; percent: string };
  soldLabel: (n: number) => string;
  onPress?: () => void;
}

const PREVIEW_COUNT = 4;

export const TopSalesCard = ({ rows, title, subtitle, cta, headers, soldLabel, onPress }: TopSalesCardProps) => {
  const preview = rows.slice(0, PREVIEW_COUNT);
  return (
    <Pressable style={styles.card} onPress={onPress} accessibilityRole="button" accessibilityLabel={title}>
      <View style={styles.headerRow}>
        <View style={styles.headerText}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subtitle}>{subtitle}</Text>
        </View>
        <Text style={styles.cta}>{cta}</Text>
      </View>

      <View style={styles.tableHead}>
        <Text style={[styles.headerCol, styles.colRank]}>{headers.rank}</Text>
        <Text style={[styles.headerCol, styles.colName]}>{headers.position}</Text>
        <Text style={[styles.headerCol, styles.colRevenue]}>{headers.revenue}</Text>
        <Text style={[styles.headerCol, styles.colPct]}>{headers.percent}</Text>
      </View>

      {preview.map((row) => (
        <View key={row.rank} style={styles.row}>
          <Text style={[styles.rankText, styles.colRank]}>{row.rank}</Text>
          <View style={styles.colName}>
            <Text style={styles.rowName} numberOfLines={1}>{row.name}</Text>
            <Text style={styles.rowSold}>{soldLabel(row.sold)}</Text>
          </View>
          <Text style={[styles.rowRevenue, styles.colRevenue]}>{row.revenue}</Text>
          <View style={styles.colPct}>
            <View style={[styles.pill, { backgroundColor: row.pillBg }]}>
              <Text style={[styles.pillText, { color: row.pillFg }]}>{row.pct}</Text>
            </View>
          </View>
        </View>
      ))}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    minWidth: 320,
    backgroundColor: b.colors.surface,
    borderRadius: b.radius.card,
    padding: 24,
    borderWidth: 1,
    borderColor: b.colors.border,
    ...b.shadows.card,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: 16,
    columnGap: 12,
  },
  headerText: {
    flex: 1,
  },
  title: {
    fontFamily: b.typography.fontFamily,
    fontSize: 20,
    fontWeight: '700',
    color: b.colors.foreground,
  },
  subtitle: {
    fontFamily: b.typography.fontFamily,
    fontSize: 14,
    color: b.colors.mutedForeground,
    marginTop: 2,
  },
  cta: {
    fontFamily: b.typography.fontFamily,
    fontSize: 14,
    fontWeight: '600',
    color: b.colors.primary,
  },
  tableHead: {
    flexDirection: 'row',
    paddingHorizontal: 8,
    marginBottom: 8,
    columnGap: 12,
  },
  headerCol: {
    fontFamily: b.typography.fontFamily,
    fontSize: 12,
    color: b.colors.mutedForeground,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: b.colors.border,
    columnGap: 12,
  },
  colRank: {
    width: 32,
  },
  colName: {
    flex: 1,
  },
  colRevenue: {
    width: 110,
    textAlign: 'right',
  },
  colPct: {
    width: 64,
    alignItems: 'flex-end',
  },
  rankText: {
    fontFamily: b.typography.fontFamily,
    fontSize: 14,
    color: b.colors.mutedForeground,
  },
  rowName: {
    fontFamily: b.typography.fontFamily,
    fontSize: 14,
    fontWeight: '500',
    color: b.colors.foreground,
  },
  rowSold: {
    fontFamily: b.typography.fontFamily,
    fontSize: 12,
    color: b.colors.mutedForeground,
    marginTop: 2,
  },
  rowRevenue: {
    fontFamily: b.typography.fontFamily,
    fontSize: 14,
    fontWeight: '600',
    color: b.colors.foreground,
  },
  pill: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: b.radius.pill,
  },
  pillText: {
    fontFamily: b.typography.fontFamily,
    fontSize: 12,
    fontWeight: '600',
  },
});
