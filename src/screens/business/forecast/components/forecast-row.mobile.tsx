import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { theme } from '../../../../shared/config/theme';
import { StatusPill } from '../../../../shared/ui/business';
import type { ForecastItem, RiskLevel } from '../../../../entities/business-app/model/types';

const b = theme.business;

const RISK_VARIANT: Record<RiskLevel, 'high' | 'mid' | 'low'> = {
  Высокий: 'high',
  Средний: 'mid',
  Низкий: 'low',
};

export interface ForecastRowProps {
  item: ForecastItem;
  surplusLabel: (n: number) => string;
  deficitLabel: (n: number) => string;
  actionLabel: string;
  onPress: () => void;
  onAction: () => void;
}

export const ForecastRow = ({ item, surplusLabel, deficitLabel, actionLabel, onPress, onAction }: ForecastRowProps) => {
  const diff = item.stock - item.forecast;
  return (
    <View style={styles.row}>
      <Pressable style={styles.bodyArea} onPress={onPress} accessibilityRole="button" accessibilityLabel={item.name}>
        <View style={styles.colName}>
          <Text style={styles.name} numberOfLines={1}>{item.name}</Text>
          <Text style={styles.sku}>{item.sku}</Text>
        </View>
        <Text style={[styles.cell, styles.colCategory]}>{item.category}</Text>
        <Text style={[styles.cellBold, styles.colNumber]}>{item.stock}</Text>
        <View style={styles.colForecast}>
          <Text style={styles.cellBold}>{item.forecast}</Text>
          {diff > 0 ? <Text style={styles.surplus}>{surplusLabel(diff)}</Text> : null}
          {diff < 0 ? <Text style={styles.deficit}>{deficitLabel(diff)}</Text> : null}
        </View>
        <View style={styles.colRisk}>
          <StatusPill variant={RISK_VARIANT[item.risk]} dot={false}>
            {item.risk}
          </StatusPill>
        </View>
      </Pressable>
      <View style={styles.colAction}>
        <Pressable
          style={styles.actionBtn}
          onPress={onAction}
          accessibilityRole="button"
          accessibilityLabel={actionLabel}
        >
          <Text style={styles.actionText}>{actionLabel}</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 8,
    borderTopWidth: 1,
    borderTopColor: b.colors.border,
    columnGap: 12,
  },
  bodyArea: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 12,
  },
  colName: {
    flex: 2,
    minWidth: 200,
  },
  colCategory: {
    flex: 1,
    minWidth: 120,
  },
  colNumber: {
    width: 80,
  },
  colForecast: {
    flex: 1,
    minWidth: 120,
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 8,
    flexWrap: 'wrap',
  },
  colRisk: {
    width: 110,
  },
  colAction: {
    width: 200,
    alignItems: 'flex-end',
  },
  name: {
    fontFamily: b.typography.fontFamily,
    fontSize: 15,
    fontWeight: '700',
    color: b.colors.foreground,
  },
  sku: {
    fontFamily: b.typography.fontFamily,
    fontSize: 12,
    color: b.colors.mutedForeground,
    marginTop: 2,
  },
  cell: {
    fontFamily: b.typography.fontFamily,
    fontSize: 14,
    color: b.colors.foreground,
  },
  cellBold: {
    fontFamily: b.typography.fontFamily,
    fontSize: 15,
    fontWeight: '700',
    color: b.colors.foreground,
  },
  surplus: {
    fontFamily: b.typography.fontFamily,
    fontSize: 13,
    color: '#f43f5e',
  },
  deficit: {
    fontFamily: b.typography.fontFamily,
    fontSize: 13,
    color: '#059669',
  },
  actionBtn: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: b.radius.pill,
    borderWidth: 1,
    borderColor: b.colors.border,
    backgroundColor: b.colors.surface,
  },
  actionText: {
    fontFamily: b.typography.fontFamily,
    fontSize: 14,
    fontWeight: '500',
    color: b.colors.foreground,
  },
});
