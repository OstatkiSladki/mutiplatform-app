import React from 'react';
import { View, Text, TextInput, Pressable, ScrollView, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Icon } from '../../../shared/ui/icon';
import { BDialog } from '../../../shared/ui/business';
import { theme } from '../../../shared/config/theme';
import type { ForecastItem } from '../../../entities/business-app/model/types';
import type { BoxSize } from './types';

const b = theme.business;

const BOX_SIZES: BoxSize[] = ['S', 'M', 'L'];
const ITEM_PRICE = 400;
const PRICE_MARKUP = 1.2;

export interface SurpriseBoxModalProps {
  visible: boolean;
  items: ForecastItem[];
  boxName: string;
  boxSize: BoxSize;
  onChangeName: (next: string) => void;
  onChangeSize: (next: BoxSize) => void;
  onRemoveItem: (id: string) => void;
  onAppendNext: () => void;
  onRebuild: () => void;
  onPublish: () => void;
  onClose: () => void;
}

export const SurpriseBoxModal = ({
  visible,
  items,
  boxName,
  boxSize,
  onChangeName,
  onChangeSize,
  onRemoveItem,
  onAppendNext,
  onRebuild,
  onPublish,
  onClose,
}: SurpriseBoxModalProps) => {
  const { t } = useTranslation('business');
  const totalRaw = items.length * ITEM_PRICE;
  const finalPrice = Math.round(totalRaw * PRICE_MARKUP) || 1680;

  return (
    <BDialog visible={visible} onClose={onClose}>
      <View style={styles.titleRow}>
        <TextInput
          value={boxName}
          onChangeText={onChangeName}
          style={styles.nameInput}
          placeholderTextColor={b.colors.mutedForeground}
        />
      </View>

      <View style={styles.tableHead}>
        <Text style={[styles.headText, styles.colName]}>{t('forecast.box.product')}</Text>
        <Text style={[styles.headText, styles.colCategory]}>{t('forecast.box.category')}</Text>
        <Text style={[styles.headText, styles.colStock]}>{t('forecast.box.stock')}</Text>
        <Text style={[styles.headText, styles.colPrice]}>{t('forecast.box.price')}</Text>
        <Text style={[styles.headText, styles.colRemove]} />
      </View>

      <ScrollView style={styles.itemList} contentContainerStyle={styles.itemListContent}>
        {items.map((item) => (
          <View key={item.id} style={styles.itemRow}>
            <View style={styles.colName}>
              <Text style={styles.itemName} numberOfLines={1}>{item.name}</Text>
              <Text style={styles.itemSku}>{item.sku}</Text>
            </View>
            <Text style={[styles.itemMuted, styles.colCategory]}>{item.category}</Text>
            <Text style={[styles.itemBold, styles.colStock]}>{item.stock}</Text>
            <Text style={[styles.itemBold, styles.colPrice]}>{ITEM_PRICE}₽</Text>
            <Pressable
              style={[styles.removeBtn, styles.colRemove]}
              onPress={() => onRemoveItem(item.id)}
              accessibilityRole="button"
              accessibilityLabel={t('forecast.box.remove')}
            >
              <Icon name="x" size={11} color={b.colors.foreground} />
            </Pressable>
          </View>
        ))}
        {items.length === 0 ? (
          <Text style={styles.emptyText}>{t('forecast.box.empty')}</Text>
        ) : null}
      </ScrollView>

      <View style={styles.actionsRow}>
        <Pressable style={styles.outlineBtn} onPress={onAppendNext} accessibilityRole="button">
          <Icon name="plus" size={14} color={b.colors.foreground} />
          <Text style={styles.outlineBtnText}>{t('forecast.box.add')}</Text>
        </Pressable>
        <Pressable style={styles.gradientBtn} onPress={onRebuild} accessibilityRole="button">
          <Text style={styles.gradientBtnText}>{t('forecast.box.regenerate')}</Text>
        </Pressable>
      </View>

      <View style={styles.metaGrid}>
        <View style={styles.metaCell}>
          <Text style={styles.metaLabel}>{t('forecast.box.size')}</Text>
          <View style={styles.sizeBar}>
            {BOX_SIZES.map((s) => (
              <Pressable
                key={s}
                onPress={() => onChangeSize(s)}
                style={[styles.sizeBtn, boxSize === s && styles.sizeBtnActive]}
                accessibilityRole="button"
              >
                <Text style={styles.sizeBtnText}>{s}</Text>
              </Pressable>
            ))}
          </View>
          <Text style={styles.sizeHint}>{`${boxSize} — ${t(`forecast.box.sizeCount.${boxSize}`)}`}</Text>
        </View>
        <View style={styles.metaCell}>
          <Text style={styles.metaLabel}>{t('forecast.box.priceLabel')}</Text>
          <Text style={styles.metaValuePrimary}>1400₽</Text>
          <Text style={styles.metaHint}>{t('forecast.box.priceHint')}</Text>
        </View>
        <View style={styles.metaCell}>
          <Text style={styles.metaLabel}>{t('forecast.box.commissionLabel')}</Text>
          <Text style={styles.metaValue}>20%</Text>
        </View>
      </View>

      <View style={styles.bottomRow}>
        <View>
          <Text style={styles.windowLabel}>{t('forecast.box.window')}</Text>
          <View style={styles.windowPill}>
            <Text style={styles.windowText}>19:00–20:00</Text>
          </View>
        </View>
        <View style={styles.priceTotal}>
          <Text style={styles.metaHint}>{t('forecast.box.priceColon')}</Text>
          <Text style={styles.priceTotalValue}>{`${finalPrice} ₽`}</Text>
        </View>
      </View>

      <Pressable style={styles.publishBtn} onPress={onPublish} accessibilityRole="button">
        <Text style={styles.publishBtnText}>{t('forecast.box.publish')}</Text>
        <Icon name="chevron-right" size={18} color={b.colors.primaryForeground} />
      </Pressable>
    </BDialog>
  );
};

const styles = StyleSheet.create({
  titleRow: {
    marginBottom: 12,
  },
  nameInput: {
    fontFamily: b.typography.fontFamilyBold,
    fontSize: 20,
    fontWeight: '400',
    color: b.colors.foreground,
    paddingVertical: 4,
  },
  tableHead: {
    flexDirection: 'row',
    paddingVertical: 6,
    columnGap: 8,
  },
  headText: {
    fontFamily: b.typography.fontFamilySemiBold,
    fontSize: 12,
    fontWeight: '400',
    color: b.colors.foreground,
  },
  colName: {
    flex: 1,
  },
  colCategory: {
    width: 110,
  },
  colStock: {
    width: 60,
  },
  colPrice: {
    width: 60,
  },
  colRemove: {
    width: 32,
    alignItems: 'center',
  },
  itemList: {
    maxHeight: 180,
  },
  itemListContent: {
    rowGap: 8,
    paddingVertical: 4,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 8,
  },
  itemName: {
    fontFamily: b.typography.fontFamilySemiBold,
    fontSize: 13,
    fontWeight: '400',
    color: b.colors.foreground,
  },
  itemSku: {
    fontFamily: b.typography.fontFamily,
    fontSize: 11,
    color: b.colors.mutedForeground,
  },
  itemMuted: {
    fontFamily: b.typography.fontFamily,
    fontSize: 13,
    color: b.colors.mutedForeground,
  },
  itemBold: {
    fontFamily: b.typography.fontFamilySemiBold,
    fontSize: 13,
    fontWeight: '400',
    color: b.colors.foreground,
  },
  removeBtn: {
    height: 24,
    width: 24,
    borderRadius: b.radius.sm,
    borderWidth: 1,
    borderColor: b.colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    fontFamily: b.typography.fontFamily,
    fontSize: 13,
    color: b.colors.mutedForeground,
    textAlign: 'center',
    paddingVertical: 12,
  },
  actionsRow: {
    flexDirection: 'row',
    columnGap: 8,
    marginTop: 8,
  },
  outlineBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: b.radius.pill,
    borderWidth: 1,
    borderColor: b.colors.border,
    backgroundColor: b.colors.surface,
  },
  outlineBtnText: {
    fontFamily: b.typography.fontFamilySemiBold,
    fontSize: 13,
    fontWeight: '400',
    color: b.colors.foreground,
  },
  gradientBtn: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: b.radius.pill,
    backgroundColor: b.colors.primary,
    ...b.shadows.glow,
  },
  gradientBtnText: {
    fontFamily: b.typography.fontFamilySemiBold,
    fontSize: 13,
    fontWeight: '400',
    color: b.colors.primaryForeground,
  },
  metaGrid: {
    flexDirection: 'row',
    columnGap: 12,
    marginTop: 12,
    backgroundColor: 'rgba(244, 240, 236, 0.5)',
    padding: 12,
    borderRadius: b.radius.lg,
  },
  metaCell: {
    flex: 1,
  },
  metaLabel: {
    fontFamily: b.typography.fontFamilySemiBold,
    fontSize: 12,
    fontWeight: '400',
    color: b.colors.foreground,
    marginBottom: 6,
  },
  sizeBar: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
    backgroundColor: b.colors.surface,
    borderWidth: 1,
    borderColor: b.colors.border,
    borderRadius: b.radius.md,
    padding: 2,
    columnGap: 2,
  },
  sizeBtn: {
    paddingHorizontal: 10,
    paddingVertical: 2,
    borderRadius: b.radius.sm,
  },
  sizeBtnActive: {
    backgroundColor: b.colors.muted,
  },
  sizeBtnText: {
    fontFamily: b.typography.fontFamilySemiBold,
    fontSize: 12,
    fontWeight: '400',
    color: b.colors.foreground,
  },
  sizeHint: {
    fontFamily: b.typography.fontFamily,
    fontSize: 10,
    color: b.colors.mutedForeground,
    marginTop: 4,
  },
  metaValuePrimary: {
    fontFamily: b.typography.fontFamilyBold,
    fontSize: 20,
    fontWeight: '400',
    color: b.colors.primary,
  },
  metaValue: {
    fontFamily: b.typography.fontFamilyBold,
    fontSize: 20,
    fontWeight: '400',
    color: b.colors.foreground,
  },
  metaHint: {
    fontFamily: b.typography.fontFamily,
    fontSize: 10,
    color: b.colors.mutedForeground,
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
    columnGap: 16,
  },
  windowLabel: {
    fontFamily: b.typography.fontFamilyBold,
    fontSize: 14,
    fontWeight: '400',
    color: b.colors.foreground,
    marginBottom: 6,
  },
  windowPill: {
    backgroundColor: 'rgba(244, 240, 236, 0.6)',
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: b.radius.pill,
  },
  windowText: {
    fontFamily: b.typography.fontFamily,
    fontSize: 12,
    color: b.colors.foreground,
  },
  priceTotal: {
    alignItems: 'flex-end',
  },
  priceTotalValue: {
    fontFamily: b.typography.fontFamilyBold,
    fontSize: 24,
    fontWeight: '400',
    color: b.colors.foreground,
  },
  publishBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    columnGap: 8,
    backgroundColor: b.colors.primary,
    paddingVertical: 14,
    borderRadius: b.radius.lg,
    marginTop: 16,
    ...b.shadows.glow,
  },
  publishBtnText: {
    fontFamily: b.typography.fontFamilySemiBold,
    fontSize: 15,
    fontWeight: '400',
    color: b.colors.primaryForeground,
  },
});
