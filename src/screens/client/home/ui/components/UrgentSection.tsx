import React from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import type { Offer } from '../../../../../entities/offer';
import { theme } from '../../../../../shared/config/theme';
import { EmptyState } from '../../../../../widgets/empty-state';
import { ProductCard } from './ProductCard';

export interface UrgentSectionProps {
  offers: Offer[];
  isLoading: boolean;
  venueNameById: Record<number, string>;
  cardWidth: number;
  emptyTitle: string;
  emptyDescription: string;
  resolveVenueName: (venueId: number) => string;
  onPressOffer: (offer: Offer, venueName: string) => void;
}

export const UrgentSection = ({
  offers,
  isLoading,
  venueNameById,
  cardWidth,
  emptyTitle,
  emptyDescription,
  resolveVenueName,
  onPressOffer,
}: UrgentSectionProps) => {
  const renderOffer = ({ item }: { item: Offer }) => {
    const venueName = venueNameById[item.venue_id] ?? resolveVenueName(item.venue_id);

    return (
      <ProductCard
        offer={item}
        venueName={venueName}
        width={cardWidth}
        onPress={() => onPressOffer(item, venueName)}
      />
    );
  };

  return (
    <View style={styles.section}>
      <Text style={styles.title}>Срочно забрать</Text>
      {isLoading ? (
        <View style={styles.loader}>
          <ActivityIndicator color={theme.client.colors.primary} />
        </View>
      ) : offers.length > 0 ? (
        <FlatList
          horizontal
          data={offers}
          keyExtractor={(offer) => String(offer.id)}
          renderItem={renderOffer}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.list}
          ItemSeparatorComponent={Separator}
          removeClippedSubviews={false}
        />
      ) : (
        <EmptyState
          icon="gift"
          title={emptyTitle}
          description={emptyDescription}
        />
      )}
    </View>
  );
};

const Separator = () => <View style={styles.separator} />;

const styles = StyleSheet.create({
  section: {
    gap: theme.spacing[3],
  },
  title: {
    fontFamily: theme.client.typography.fontFamily,
    fontSize: theme.typography.fontSizes[9],
    fontWeight: '700',
    lineHeight: theme.typography.fontSizes[9] * theme.typography.lineHeights.normal,
    color: theme.colors.neutral[1],
  },
  list: {
    alignItems: 'stretch',
    paddingVertical: theme.spacing[3],
    paddingRight: theme.spacing[3],
    overflow: 'visible',
  },
  separator: {
    width: theme.spacing[3],
  },
  loader: {
    paddingVertical: theme.spacing[6],
    alignItems: 'center',
    justifyContent: 'center',
  },
});
