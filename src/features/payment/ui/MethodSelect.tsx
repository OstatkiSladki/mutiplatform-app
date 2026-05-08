import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import type { PaymentMethod } from '../../../entities/payment';
import { Chip } from '../../../shared/ui/chip';
import { theme } from '../../../shared/config/theme';

export interface MethodSelectProps {
  value: PaymentMethod;
  onChange: (method: PaymentMethod) => void;
}

export const MethodSelect = ({ value, onChange }: MethodSelectProps) => {
  const { t } = useTranslation('payment');
  return (
    <View style={styles.row}>
      <Chip
        label={t('methodCard')}
        active={value === 'bank_card'}
        onPress={() => onChange('bank_card')}
      />
      <Chip
        label={t('methodSbp')}
        active={value === 'sbp'}
        onPress={() => onChange('sbp')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: theme.spacing[2],
  },
});
