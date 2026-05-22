import React, { useCallback, useMemo, useRef } from 'react';
import { Platform, ScrollView, Text, TouchableOpacity, View, type ViewStyle } from 'react-native';
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
import { ProductGrid as TabletProductGrid } from '../../../../widgets/product-grid';
import { CartSummary } from '../../../../widgets/cart-summary';
import { EmptyState } from '../../../../widgets/empty-state';
import { ClientDesktopHeader } from '../../../../widgets/web-header';
import { ClientWebFooter } from '../../../../widgets/client-web-footer';
import { VenueHeaderCard } from '../../../../widgets/venue-header-card';
import { VenueInfoCard } from './components/VenueInfoCard';
import { ProductGrid } from './components/ProductGrid';
import { CartSidebar } from './components/CartSidebar';
import { useBreakpoint } from '../../../../shared/lib/responsive';
import { AddToCartStepper } from '../../../../features/add-to-cart';
import { ProductDetailsSheet, type ProductDetailsSheetRef } from '../../../../features/product-details';
import { styles, VENUE_PAGE_TOP_PADDING } from './styles';

type VenueRoute = RouteProp<ClientStackParamList, 'Venue'>;
type Nav = NativeStackNavigationProp<ClientStackParamList>;

// Web-only `position: sticky` — RN core type lacks it but RN-Web supports it natively.
const stickySidebarStyle =
  Platform.OS === 'web'
    ? ({ position: 'sticky', top: VENUE_PAGE_TOP_PADDING } as unknown as ViewStyle)
    : null;

export const VenueScreen = () => {
  const route = useRoute<VenueRoute>();
  const navigation = useNavigation<Nav>();
  const { t } = useTranslation('catalog');
  const { venueId } = route.params;

  const venueQuery = useVenue(venueId);
  const { isWebDesktop, isAtLeast } = useBreakpoint();
  const showDesktopHeader = isWebDesktop;
  const isDesktop = isWebDesktop && isAtLeast('lg');
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
  const offers = offersQuery.data?.items ?? [];

  const renderQuantitySlot = (offer: Offer, product?: Product) => (
    <AddToCartStepper
      venueId={venueId}
      venueName={venue.name}
      offer={offer}
      displayName={product?.name}
      imageUrl={product?.image_urls?.[0]}
      size="sm"
      spread
    />
  );

  if (isDesktop) {
    return (
      <SafeAreaView style={styles.root} edges={['top', 'left', 'right']}>
        <ClientDesktopHeader />
        <ScrollView
          contentContainerStyle={[styles.desktopScroll, styles.desktopScrollWithFooter]}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.desktopMain}>
            <View style={styles.desktopLeft}>
              <VenueInfoCard venue={venue} />
              <View style={styles.productsCard}>
                <Text style={styles.productsTitle}>{t('productsAvailable')}</Text>
                {offersQuery.isError ? (
                  <EmptyState
                    icon="alert-triangle"
                    title={t('loadError')}
                    actionLabel={t('retry')}
                    onAction={() => offersQuery.refetch()}
                  />
                ) : (
                  <ProductGrid
                    venueId={venueId}
                    venueName={venue.name}
                    offers={offers}
                    productsById={productsById}
                    isLoading={offersQuery.isLoading}
                    onPressDetails={openDetails}
                  />
                )}
              </View>
            </View>
            <View style={[styles.desktopRight, stickySidebarStyle]}>
              <CartSidebar
                venueId={venueId}
                onPressCheckout={goToBooking}
                onPressBackToVenues={goBack}
              />
            </View>
          </View>
          <ClientWebFooter />
        </ScrollView>
        <ProductDetailsSheet ref={sheetRef} venueId={venueId} venueName={venue.name} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.root} edges={['top', 'left', 'right']}>
      {showDesktopHeader ? <ClientDesktopHeader /> : null}
      <View style={styles.backRow}>
        <TouchableOpacity
          onPress={goBack}
          accessibilityRole="button"
          accessibilityLabel={t('back')}
          activeOpacity={0.7}
          style={styles.backButton}
        >
          <Icon name="chevron-left" size={20} color={theme.client.colors.foreground} />
        </TouchableOpacity>
      </View>

      <View style={styles.mobileColumn}>
        {offersQuery.isError ? (
          <EmptyState
            icon="alert-triangle"
            title={t('loadError')}
            actionLabel={t('retry')}
            onAction={() => offersQuery.refetch()}
          />
        ) : (
          <TabletProductGrid
            layout="list"
            offers={offers}
            productsById={productsById}
            isLoading={offersQuery.isLoading}
            onPressDetails={openDetails}
            renderQuantitySlot={renderQuantitySlot}
            ListHeaderComponent={
              <View style={styles.mobileHeaderWrap}>
                <VenueHeaderCard venue={venue} />
                <Text style={styles.sectionTitle}>{t('productsAvailable')}</Text>
              </View>
            }
          />
        )}
        <CartSummary mode="dock" venueId={venueId} onPressCheckout={goToBooking} />
      </View>

      <ProductDetailsSheet ref={sheetRef} venueId={venueId} venueName={venue.name} />
    </SafeAreaView>
  );
};
