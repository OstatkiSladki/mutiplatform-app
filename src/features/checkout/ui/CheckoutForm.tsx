import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { theme } from '../../../shared/config/theme';
import { type AppliedPromo, type PickupSlot } from '../model/checkout-schema';
import { SlotSelect } from './SlotSelect';
import { PromoInput } from './PromoInput';

export interface CheckoutFormProps {
  slot: PickupSlot;
  onChangeSlot: (slot: PickupSlot) => void;
  address: string;
  amount: number;
  appliedPromo: AppliedPromo | null;
  onApplyPromo: (promo: AppliedPromo | null) => void;
}

export const CheckoutForm = ({
  slot,
  onChangeSlot,
  address,
  amount,
  appliedPromo,
  onApplyPromo,
}: CheckoutFormProps) => {
  const { t } = useTranslation('checkout');

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{t('pickupTerms')}</Text>
      <View style={styles.field}>
        <Text style={styles.fieldLabel}>{t('pickupSlot')}</Text>
        <SlotSelect value={slot} onChange={onChangeSlot} />
      </View>
      <View style={styles.field}>
        <Text style={styles.fieldLabel}>{t('pickupAddress')}</Text>
        <Text style={styles.address}>{address}</Text>
      </View>
      <PromoInput amount={amount} applied={appliedPromo} onApply={onApplyPromo} />
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    backgroundColor: theme.colors.neutral.white,
    borderRadius: theme.radius.lg,
    padding: theme.spacing[4],
    gap: theme.spacing[4],
  },
  sectionTitle: {
    fontFamily: theme.typography.fontFamilies.sourceSansProBold, fontWeight: '400',
    fontSize: theme.typography.fontSizes[7],
    color: theme.colors.neutral[1],
  },
  field: {
    gap: theme.spacing[2],
  },
  fieldLabel: {
    fontFamily: theme.typography.fontFamilies.sourceSansProRegular,
    fontSize: theme.typography.fontSizes[3],
    color: theme.colors.neutral[3],
  },
  address: {
    fontFamily: theme.typography.fontFamilies.sourceSansProRegular,
    fontSize: theme.typography.fontSizes[5],
    color: theme.colors.neutral[1],
  },
});
