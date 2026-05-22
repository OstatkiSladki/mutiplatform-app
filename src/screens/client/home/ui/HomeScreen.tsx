import React, { useCallback, useMemo, useState } from 'react';
import { RefreshControl, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useQueryClient } from '@tanstack/react-query';
import type { Venue } from '../../../../entities/venue';
import { useVenueList } from '../../../../entities/venue';
import { useOfferList } from '../../../../entities/offer';
import {
  selectDeliveryAddress,
  selectWalkingRadiusMinutes,
  useUserAddressStore,
  type WalkingRadiusMinutes,
} from '../../../../entities/location';
import {
  filterVenuesWithinWalkingMinutes,
  useWalkingReach,
} from '../../../../features/walking-radius';
import { ClientMobileHeader } from '../../../../widgets/client-mobile-header';
import { ClientWebFooter } from '../../../../widgets/client-web-footer';
import type { ClientStackParamList } from '../../../../navigation/types';
import { theme } from '../../../../shared/config/theme';
import { getClientWebShellPadding } from '../../../../shared/lib/client-web-shell';
import { useBreakpoint } from '../../../../shared/lib/responsive';
import { NearbyVenuesSection } from './sections/NearbyVenuesSection';
import { EstablishmentsSection } from './sections/EstablishmentsSection';
import { SurpriseBoxesSection } from './sections/SurpriseBoxesSection';
import { styles } from './styles';

type Nav = NativeStackNavigationProp<ClientStackParamList>;

export const HomeScreen = () => {
  const navigation = useNavigation<Nav>();
  const queryClient = useQueryClient();
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { isWebDesktop, isAtLeast } = useBreakpoint();
  const showMobileHeader = !isWebDesktop;
  const horizontalPad = getClientWebShellPadding(isAtLeast);

  const venuesQuery = useVenueList({ limit: 10 });
  const venueItems = venuesQuery.data?.items;
  const venuesInitialLoading = venuesQuery.isPending && !venueItems?.length;
  const offersQuery = useOfferList({ status: 'active', limit: 10 });

  const deliveryAddress = useUserAddressStore(selectDeliveryAddress);
  const walkingRadiusMinutes = useUserAddressStore(selectWalkingRadiusMinutes);
  const setWalkingRadiusMinutes = useUserAddressStore((s) => s.setWalkingRadiusMinutes);

  const walkingReachQuery = useWalkingReach(
    { lat: deliveryAddress.lat, lon: deliveryAddress.lon },
    walkingRadiusMinutes,
    venueItems,
    isWebDesktop,
  );

  const nearbyVenues = useMemo(() => {
    if (!isWebDesktop) return venueItems;
    if (!walkingReachQuery.data) return venueItems;
    return filterVenuesWithinWalkingMinutes(
      venueItems,
      walkingReachQuery.data.venueDurationSeconds,
      walkingRadiusMinutes,
      deliveryAddress,
      walkingReachQuery.data.radiusMeters,
    );
  }, [
    isWebDesktop,
    venueItems,
    walkingReachQuery.data,
    walkingRadiusMinutes,
    deliveryAddress,
  ]);

  const handleWalkingRadiusChange = useCallback(
    (minutes: WalkingRadiusMinutes) => setWalkingRadiusMinutes(minutes),
    [setWalkingRadiusMinutes],
  );

  const goToVenue = useCallback(
    (venueId: number) => navigation.navigate('Venue', { venueId }),
    [navigation],
  );

  const venueNameById = React.useMemo(() => {
    const map: Record<number, string> = {};
    for (const v of venueItems ?? []) map[v.id] = v.name;
    return map;
  }, [venueItems]);

  const venueById = React.useMemo(() => {
    const map: Record<number, Venue> = {};
    for (const v of venueItems ?? []) map[v.id] = v;
    return map;
  }, [venueItems]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await Promise.all([
      queryClient.invalidateQueries({ queryKey: ['venues', 'list'] }),
      queryClient.invalidateQueries({ queryKey: ['offers', 'list'] }),
    ]);
    setRefreshing(false);
  }, [queryClient]);

  return (
    <SafeAreaView
      style={styles.root}
      edges={['top', 'left', 'right']}
    >
      {showMobileHeader ? (
        <ClientMobileHeader
          searchValue={searchQuery}
          onSearchChange={setSearchQuery}
        />
      ) : null}
      <ScrollView
        style={styles.scrollOuter}
        contentContainerStyle={[
          styles.scrollContent,
          isWebDesktop ? styles.scrollContentWeb : null,
        ]}
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        <View
          style={[
            styles.shellInner,
            { paddingHorizontal: horizontalPad },
            isWebDesktop ? styles.scrollMain : null,
          ]}
        >
          <View style={styles.homeMajorSectionsStack}>
            <NearbyVenuesSection
              venues={nearbyVenues}
              isLoading={venuesInitialLoading || (isWebDesktop && walkingReachQuery.isLoading)}
              onPressVenue={goToVenue}
              deliveryAddress={isWebDesktop ? deliveryAddress : undefined}
              walkingRadiusMinutes={isWebDesktop ? walkingRadiusMinutes : undefined}
              onWalkingRadiusChange={isWebDesktop ? handleWalkingRadiusChange : undefined}
              walkingRadiusRing={walkingReachQuery.data?.ring}
              walkingFilterActive={isWebDesktop}
            />
            <EstablishmentsSection
              venues={venueItems}
              isLoading={venuesInitialLoading}
              onPressVenue={goToVenue}
            />
            <SurpriseBoxesSection
              offers={offersQuery.data?.items}
              isLoading={offersQuery.isLoading}
              venueNameById={venueNameById}
              venueById={venueById}
              onVenuePress={goToVenue}
              onAdded={goToVenue}
            />
          </View>
          {!isWebDesktop ? <View style={styles.scrollBottomSpacer} /> : null}
        </View>
        {isWebDesktop ? <ClientWebFooter /> : null}
      </ScrollView>
    </SafeAreaView>
  );
};
