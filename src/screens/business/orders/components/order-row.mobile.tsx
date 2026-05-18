import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Icon } from '../../../../shared/ui/icon';
import { theme } from '../../../../shared/config/theme';
import { StatusPill } from '../../../../shared/ui/business';
import type { BusinessOrder, OrderStatus } from '../../../../entities/business-app/model/types';
import type { StatusPillVariant } from '../../../../shared/ui/business/status-pill';

const b = theme.business;

const STATUS_VARIANT: Record<OrderStatus, StatusPillVariant> = {
  'Ожидает': 'pending',
  'Подтверждён': 'draft',
  'Выполнен': 'done',
  'Отменён': 'cancelled',
};

export interface OrderRowProps {
  order: BusinessOrder;
  timeWindow: string;
  advanceLabel: string;
  noActionLabel: string;
  onAdvance: () => void;
}

export const OrderRow = ({ order, timeWindow, advanceLabel, noActionLabel, onAdvance }: OrderRowProps) => {
  const canAdvance = order.status === 'Ожидает' || order.status === 'Подтверждён';
  return (
    <View style={styles.row}>
      <Text style={[styles.bold, styles.colId]}>{`#${order.id}`}</Text>
      <Text style={[styles.text, styles.colClient]} numberOfLines={1}>{order.client}</Text>
      <Text style={[styles.muted, styles.colItems]} numberOfLines={1}>{order.items}</Text>
      <Text style={[styles.bold, styles.colAmount]}>{`${order.amount}₽`}</Text>
      <Text style={[styles.muted, styles.colTime]}>{timeWindow}</Text>
      <View style={styles.colStatus}>
        <StatusPill variant={STATUS_VARIANT[order.status]} dot={false}>{order.status}</StatusPill>
      </View>
      <View style={styles.colAction}>
        {canAdvance ? (
          <Pressable
            style={styles.advanceBtn}
            onPress={onAdvance}
            accessibilityRole="button"
            accessibilityLabel={advanceLabel}
          >
            <Text style={styles.advanceText}>{advanceLabel}</Text>
            <Icon name="chevron-right" size={14} color={b.colors.primaryForeground} />
          </Pressable>
        ) : (
          <Text style={styles.muted}>{noActionLabel}</Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 8,
    borderTopWidth: 1,
    borderTopColor: b.colors.border,
    columnGap: 12,
  },
  colId: { width: 90 },
  colClient: { flex: 1, minWidth: 160 },
  colItems: { flex: 1.4, minWidth: 200 },
  colAmount: { width: 90 },
  colTime: { width: 110 },
  colStatus: { width: 140 },
  colAction: { width: 200, flexDirection: 'row', justifyContent: 'flex-end' },
  bold: {
    fontFamily: b.typography.fontFamilyBold,
    fontSize: 15,
    fontWeight: '400',
    color: b.colors.foreground,
  },
  text: {
    fontFamily: b.typography.fontFamily,
    fontSize: 15,
    color: b.colors.foreground,
  },
  muted: {
    fontFamily: b.typography.fontFamily,
    fontSize: 15,
    color: b.colors.mutedForeground,
  },
  advanceBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 6,
    backgroundColor: b.colors.primary,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: b.radius.pill,
    ...b.shadows.glow,
  },
  advanceText: {
    fontFamily: b.typography.fontFamilySemiBold,
    fontSize: 13,
    fontWeight: '400',
    color: b.colors.primaryForeground,
  },
});
