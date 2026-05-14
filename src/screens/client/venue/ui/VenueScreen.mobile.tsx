import React, { useCallback, useMemo, useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { ClientStackParamList } from '../../../../navigation/types';
import { useVenue } from '../../../../entities/venue';
import { useOfferList, type Offer } from '../../../../entities/offer';
import { useProductList, type Product } from '../../../../entities/product';
import { Loader } from '../../../../shared/ui/loader';
import { theme } from '../../../../shared/config/theme';
import { CartSummary } from '../../../../widgets/cart-summary';
import { EmptyState } from '../../../../widgets/empty-state';
import { ProductDetailsSheet, type ProductDetailsSheetRef } from '../../../../features/product-details';
import { VenueTopHeader } from './components/VenueTopHeader.mobile';
import { VenueInfo } from './components/VenueInfo.mobile';
import { CategoryTabs } from './components/CategoryTabs.mobile';
import { VenueProductGrid } from './components/VenueProductGrid.mobile';

type VenueRoute = RouteProp<ClientStackParamList, 'Venue'>;
type Nav = NativeStackNavigationProp<ClientStackParamList>;

const categories = ['Готовая еда', 'Выпечка', 'Здоровая еда', 'Круассаны'];

export const VenueScreen = () => {
  const route = useRoute<VenueRoute>();
  const navigation = useNavigation<Nav>();
  const [activeCategory, setActiveCategory] = useState(categories[0]);
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

  const goBack = useCallback(() => navigation.goBack(), [navigation]);
  const goToBooking = useCallback(
    () => navigation.navigate('Booking', { venueId }),
    [navigation, venueId],
  );

  if (venueQuery.isLoading || !venueQuery.data) {
    return (
      <View style={styles.root}>
        <Loader fullScreen />
      </View>
    );
  }

  const venue = venueQuery.data;
  const offers = offersQuery.data?.items ?? [];

  return (
    <View style={styles.root}>
      <VenueTopHeader onBack={goBack} />
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
          offers={offers}
          productsById={productsById}
          isLoading={offersQuery.isLoading}
          onPressDetails={openDetails}
          ListHeaderComponent={
            <View style={styles.header}>
              <VenueInfo venue={venue} />
              <CategoryTabs
                categories={categories}
                activeCategory={activeCategory}
                onChange={setActiveCategory}
              />
            </View>
          }
        />
      )}
      <View pointerEvents="box-none" style={styles.cartDock}>
        <CartSummary mode="dock" venueId={venueId} onPressCheckout={goToBooking} />
      </View>

      <ProductDetailsSheet ref={sheetRef} venueId={venueId} venueName={venue.name} />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: theme.client.colors.background,
  },
  header: {
    gap: theme.spacing[4],
    paddingBottom: theme.spacing[4],
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
