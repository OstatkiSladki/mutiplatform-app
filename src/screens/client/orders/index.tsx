import React, { useCallback, useRef, useState } from 'react';
import { RefreshControl, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useOrders, type Order } from '../../../entities/order';
import { EmptyState } from '../../../widgets/empty-state';
import { theme } from '../../../shared/config/theme';
import { useBreakpoint } from '../../../shared/lib/responsive';
import type { ClientStackParamList } from '../../../navigation/types';
import type { AppBottomSheetRef } from '../../../shared/ui/bottom-sheet';
import { OrderCard } from './components/order-card';
import { PickupCodeModal } from './components/pickup-code-modal';
import { styles } from './styles';

type Nav = NativeStackNavigationProp<ClientStackParamList>;

export const OrdersScreen = () => {
  const { t } = useTranslation('catalog');
  const navigation = useNavigation<Nav>();
  const { data, isFetching, refetch } = useOrders();
  const [pickupOrderId, setPickupOrderId] = useState<number | null>(null);
  const sheetRef = useRef<AppBottomSheetRef>(null);
  const { isAtLeast } = useBreakpoint();
  const numColumns = isAtLeast('lg') ? 4 : isAtLeast('md') ? 3 : 2;
  const cellBasis = `${100 / numColumns}%` as const;

  const goHome = useCallback(() => {
    navigation.navigate('ClientTabs', { screen: 'Home' });
  }, [navigation]);

  const onPressPickupCode = useCallback((order: Order) => {
    setPickupOrderId(order.id);
    sheetRef.current?.present();
  }, []);

  const orders = data?.items ?? [];

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: theme.colors.neutral[9] }}
      edges={['top', 'left', 'right']}
    >
      <Text style={styles.title}>{t('orders.title')}</Text>

      {orders.length === 0 && !isFetching ? (
        <View style={styles.emptyWrap}>
          <EmptyState
            icon="package"
            title={t('orders.emptyTitle')}
            description={t('orders.emptyDescription')}
            actionLabel={t('orders.emptyCta')}
            onAction={goHome}
          />
        </View>
      ) : (
        <ScrollView
          style={styles.list}
          contentContainerStyle={styles.listContent}
          refreshControl={
            <RefreshControl
              refreshing={isFetching}
              onRefresh={refetch}
              tintColor={theme.colors.primary[100]}
            />
          }
        >
          <View style={styles.grid}>
            {orders.map((item) => (
              <View key={item.id} style={[styles.cell, { flexBasis: cellBasis }]}>
                <OrderCard order={item} onPressPickupCode={onPressPickupCode} />
              </View>
            ))}
          </View>
        </ScrollView>
      )}

      <PickupCodeModal
        ref={sheetRef}
        orderId={pickupOrderId}
        onDismiss={() => setPickupOrderId(null)}
      />
    </SafeAreaView>
  );
};
