import React from 'react';
import { Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import type { DraftCartItem } from '../../../../../entities/order';
import type { Product } from '../../../../../entities/product';
import type { PickupSlot } from '../../../../../features/checkout';
import { PickupConditionsDesktop } from './PickupConditionsDesktop';
import { OrderItemsListDesktop } from './OrderItemsListDesktop';
import { bookingDesktopStyles as styles } from './booking-desktop.styles';

export interface BookingOrderCardProps {
  venueName: string;
  slot: PickupSlot;
  onChangeSlot: (slot: PickupSlot) => void;
  address: string;
  items: DraftCartItem[];
  productByOfferId: Map<number, Product>;
  onChangeQuantity: (productId: DraftCartItem['productId'], quantity: number) => void;
}

export const BookingOrderCard = ({
  venueName,
  slot,
  onChangeSlot,
  address,
  items,
  productByOfferId,
  onChangeQuantity,
}: BookingOrderCardProps) => {
  const { t } = useTranslation('checkout');

  return (
    <View style={styles.orderCard}>
      <Text style={styles.venueName}>{venueName}</Text>
      <PickupConditionsDesktop slot={slot} onChangeSlot={onChangeSlot} address={address} />
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{t('yourOrder')}</Text>
        <OrderItemsListDesktop
          items={items}
          productByOfferId={productByOfferId}
          onChangeQuantity={onChangeQuantity}
        />
      </View>
    </View>
  );
};
