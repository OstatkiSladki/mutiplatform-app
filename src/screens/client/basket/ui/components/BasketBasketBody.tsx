import React, { useCallback } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import type { DraftCartItem, DraftVenueCart } from '../../../../../entities/order';
import type { Venue } from '../../../../../entities/venue';
import { theme } from '../../../../../shared/config/theme';
import { BasketFooter } from './BasketFooter';
import { BasketItemCard } from './BasketItemCard';
import { BasketPickupSection } from './BasketPickupSection';
import { BasketVenueCard } from './BasketVenueCard';

export interface BasketBasketBodyProps {
  headerSlot: React.ReactNode;
  pagePadding: number;
  carts: DraftVenueCart[];
  primaryCart: DraftVenueCart;
  venue?: Venue;
  venueLoading: boolean;
  totalLabel: string;
  slotLabel: string;
  onRotateSlot: () => void;
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
  headerSlot,
  pagePadding,
  carts,
  primaryCart,
  venue,
  venueLoading,
  totalLabel,
  slotLabel,
  onRotateSlot,
  onClearCart,
  pickupTitle,
  clearA11yLabel,
  checkoutTitle,
  onCheckout,
  checkoutDisabled,
  multiVenueHint,
  setQuantity,
}: BasketBasketBodyProps) => {
  const renderItem = useCallback(
    ({ item }: { item: DraftCartItem }) => (
      <BasketItemCard
        item={item}
        maxQuantity={item.maxQuantity ?? 99}
        weightLabel={undefined}
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
            {headerSlot}
            {carts.length > 1 ? <Text style={styles.hint}>{multiVenueHint}</Text> : null}
            <BasketVenueCard venue={venue} isLoading={venueLoading} />
          </View>
        }
        ListFooterComponent={
          <View style={styles.footerBlock}>
            <BasketPickupSection
              title={pickupTitle}
              value={slotLabel}
              onPress={onRotateSlot}
              onClearCart={onClearCart}
              clearA11yLabel={clearA11yLabel}
            />
            <View style={styles.divider} />
          </View>
        }
        contentContainerStyle={[
          styles.listContent,
          {
            paddingHorizontal: pagePadding,
          },
        ]}
        showsVerticalScrollIndicator={false}
      />
      <BasketFooter
        horizontalPadding={pagePadding}
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
    flexGrow: 1,
    paddingTop: theme.spacing[4],
    paddingBottom: theme.spacing[8],
  },
  headerBlock: {
    gap: theme.spacing[5],
    paddingBottom: theme.spacing[3],
  },
  footerBlock: {
    paddingTop: theme.spacing[4],
    gap: theme.spacing[3],
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
  divider: {
    height: StyleSheet.hairlineWidth,
    width: '100%',
    backgroundColor: theme.colors.neutral[8],
  },
});
