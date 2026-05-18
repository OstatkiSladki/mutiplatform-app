import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Icon } from '../../../../shared/ui/icon';
import { theme } from '../../../../shared/config/theme';
import { StatusPill } from '../../../../shared/ui/business';
import type { BusinessOffer } from '../../../../entities/business-app/model/types';

const b = theme.business;

export interface OfferRowProps {
  offer: BusinessOffer;
  publishLabel: string;
  editLabel: string;
  removeLabel: string;
  onPublish: () => void;
  onEdit: () => void;
  onRemove: () => void;
}

export const OfferRow = ({
  offer,
  publishLabel,
  editLabel,
  removeLabel,
  onPublish,
  onEdit,
  onRemove,
}: OfferRowProps) => {
  const isDraft = offer.status === 'Черновик';
  return (
    <View style={styles.row}>
      <View style={styles.colName}>
        <Text style={styles.name} numberOfLines={1}>{offer.name}</Text>
        <Text style={styles.sku}>{offer.sku}</Text>
      </View>
      <Text style={[styles.muted, styles.colCategory]}>{offer.category}</Text>
      <Text style={[styles.bold, styles.colSmall]}>{offer.stock}</Text>
      <Text style={[styles.strikethrough, styles.colSmall]}>{`${offer.oldPrice}₽`}</Text>
      <Text style={[styles.bold, styles.colSmall]}>{`${offer.price}₽`}</Text>
      <View style={styles.colStatus}>
        <StatusPill variant={isDraft ? 'draft' : 'done'} dot={false}>
          {offer.status}
        </StatusPill>
      </View>
      <View style={styles.colActions}>
        {isDraft ? (
          <Pressable style={styles.publishBtn} onPress={onPublish} accessibilityRole="button" accessibilityLabel={publishLabel}>
            <Text style={styles.publishText}>{publishLabel}</Text>
            <Icon name="chevron-right" size={14} color={b.colors.primaryForeground} />
          </Pressable>
        ) : null}
        <Pressable
          style={styles.iconBtn}
          onPress={onEdit}
          accessibilityRole="button"
          accessibilityLabel={editLabel}
        >
          <Icon name="edit-2" size={14} color={b.colors.foreground} />
        </Pressable>
        <Pressable
          style={styles.iconBtn}
          onPress={onRemove}
          accessibilityRole="button"
          accessibilityLabel={removeLabel}
        >
          <Icon name="x" size={14} color={b.colors.foreground} />
        </Pressable>
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
  colName: {
    flex: 2,
    minWidth: 200,
  },
  colCategory: {
    flex: 1,
    minWidth: 120,
  },
  colSmall: {
    width: 70,
  },
  colStatus: {
    width: 130,
  },
  colActions: {
    width: 240,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    columnGap: 8,
  },
  name: {
    fontFamily: b.typography.fontFamily,
    fontSize: 14,
    fontWeight: '600',
    color: b.colors.foreground,
  },
  sku: {
    fontFamily: b.typography.fontFamily,
    fontSize: 12,
    color: b.colors.mutedForeground,
    marginTop: 2,
  },
  muted: {
    fontFamily: b.typography.fontFamily,
    fontSize: 14,
    color: b.colors.mutedForeground,
  },
  bold: {
    fontFamily: b.typography.fontFamily,
    fontSize: 14,
    fontWeight: '600',
    color: b.colors.foreground,
  },
  strikethrough: {
    fontFamily: b.typography.fontFamily,
    fontSize: 14,
    color: b.colors.mutedForeground,
    textDecorationLine: 'line-through',
  },
  publishBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 6,
    backgroundColor: b.colors.primary,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: b.radius.pill,
    ...b.shadows.glow,
  },
  publishText: {
    fontFamily: b.typography.fontFamily,
    fontSize: 13,
    fontWeight: '600',
    color: b.colors.primaryForeground,
  },
  iconBtn: {
    width: 36,
    height: 36,
    borderRadius: b.radius.md,
    borderWidth: 1,
    borderColor: b.colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: b.colors.surface,
  },
});
