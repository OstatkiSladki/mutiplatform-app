import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { ClientStackParamList } from '../../../../navigation/types';
import { useVenue } from '../../../../entities/venue';
import { useOfferList } from '../../../../entities/offer';
import { useProductList, type Product } from '../../../../entities/product';
import { useAuthStore } from '../../../../entities/auth/model/store';
import { AuthRequiredScreen } from '../../../../widgets/auth-required';
import {
  selectVenueCart,
  selectVenueTotal,
  useCartStore,
} from '../../../../entities/order';
import { Icon } from '../../../../shared/ui/icon';
import { Loader } from '../../../../shared/ui/loader';
import { useBreakpoint } from '../../../../shared/lib/responsive';
import { theme } from '../../../../shared/config/theme';
import { EmptyState } from '../../../../widgets/empty-state';
import { SurpriseBoxCard } from '../../../../widgets/surprise-box-card';
import { ClientDesktopHeader } from '../../../../widgets/web-header';
import { ClientWebFooter } from '../../../../widgets/client-web-footer';
import {
  type AppliedPromo,
  CheckoutForm,
  PICKUP_SLOTS,
  type PickupSlot,
  SERVICE_FEE,
} from '../../../../features/checkout';
import {
  PaymentBottomSheet,
  type PaymentSheetRef,
} from '../../../../features/payment';
import { OrderItemsList } from './OrderItemsList';
import { PriceBreakdown } from './PriceBreakdown';
import { CheckoutSummary } from './CheckoutSummary';
import { BookingOrderCard } from './components/BookingOrderCard';
import { CheckoutPriceCard } from './components/CheckoutPriceCard';
import { bookingDesktopStyles } from './components/booking-desktop.styles';
import { styles } from './styles';

type BookingRoute = RouteProp<ClientStackParamList, 'Booking'>;
type Nav = NativeStackNavigationProp<ClientStackParamList>;

export const BookingScreen = () => {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  if (!isAuthenticated) return <AuthRequiredScreen />;
  return <BookingScreenContent />;
};

const BookingScreenContent = () => {
  const route = useRoute<BookingRoute>();
  const navigation = useNavigation<Nav>();
  const { t } = useTranslation('checkout');

  const { venueId } = route.params;

  const venueQuery = useVenue(venueId);
  const { isWebDesktop } = useBreakpoint();
  const isDesktop = isWebDesktop;
  const venueOffersQuery = useOfferList({ venue_id: venueId, status: 'active', limit: 50 });
  const productsQuery = useProductList({ limit: 100 });
  const upsellOffers = venueOffersQuery.data?.items ?? [];

  const productByOfferId = useMemo(() => {
    const productsById: Record<number, Product> = {};
    productsQuery.data?.items.forEach((product) => {
      productsById[product.id] = product;
    });
    const map = new Map<number, Product>();
    upsellOffers.forEach((offer) => {
      const product = productsById[offer.product_id];
      if (product) map.set(offer.id, product);
    });
    return map;
  }, [productsQuery.data, upsellOffers]);

  const cart = useCartStore(selectVenueCart(venueId));
  const subtotal = useCartStore(selectVenueTotal(venueId));
  const setQuantity = useCartStore((s) => s.setQuantity);

  const [slot, setSlot] = useState<PickupSlot>(PICKUP_SLOTS[0]);
  const [appliedPromo, setAppliedPromo] = useState<AppliedPromo | null>(null);
  const lastPromoSubtotalRef = useRef<number | null>(null);

  const sheetRef = useRef<PaymentSheetRef>(null);
  const paidRef = useRef(false);

  useEffect(() => {
    if (paidRef.current) return;
    if (!cart || cart.items.length === 0) {
      navigation.goBack();
    }
  }, [cart, navigation]);

  useEffect(() => {
    if (!appliedPromo) {
      lastPromoSubtotalRef.current = null;
      return;
    }
    if (lastPromoSubtotalRef.current === null) {
      lastPromoSubtotalRef.current = subtotal;
      return;
    }
    if (lastPromoSubtotalRef.current !== subtotal) {
      setAppliedPromo(null);
    }
  }, [appliedPromo, subtotal]);

  const discount = appliedPromo?.discountAmount ?? 0;
  const fee = subtotal > 0 ? SERVICE_FEE : 0;
  const total = useMemo(
    () => Math.max(0, subtotal + fee - discount),
    [subtotal, fee, discount],
  );

  const goBack = useCallback(() => navigation.goBack(), [navigation]);

  const onSuccess = useCallback(() => {
    paidRef.current = true;
    navigation.navigate('ClientTabs', { screen: 'Cart' });
  }, [navigation]);

  const openPayment = useCallback(() => {
    sheetRef.current?.present();
  }, []);

  if (venueQuery.isLoading || !venueQuery.data) {
    return (
      <SafeAreaView style={styles.root} edges={['top', 'left', 'right']}>
        <Loader fullScreen />
      </SafeAreaView>
    );
  }

  const venue = venueQuery.data;

  if (!cart || cart.items.length === 0) {
    return (
      <SafeAreaView style={styles.root} edges={['top', 'left', 'right']}>
        <EmptyState
          icon="shopping-bag"
          title={t('emptyCart')}
          description={t('emptyCartDescription')}
        />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.root, isDesktop && styles.rootDesktop]} edges={['top', 'left', 'right']}>
      {isDesktop ? <ClientDesktopHeader activeTab="Cart" /> : null}
      {!isDesktop ? (
        <View style={styles.topBar}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={goBack}
            accessibilityRole="button"
            accessibilityLabel="Назад"
            activeOpacity={0.7}
          >
            <Icon name="chevron-left" size={20} color={theme.colors.neutral[1]} />
          </TouchableOpacity>
          <Text style={styles.topTitle}>{t('title')}</Text>
        </View>
      ) : null}

      <View style={styles.bodyWrap}>
        <ScrollView
          contentContainerStyle={[
            isDesktop ? bookingDesktopStyles.pageScroll : styles.scrollContent,
            !isDesktop && styles.scrollContentMobile,
          ]}
          showsVerticalScrollIndicator={false}
        >
          {isDesktop ? (
            <>
              <View style={bookingDesktopStyles.topRow}>
                <BookingOrderCard
                  venueName={venue.name}
                  slot={slot}
                  onChangeSlot={setSlot}
                  address={venue.address}
                  items={cart.items}
                  productByOfferId={productByOfferId}
                  onChangeQuantity={(productId, quantity) =>
                    setQuantity(venueId, productId, quantity)
                  }
                />
                <CheckoutPriceCard
                  subtotal={subtotal}
                  serviceFee={fee}
                  discount={discount}
                  total={total}
                  onPay={openPayment}
                />
              </View>

              {upsellOffers.length ? (
                <View style={bookingDesktopStyles.upsellSection}>
                  <Text style={bookingDesktopStyles.upsellTitle}>{t('upsellTitle')}</Text>
                  <View style={bookingDesktopStyles.upsellGrid}>
                    {upsellOffers.slice(0, 2).map((offer) => (
                      <View key={offer.id} style={bookingDesktopStyles.upsellCell}>
                        <SurpriseBoxCard
                          offer={offer}
                          venueName={venue.name}
                          venue={venue}
                          onVenuePress={(id) => navigation.navigate('Venue', { venueId: id })}
                        />
                      </View>
                    ))}
                  </View>
                </View>
              ) : null}
            </>
          ) : (
            <>
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>{venue.name}</Text>
              </View>

              <CheckoutForm
                slot={slot}
                onChangeSlot={setSlot}
                address={venue.address}
                amount={subtotal}
                appliedPromo={appliedPromo}
                onApplyPromo={setAppliedPromo}
              />

              <View style={styles.section}>
                <Text style={styles.sectionTitle}>{t('yourOrder')}</Text>
                <OrderItemsList
                  items={cart.items}
                  onChangeQuantity={(productId, quantity) =>
                    setQuantity(venueId, productId, quantity)
                  }
                />
              </View>

              <PriceBreakdown
                subtotal={subtotal}
                serviceFee={fee}
                discount={discount}
                total={total}
              />

              {upsellOffers.length ? (
                <View style={styles.section}>
                  <Text style={styles.sectionTitle}>{t('upsellTitle')}</Text>
                  <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.upsellCarousel}
                  >
                    {upsellOffers.map((offer) => (
                      <View key={offer.id} style={styles.upsellSlide}>
                        <SurpriseBoxCard offer={offer} venueName={venue.name} />
                      </View>
                    ))}
                  </ScrollView>
                </View>
              ) : null}
            </>
          )}
          {isDesktop ? <ClientWebFooter /> : null}
        </ScrollView>

        {!isDesktop ? (
          <CheckoutSummary
            mode="mobile-bar"
            subtotal={subtotal}
            serviceFee={fee}
            discount={discount}
            total={total}
            onPay={openPayment}
          />
        ) : null}
      </View>

      <PaymentBottomSheet
        ref={sheetRef}
        venueId={venueId}
        cart={cart}
        slot={slot}
        promo={appliedPromo}
        amount={total}
        onSuccess={onSuccess}
      />
    </SafeAreaView>
  );
};
