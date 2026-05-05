import React, { useCallback } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import type { Offer } from '../../../entities/offer';
import { Icon } from '../../../shared/ui/icon';
import { useCartStore } from '../../../entities/order';
import { useSurpriseBoxBuilder, SurpriseBoxBuilder } from '../../../features/surprise-box-builder';
import { formatPrice } from '../../../shared/lib/format';
import { theme } from '../../../shared/config/theme';
import { styles } from './styles';

export interface SurpriseBoxCardProps {
  offer: Offer;
  venueName: string;
  onAdded?: (venueId: number) => void;
}

export const SurpriseBoxCard = ({
  offer,
  venueName,
  onAdded,
}: SurpriseBoxCardProps) => {
  const { t } = useTranslation('catalog');
  const basePrice = parseFloat(offer.current_price) || 0;
  const builder = useSurpriseBoxBuilder(basePrice);
  const addItem = useCartStore((s) => s.addItem);

  const onBook = useCallback(() => {
    addItem(offer.venue_id, venueName, {
      productId: `offer-${offer.id}`,
      offerId: offer.id,
      name: t('surpriseBox.itemName'),
      price: builder.finalPrice,
      maxQuantity: offer.quantity_available,
      quantity: 1,
    });
    onAdded?.(offer.venue_id);
  }, [addItem, offer.venue_id, offer.id, offer.quantity_available, venueName, builder.finalPrice, t, onAdded]);

  return (
    <View
      style={styles.card}
      accessibilityLabel={`${t('surpriseBox.itemName')} #${offer.id}`}
    >
      <View style={styles.header}>
        <Icon name="gift" size={20} color={theme.colors.primary[100]} />
        <Text style={styles.title} numberOfLines={1}>
          {t('surpriseBox.itemName')}
        </Text>
      </View>
      <Text style={styles.meta} numberOfLines={1}>
        {venueName}
      </Text>
      <Text style={styles.meta}>
        {t('surpriseBox.available', { count: offer.quantity_available })}
      </Text>

      <SurpriseBoxBuilder builder={builder} />

      <TouchableOpacity
        style={styles.cta}
        activeOpacity={0.85}
        onPress={onBook}
        accessibilityRole="button"
        accessibilityLabel={t('surpriseBox.bookCta', {
          price: formatPrice(builder.finalPrice),
        })}
      >
        <Text style={styles.ctaText}>
          {t('surpriseBox.bookCta', {
            price: formatPrice(builder.finalPrice),
          })}
        </Text>
        <Icon name="arrow-right" size={16} color={theme.colors.neutral.white} />
      </TouchableOpacity>
    </View>
  );
};
