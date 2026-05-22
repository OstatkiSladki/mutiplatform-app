import React from 'react';
import { Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { BookingCtaButton } from '../../../../../shared/ui/booking-cta-button';
import { formatPrice } from '../../../../../shared/lib/format';
import { bookingDesktopStyles as styles, stickyPriceCardStyle } from './booking-desktop.styles';

export interface CheckoutPriceCardProps {
  subtotal: number;
  serviceFee: number;
  discount: number;
  total: number;
  onPay: () => void;
  disabled?: boolean;
}

export const CheckoutPriceCard = ({
  subtotal,
  serviceFee,
  discount,
  total,
  onPay,
  disabled,
}: CheckoutPriceCardProps) => {
  const { t } = useTranslation('checkout');

  return (
    <View style={[styles.priceCard, stickyPriceCardStyle]}>
      <Text style={styles.priceCardTitle}>{t('priceTitle')}</Text>
      <View style={styles.priceRow}>
        <Text style={styles.priceRowLabel}>{t('goods')}</Text>
        <Text style={styles.priceRowValue}>{formatPrice(subtotal)}</Text>
      </View>
      <View style={styles.priceRow}>
        <Text style={styles.priceRowLabel}>{t('serviceFee')}</Text>
        <Text style={styles.priceRowValue}>{formatPrice(serviceFee)}</Text>
      </View>
      {discount > 0 ? (
        <View style={styles.priceRow}>
          <Text style={styles.priceRowLabel}>{t('discount')}</Text>
          <Text style={styles.priceRowValue}>−{formatPrice(discount)}</Text>
        </View>
      ) : null}
      <View style={styles.totalRow}>
        <Text style={styles.totalLabel}>{t('priceTotalLabel')}</Text>
        <Text style={styles.totalValue}>{formatPrice(total)}</Text>
      </View>
      <BookingCtaButton
        title={t('payCta')}
        onPress={onPay}
        disabled={disabled || total === 0}
        style={styles.payButton}
      />
    </View>
  );
};
