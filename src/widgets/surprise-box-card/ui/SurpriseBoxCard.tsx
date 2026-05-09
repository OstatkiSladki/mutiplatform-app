import React, { useCallback } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Image } from 'expo-image';
import { useTranslation } from 'react-i18next';
import type { Offer } from '../../../entities/offer';
import { Icon } from '../../../shared/ui/icon';
import { Stars } from '../../../shared/ui/stars';
import { Chip } from '../../../shared/ui/chip';
import { useCartStore } from '../../../entities/order';
import { useSurpriseBoxBuilder, SurpriseBoxBuilder } from '../../../features/surprise-box-builder';
import { formatPrice } from '../../../shared/lib/format';
import { theme } from '../../../shared/config/theme';
import { useBreakpoint } from '../../../shared/lib/responsive';
import { clientAssets } from '../../../shared/assets/client';
import {
  pickVenueAvatarPalette,
  venueAvatarLabel,
} from '../../../shared/lib/venue-avatar';
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
  const palette = pickVenueAvatarPalette(offer.venue_id);
  const { isAtLeast } = useBreakpoint();
  const wide = isAtLeast('md');

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
        <View
          style={[
            styles.logo,
            { backgroundColor: palette.bg, borderColor: theme.client.colors.border },
          ]}
        >
          <Text style={[styles.logoText, { color: palette.fg }]} numberOfLines={1}>
            {venueAvatarLabel(venueName)}
          </Text>
        </View>
        <View style={styles.titleBlock}>
          <Text style={styles.title} numberOfLines={1}>
            {venueName}
          </Text>
          <Text style={styles.subtitle} numberOfLines={1}>
            {t('surpriseBox.itemName')}
          </Text>
        </View>
        <View style={styles.hours}>
          <Icon
            name="clock"
            size={12}
            color={theme.client.colors.mutedForeground}
          />
          <Text style={styles.hoursText}>{t('hoursDefault')}</Text>
        </View>
      </View>

      <View style={styles.metaRow}>
        <Stars rating={5} size={13} color={theme.client.colors.star} />
        <View style={styles.tags}>
          <Chip label={t('venueTagBakery')} variant="accent" />
          <Chip label={t('venueTagSandwiches')} variant="accent" />
        </View>
      </View>

      <View style={[styles.body, wide && styles.bodyWide]}>
        <View style={[styles.imageWrap, wide && styles.imageWrapWide]}>
          <Image
            source={clientAssets.surpriseBag}
            style={styles.image}
            contentFit="cover"
          />
        </View>
        <View style={[styles.form, wide && styles.formWide]}>
          <SurpriseBoxBuilder builder={builder} />
        </View>
      </View>

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
        <Icon
          name="arrow-right"
          size={16}
          color={theme.client.colors.primaryForeground}
        />
      </TouchableOpacity>
    </View>
  );
};
