import React, { useCallback } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import type { Order } from '../../../../../entities/order';
import type { Venue } from '../../../../../entities/venue';
import { theme } from '../../../../../shared/config/theme';
import { EmptyState } from '../../../../../widgets/empty-state';
import { OrdersCard } from './OrdersCard';
import { OrdersPickupFooter } from './OrdersPickupFooter';

export interface BasketOrdersBodyProps {
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
  pickupSlotLabel: string;
  onOpenPickupSheet: () => void;
}

export const BasketOrdersBody = ({
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
  pickupSlotLabel,
  onOpenPickupSheet,
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
          paddingTop: theme.spacing[2],
          paddingBottom: listBottomPad,
          flexGrow: 1,
        }}
        showsVerticalScrollIndicator={false}
      />
      {orders.length > 0 ? (
        <OrdersPickupFooter
          totalLabel={footerTotalLabel}
          pickupLabel={pickupSlotLabel}
          onPressPickup={onOpenPickupSheet}
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
  sep: {
    height: theme.spacing[3],
  },
  emptyOrders: {
    paddingVertical: theme.spacing[8],
  },
});
