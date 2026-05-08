import React from 'react';
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Icon } from '../../../shared/ui/icon';
import { BDialog } from '../../../shared/ui/business';
import { theme } from '../../../shared/config/theme';
import type { ForecastItem } from '../../../entities/business-app/model/types';

const b = theme.business;

export interface SingleOfferModalProps {
  visible: boolean;
  item: ForecastItem | null;
  qty: number;
  onChangeQty: (next: number) => void;
  onPublish: () => void;
  onClose: () => void;
}

export const SingleOfferModal = ({ visible, item, qty, onChangeQty, onPublish, onClose }: SingleOfferModalProps) => {
  const { t } = useTranslation('business');
  if (!item) return null;

  const handleQty = (v: string) => {
    const n = Number(v.replace(/[^0-9]/g, ''));
    onChangeQty(Number.isFinite(n) ? n : 0);
  };

  return (
    <BDialog visible={visible} onClose={onClose} title={item.name}>
      <View style={styles.infoRow}>
        <View style={styles.infoCell}>
          <Text style={styles.label}>{t('forecast.single.category')}</Text>
          <Text style={styles.muted}>{item.category}</Text>
        </View>
        <View style={styles.infoCell}>
          <Text style={styles.label}>{t('forecast.single.stock')}</Text>
          <Text style={styles.muted}>{item.stock}</Text>
        </View>
      </View>

      <View style={styles.metaGrid}>
        <View style={styles.metaCell}>
          <Text style={styles.smallLabel}>{t('forecast.single.qty')}</Text>
          <TextInput
            value={String(qty)}
            keyboardType="numeric"
            onChangeText={handleQty}
            style={styles.qtyInput}
          />
        </View>
        <View style={styles.metaCell}>
          <Text style={styles.smallLabel}>{t('forecast.single.price')}</Text>
          <Text style={styles.priceText}>1400₽</Text>
        </View>
        <View style={styles.metaCell}>
          <Text style={styles.smallLabel}>{t('forecast.single.commission')}</Text>
          <Text style={styles.metaValue}>20%</Text>
        </View>
      </View>

      <View style={styles.totalRow}>
        <Text style={styles.totalLabel}>{t('forecast.single.priceColon')}</Text>
        <Text style={styles.totalValue}>1680 ₽</Text>
      </View>

      <Pressable style={styles.publishBtn} onPress={onPublish} accessibilityRole="button">
        <Text style={styles.publishBtnText}>{t('forecast.single.publish')}</Text>
        <Icon name="chevron-right" size={18} color={b.colors.primaryForeground} />
      </Pressable>
    </BDialog>
  );
};

const styles = StyleSheet.create({
  infoRow: {
    flexDirection: 'row',
    columnGap: 16,
    marginBottom: 24,
  },
  infoCell: {
    flex: 1,
  },
  label: {
    fontFamily: b.typography.fontFamily,
    fontSize: 15,
    fontWeight: '600',
    color: b.colors.foreground,
    marginBottom: 6,
  },
  smallLabel: {
    fontFamily: b.typography.fontFamily,
    fontSize: 13,
    fontWeight: '600',
    color: b.colors.foreground,
    marginBottom: 6,
  },
  muted: {
    fontFamily: b.typography.fontFamily,
    fontSize: 14,
    color: b.colors.mutedForeground,
  },
  metaGrid: {
    flexDirection: 'row',
    columnGap: 16,
    backgroundColor: 'rgba(244, 240, 236, 0.5)',
    padding: 20,
    borderRadius: b.radius.lg,
    marginBottom: 24,
  },
  metaCell: {
    flex: 1,
  },
  qtyInput: {
    fontFamily: b.typography.fontFamily,
    fontSize: 22,
    fontWeight: '700',
    color: b.colors.foreground,
    paddingVertical: 0,
  },
  priceText: {
    fontFamily: b.typography.fontFamily,
    fontSize: 22,
    fontWeight: '700',
    color: b.colors.primary,
  },
  metaValue: {
    fontFamily: b.typography.fontFamily,
    fontSize: 22,
    fontWeight: '700',
    color: b.colors.foreground,
  },
  totalRow: {
    alignItems: 'flex-end',
    marginBottom: 24,
  },
  totalLabel: {
    fontFamily: b.typography.fontFamily,
    fontSize: 13,
    color: b.colors.mutedForeground,
  },
  totalValue: {
    fontFamily: b.typography.fontFamily,
    fontSize: 32,
    fontWeight: '700',
    color: b.colors.foreground,
    letterSpacing: -0.5,
  },
  publishBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    columnGap: 8,
    backgroundColor: b.colors.primary,
    paddingVertical: 16,
    borderRadius: b.radius.lg,
    ...b.shadows.glow,
  },
  publishBtnText: {
    fontFamily: b.typography.fontFamily,
    fontSize: 15,
    fontWeight: '600',
    color: b.colors.primaryForeground,
  },
});
