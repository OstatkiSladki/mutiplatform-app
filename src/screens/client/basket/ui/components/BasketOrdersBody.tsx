import React, { useCallback } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import type { Order } from '../../../../../entities/order';
import type { Venue } from '../../../../../entities/venue';
import { theme } from '../../../../../shared/config/theme';
import { EmptyState } from '../../../../../widgets/empty-state';
import { OrdersCard } from './OrdersCard';
import { OrdersPickupFooter } from './OrdersPickupFooter';

export interface BasketOrdersBodyProps {
  headerSlot: React.ReactNode;
  pagePadding: number;
  listBottomPad: number;
  orders: Order[];
  venuesById: Record<number, Venue>;
  ordersFetching: boolean;
  emptyTitle: string;
  emptyDescription: string;
  emptyCta: string;
  onGoHome: () => void;
  footerTotalLabel: string;
  slotLabel: string;
  onRotateSlot: () => void;
}

export const BasketOrdersBody = ({
  headerSlot,
  pagePadding,
  listBottomPad,
  orders,
  venuesById,
  ordersFetching,
  emptyTitle,
  emptyDescription,
  emptyCta,
  onGoHome,
  footerTotalLabel,
  slotLabel,
  onRotateSlot,
}: BasketOrdersBodyProps) => {
  const renderOrder = useCallback(
    ({ item }: { item: Order }) => (
      <OrdersCard order={item} venue={venuesById[item.venue_id]} />
    ),
    [venuesById],
  );

  const keyExtractor = useCallback((item: Order) => String(item.id), []);

  return (
    <View style={styles.screen}>
      <FlatList
        style={styles.flex}
        data={orders}
        keyExtractor={keyExtractor}
        renderItem={renderOrder}
        ItemSeparatorComponent={() => <View style={styles.sep} />}
        ListHeaderComponent={
          <View style={styles.headerShell}>
            {headerSlot}
          </View>
        }
        ListEmptyComponent={
          ordersFetching ? null : (
            <View style={styles.emptyOrders}>
              <EmptyState
                icon="package"
                title={emptyTitle}
                description={emptyDescription}
                actionLabel={emptyCta}
                onAction={onGoHome}
              />
            </View>
          )
        }
        contentContainerStyle={{
          paddingHorizontal: pagePadding,
          paddingBottom: listBottomPad,
          flexGrow: 1,
        }}
        showsVerticalScrollIndicator={false}
      />
      {orders.length > 0 ? (
        <OrdersPickupFooter
          totalLabel={footerTotalLabel}
          pickupLabel={slotLabel}
          onPressPickup={onRotateSlot}
        />
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: theme.client.colors.card,
  },
  flex: {
    flex: 1,
  },
  headerShell: {
    gap: theme.spacing[5],
    paddingTop: theme.spacing[4],
    paddingBottom: theme.spacing[2],
  },
  sep: {
    height: theme.spacing[3],
  },
  emptyOrders: {
    paddingVertical: theme.spacing[8],
  },
});
