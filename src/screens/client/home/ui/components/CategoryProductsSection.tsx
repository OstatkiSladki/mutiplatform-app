import React from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import type { Offer } from '../../../../../entities/offer';
import { theme } from '../../../../../shared/config/theme';
import { EmptyState } from '../../../../../widgets/empty-state';
import { CategoryChips } from './CategoryChips';
import { ProductCard } from './ProductCard';

export interface CategoryProductsSectionProps {
  offers: Offer[];
  isLoading: boolean;
  venueNameById: Record<number, string>;
  emptyTitle: string;
  emptyDescription: string;
  resolveVenueName: (venueId: number) => string;
  onPressOffer: (offer: Offer, venueName: string) => void;
}

export const CategoryProductsSection = ({
  offers,
  isLoading,
  venueNameById,
  emptyTitle,
  emptyDescription,
  resolveVenueName,
  onPressOffer,
}: CategoryProductsSectionProps) => {
  const { width } = useWindowDimensions();
  const horizontalPadding = width >= theme.breakpoints.md ? theme.spacing[6] : theme.spacing[3];
  const availableWidth = Math.min(width - horizontalPadding * 2, theme.layout.containerMaxWidth);
  const cardWidth = (availableWidth - theme.spacing[2]) / 2;

  const renderOffer = ({ item }: { item: Offer }) => {
    const venueName = venueNameById[item.venue_id] ?? resolveVenueName(item.venue_id);

    return (
      <View style={[styles.gridCell, { width: cardWidth }]}>
        <ProductCard
          offer={item}
          venueName={venueName}
          width="100%"
          aspectRatio={175 / 220}
          onPress={() => onPressOffer(item, venueName)}
        />
      </View>
    );
  };

  return (
    <View style={styles.section}>
      <CategoryChips />
      {isLoading ? (
        <View style={styles.loader}>
          <ActivityIndicator color={theme.client.colors.primary} />
        </View>
      ) : offers.length > 0 ? (
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
      ) : (
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
    gap: theme.spacing[3],
  },
  list: {
    paddingVertical: theme.spacing[2],
    gap: theme.spacing[2],
  },
  row: {
    gap: theme.spacing[2],
  },
  gridCell: {
    flexGrow: 0,
    flexShrink: 0,
    alignItems: 'flex-start',
  },
  loader: {
    paddingVertical: theme.spacing[6],
    alignItems: 'center',
    justifyContent: 'center',
  },
});
