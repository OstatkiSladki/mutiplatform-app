import React from 'react';
import { Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Divider } from '../../../../shared/ui/divider';
import { formatPrice } from '../../../../shared/lib/format';
import { styles } from './styles';

export interface PriceBreakdownProps {
  subtotal: number;
  serviceFee: number;
  discount: number;
  total: number;
}

export const PriceBreakdown = ({ subtotal, serviceFee, discount, total }: PriceBreakdownProps) => {
  const { t } = useTranslation('checkout');

  return (
    <View style={styles.section}>
      <View style={styles.breakdownRow}>
        <Text style={styles.breakdownLabel}>{t('goods')}</Text>
        <Text style={styles.breakdownValue}>{formatPrice(subtotal)}</Text>
      </View>
      <View style={styles.breakdownRow}>
        <Text style={styles.breakdownLabel}>{t('serviceFee')}</Text>
        <Text style={styles.breakdownValue}>{formatPrice(serviceFee)}</Text>
      </View>
      {discount > 0 ? (
        <View style={styles.breakdownRow}>
          <Text style={styles.breakdownLabel}>{t('discount')}</Text>
          <Text style={styles.breakdownValue}>−{formatPrice(discount)}</Text>
        </View>
      ) : null}
      <Divider />
      <View style={styles.breakdownRow}>
        <Text style={styles.totalLabel}>{t('total')}</Text>
        <Text style={styles.totalValue}>{formatPrice(total)}</Text>
      </View>
    </View>
  );
};
