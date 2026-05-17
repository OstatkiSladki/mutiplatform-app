import React from 'react';
import { FlatList, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import type { Offer } from '../../../../../entities/offer';
import type { Product } from '../../../../../entities/product';
import { theme } from '../../../../../shared/config/theme';
import { CategoryProductCard } from '../../../../../widgets/category-product-card';

export interface RelatedProductsSectionProps {
  offers: Offer[];
  productsById: Record<number, Product>;
  onSelectOffer: (offer: Offer, product?: Product) => void;
}

const resolveWeight = (product?: Product): string | undefined => {
  if (!product) return undefined;
  const c = product.characteristics_json as Record<string, unknown> | undefined;
  const weight = c?.weight ?? c?.['вес'];
  return typeof weight === 'string' ? weight : undefined;
};

const primaryProductId = (offer: Offer) => offer.items[0]?.product_id;

export const RelatedProductsSection = ({
  offers,
  productsById,
  onSelectOffer,
}: RelatedProductsSectionProps) => {
  const { t } = useTranslation('catalog');
  const { width } = useWindowDimensions();
  const horizontalPadding = theme.spacing[4] * 2;
  const cardWidth = Math.min(Math.max((width - horizontalPadding) * 0.46, 132), 172);

  if (offers.length === 0) return null;

  return (
    <View style={styles.root}>
      <Text style={styles.heading}>{t('productDetails.trySurpriseSection')}</Text>
      <FlatList
        horizontal
        data={offers}
        keyExtractor={(item) => String(item.id)}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        ItemSeparatorComponent={() => <View style={styles.gap} />}
        renderItem={({ item }) => {
          const pid = primaryProductId(item);
          const product = pid !== undefined ? productsById[pid] : undefined;
          const title =
            product?.name ?? t('productDetails.fallbackName', { id: item.id });
          return (
            <CategoryProductCard
              offer={item}
              title={title}
              width={cardWidth}
              weight={resolveWeight(product)}
              onPress={() => onSelectOffer(item, product)}
            />
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    gap: theme.spacing[3],
    width: '100%',
  },
  heading: {
    fontFamily: theme.client.typography.fontFamily,
    fontSize: theme.typography.fontSizes[7],
    lineHeight: theme.typography.fontSizes[7] * theme.typography.lineHeights.tight,
    fontWeight: '700',
    color: theme.client.colors.foreground,
  },
  listContent: {
    paddingVertical: theme.spacing[3],
    overflow: 'visible',
  },
  gap: {
    width: theme.spacing[3],
  },
});
