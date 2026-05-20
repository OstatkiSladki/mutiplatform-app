import React from 'react';
import { Pressable, Text, TouchableOpacity, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import type { Order, OrderStatus } from '../../../../entities/order';
import { Badge } from '../../../../shared/ui/badge';
import { Icon } from '../../../../shared/ui/icon';
import { theme } from '../../../../shared/config/theme';
import { formatPrice, formatDateTime } from '../../../../shared/lib/format';
import { styles } from '../styles';

const statusVariant: Record<
  OrderStatus,
  'primary' | 'success' | 'warning' | 'error' | 'neutral'
> = {
  created: 'warning',
  paid: 'primary',
  picked_up: 'success',
  cancelled: 'error',
};

export interface OrderCardProps {
  order: Order;
  onPressPickupCode?: (order: Order) => void;
}

export const OrderCard = ({ order, onPressPickupCode }: OrderCardProps) => {
  const { t } = useTranslation('catalog');

  const itemsCount = order.items.length;
  const itemsPreview = order.items
    .slice(0, 2)
    .map((i) => i.product_name_snapshot)
    .join(', ');
  const more = itemsCount > 2 ? ` +${itemsCount - 2}` : '';

  const canReveal = order.status === 'paid' && !!onPressPickupCode;
  const handlePress = () => onPressPickupCode?.(order);

  const cardBody = (
    <>
      <View style={styles.cardHeader}>
        <View style={styles.headerText}>
          <Text style={styles.orderTitle}>
            {t('orders.orderTitle', { id: order.id })}
          </Text>
          <Text style={styles.meta}>
            {t('orders.venueLabel', { id: order.venue_id })}
          </Text>
          <Text style={styles.meta}>{formatDateTime(order.created_at)}</Text>
        </View>
        <Badge
          label={t(`orders.status.${order.status}`)}
          variant={statusVariant[order.status]}
        />
      </View>

      {itemsCount > 0 ? (
        <Text style={styles.itemsLine} numberOfLines={2}>
          {itemsPreview}
          {more}
        </Text>
      ) : null}

      <View style={styles.footerRow}>
        <Text style={styles.total}>{formatPrice(order.total_amount)}</Text>
        {canReveal ? (
          <TouchableOpacity
            style={styles.pickupBtn}
            activeOpacity={0.85}
            onPress={handlePress}
            accessibilityRole="button"
            accessibilityLabel={t('orders.pickupCodeCta')}
          >
            <Icon
              name="key"
              size={14}
              color={theme.colors.primary[100]}
            />
            <Text style={styles.pickupBtnText}>
              {t('orders.pickupCodeCta')}
            </Text>
          </TouchableOpacity>
        ) : null}
      </View>
    </>
  );

  if (canReveal) {
    return (
      <Pressable
        onPress={handlePress}
        accessibilityRole="button"
        accessibilityLabel={t('orders.orderTitle', { id: order.id })}
        accessibilityHint={t('orders.pickupCodeHint')}
        style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
      >
        {cardBody}
      </Pressable>
    );
  }

  return <View style={styles.card}>{cardBody}</View>;
};
