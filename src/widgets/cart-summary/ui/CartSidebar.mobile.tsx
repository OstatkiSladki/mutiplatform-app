import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import {
  selectVenueCart,
  selectVenueItemCount,
  selectVenueTotal,
  useCartStore,
  type DraftCartItem,
} from '../../../entities/order';
import { formatPrice } from '../../../shared/lib/format';
import { BookingCtaButton } from '../../../shared/ui/booking-cta-button';
import { EmptyCart } from './EmptyCart';
import { styles } from './styles';

export interface CartSidebarProps {
  venueId: number;
  onPressCheckout: () => void;
  onPressBackToVenues?: () => void;
}

const itemKey = (i: DraftCartItem) => String(i.productId);

export const CartSidebar = ({ venueId, onPressCheckout, onPressBackToVenues }: CartSidebarProps) => {
  const { t } = useTranslation('catalog');
  const cart = useCartStore(selectVenueCart(venueId));
  const total = useCartStore(selectVenueTotal(venueId));
  const count = useCartStore(selectVenueItemCount(venueId));
  const items = cart?.items ?? [];

  return (
    <View style={styles.sidebarCard}>
      <Text style={styles.sidebarHeader}>{t('cart.title')}</Text>
      {count === 0 ? (
        <EmptyCart />
      ) : (
        <>
          <View style={styles.sidebarItemsList}>
            {items.map((item) => (
              <View key={itemKey(item)} style={styles.itemRow}>
                {item.imageUrl ? (
                  <Image
                    source={{ uri: item.imageUrl }}
                    style={styles.itemImage}
                    resizeMode="cover"
                  />
                ) : (
                  <View style={styles.itemImage} />
                )}
                <View style={styles.itemMeta}>
                  <Text style={styles.itemName} numberOfLines={1}>
                    {item.name}
                  </Text>
                  <Text style={styles.itemSub}>
                    {item.quantity} × {formatPrice(item.price)}
                  </Text>
                </View>
                <Text style={styles.itemPrice}>{formatPrice(item.price * item.quantity)}</Text>
              </View>
            ))}
          </View>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>{t('cart.total')}</Text>
            <Text style={styles.totalValue}>{formatPrice(total)}</Text>
          </View>
          <BookingCtaButton
            title={t('bookCta')}
            onPress={onPressCheckout}
            accessibilityLabel={t('bookCta')}
            style={{ alignSelf: 'stretch' }}
          />
        </>
      )}
      {onPressBackToVenues ? (
        <TouchableOpacity
          style={styles.backToVenuesRow}
          onPress={onPressBackToVenues}
          accessibilityRole="link"
        >
          <Text style={styles.backToVenuesText}>{t('cart.backToVenues')}</Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
};
