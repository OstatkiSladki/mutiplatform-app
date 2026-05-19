import React from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import type { Offer } from '../../../../../entities/offer';
import type { Product } from '../../../../../entities/product';
import { theme } from '../../../../../shared/config/theme';
import { EmptyState } from '../../../../../widgets/empty-state';
import { CategoryChips } from './CategoryChips';
import { ProductCard } from './ProductCard';

export interface CategoryProductsSectionProps {
  offers: Offer[];
  isLoading: boolean;
  venueNameById: Record<number, string>;
  productsById: Record<number, Product>;
  emptyTitle: string;
  emptyDescription: string;
  resolveVenueName: (venueId: number) => string;
  onPressOffer: (offer: Offer, venueName: string) => void;
}

export const CategoryProductsSection = ({
  offers,
  isLoading,
  venueNameById,
  productsById,
  emptyTitle,
  emptyDescription,
  resolveVenueName,
  onPressOffer,
}: CategoryProductsSectionProps) => {
  const { t } = useTranslation('catalog');
  const { width } = useWindowDimensions();
  const horizontalPadding = width >= theme.breakpoints.md ? theme.spacing[6] : theme.spacing[3];
  const availableWidth = Math.min(width - horizontalPadding * 2, theme.layout.containerMaxWidth);
  const cardWidth = (availableWidth - theme.spacing[2]) / 2;

  const renderOffer = ({ item }: { item: Offer }) => {
    const venueName = venueNameById[item.venue_id] ?? resolveVenueName(item.venue_id);
    const productId = item.items[0]?.product_id;
    const product = productId !== undefined ? productsById[productId] : undefined;

    return (
      <View style={[styles.gridCell, { width: cardWidth }]}>
        <ProductCard
          offer={item}
          venueName={venueName}
          width="100%"
          weight="130г"
          product={product}
          onPress={() => onPressOffer(item, venueName)}
        />
      </View>
    );
  };

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{t('productsAvailable')}</Text>
      <CategoryChips />
      {isLoading && (
        <View style={styles.loader}>
          <ActivityIndicator color={theme.client.colors.primary} />
        </View>
      )}
      {!isLoading && offers.length > 0 && (
        <FlatList
          data={offers}
          numColumns={2}
          scrollEnabled={false}
          keyExtractor={(offer) => String(offer.id)}
          renderItem={renderOffer}
          contentContainerStyle={styles.list}
          columnWrapperStyle={styles.row}
          removeClippedSubviews={false}
        />
      )}
      {!isLoading && offers.length === 0 && (
        <EmptyState
          icon="package"
          title={emptyTitle}
          description={emptyDescription}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    gap: theme.spacing[2],
  },
  sectionTitle: {
    fontFamily: theme.client.typography.fontFamily,
    fontSize: theme.typography.fontSizes[9],
    fontWeight: '700',
    lineHeight: theme.typography.fontSizes[9] * theme.typography.lineHeights.normal,
    color: theme.colors.neutral[1],
  },
  list: {
    paddingVertical: theme.spacing[3],
    gap: theme.spacing[2],
  },
  row: {
    gap: theme.spacing[2],
    overflow: 'visible',
  },
  gridCell: {
    flexGrow: 0,
    flexShrink: 0,
    alignItems: 'flex-start',
    paddingHorizontal: theme.spacing[1],
    paddingVertical: theme.spacing[2],
    overflow: 'visible',
  },
  loader: {
    paddingVertical: theme.spacing[6],
    alignItems: 'center',
    justifyContent: 'center',
  },
});
