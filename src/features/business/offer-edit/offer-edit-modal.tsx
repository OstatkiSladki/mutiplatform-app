import React from 'react';
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { BDialog } from '../../../shared/ui/business';
import { theme } from '../../../shared/config/theme';
import type { BusinessOffer } from '../../../entities/business-app/model/types';
import type { OfferEditFormState } from './use-offer-edit';

const b = theme.business;

export interface OfferEditModalProps {
  offer: BusinessOffer | null;
  form: OfferEditFormState;
  isValid: boolean;
  onChangePrice: (next: number) => void;
  onChangeStock: (next: number) => void;
  onCancel: () => void;
  onSave: () => void;
}

function parseNumeric(value: string): number {
  const cleaned = value.replace(/[^0-9]/g, '');
  const n = Number(cleaned);
  return Number.isFinite(n) ? n : 0;
}

export const OfferEditModal = ({
  offer,
  form,
  isValid,
  onChangePrice,
  onChangeStock,
  onCancel,
  onSave,
}: OfferEditModalProps) => {
  const { t } = useTranslation('business');
  if (!offer) return null;

  return (
    <BDialog visible={!!offer} onClose={onCancel} title={offer.name}>
      <Text style={styles.sku}>{offer.sku}</Text>

      <View style={styles.fieldGroup}>
        <Text style={styles.label}>{t('offers.edit.price')}</Text>
        <TextInput
          value={String(form.price)}
          keyboardType="numeric"
          onChangeText={(v) => onChangePrice(parseNumeric(v))}
          style={styles.input}
        />
      </View>

      <View style={styles.fieldGroup}>
        <Text style={styles.label}>{t('offers.edit.stock')}</Text>
        <TextInput
          value={String(form.stock)}
          keyboardType="numeric"
          onChangeText={(v) => onChangeStock(parseNumeric(v))}
          style={styles.input}
        />
      </View>

      <View style={styles.actions}>
        <Pressable style={styles.cancelBtn} onPress={onCancel} accessibilityRole="button">
          <Text style={styles.cancelText}>{t('offers.edit.cancel')}</Text>
        </Pressable>
        <Pressable
          style={[styles.saveBtn, !isValid && styles.saveBtnDisabled]}
          onPress={onSave}
          disabled={!isValid}
          accessibilityRole="button"
        >
          <Text style={styles.saveText}>{t('offers.edit.save')}</Text>
        </Pressable>
      </View>
    </BDialog>
  );
};

const styles = StyleSheet.create({
  sku: {
    fontFamily: b.typography.fontFamily,
    fontSize: 12,
    color: b.colors.mutedForeground,
    marginBottom: 16,
  },
  fieldGroup: {
    marginBottom: 16,
  },
  label: {
    fontFamily: b.typography.fontFamily,
    fontSize: 13,
    fontWeight: '600',
    color: b.colors.foreground,
    marginBottom: 8,
  },
  input: {
    backgroundColor: 'rgba(244, 240, 236, 0.4)',
    borderColor: b.colors.border,
    borderWidth: 1,
    borderRadius: b.radius.md,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontFamily: b.typography.fontFamily,
    fontSize: 18,
    fontWeight: '700',
    color: b.colors.foreground,
  },
  actions: {
    flexDirection: 'row',
    columnGap: 12,
    marginTop: 8,
  },
  cancelBtn: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: b.radius.lg,
    borderWidth: 1,
    borderColor: b.colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelText: {
    fontFamily: b.typography.fontFamily,
    fontSize: 14,
    fontWeight: '600',
    color: b.colors.foreground,
  },
  saveBtn: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: b.radius.lg,
    backgroundColor: b.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    ...b.shadows.glow,
  },
  saveBtnDisabled: {
    opacity: 0.5,
  },
  saveText: {
    fontFamily: b.typography.fontFamily,
    fontSize: 14,
    fontWeight: '600',
    color: b.colors.primaryForeground,
  },
});
