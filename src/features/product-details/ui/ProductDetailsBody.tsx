import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Image } from 'expo-image';
import { useTranslation } from 'react-i18next';
import type { Offer } from '../../../entities/offer';
import type { Product } from '../../../entities/product';
import { Icon } from '../../../shared/ui/icon';
import { Button } from '../../../shared/ui/button';
import { Stepper } from '../../../shared/ui/stepper';
import { formatPrice } from '../../../shared/lib/format';
import { theme } from '../../../shared/config/theme';
import { useAddToCart } from '../../add-to-cart';

export interface ProductDetailsBodyProps {
  venueId: number;
  venueName: string;
  offer: Offer;
  product?: Product;
}

export const ProductDetailsBody = ({ venueId, venueName, offer, product }: ProductDetailsBodyProps) => {
  const { t } = useTranslation('catalog');
  const displayName = product?.name ?? t('productDetails.fallbackName', { id: offer.id });
  const imageUrl = product?.image_urls?.[0];
  const price = parseFloat(offer.current_price) || 0;
  const { quantity, max, setQuantity } = useAddToCart({
    venueId,
    venueName,
    offer,
    displayName,
    imageUrl,
  });

  return (
    <View style={styles.container}>
      <View style={styles.imageBox}>
        {imageUrl ? (
          <Image source={{ uri: imageUrl }} style={styles.image} contentFit="contain" />
        ) : (
          <Icon name="gift" size={56} color={theme.colors.primary[100]} />
        )}
      </View>
      <Text style={styles.name}>{displayName}</Text>
      {product?.description ? <Text style={styles.description}>{product.description}</Text> : null}
      {product?.characteristics_json && Object.keys(product.characteristics_json).length > 0 ? (
        <View style={styles.characteristics}>
          {Object.entries(product.characteristics_json).map(([key, value]) => (
            <View key={key} style={styles.characteristicRow}>
              <Text style={styles.characteristicKey}>{key}</Text>
              <Text style={styles.characteristicValue}>{String(value)}</Text>
            </View>
          ))}
        </View>
      ) : null}
      <View style={styles.row}>
        <Text style={styles.price}>{formatPrice(price)}</Text>
        <View style={{ flex: 1 }} />
        <Stepper value={quantity} onChange={setQuantity} min={0} max={max} />
      </View>
      <Text style={styles.meta}>
        {t('productDetails.available', { count: offer.quantity_available })}
      </Text>
      <Button
        title={
          quantity > 0
            ? t('productDetails.inCart', { count: quantity })
            : t('productDetails.addToCart')
        }
        onPress={() => setQuantity(Math.max(1, quantity))}
        disabled={max === 0}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: theme.spacing[3],
  },
  imageBox: {
    height: 200,
    borderRadius: theme.radius.lg,
    backgroundColor: theme.colors.primary[10],
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  characteristics: {
    gap: theme.spacing[1],
  },
  characteristicRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: theme.spacing[2],
  },
  characteristicKey: {
    fontFamily: theme.typography.fontFamilies.sourceSansProRegular,
    fontSize: theme.typography.fontSizes[4],
    color: theme.colors.neutral[4],
  },
  characteristicValue: {
    fontFamily: theme.typography.fontFamilies.sourceSansProRegular,
    fontSize: theme.typography.fontSizes[4],
    color: theme.colors.neutral[2],
  },
  name: {
    fontFamily: theme.typography.fontFamilies.sourceSansProBold,
    fontSize: theme.typography.fontSizes[8],
    color: theme.colors.neutral[1],
  },
  description: {
    fontFamily: theme.typography.fontFamilies.sourceSansProRegular,
    fontSize: theme.typography.fontSizes[4],
    color: theme.colors.neutral[3],
    lineHeight: theme.typography.fontSizes[4] * theme.typography.lineHeights.loose,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing[3],
  },
  price: {
    fontFamily: theme.typography.fontFamilies.sourceSansProBold,
    fontSize: theme.typography.fontSizes[10],
    color: theme.colors.primary[100],
  },
  meta: {
    fontFamily: theme.typography.fontFamilies.sourceSansProRegular,
    fontSize: theme.typography.fontSizes[3],
    color: theme.colors.neutral[4],
  },
});
