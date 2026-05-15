import React, { useCallback, useMemo, useState } from 'react';
import {
  RefreshControl,
  ScrollView,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useQueryClient } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import type { Offer } from '../../../../entities/offer';
import { useOfferList } from '../../../../entities/offer';
import { useVenueList } from '../../../../entities/venue';
import type { ClientStackParamList } from '../../../../navigation/types';
import { theme } from '../../../../shared/config/theme';
import { useUserLocation } from '../../../../shared/lib/hooks';
import { MobileScreenChrome } from '../../../../shared/ui/mobile';
import {
  CategoryProductsSection,
  NearbySection,
  PromoSection,
  UrgentSection,
} from './components';

type Nav = NativeStackNavigationProp<ClientStackParamList>;

export const HomeScreen = () => {
  const { t } = useTranslation('catalog');
  const navigation = useNavigation<Nav>();
  const queryClient = useQueryClient();
  const { width } = useWindowDimensions();
  const tabBarHeight = useBottomTabBarHeight();
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const isTablet = width >= theme.breakpoints.md;
  const pagePadding = isTablet ? theme.spacing[6] : theme.spacing[3];
  const contentMaxWidth = isTablet ? theme.layout.containerMaxWidth : undefined;
  const urgentCardWidth = Math.min(
    Math.max(width * (isTablet ? 0.18 : 0.36), 132),
    150,
  );

  const { coords } = useUserLocation();
  const venuesQuery = useVenueList({
    limit: 10,
    lat: coords?.lat ?? null,
    lon: coords?.lon ?? null,
  });
  const offersQuery = useOfferList({ status: 'active', limit: 10 });

  const goToVenue = useCallback(
    (venueId: number) =>
      navigation.navigate('ClientTabs', {
        screen: 'Venue',
        params: { venueId },
      }),
    [navigation],
  );

  const goProfile = useCallback(() => navigation.navigate('Profile'), [navigation]);

  const goToOffer = useCallback(
    (offer: Offer, venueName: string) =>
      navigation.navigate('ClientTabs', {
        screen: 'ProductDetails',
        params: {
          venueId: offer.venue_id,
          venueName,
          offer,
        },
      }),
    [navigation],
  );

  const venueNameById = useMemo(() => {
    const map: Record<number, string> = {};
    for (const venue of venuesQuery.data?.items ?? []) map[venue.id] = venue.name;
    return map;
  }, [venuesQuery.data?.items]);

  const resolveVenueName = useCallback(
    (venueId: number) => t('orders.venueLabel', { id: venueId }),
    [t],
  );

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await Promise.all([
      queryClient.invalidateQueries({ queryKey: ['venues', 'list'] }),
      queryClient.invalidateQueries({ queryKey: ['offers', 'list'] }),
    ]);
    setRefreshing(false);
  }, [queryClient]);

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <ScrollView
        style={styles.root}
        contentContainerStyle={[
          styles.content,
          {
            paddingHorizontal: pagePadding,
            maxWidth: contentMaxWidth,
            paddingBottom: tabBarHeight + theme.spacing[5],
          },
        ]}
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        <MobileScreenChrome
          variant="home"
          omitSafeArea
          horizontalInset={0}
          searchValue={searchQuery}
          searchPlaceholder={t('searchPlaceholder')}
          onSearchChange={setSearchQuery}
          onPressProfile={goProfile}
        />
        <PromoSection isTablet={isTablet} />
        <UrgentSection
          offers={offersQuery.data?.items ?? []}
          isLoading={offersQuery.isLoading}
          venueNameById={venueNameById}
          cardWidth={urgentCardWidth}
          emptyTitle={t('emptyOffers')}
          emptyDescription={t('emptyOffersDescription')}
          resolveVenueName={resolveVenueName}
          onPressOffer={goToOffer}
        />
        <NearbySection
          venues={venuesQuery.data?.items}
          isLoading={venuesQuery.isLoading}
          emptyTitle={t('emptyVenues')}
          emptyDescription={t('emptyVenuesDescription')}
          tagText={t('venueTagsDefault')}
          distanceText={t('distanceDefault')}
          hoursText={t('hoursDefault')}
          onPressVenue={goToVenue}
        />
        <CategoryProductsSection
          offers={offersQuery.data?.items ?? []}
          isLoading={offersQuery.isLoading}
          venueNameById={venueNameById}
          emptyTitle={t('emptyProducts')}
          emptyDescription={t('emptyProductsDescription')}
          resolveVenueName={resolveVenueName}
          onPressOffer={goToOffer}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.client.colors.card,
  },
  root: {
    flex: 1,
    backgroundColor: theme.client.colors.card,
  },
  content: {
    alignSelf: 'center',
    width: '100%',
    paddingTop: theme.spacing[4],
    paddingBottom: theme.spacing[8],
    gap: theme.spacing[5],
  },
});