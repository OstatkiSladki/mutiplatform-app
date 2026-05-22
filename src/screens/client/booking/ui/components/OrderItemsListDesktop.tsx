import React from 'react';
import { Text, View } from 'react-native';
import { Image } from 'expo-image';
import type { DraftCartItem } from '../../../../../entities/order';
import type { Product } from '../../../../../entities/product';
import { Icon } from '../../../../../shared/ui/icon';
import { DesktopQuantityStepper } from '../../../../../shared/ui/stepper';
import { formatPrice } from '../../../../../shared/lib/format';
import { theme } from '../../../../../shared/config/theme';
import { bookingDesktopStyles as styles } from './booking-desktop.styles';

const resolveWeight = (product?: Product): string | null => {
  if (!product) return null;
  const c = product.characteristics_json as Record<string, unknown> | undefined;
  const weight = c?.weight ?? c?.['вес'];
  if (typeof weight === 'string' && weight.trim()) return weight;
  if (typeof weight === 'number') return `${weight}г`;
  return null;
};

export interface OrderItemsListDesktopProps {
  items: DraftCartItem[];
  productByOfferId: Map<number, Product>;
  onChangeQuantity: (productId: DraftCartItem['productId'], quantity: number) => void;
}

export const OrderItemsListDesktop = ({
  items,
  productByOfferId,
  onChangeQuantity,
}: OrderItemsListDesktopProps) => (
  <View style={styles.itemsList}>
    {items.map((item) => {
      const product = productByOfferId.get(item.offerId);
      const weight = resolveWeight(product);

      return (
        <View key={String(item.productId)} style={styles.itemRow}>
          <View style={styles.itemImageWrap}>
            {item.imageUrl ? (
              <Image source={{ uri: item.imageUrl }} style={styles.itemImage} contentFit="cover" />
            ) : (
              <View style={styles.itemImagePlaceholder}>
                <Icon name="gift" size={24} color={theme.client.colors.mutedForeground} />
              </View>
            )}
          </View>
          <View style={styles.itemMeta}>
            <Text style={styles.itemName} numberOfLines={2}>
              {item.name}
            </Text>
            <Text style={styles.itemPrice}>{formatPrice(item.price)}</Text>
            {weight ? (
              <Text style={styles.itemWeight} numberOfLines={1}>
                {weight}
              </Text>
            ) : null}
          </View>
          <DesktopQuantityStepper
            value={item.quantity}
            onChange={(q) => onChangeQuantity(item.productId, q)}
            min={0}
            max={item.maxQuantity ?? 99}
          />
        </View>
      );
    })}
  </View>
);
