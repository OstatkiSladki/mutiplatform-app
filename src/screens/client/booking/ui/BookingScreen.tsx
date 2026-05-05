import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { ClientStackParamList } from '../../../../navigation/types';
import { useVenue } from '../../../../entities/venue';
import { useOfferList } from '../../../../entities/offer';
import {
  selectVenueCart,
  selectVenueTotal,
  useCartStore,
} from '../../../../entities/order';
import { Button } from '../../../../shared/ui/button';
import { Icon } from '../../../../shared/ui/icon';
import { Loader } from '../../../../shared/ui/loader';
import { useBreakpoint } from '../../../../shared/lib/responsive';
import { theme } from '../../../../shared/config/theme';
import { formatPrice } from '../../../../shared/lib/format';
import { EmptyState } from '../../../../widgets/empty-state';
import { SurpriseBoxCard } from '../../../../widgets/surprise-box-card';
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
import { styles } from './styles';

type BookingRoute = RouteProp<ClientStackParamList, 'Booking'>;
type Nav = NativeStackNavigationProp<ClientStackParamList>;

export const BookingScreen = () => {
  const route = useRoute<BookingRoute>();
  const navigation = useNavigation<Nav>();
  const { t } = useTranslation('checkout');

  const { venueId } = route.params;

  const venueQuery = useVenue(venueId);
  const { isAtLeast } = useBreakpoint();
  const upsellColumns = isAtLeast('lg') ? 3 : isAtLeast('md') ? 2 : 1;
  const upsellOffersQuery = useOfferList({ venue_id: venueId, status: 'active', limit: 3 });

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
    navigation.navigate('ClientTabs', { screen: 'Orders' });
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
    <SafeAreaView style={styles.root} edges={['top', 'left', 'right']}>
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

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
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

        {upsellOffersQuery.data?.items?.length ? (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{t('upsellTitle')}</Text>
            <View
              style={[
                styles.upsellGrid,
                upsellColumns === 1 ? styles.upsellGridStack : styles.upsellGridRow,
              ]}
            >
              {upsellOffersQuery.data.items.slice(0, upsellColumns).map((offer) => (
                <SurpriseBoxCard
                  key={offer.id}
                  offer={offer}
                  venueName={venueQuery.data?.name ?? ''}
                />
              ))}
            </View>
          </View>
        ) : null}

        <Button
          title={t('payCtaWithAmount', { amount: formatPrice(total) })}
          onPress={openPayment}
          disabled={total === 0}
        />
      </ScrollView>

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
