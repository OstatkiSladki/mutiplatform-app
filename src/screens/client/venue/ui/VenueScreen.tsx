import React, { useCallback, useMemo, useRef } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { ClientStackParamList } from '../../../../navigation/types';
import { useVenue } from '../../../../entities/venue';
import { useOfferList, type Offer } from '../../../../entities/offer';
import { useProductList, type Product } from '../../../../entities/product';
import { Loader } from '../../../../shared/ui/loader';
import { Icon } from '../../../../shared/ui/icon';
import { theme } from '../../../../shared/config/theme';
import { ProductGrid } from '../../../../widgets/product-grid';
import { CartSummary } from '../../../../widgets/cart-summary';
import { EmptyState } from '../../../../widgets/empty-state';
import { ClientDesktopHeader } from '../../../../widgets/web-header';
import { useBreakpoint } from '../../../../shared/lib/responsive';
import { AddToCartStepper } from '../../../../features/add-to-cart';
import { ProductDetailsSheet, type ProductDetailsSheetRef } from '../../../../features/product-details';
import { VenueHeader } from './VenueHeader';
import { styles } from './styles';

type VenueRoute = RouteProp<ClientStackParamList, 'Venue'>;
type Nav = NativeStackNavigationProp<ClientStackParamList>;

export const VenueScreen = () => {
  const route = useRoute<VenueRoute>();
  const navigation = useNavigation<Nav>();
  const { t } = useTranslation('catalog');
  const { venueId } = route.params;

  const venueQuery = useVenue(venueId);
  const { isAtLeast, isWeb } = useBreakpoint();
  const showDesktopHeader = isWeb && isAtLeast('md');
  const offersQuery = useOfferList({ venue_id: venueId, status: 'active', limit: 50 });
  const productsQuery = useProductList({ limit: 100 });

  const productsById = useMemo<Record<number, Product>>(() => {
    const map: Record<number, Product> = {};
    productsQuery.data?.items.forEach((p) => {
      map[p.id] = p;
    });
    return map;
  }, [productsQuery.data]);

  const sheetRef = useRef<ProductDetailsSheetRef>(null);

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
      <SafeAreaView style={styles.root} edges={['top', 'left', 'right']}>
        <Loader fullScreen />
      </SafeAreaView>
    );
  }

  const venue = venueQuery.data;

  return (
    <SafeAreaView style={styles.root} edges={['top', 'left', 'right']}>
      {showDesktopHeader ? <ClientDesktopHeader /> : null}
      <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: theme.spacing[3], paddingVertical: theme.spacing[2] }}>
        <TouchableOpacity
          onPress={goBack}
          accessibilityRole="button"
          accessibilityLabel="Назад"
          activeOpacity={0.7}
          style={{ width: 40, height: 40, alignItems: 'center', justifyContent: 'center', borderRadius: theme.radius.full, backgroundColor: theme.colors.neutral.white }}
        >
          <Icon name="chevron-left" size={20} color={theme.colors.neutral[1]} />
        </TouchableOpacity>
      </View>

      <View style={{ flex: 1 }}>
        {offersQuery.isError ? (
          <EmptyState
            icon="alert-triangle"
            title={t('loadError')}
            actionLabel={t('retry')}
            onAction={() => offersQuery.refetch()}
          />
        ) : (
          <ProductGrid
            offers={offersQuery.data?.items ?? []}
            productsById={productsById}
            isLoading={offersQuery.isLoading}
            onPressDetails={openDetails}
            renderQuantitySlot={(offer, product) => (
              <AddToCartStepper
                venueId={venueId}
                venueName={venue.name}
                offer={offer}
                displayName={product?.name}
                imageUrl={product?.image_urls?.[0]}
              />
            )}
            ListHeaderComponent={
              <View>
                <VenueHeader venue={venue} />
                <Text style={styles.sectionTitle}>{t('productsAvailable')}</Text>
              </View>
            }
          />
        )}
        <CartSummary venueId={venueId} onPressCheckout={goToBooking} />
      </View>

      <ProductDetailsSheet
        ref={sheetRef}
        venueId={venueId}
        venueName={venue.name}
      />
    </SafeAreaView>
  );
};
