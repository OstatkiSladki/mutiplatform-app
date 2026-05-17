import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import type { Offer } from '../../../../entities/offer';
import type { Venue } from '../../../../entities/venue';
import { Icon } from '../../../../shared/ui/icon';
import { formatPrice } from '../../../../shared/lib/format';
import { clientAssets } from '../../../../shared/assets/client';
import { theme } from '../../../../shared/config/theme';

interface CatalogOfferCardProps {
  offer: Offer;
  venue?: Venue;
  onPress: (venueId: number) => void;
}

export const CatalogOfferCard = ({ offer, venue, onPress }: CatalogOfferCardProps) => {
  const price = parseFloat(offer.current_price) || 0;
  const oldPrice = parseFloat(offer.original_price) || 0;
  const venueName = venue?.name ?? `Заведение #${offer.venue_id}`;

  return (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.85}
      onPress={() => onPress(offer.venue_id)}
      accessibilityRole="button"
      accessibilityLabel={venueName}
    >
      <Image source={clientAssets.surpriseBag} style={styles.image} resizeMode="cover" />
      <View style={styles.body}>
        <Text style={styles.title} numberOfLines={2}>
          Сюрприз бокс
        </Text>
        <Text style={styles.venue} numberOfLines={1}>
          {venueName}
        </Text>
        <View style={styles.metaRow}>
          <Text style={styles.price}>{formatPrice(price)}</Text>
          {oldPrice > price ? <Text style={styles.oldPrice}>{formatPrice(oldPrice)}</Text> : null}
        </View>
        <View style={styles.footer}>
          <Text style={styles.count}>Доступно: {offer.quantity_available}</Text>
          <View style={styles.action}>
            <Icon name="arrow-up-right" size={15} color={theme.client.colors.primaryForeground} />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    minWidth: 0,
    borderRadius: theme.client.radius.card,
    backgroundColor: theme.client.colors.card,
    overflow: 'hidden',
    ...theme.client.shadows.productCard,
  },
  image: {
    width: '100%',
    aspectRatio: 1.15,
    backgroundColor: theme.client.colors.secondaryMuted,
  },
  body: {
    padding: theme.spacing[2],
    gap: theme.spacing[1],
  },
  title: {
    fontFamily: theme.client.typography.fontFamily,
    fontWeight: '700',
    fontSize: theme.typography.fontSizes[4],
    color: theme.client.colors.foreground,
  },
  venue: {
    fontFamily: theme.client.typography.fontFamily,
    fontSize: theme.typography.fontSizes[3],
    color: theme.client.colors.mutedForeground,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing[2],
    marginTop: theme.spacing[1],
  },
  price: {
    fontFamily: theme.client.typography.fontFamily,
    fontWeight: '700',
    fontSize: theme.typography.fontSizes[5],
    color: theme.client.colors.foreground,
  },
  oldPrice: {
    fontFamily: theme.client.typography.fontFamily,
    fontSize: theme.typography.fontSizes[3],
    color: theme.client.colors.mutedForeground,
    textDecorationLine: 'line-through',
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: theme.spacing[2],
  },
  count: {
    fontFamily: theme.client.typography.fontFamily,
    fontSize: theme.typography.fontSizes[3],
    color: theme.client.colors.mutedForeground,
  },
  action: {
    width: 30,
    height: 30,
    borderRadius: theme.client.radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.client.colors.primary,
  },
});
