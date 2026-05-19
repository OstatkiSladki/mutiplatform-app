import React, { useMemo } from 'react';
import { FlatList, StyleSheet, useWindowDimensions, View } from 'react-native';
import type { Offer } from '../../../../../entities/offer';
import type { Product } from '../../../../../entities/product';
import { CategoryProductCard } from '../../../../../widgets/category-product-card';
import { EmptyState } from '../../../../../widgets/empty-state';
import { Loader } from '../../../../../shared/ui/loader';
import { theme } from '../../../../../shared/config/theme';
import { useMobileBottomNavHeight } from '../../../../../widgets/mobile-bottom-nav';

interface VenueProductGridProps {
  offers: Offer[];
  productsById: Record<number, Product>;
  isLoading: boolean;
  ListHeaderComponent: React.ReactElement;
  onPressDetails: (offer: Offer, product?: Product) => void;
  horizontalPadding?: number;
}

/** Reserved space for the absolutely-docked CartSummary above the grid. */
const CART_DOCK_CLEARANCE = 136;

type GridItem = Offer | { id: string; placeholder: true };

const isPlaceholder = (item: GridItem): item is { id: string; placeholder: true } =>
  'placeholder' in item;

export const VenueProductGrid = ({
  offers,
  productsById,
  isLoading,
  ListHeaderComponent,
  onPressDetails,
  horizontalPadding: horizontalPaddingProp,
}: VenueProductGridProps) => {
  const { width } = useWindowDimensions();
  const bottomNavHeight = useMobileBottomNavHeight();
  const horizontalPadding =
    horizontalPaddingProp ??
    (width >= theme.breakpoints.md ? theme.spacing[6] : theme.spacing[3]);
  const availableWidth = Math.min(width - horizontalPadding * 2, theme.layout.containerMaxWidth);
  const cardWidth = (availableWidth - theme.spacing[2]) / 2;

  const data = useMemo<GridItem[]>(() => {
    if (offers.length % 2 === 0) return offers;
    return [...offers, { id: 'placeholder', placeholder: true }];
  }, [offers]);

  const productFor = (offer: Offer) => {
    const productId = offer.items?.[0]?.product_id;
    return productId != null ? productsById[productId] : undefined;
  };

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => String(item.id)}
      numColumns={2}
      columnWrapperStyle={styles.row}
      contentContainerStyle={[
        styles.content,
        {
          paddingHorizontal: horizontalPadding,
          paddingTop: theme.spacing[2],
          paddingBottom: CART_DOCK_CLEARANCE + bottomNavHeight,
        },
      ]}
      ListHeaderComponent={ListHeaderComponent}
      ListEmptyComponent={
        isLoading ? (
          <View style={styles.loaderWrap}>
            <Loader size="large" />
          </View>
        ) : (
          <EmptyState
            icon="package"
            title="Сегодня без позиций"
            description="Это заведение пока не опубликовало доступные товары."
          />
        )
      }
      showsVerticalScrollIndicator={false}
      renderItem={({ item }) => {
        if (isPlaceholder(item)) {
          return <View style={[styles.cell, { width: cardWidth }]} />;
        }

        const product = productFor(item);
        return (
          <View style={[styles.cell, { width: cardWidth }]}>
            <CategoryProductCard
              offer={item}
              title={product?.name ?? `Сюрприз бокс №${item.id}`}
              width="100%"
              weight="130г"
              product={product}
              onPress={() => onPressDetails(item, product)}
            />
          </View>
        );
      }}
    />
  );
};

const styles = StyleSheet.create({
  content: {
    paddingBottom: 136,
  },
  row: {
    gap: theme.spacing[2],
    overflow: 'visible',
  },
  cell: {
    flexGrow: 0,
    flexShrink: 0,
    alignItems: 'flex-start',
    paddingHorizontal: theme.spacing[1],
    paddingBottom: theme.spacing[2],
    paddingTop: theme.spacing[1],
    overflow: 'visible',
  },
  loaderWrap: {
    flex: 1,
    justifyContent: 'center',
    paddingVertical: theme.spacing[8],
  },
});
