import React, { useCallback, useMemo, useRef, useState } from 'react';
import { ScrollView, StyleSheet, View, useWindowDimensions } from 'react-native';
import type { BottomSheetModal } from '@gorhom/bottom-sheet';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';
import { useShallow } from 'zustand/react/shallow';
import type { DraftVenueCart } from '../../../../entities/order';
import { useCartStore, useOrders } from '../../../../entities/order';
import type { Venue } from '../../../../entities/venue';
import { useVenue, useVenueList } from '../../../../entities/venue';
import type { ClientStackParamList } from '../../../../navigation/types';
import { useAuthStore } from '../../../../entities/auth/model/store';
import { theme } from '../../../../shared/config/theme';
import { formatPrice } from '../../../../shared/lib/format';
import { AuthRequiredScreen } from '../../../../widgets/auth-required';
import { MobileScreenChrome, TimeSlotPickerSheet } from '../../../../shared/ui/mobile';
import {
  BasketBasketBody,
  BasketMainTab,
  BasketOrdersBody,
  BasketSwitcher,
  EmptyBasket,
} from './components';

type Nav = NativeStackNavigationProp<ClientStackParamList>;

const cartTotal = (cart: DraftVenueCart): number =>
  cart.items.reduce((sum, i) => sum + i.price * i.quantity, 0);

const TIME_SLOTS = ['19:00–20:00', '20:00–21:00', '21:00–22:00'] as const;

export const BasketScreen = () => {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  if (!isAuthenticated) return <AuthRequiredScreen />;
  return <BasketScreenContent />;
};

const BasketScreenContent = () => {
  const { t } = useTranslation('catalog');
  const navigation = useNavigation<Nav>();
  const { width } = useWindowDimensions();
  const [searchQuery, setSearchQuery] = useState('');
  const [mainTab, setMainTab] = useState<BasketMainTab>('basket');
  const [pickupSlot, setPickupSlot] = useState<string>(TIME_SLOTS[0]);
  const timeSheetRef = useRef<BottomSheetModal>(null);
  const openPickupSheet = useCallback(() => timeSheetRef.current?.present(), []);

  const carts = useCartStore(useShallow((s) => Object.values(s.carts)));
  const setQuantity = useCartStore((s) => s.setQuantity);
  const clearVenueCart = useCartStore((s) => s.clearVenueCart);

  const primaryCart = carts[0];
  const venueQuery = useVenue(primaryCart ? Number(primaryCart.venueId) : 0);
  const ordersQuery = useOrders({ limit: 30 });
  const venueListQuery = useVenueList({ limit: 100 });

  const venuesById = useMemo(() => {
    const map: Record<number, Venue> = {};
    venueListQuery.data?.items.forEach((v) => {
      map[v.id] = v;
    });
    return map;
  }, [venueListQuery.data?.items]);

  const sortedOrders = useMemo(() => {
    const items = ordersQuery.data?.items ?? [];
    return [...items].sort(
      (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
    );
  }, [ordersQuery.data?.items]);

  const pagePadding = width >= theme.breakpoints.md ? theme.spacing[6] : theme.spacing[3];
  const basketTotal = primaryCart ? cartTotal(primaryCart) : 0;

  const latestOrder = sortedOrders[0];
  const ordersFooterTotal = latestOrder ? latestOrder.final_amount : 0;

  const listBottomPad = theme.spacing[10] + theme.spacing[6];

  const goHome = useCallback(() => {
    navigation.navigate('ClientTabs', { screen: 'Home' });
  }, [navigation]);

  const goBooking = useCallback(() => {
    if (!primaryCart) return;
    navigation.navigate('Booking', { venueId: Number(primaryCart.venueId) });
  }, [navigation, primaryCart]);

  const goProfile = useCallback(() => navigation.navigate('Profile'), [navigation]);

  const fixedHeader = (
    <View style={[styles.fixedChrome, { paddingHorizontal: pagePadding }]}>
      <MobileScreenChrome
        omitSafeArea
        horizontalInset={0}
        searchValue={searchQuery}
        searchPlaceholder={t('searchPlaceholder')}
        onSearchChange={setSearchQuery}
        onPressProfile={goProfile}
      />
      <BasketSwitcher
        active={mainTab}
        onChange={setMainTab}
        labelBasket={t('basket.tabBasket')}
        labelOrders={t('basket.tabOrders')}
      />
    </View>
  );

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'left', 'right']}>
      <View style={styles.flexFill}>
        {fixedHeader}
        {mainTab === 'basket' ? (
          primaryCart ? (
            <View style={styles.basketBody}>
              <BasketBasketBody
                pagePadding={pagePadding}
                carts={carts}
                primaryCart={primaryCart}
                venue={venueQuery.data}
                venueLoading={venueQuery.isLoading}
                totalLabel={formatPrice(basketTotal)}
                pickupSlotLabel={pickupSlot}
                onOpenPickupSheet={openPickupSheet}
                onClearCart={() => clearVenueCart(primaryCart.venueId)}
                pickupTitle={t('basket.pickupTimeTitle')}
                clearA11yLabel={t('basket.clearCartA11y')}
                checkoutTitle={t('bookCta')}
                onCheckout={goBooking}
                checkoutDisabled={primaryCart.items.length === 0 || basketTotal <= 0}
                multiVenueHint={t('basket.multiVenueHint')}
                setQuantity={setQuantity}
              />
            </View>
          ) : (
            <ScrollView
              style={styles.scrollFill}
              contentContainerStyle={[
                styles.emptyContent,
                {
                  paddingHorizontal: pagePadding,
                  paddingBottom: theme.spacing[6],
                },
              ]}
              showsVerticalScrollIndicator={false}
            >
              <EmptyBasket
                title={t('cart.emptyTitle')}
                description={t('cart.emptyDescription')}
                actionLabel={t('cart.emptyCta')}
                onAction={goHome}
              />
            </ScrollView>
          )
        ) : (
          <BasketOrdersBody
            pagePadding={pagePadding}
            listBottomPad={listBottomPad}
            orders={sortedOrders}
            venuesById={venuesById}
            ordersFetching={ordersQuery.isFetching}
            emptyTitle={t('orders.emptyTitle')}
            emptyDescription={t('orders.emptyDescription')}
            emptyCta={t('orders.emptyCta')}
            onGoHome={goHome}
            footerTotalLabel={formatPrice(ordersFooterTotal)}
            pickupSlotLabel={pickupSlot}
            onOpenPickupSheet={openPickupSheet}
          />
        )}
      </View>
      <TimeSlotPickerSheet
        ref={timeSheetRef}
        title={t('basket.pickupTimeTitle')}
        slots={TIME_SLOTS}
        selected={pickupSlot}
        onSelect={setPickupSlot}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: theme.client.colors.card,
  },
  flexFill: {
    flex: 1,
    minHeight: 0,
  },
  basketBody: {
    flex: 1,
    minHeight: 0,
  },
  fixedChrome: {
    gap: theme.spacing[5],
    paddingBottom: theme.spacing[2],
    backgroundColor: theme.client.colors.card,
  },
  scrollFill: {
    flex: 1,
    backgroundColor: theme.client.colors.card,
  },
  emptyContent: {
    flexGrow: 1,
    paddingTop: theme.spacing[4],
    gap: theme.spacing[5],
  },
});
