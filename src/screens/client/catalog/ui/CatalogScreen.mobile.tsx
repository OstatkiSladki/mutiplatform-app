import React, { useCallback, useMemo, useRef, useState } from 'react';
import { ScrollView, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import type { BottomSheetModal } from '@gorhom/bottom-sheet';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';
import { useOfferList } from '../../../../entities/offer';
import { useVenue } from '../../../../entities/venue';
import { useCartStore } from '../../../../entities/order';
import { useSurpriseBoxBuilder } from '../../../../features/surprise-box-builder';
import {
  ADDITION_KEYS,
  FILLING_KEYS,
  RESTRICTION_KEYS,
  TIME_SLOTS,
  type AdditionKey,
  type FillingKey,
  type RestrictionKey,
  type TimeSlot,
} from '../../../../features/surprise-box-builder/model/constants';
import { EmptyState } from '../../../../widgets/empty-state';
import { Loader } from '../../../../shared/ui/loader';
import { MobileScreenChrome, TimeSlotPickerSheet } from '../../../../shared/ui/mobile';
import { theme } from '../../../../shared/config/theme';
import type { ClientStackParamList } from '../../../../navigation/types';
import { formatPrice } from '../../../../shared/lib/format';
import { venueAvatarLabel } from '../../../../shared/lib/venue-avatar';
import {
  SurpriseBoxCheckoutBar,
  SurpriseBoxHero,
  SurpriseBoxOptionGroup,
  SurpriseBoxPickupSection,
  SurpriseBoxSizeSelector,
  SurpriseBoxVenueRow,
} from './surprise-box';

type Nav = NativeStackNavigationProp<ClientStackParamList>;

export const SurpriseBoxScreen = () => {
  const { t } = useTranslation('catalog');
  const navigation = useNavigation<Nav>();
  const { width } = useWindowDimensions();
  const tabBarHeight = useBottomTabBarHeight();
  /** Tab clearance only — pickup + checkout scroll inside content */
  const scrollBottomPadOffer = tabBarHeight + theme.spacing[6];
  const scrollBottomPadEmpty = theme.spacing[10];
  const addItem = useCartStore((s) => s.addItem);

  const pagePadding = width >= theme.breakpoints.md ? theme.spacing[6] : theme.spacing[3];
  const [searchQuery, setSearchQuery] = useState('');
  const timeSheetRef = useRef<BottomSheetModal>(null);
  const openTimeSheet = useCallback(() => timeSheetRef.current?.present(), []);

  const offersQuery = useOfferList({ status: 'active', limit: 60 });
  const offer = offersQuery.data?.items?.[0];
  const venueQuery = useVenue(offer?.venue_id ?? 0);

  const basePrice = useMemo(() => {
    if (!offer) return 1200;
    const n = parseFloat(offer.current_price);
    return Number.isFinite(n) && n > 0 ? n : 1200;
  }, [offer]);

  const builder = useSurpriseBoxBuilder(basePrice);

  const goProfile = useCallback(() => navigation.navigate('Profile'), [navigation]);

  const fillingOptions = useMemo(
    () =>
      FILLING_KEYS.map((key) => ({
        key,
        label: t(`surpriseBox.fillings.${key}` as const),
      })),
    [t],
  );

  const restrictionOptions = useMemo(
    () =>
      RESTRICTION_KEYS.map((key) => ({
        key,
        label: t(`surpriseBox.restrictions.${key}` as const),
      })),
    [t],
  );

  const additionOptions = useMemo(
    () =>
      ADDITION_KEYS.map((key) => ({
        key,
        label: t(`surpriseBox.additions.${key}` as const),
      })),
    [t],
  );

  const onPay = useCallback(() => {
    if (!offer || !venueQuery.data) return;

    addItem(offer.venue_id, venueQuery.data.name, {
      productId: `offer-${offer.id}`,
      offerId: offer.id,
      name: t('surpriseBox.itemName'),
      price: builder.finalPrice,
      maxQuantity: offer.quantity_available,
      quantity: 1,
    });
    navigation.navigate('ClientTabs', { screen: 'Cart' });
  }, [addItem, builder.finalPrice, navigation, offer, t, venueQuery.data]);

  const heroBrand = venueQuery.data ? venueAvatarLabel(venueQuery.data.name) : 'КЕКС';

  const surpriseBody = useMemo(() => {
    if (!offer) return null;

    if (venueQuery.isLoading || !venueQuery.data) {
      return (
        <View style={styles.loaderSection}>
          <Loader size="large" />
        </View>
      );
    }

    const venue = venueQuery.data;

    return (
      <>
        <SurpriseBoxVenueRow venue={venue} hoursLabel={t('hoursDefault')} />
        <SurpriseBoxHero />
        <SurpriseBoxSizeSelector selected={builder.config.size} onSelect={builder.setSize} />
        <Text style={styles.productTitle}>
          {t('surpriseBox.heroTitle', { brand: heroBrand })}
        </Text>
        <SurpriseBoxOptionGroup
          title={t('surpriseBox.fillingLabel')}
          options={fillingOptions}
          selectedKey={builder.config.filling}
          onSelect={(key) => builder.setFilling(key as FillingKey)}
        />
        <SurpriseBoxOptionGroup
          title={t('surpriseBox.restrictionLabel')}
          options={restrictionOptions}
          selectedKey={builder.config.restriction}
          onSelect={(key) => builder.setRestriction(key as RestrictionKey)}
        />
        <SurpriseBoxOptionGroup
          title={t('surpriseBox.additionLabel')}
          options={additionOptions}
          selectedKey={builder.config.addition}
          onSelect={(key) => builder.setAddition(key as AdditionKey)}
        />
      </>
    );
  }, [
    additionOptions,
    builder,
    fillingOptions,
    heroBrand,
    offer,
    restrictionOptions,
    t,
    venueQuery.data,
    venueQuery.isLoading,
  ]);

  const chrome = (
    <MobileScreenChrome
      omitSafeArea
      horizontalInset={0}
      searchValue={searchQuery}
      searchPlaceholder={t('searchPlaceholder')}
      onSearchChange={setSearchQuery}
      onPressProfile={goProfile}
    />
  );

  return (
    <SafeAreaView style={styles.root} edges={['top', 'left', 'right']}>
      <View style={styles.flex}>
        {offersQuery.isLoading ? (
          <ScrollView
            style={styles.flex}
            contentContainerStyle={[
              styles.scrollContent,
              {
                paddingHorizontal: pagePadding,
                paddingBottom: scrollBottomPadEmpty,
              },
            ]}
            showsVerticalScrollIndicator={false}
          >
            {chrome}
            <View style={styles.loaderWrap}>
              <Loader size="large" />
            </View>
          </ScrollView>
        ) : !offer ? (
          <ScrollView
            style={styles.flex}
            contentContainerStyle={[
              styles.scrollContent,
              {
                paddingHorizontal: pagePadding,
                paddingBottom: scrollBottomPadEmpty,
              },
            ]}
            showsVerticalScrollIndicator={false}
          >
            {chrome}
            <EmptyState
              icon="package"
              title={t('emptyOffers')}
              description={t('emptyOffersDescription')}
            />
          </ScrollView>
        ) : (
          <ScrollView
            style={styles.flex}
            contentContainerStyle={[
              styles.scrollContent,
              {
                paddingHorizontal: pagePadding,
                paddingBottom: scrollBottomPadOffer,
              },
            ]}
            showsVerticalScrollIndicator={false}
          >
            {chrome}
            {surpriseBody}
            {offer && venueQuery.data ? (
              <>
                <SurpriseBoxPickupSection
                  title={t('basket.pickupTimeTitle')}
                  selectedLabel={builder.config.time}
                  onPress={openTimeSheet}
                />
                <SurpriseBoxCheckoutBar
                  priceLabel={formatPrice(builder.finalPrice)}
                  ctaLabel={t('surpriseBox.payCta')}
                  onPay={onPay}
                />
              </>
            ) : null}
          </ScrollView>
        )}
      </View>
      <TimeSlotPickerSheet
        ref={timeSheetRef}
        title={t('basket.pickupTimeTitle')}
        slots={TIME_SLOTS}
        selected={builder.config.time}
        onSelect={(slot) => builder.setTime(slot as TimeSlot)}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: theme.client.colors.card,
  },
  flex: {
    flex: 1,
  },
  scrollContent: {
    gap: theme.spacing[4],
    paddingTop: theme.spacing[2],
  },
  loaderWrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: theme.spacing[10],
  },
  loaderSection: {
    paddingVertical: theme.spacing[8],
    alignItems: 'center',
  },
  productTitle: {
    marginTop: theme.spacing[2],
    marginBottom: theme.spacing[1],
    fontFamily: theme.client.typography.fontFamily,
    fontWeight: '700',
    fontSize: theme.typography.fontSizes[11],
    lineHeight: theme.typography.fontSizes[11] * theme.typography.lineHeights.tight,
    color: theme.client.colors.foreground,
  },
});
