import React, { useCallback, useMemo, useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useOfferList, type Offer } from '../../../../entities/offer';
import { useVenueList, type Venue } from '../../../../entities/venue';
import { EmptyState } from '../../../../widgets/empty-state';
import { Loader } from '../../../../shared/ui/loader';
import { theme } from '../../../../shared/config/theme';
import type { ClientStackParamList } from '../../../../navigation/types';
import { CatalogOfferCard } from './CatalogOfferCard.mobile';

type Nav = NativeStackNavigationProp<ClientStackParamList>;
type GridItem = Offer | { id: string; placeholder: true };

const categories = ['Все', 'Готовая еда', 'Выпечка', 'Здоровая еда', 'Кофе'];

const isPlaceholder = (item: GridItem): item is { id: string; placeholder: true } =>
  'placeholder' in item;

export const CatalogScreen = () => {
  const navigation = useNavigation<Nav>();
  const [activeCategory, setActiveCategory] = useState(categories[0]);
  const offersQuery = useOfferList({ status: 'active', limit: 60 });
  const venuesQuery = useVenueList({ limit: 100, is_open: true });
  const offers = offersQuery.data?.items ?? [];
  const gridData = useMemo<GridItem[]>(() => {
    if (offers.length % 2 === 0) return offers;
    return [...offers, { id: 'placeholder', placeholder: true }];
  }, [offers]);

  const venuesById = useMemo<Record<number, Venue>>(() => {
    const map: Record<number, Venue> = {};
    venuesQuery.data?.items.forEach((venue) => {
      map[venue.id] = venue;
    });
    return map;
  }, [venuesQuery.data]);

  const goVenue = useCallback(
    (venueId: number) =>
      navigation.navigate('ClientTabs', {
        screen: 'Venue',
        params: { venueId },
      }),
    [navigation],
  );

  return (
    <SafeAreaView style={styles.root} edges={['top', 'left', 'right']}>
      <FlatList
        data={gridData}
        keyExtractor={(item) => String(item.id)}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View style={styles.header}>
            <Text style={styles.title}>Каталог</Text>
            <Text style={styles.subtitle}>
              Сюрприз-боксы и предложения заведений рядом с вами.
            </Text>
            <FlatList
              horizontal
              data={categories}
              keyExtractor={(item) => item}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.chips}
              renderItem={({ item }) => {
                const active = item === activeCategory;
                return (
                  <TouchableOpacity
                    style={[styles.chip, active && styles.chipActive]}
                    activeOpacity={0.8}
                    onPress={() => setActiveCategory(item)}
                  >
                    <Text style={[styles.chipText, active && styles.chipTextActive]}>
                      {item}
                    </Text>
                  </TouchableOpacity>
                );
              }}
            />
          </View>
        }
        ListEmptyComponent={
          offersQuery.isLoading ? (
            <View style={styles.loaderWrap}>
              <Loader size="large" />
            </View>
          ) : (
            <EmptyState
              icon="package"
              title="Каталог пока пуст"
              description="Новые предложения появятся здесь позже."
            />
          )
        }
        renderItem={({ item }) => {
          if (isPlaceholder(item)) return <View style={styles.cell} />;

          return (
            <View style={styles.cell}>
              <CatalogOfferCard
                offer={item}
                venue={venuesById[item.venue_id]}
                onPress={goVenue}
              />
            </View>
          );
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: theme.client.colors.background,
  },
  content: {
    padding: theme.spacing[4],
    paddingBottom: theme.spacing[10],
  },
  header: {
    gap: theme.spacing[3],
    marginBottom: theme.spacing[4],
  },
  title: {
    fontFamily: theme.client.typography.fontFamily,
    fontWeight: '700',
    fontSize: theme.typography.fontSizes[10],
    color: theme.client.colors.foreground,
  },
  subtitle: {
    fontFamily: theme.client.typography.fontFamily,
    fontSize: theme.typography.fontSizes[4],
    color: theme.client.colors.mutedForeground,
  },
  chips: {
    gap: theme.spacing[2],
    paddingRight: theme.spacing[4],
  },
  chip: {
    paddingHorizontal: theme.spacing[4],
    paddingVertical: theme.spacing[2],
    borderRadius: theme.client.radius.pill,
    borderWidth: 1,
    borderColor: theme.client.colors.border,
    backgroundColor: theme.client.colors.card,
  },
  chipActive: {
    borderColor: theme.client.colors.primary,
    backgroundColor: theme.client.colors.primary,
  },
  chipText: {
    fontFamily: theme.client.typography.fontFamily,
    fontSize: theme.typography.fontSizes[4],
    color: theme.client.colors.mutedForeground,
  },
  chipTextActive: {
    color: theme.client.colors.primaryForeground,
  },
  row: {
    gap: theme.spacing[3],
  },
  cell: {
    flex: 1,
    marginBottom: theme.spacing[3],
  },
  loaderWrap: {
    paddingVertical: theme.spacing[8],
  },
});
