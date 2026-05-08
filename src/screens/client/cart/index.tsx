import React, { useCallback, useMemo } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useShallow } from 'zustand/react/shallow';
import { Screen } from '../../../shared/ui/screen';
import { EmptyState } from '../../../widgets/empty-state';
import { AuthRequiredScreen } from '../../../widgets/auth-required';
import {
  useCartStore,
  type DraftVenueCart,
} from '../../../entities/order';
import { useAuthStore } from '../../../entities/auth/model/store';
import { formatPrice } from '../../../shared/lib/format';
import type { ClientStackParamList } from '../../../navigation/types';
import { styles } from './styles';

type Nav = NativeStackNavigationProp<ClientStackParamList>;

interface CartCardData {
  venueId: number;
  venueName: string;
  count: number;
  total: number;
}

const aggregate = (cart: DraftVenueCart): CartCardData => {
  let count = 0;
  let total = 0;
  for (const item of cart.items) {
    count += item.quantity;
    total += item.price * item.quantity;
  }
  return {
    venueId: Number(cart.venueId),
    venueName: cart.venueName,
    count,
    total,
  };
};

export const CartScreen = () => {
  const { t } = useTranslation('catalog');
  const navigation = useNavigation<Nav>();
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  const rawCarts = useCartStore(useShallow((s) => Object.values(s.carts)));
  const carts = useMemo(() => rawCarts.map(aggregate), [rawCarts]);

  const goToVenue = useCallback(
    (venueId: number) => {
      navigation.navigate('Venue', { venueId });
    },
    [navigation],
  );

  const goHome = useCallback(() => {
    navigation.navigate('ClientTabs', { screen: 'Home' });
  }, [navigation]);

  if (!isAuthenticated) {
    return <AuthRequiredScreen />;
  }

  if (carts.length === 0) {
    return (
      <Screen scroll maxWidth={720}>
        <View style={styles.content}>
          <Text style={styles.title}>{t('cart.title')}</Text>
          <EmptyState
            icon="shopping-bag"
            title={t('cart.emptyTitle')}
            description={t('cart.emptyDescription')}
            actionLabel={t('cart.emptyCta')}
            onAction={goHome}
          />
        </View>
      </Screen>
    );
  }

  return (
    <Screen scroll maxWidth={720}>
      <View style={styles.content}>
        <Text style={styles.title}>{t('cart.title')}</Text>
        {carts.map((c) => (
          <TouchableOpacity
            key={String(c.venueId)}
            style={styles.card}
            activeOpacity={0.85}
            onPress={() => goToVenue(c.venueId)}
            accessibilityRole="button"
            accessibilityLabel={c.venueName}
          >
            <View style={styles.cardLeft}>
              <Text style={styles.venueName} numberOfLines={1}>
                {c.venueName}
              </Text>
              <Text style={styles.itemCount}>
                {t('cart.venueItemsCount', { count: c.count })}
              </Text>
            </View>
            <Text style={styles.total}>{formatPrice(c.total)}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </Screen>
  );
};
