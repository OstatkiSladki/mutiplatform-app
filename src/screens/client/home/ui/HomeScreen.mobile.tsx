import React, { useCallback, useMemo, useState } from 'react';
import {
  Platform,
  RefreshControl,
  ScrollView,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useQueryClient } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import type { Offer } from '../../../../entities/offer';
import { useOfferList } from '../../../../entities/offer';
import type { Product } from '../../../../entities/product';
import { useProductList } from '../../../../entities/product';
import { useVenueList } from '../../../../entities/venue';
import type { ClientStackParamList } from '../../../../navigation/types';
import { theme } from '../../../../shared/config/theme';
import { useMobileLayout } from '../../../../shared/lib/responsive';
import { MobileScreenChrome } from '../../../../shared/ui/mobile';
import { useMobileBottomNavHeight } from '../../../../widgets/mobile-bottom-nav';
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
  const mobileLayoutActive = useMobileLayout();
  const isMobileWebLayout = Platform.OS === 'web' && mobileLayoutActive;
  const tabBarHeight = useMobileBottomNavHeight();
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const isTablet = !isMobileWebLayout && width >= theme.breakpoints.md;
  const pagePadding = isTablet ? theme.spacing[6] : theme.spacing[3];
  const contentMaxWidth = isTablet ? theme.layout.containerMaxWidth : undefined;
  const urgentCardWidth = Math.min(
    Math.max(width * (isTablet ? 0.18 : 0.36), 132),
    150,
  );

  const productsQuery = useProductList({ limit: 100 });
  const productsById = useMemo<Record<number, Product>>(() => {
    const map: Record<number, Product> = {};
    productsQuery.data?.items.forEach((p) => { map[p.id] = p; });
    return map;
  }, [productsQuery.data]);

  const venuesQuery = useVenueList({ limit: 10 });
  const venueItems = venuesQuery.data?.items;
  const venuesInitialLoading = venuesQuery.isPending && !venueItems?.length;
  const offersQuery = useOfferList({ status: 'active', limit: 10 });

  const goToVenue = useCallback(
    (venueId: number) => navigation.navigate('Venue', { venueId }),
    [navigation],
  );

  const goProfile = useCallback(() => navigation.navigate('Profile'), [navigation]);

  const goToOffer = useCallback(
    (offer: Offer, venueName: string) =>
      navigation.navigate('ProductDetails', {
        venueId: offer.venue_id,
        venueName,
        offer,
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
          omitSafeArea
          horizontalInset={0}
          searchValue={searchQuery}
          searchPlaceholder={t('searchPlaceholder')}
          onSearchChange={setSearchQuery}
          onPressProfile={goProfile}
        />
        <PromoSection />
        <UrgentSection
          offers={offersQuery.data?.items ?? []}
          isLoading={offersQuery.isLoading}
          venueNameById={venueNameById}
          productsById={productsById}
          cardWidth={urgentCardWidth}
          emptyTitle={t('emptyOffers')}
          emptyDescription={t('emptyOffersDescription')}
          resolveVenueName={resolveVenueName}
          onPressOffer={goToOffer}
        />
        <NearbySection
          venues={venueItems}
          isLoading={venuesInitialLoading}
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
          productsById={productsById}
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