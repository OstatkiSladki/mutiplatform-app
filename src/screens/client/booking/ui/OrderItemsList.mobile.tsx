import React from 'react';
import { Text, View } from 'react-native';
import type { DraftCartItem } from '../../../../entities/order';
import { Stepper } from '../../../../shared/ui/stepper';
import { Divider } from '../../../../shared/ui/divider';
import { formatPrice } from '../../../../shared/lib/format';
import { styles } from './styles';

export interface OrderItemsListProps {
  items: DraftCartItem[];
  onChangeQuantity: (productId: DraftCartItem['productId'], quantity: number) => void;
}

export const OrderItemsList = ({ items, onChangeQuantity }: OrderItemsListProps) => (
  <View>
    {items.map((item, idx) => (
      <View key={String(item.productId)}>
        {idx > 0 ? <Divider /> : null}
        <View style={styles.itemRow}>
          <View style={styles.itemBody}>
            <Text style={styles.itemName} numberOfLines={2}>
              {item.name}
            </Text>
            <Text style={styles.itemPrice}>{formatPrice(item.price * item.quantity)}</Text>
          </View>
          <Stepper
            value={item.quantity}
            onChange={(q) => onChangeQuantity(item.productId, q)}
            min={0}
            max={item.maxQuantity ?? 99}
          />
        </View>
      </View>
    ))}
  </View>
);
