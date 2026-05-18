import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { theme } from '../../../../shared/config/theme';
import type { OutsiderRow } from '../data';

const b = theme.business;

export interface OutsidersCardProps {
  rows: OutsiderRow[];
  title: string;
  subtitle: string;
  cta: string;
  headers: { rank: string; position: string };
  rowAction: string;
  soldLabel: (n: number) => string;
  onPress?: () => void;
}

const PREVIEW_COUNT = 3;

export const OutsidersCard = ({ rows, title, subtitle, cta, headers, rowAction, soldLabel, onPress }: OutsidersCardProps) => {
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
        <Text style={[styles.headerCol, styles.colAction]} />
      </View>

      {preview.map((row) => (
        <View key={row.rank} style={styles.row}>
          <Text style={[styles.rankText, styles.colRank]}>{row.rank}</Text>
          <View style={styles.colName}>
            <Text style={styles.rowName} numberOfLines={1}>{row.name}</Text>
            <Text style={styles.rowSold}>{soldLabel(row.sold)}</Text>
          </View>
          <Text style={[styles.rowAction, styles.colAction]}>{rowAction}</Text>
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
    fontFamily: b.typography.fontFamilyBold,
    fontSize: 20,
    fontWeight: '400',
    color: b.colors.foreground,
  },
  subtitle: {
    fontFamily: b.typography.fontFamily,
    fontSize: 14,
    color: b.colors.mutedForeground,
    marginTop: 2,
  },
  cta: {
    fontFamily: b.typography.fontFamilySemiBold,
    fontSize: 14,
    fontWeight: '400',
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
    paddingVertical: 16,
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
  colAction: {
    width: 90,
    textAlign: 'right',
  },
  rankText: {
    fontFamily: b.typography.fontFamily,
    fontSize: 14,
    color: b.colors.mutedForeground,
  },
  rowName: {
    fontFamily: b.typography.fontFamilySemiBold,
    fontSize: 14,
    fontWeight: '400',
    color: b.colors.foreground,
  },
  rowSold: {
    fontFamily: b.typography.fontFamily,
    fontSize: 12,
    color: b.colors.mutedForeground,
    marginTop: 2,
  },
  rowAction: {
    fontFamily: b.typography.fontFamilySemiBold,
    fontSize: 14,
    fontWeight: '400',
    color: b.colors.primary,
  },
});
