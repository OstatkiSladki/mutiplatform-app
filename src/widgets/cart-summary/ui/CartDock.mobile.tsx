import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { selectVenueItemCount, selectVenueTotal, useCartStore } from '../../../entities/order';
import { Icon } from '../../../shared/ui/icon';
import { formatPrice } from '../../../shared/lib/format';
import { theme } from '../../../shared/config/theme';
import { styles } from './styles';

export interface CartDockProps {
  venueId: number;
  onPressCheckout: () => void;
}

export const CartDock = ({ venueId, onPressCheckout }: CartDockProps) => {
  const { t } = useTranslation('catalog');
  const total = useCartStore(selectVenueTotal(venueId));
  const count = useCartStore(selectVenueItemCount(venueId));

  if (count === 0) return null;

  return (
    <View style={styles.dock}>
      <View style={styles.dockInfo}>
        <Text style={styles.dockCount}>
          {t('cart.venueItemsCount', { count })}
        </Text>
        <Text style={styles.dockTotal}>{formatPrice(total)}</Text>
      </View>
      <TouchableOpacity
        style={styles.dockCta}
        onPress={onPressCheckout}
        activeOpacity={0.85}
        accessibilityRole="button"
        accessibilityLabel={t('bookCta')}
      >
        <Text style={styles.dockCtaText}>{t('bookCta')}</Text>
        <Icon name="arrow-right" size={16} color={theme.client.colors.primary} />
      </TouchableOpacity>
    </View>
  );
};
