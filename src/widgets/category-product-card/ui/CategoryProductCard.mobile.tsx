import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import type { DimensionValue } from 'react-native';
import { Image } from 'expo-image';
import type { Offer } from '../../../entities/offer';
import type { Product } from '../../../entities/product';
import { theme } from '../../../shared/config/theme';
import { formatPrice } from '../../../shared/lib/format';
import { Icon } from '../../../shared/ui/icon';

const placeholderImage = require('../../../../assets/surbricebox.png');

export interface CategoryProductCardProps {
  offer: Offer;
  title: string;
  width: DimensionValue;
  weight?: string;
  product?: Product;
  onPress: () => void;
}

export const CategoryProductCard = ({
  offer,
  title,
  width,
  weight = '130г',
  product,
  onPress,
}: CategoryProductCardProps) => {
  const imageUrl = product?.image_urls?.[0];
  const price = parseFloat(offer.current_price) || 0;
  const originalPrice = parseFloat(offer.original_price) || 0;

  return (
    <View style={[styles.shadowHost, { width }]}>
      <Pressable
        style={styles.pressable}
        onPress={onPress}
        accessibilityRole="button"
        accessibilityLabel={`${title}, ${formatPrice(price)}, ${weight}`}
      >
        <View style={styles.inner}>
          <View style={styles.imageFrame}>
            <Image
              source={imageUrl ? { uri: imageUrl } : placeholderImage}
              style={styles.image}
              contentFit="cover"
            />
          </View>
          <View style={styles.priceRow}>
            <View style={styles.priceBlock}>
              <Text style={styles.price} numberOfLines={1} adjustsFontSizeToFit minimumFontScale={0.85}>
                {formatPrice(price)}
              </Text>
              {originalPrice > price ? (
                <Text style={styles.oldPrice} numberOfLines={1}>
                  {formatPrice(originalPrice)}
                </Text>
              ) : null}
            </View>
            <View style={styles.cta}>
              <Icon
                name="arrow-up-right"
                size={14}
                color={theme.client.colors.primaryForeground}
              />
            </View>
          </View>
          <Text style={styles.productTitle} numberOfLines={2}>
            {title}
          </Text>
          <Text style={styles.weight}>{weight}</Text>
        </View>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  shadowHost: {
    alignSelf: 'flex-start',
    borderRadius: theme.client.radius.card,
    backgroundColor: theme.client.colors.card,
    ...theme.client.shadows.productCard,
  },
  pressable: {
    borderRadius: theme.client.radius.card,
    overflow: 'hidden',
  },
  inner: {
    padding: theme.spacing[2],
    backgroundColor: theme.client.colors.card,
  },
  imageFrame: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: theme.client.radius.md,
    backgroundColor: theme.client.colors.secondaryMuted,
    overflow: 'hidden',
    marginBottom: theme.spacing[2],
  },
  image: {
    width: '100%',
    height: '100%',
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: theme.spacing[2],
    marginBottom: theme.spacing[1],
  },
  priceBlock: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'baseline',
    flexWrap: 'nowrap',
    gap: theme.spacing[2],
    minWidth: 0,
  },
  price: {
    fontFamily: theme.client.typography.fontFamily,
    fontSize: theme.typography.fontSizes[7],
    lineHeight: theme.typography.fontSizes[7] * theme.typography.lineHeights.tight,
    fontWeight: '700',
    color: theme.client.colors.foreground,
    flexShrink: 1,
  },
  oldPrice: {
    fontFamily: theme.client.typography.fontFamily,
    fontSize: theme.typography.fontSizes[2],
    lineHeight: theme.typography.fontSizes[2] * theme.typography.lineHeights.normal,
    color: theme.colors.neutral[5],
    textDecorationLine: 'line-through',
    flexShrink: 0,
  },
  productTitle: {
    fontFamily: theme.client.typography.fontFamily,
    fontSize: theme.typography.fontSizes[5],
    fontWeight: '700',
    color: theme.colors.neutral[5],
    lineHeight: theme.typography.fontSizes[5] * theme.typography.lineHeights.normal,
  },
  weight: {
    marginTop: 2,
    fontFamily: theme.client.typography.fontFamily,
    fontSize: theme.typography.fontSizes[3],
    lineHeight: theme.typography.fontSizes[3] * theme.typography.lineHeights.normal,
    color: theme.client.colors.mutedForeground,
  },
  cta: {
    width: 28,
    aspectRatio: 1,
    borderRadius: theme.radius.full,
    backgroundColor: theme.client.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
});
