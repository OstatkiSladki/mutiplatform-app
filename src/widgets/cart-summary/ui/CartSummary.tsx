import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { selectVenueItemCount, selectVenueTotal, useCartStore } from '../../../entities/order';
import { Icon } from '../../../shared/ui/icon';
import { formatPrice } from '../../../shared/lib/format';
import { theme } from '../../../shared/config/theme';
import { styles } from './styles';

export interface CartSummaryProps {
  venueId: number;
  onPressCheckout: () => void;
}

export const CartSummary = ({ venueId, onPressCheckout }: CartSummaryProps) => {
  const { t } = useTranslation('catalog');
  const total = useCartStore(selectVenueTotal(venueId));
  const count = useCartStore(selectVenueItemCount(venueId));

  if (count === 0) return null;

  return (
    <View style={[styles.sticky, { pointerEvents: 'box-none' }]}>
      <View style={styles.info}>
        <Text style={styles.count}>{count} {t('cartItems')}</Text>
        <Text style={styles.total}>{formatPrice(total)}</Text>
      </View>
      <TouchableOpacity
        style={styles.cta}
        onPress={onPressCheckout}
        activeOpacity={0.85}
        accessibilityRole="button"
        accessibilityLabel={t('bookCta')}
      >
        <Text style={styles.ctaText}>{t('bookCta')}</Text>
        <Icon name="arrow-right" size={16} color={theme.colors.primary[100]} />
      </TouchableOpacity>
    </View>
  );
};
