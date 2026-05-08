import React, { useCallback, useState } from 'react';
import { RefreshControl, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useQueryClient } from '@tanstack/react-query';
import { useVenueList } from '../../../../entities/venue';
import { useOfferList } from '../../../../entities/offer';
import { useCartStore, selectTotalItemCount } from '../../../../entities/order';
import { AppHeader } from '../../../../widgets/header';
import type { ClientStackParamList } from '../../../../navigation/types';
import { theme } from '../../../../shared/config/theme';
import { useUserLocation } from '../../../../shared/lib/hooks';
import { useBreakpoint } from '../../../../shared/lib/responsive';
import { useTranslation } from 'react-i18next';
import { NearbyVenuesSection } from './sections/NearbyVenuesSection';
import { EstablishmentsSection } from './sections/EstablishmentsSection';
import { SurpriseBoxesSection } from './sections/SurpriseBoxesSection';
import { styles } from './styles';

type Nav = NativeStackNavigationProp<ClientStackParamList>;

export const HomeScreen = () => {
  const navigation = useNavigation<Nav>();
  const queryClient = useQueryClient();
  const { t: tCommon } = useTranslation('common');
  const { t: tCatalog } = useTranslation('catalog');
  const cartCount = useCartStore(selectTotalItemCount);
  const [refreshing, setRefreshing] = useState(false);
  const { isWeb, isAtLeast } = useBreakpoint();
  const showAppHeader = !(isWeb && isAtLeast('md'));

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

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await Promise.all([
      queryClient.invalidateQueries({ queryKey: ['venues', 'list'] }),
      queryClient.invalidateQueries({ queryKey: ['offers', 'list'] }),
    ]);
    setRefreshing(false);
  }, [queryClient]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.neutral[9] }} edges={['top', 'left', 'right']}>
      {showAppHeader ? (
        <AppHeader
          title={tCatalog('appTitle')}
          right={[
            {
              icon: 'shopping-bag',
              onPress: () => navigation.navigate('ClientTabs', { screen: 'Cart' }),
              badgeCount: cartCount,
              accessibilityLabel: tCommon('cartA11y'),
            },
          ]}
        />
      ) : null}
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
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
          onAdded={goToVenue}
        />
        <View style={{ height: theme.spacing[5] }} />
      </ScrollView>
    </SafeAreaView>
  );
};
