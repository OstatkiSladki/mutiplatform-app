import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import type { DimensionValue } from 'react-native';
import { Image } from 'expo-image';
import type { Offer } from '../../../entities/offer';
import { theme } from '../../../shared/config/theme';
import { formatPrice } from '../../../shared/lib/format';
import { Icon } from '../../../shared/ui/icon';

const productImage = require('../../../../assets/surbricebox.png');

const minutesLeft = (expiresAt: string) => {
  const expires = new Date(expiresAt).getTime();
  const diff = Number.isFinite(expires) ? Math.max(0, expires - Date.now()) : 0;
  return Math.max(1, Math.ceil(diff / 60000));
};

const pickupWindow = (expiresAt: string) => {
  const totalMinutes = minutesLeft(expiresAt);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  if (hours <= 0) return `${minutes}м`;
  if (minutes <= 0) return `${hours}ч`;
  return `${hours}ч ${minutes}м`;
};

export interface CategoryProductCardProps {
  offer: Offer;
  title: string;
  width: DimensionValue;
  aspectRatio?: number;
  subtitle?: string;
  weight?: string;
  onPress: () => void;
}

export const CategoryProductCard = ({
  offer,
  title,
  width,
  aspectRatio = 138 / 230,
  subtitle,
  weight = '130г',
  onPress,
}: CategoryProductCardProps) => {
  const price = parseFloat(offer.current_price) || 0;
  const originalPrice = parseFloat(offer.original_price) || 0;

  return (
    <Pressable
      style={[styles.shadow, { width, aspectRatio }]}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`${title}, ${formatPrice(price)}`}
    >
      <View style={styles.surface}>
        <View style={styles.imageFrame}>
          <Image source={productImage} style={styles.image} contentFit="contain" />
        </View>
        <View style={styles.body}>
          <View style={styles.priceRow}>
            <Text style={styles.price}>{formatPrice(price)}</Text>
            {originalPrice > price ? (
              <Text style={styles.oldPrice}>{formatPrice(originalPrice)}</Text>
            ) : null}
          </View>
          <Text style={styles.title} numberOfLines={2}>
            {title}
          </Text>
          <Text style={styles.subtitle} numberOfLines={1}>
            {subtitle ?? pickupWindow(offer.expires_at)}
          </Text>
          <View style={styles.footer}>
            <Text style={styles.weight}>{weight}</Text>
            <View style={styles.cta}>
              <Icon
                name="arrow-up-right"
                size={14}
                color={theme.client.colors.primaryForeground}
              />
            </View>
          </View>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  shadow: {
    borderRadius: theme.client.radius.card,
    backgroundColor: theme.client.colors.card,
    ...theme.client.shadows.card,
  },
  surface: {
    flex: 1,
    borderRadius: theme.client.radius.card,
    backgroundColor: theme.client.colors.card,
    overflow: 'hidden',
    padding: theme.spacing[2],
  },
  imageFrame: {
    flex: 1,
    minHeight: 96,
    borderRadius: theme.client.radius.md,
    backgroundColor: theme.client.colors.secondaryMuted,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing[2],
  },
  image: {
    width: '100%',
    height: '100%',
  },
  body: {
    gap: theme.spacing[1],
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: theme.spacing[2],
    flexWrap: 'wrap',
  },
  price: {
    fontFamily: theme.client.typography.fontFamily,
    fontSize: theme.typography.fontSizes[11],
    lineHeight: theme.typography.fontSizes[11] * theme.typography.lineHeights.tight,
    fontWeight: '700',
    color: theme.client.colors.foreground,
  },
  oldPrice: {
    fontFamily: theme.client.typography.fontFamily,
    fontSize: theme.typography.fontSizes[3],
    color: theme.client.colors.mutedForeground,
    textDecorationLine: 'line-through',
  },
  title: {
    fontFamily: theme.client.typography.fontFamily,
    fontSize: theme.typography.fontSizes[5],
    fontWeight: '600',
    color: theme.client.colors.foreground,
    lineHeight: theme.typography.fontSizes[5] * theme.typography.lineHeights.normal,
  },
  subtitle: {
    fontFamily: theme.client.typography.fontFamily,
    fontSize: theme.typography.fontSizes[3],
    color: theme.client.colors.mutedForeground,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  weight: {
    fontFamily: theme.client.typography.fontFamily,
    fontSize: theme.typography.fontSizes[2],
    color: theme.client.colors.mutedForeground,
  },
  cta: {
    width: 28,
    aspectRatio: 1,
    borderRadius: theme.radius.full,
    backgroundColor: theme.client.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
