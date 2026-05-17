import React, { useCallback, useMemo, useRef, useState } from 'react';
import { StyleSheet, useWindowDimensions, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';
import type { ClientStackParamList } from '../../../../navigation/types';
import { useVenue } from '../../../../entities/venue';
import { useOfferList, type Offer } from '../../../../entities/offer';
import { useProductList, type Product } from '../../../../entities/product';
import { Loader } from '../../../../shared/ui/loader';
import { MobileScreenChrome } from '../../../../shared/ui/mobile';
import { theme } from '../../../../shared/config/theme';
import { CartSummary } from '../../../../widgets/cart-summary';
import { EmptyState } from '../../../../widgets/empty-state';
import { ProductDetailsSheet, type ProductDetailsSheetRef } from '../../../../features/product-details';
import { VenueInfo } from './components/VenueInfo.mobile';
import { VenueProductGrid } from './components/VenueProductGrid.mobile';
import { CategoryChips, DEFAULT_MOBILE_CATEGORY_LABELS } from '../../../../widgets/category-chips';

type VenueRoute = RouteProp<ClientStackParamList, 'Venue'>;
type Nav = NativeStackNavigationProp<ClientStackParamList>;

export const VenueScreen = () => {
  const route = useRoute<VenueRoute>();
  const navigation = useNavigation<Nav>();
  const { t } = useTranslation('catalog');
  const { width } = useWindowDimensions();
  const pagePadding = width >= theme.breakpoints.md ? theme.spacing[6] : theme.spacing[3];
  const [activeCategory, setActiveCategory] = useState<string>(DEFAULT_MOBILE_CATEGORY_LABELS[0]);
  const [searchQuery, setSearchQuery] = useState('');
  const { venueId } = route.params;

  const venueQuery = useVenue(venueId);
  const offersQuery = useOfferList({ venue_id: venueId, status: 'active', limit: 50 });
  const productsQuery = useProductList({ limit: 100 });
  const sheetRef = useRef<ProductDetailsSheetRef>(null);

  const productsById = useMemo<Record<number, Product>>(() => {
    const map: Record<number, Product> = {};
    productsQuery.data?.items.forEach((p) => {
      map[p.id] = p;
    });
    return map;
  }, [productsQuery.data]);

  const openDetails = useCallback((offer: Offer, product?: Product) => {
    sheetRef.current?.present({ offer, product });
  }, []);

  const goProfile = useCallback(() => navigation.navigate('Profile'), [navigation]);
  const goToBooking = useCallback(
    () => navigation.navigate('Booking', { venueId }),
    [navigation, venueId],
  );

  const headerChrome = (
    <View style={{ paddingHorizontal: pagePadding }}>
      <MobileScreenChrome
        omitSafeArea
        horizontalInset={0}
        searchValue={searchQuery}
        searchPlaceholder={t('searchPlaceholder')}
        onSearchChange={setSearchQuery}
        onPressProfile={goProfile}
      />
    </View>
  );

  if (venueQuery.isLoading || !venueQuery.data) {
    return (
      <SafeAreaView style={styles.root} edges={['top', 'left', 'right']}>
        {headerChrome}
        <View style={styles.loaderWrap}>
          <Loader fullScreen />
        </View>
      </SafeAreaView>
    );
  }

  const venue = venueQuery.data;
  const offers = offersQuery.data?.items ?? [];

  return (
    <SafeAreaView style={styles.root} edges={['top', 'left', 'right']}>
      {headerChrome}
      {offersQuery.isError ? (
        <View style={styles.errorWrap}>
          <EmptyState
            icon="alert-triangle"
            title="Не удалось загрузить данные"
            actionLabel="Повторить"
            onAction={() => offersQuery.refetch()}
          />
        </View>
      ) : (
        <VenueProductGrid
          horizontalPadding={pagePadding}
          offers={offers}
          productsById={productsById}
          isLoading={offersQuery.isLoading}
          onPressDetails={openDetails}
          ListHeaderComponent={
            <View style={styles.header}>
              <VenueInfo venue={venue} contentInset="flush" />
              <CategoryChips
                categories={DEFAULT_MOBILE_CATEGORY_LABELS}
                selectedCategory={activeCategory}
                onSelectCategory={setActiveCategory}
                density="compact"
              />
            </View>
          }
        />
      )}
      <View pointerEvents="box-none" style={styles.cartDock}>
        <CartSummary mode="dock" venueId={venueId} onPressCheckout={goToBooking} />
      </View>

      <ProductDetailsSheet ref={sheetRef} venueId={venueId} venueName={venue.name} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: theme.client.colors.card,
  },
  loaderWrap: {
    flex: 1,
  },
  header: {
    gap: theme.spacing[7],
    paddingBottom: 0,
  },
  errorWrap: {
    flex: 1,
    padding: theme.spacing[4],
    justifyContent: 'center',
  },
  cartDock: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
  },
});
