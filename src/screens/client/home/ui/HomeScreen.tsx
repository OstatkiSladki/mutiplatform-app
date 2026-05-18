import React, { useCallback, useState } from 'react';
import { RefreshControl, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useQueryClient } from '@tanstack/react-query';
import type { Venue } from '../../../../entities/venue';
import { useVenueList } from '../../../../entities/venue';
import { useOfferList } from '../../../../entities/offer';
import { ClientMobileHeader } from '../../../../widgets/client-mobile-header';
import type { ClientStackParamList } from '../../../../navigation/types';
import { theme } from '../../../../shared/config/theme';
import { useUserLocation } from '../../../../shared/lib/hooks';
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
  const { isWeb, isAtLeast } = useBreakpoint();
  const showMobileHeader = !(isWeb && isAtLeast('md'));
  const horizontalPad =
    isWeb && isAtLeast('md')
      ? isAtLeast('lg')
        ? theme.spacing[7]
        : theme.spacing[6]
      : theme.spacing[6];

  const { coords } = useUserLocation();
  const venuesQuery = useVenueList({
    limit: 10,
    lat: coords?.lat ?? null,
    lon: coords?.lon ?? null,
  });
  const offersQuery = useOfferList({ status: 'active', limit: 10 });

  const goToVenue = useCallback(
    (venueId: number) => navigation.navigate('Venue', { venueId }),
    [navigation],
  );

  const venueNameById = React.useMemo(() => {
    const map: Record<number, string> = {};
    for (const v of venuesQuery.data?.items ?? []) map[v.id] = v.name;
    return map;
  }, [venuesQuery.data?.items]);

  const venueById = React.useMemo(() => {
    const map: Record<number, Venue> = {};
    for (const v of venuesQuery.data?.items ?? []) map[v.id] = v;
    return map;
  }, [venuesQuery.data?.items]);

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
          { paddingHorizontal: horizontalPad },
        ]}
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        <View style={styles.shellInner}>
          <View style={styles.homeMajorSectionsStack}>
            <NearbyVenuesSection
              venues={venuesQuery.data?.items}
              isLoading={venuesQuery.isLoading}
              onPressVenue={goToVenue}
            />
            <EstablishmentsSection
              venues={venuesQuery.data?.items}
              isLoading={venuesQuery.isLoading}
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
          <View style={styles.scrollBottomSpacer} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
