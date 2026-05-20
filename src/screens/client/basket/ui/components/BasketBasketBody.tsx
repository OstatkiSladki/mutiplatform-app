import React, { useCallback } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import type { DraftCartItem, DraftVenueCart } from '../../../../../entities/order';
import type { Venue } from '../../../../../entities/venue';
import { theme } from '../../../../../shared/config/theme';
import { useMobileBottomNavHeight } from '../../../../../widgets/mobile-bottom-nav';
import { BasketFooter, BOOKING_STICKY_SCROLL_PADDING } from './BasketFooter';
import { BasketItemCard } from './BasketItemCard';
import { BasketPickupSection } from './BasketPickupSection';
import { BasketVenueCard } from './BasketVenueCard';

export interface BasketBasketBodyProps {
  pagePadding: number;
  carts: DraftVenueCart[];
  primaryCart: DraftVenueCart;
  venue?: Venue;
  venueLoading: boolean;
  totalLabel: string;
  pickupSlotLabel: string;
  onOpenPickupSheet: () => void;
  onClearCart: () => void;
  pickupTitle: string;
  clearA11yLabel: string;
  checkoutTitle: string;
  onCheckout: () => void;
  checkoutDisabled: boolean;
  multiVenueHint: string;
  setQuantity: (venueId: number | string, productId: DraftCartItem['productId'], q: number) => void;
}

export const BasketBasketBody = ({
  pagePadding,
  carts,
  primaryCart,
  venue,
  venueLoading,
  totalLabel,
  pickupSlotLabel,
  onOpenPickupSheet,
  onClearCart,
  pickupTitle,
  clearA11yLabel,
  checkoutTitle,
  onCheckout,
  checkoutDisabled,
  multiVenueHint,
  setQuantity,
}: BasketBasketBodyProps) => {
  const bottomNavHeight = useMobileBottomNavHeight();
  const renderItem = useCallback(
    ({ item }: { item: DraftCartItem }) => (
      <BasketItemCard
        item={item}
        maxQuantity={item.maxQuantity ?? 99}
        weightLabel="130г"
        onQuantityChange={(next) => setQuantity(primaryCart.venueId, item.productId, next)}
      />
    ),
    [primaryCart.venueId, setQuantity],
  );

  const keyExtractor = useCallback((item: DraftCartItem) => String(item.productId), []);

  return (
    <View style={styles.screen}>
      <FlatList
        style={styles.flex}
        data={primaryCart.items}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        ItemSeparatorComponent={() => <View style={styles.sep} />}
        ListHeaderComponent={
          <View style={styles.headerBlock}>
            {carts.length > 1 ? <Text style={styles.hint}>{multiVenueHint}</Text> : null}
            <BasketVenueCard venue={venue} isLoading={venueLoading} />
          </View>
        }
        ListFooterComponent={
          <BasketPickupSection
            title={pickupTitle}
            value={pickupSlotLabel}
            onPress={onOpenPickupSheet}
            onClearCart={onClearCart}
            clearA11yLabel={clearA11yLabel}
          />
        }
        contentContainerStyle={[
          styles.listContent,
          {
            paddingHorizontal: pagePadding,
            paddingBottom: BOOKING_STICKY_SCROLL_PADDING + bottomNavHeight,
          },
        ]}
        showsVerticalScrollIndicator={false}
      />
      <BasketFooter
        horizontalPadding={theme.spacing[6]}
        totalLabel={totalLabel}
        ctaTitle={checkoutTitle}
        onCheckout={onCheckout}
        disabled={checkoutDisabled}
      />
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
    backgroundColor: theme.client.colors.card,
  },
  listContent: {
    paddingTop: theme.spacing[2],
  },
  headerBlock: {
    gap: theme.spacing[5],
    paddingBottom: theme.spacing[3],
  },
  sep: {
    height: theme.spacing[3],
  },
  hint: {
    fontFamily: theme.client.typography.fontFamily,
    fontSize: theme.typography.fontSizes[3],
    color: theme.client.colors.mutedForeground,
    textAlign: 'center',
  },
});
