import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import type { Order } from '../../../../../entities/order';
import type { Venue } from '../../../../../entities/venue';
import { Icon } from '../../../../../shared/ui/icon';
import { theme } from '../../../../../shared/config/theme';
import { formatPrice } from '../../../../../shared/lib/format';
import { BasketVenueCard } from './BasketVenueCard';

export interface OrdersCardProps {
  order: Order;
  venue?: Venue;
}

export const OrdersCard = ({ order, venue }: OrdersCardProps) => (
  <View style={styles.card}>
    <BasketVenueCard variant="embedded" venue={venue} />
    <View style={styles.items}>
      {order.items.map((line) => (
        <View key={line.id} style={styles.line}>
          <View style={styles.thumb}>
            <Icon name="package" size={22} color={theme.client.colors.mutedForeground} />
          </View>
          <View style={styles.lineBody}>
            <Text style={styles.lineTitle} numberOfLines={2}>
              {line.product_name_snapshot}
            </Text>
            <View style={styles.lineMeta}>
              <Text style={styles.linePrice}>{formatPrice(line.price_snapshot)}</Text>
              <Text style={styles.qty}>×{line.quantity}</Text>
            </View>
          </View>
        </View>
      ))}
    </View>
  </View>
);

const styles = StyleSheet.create({
  card: {
    borderRadius: theme.client.radius.md,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: theme.colors.neutral[7],
    backgroundColor: theme.client.colors.card,
    padding: theme.spacing[2],
    gap: theme.spacing[3],
  },
  items: {
    gap: theme.spacing[2],
  },
  line: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing[2],
  },
  thumb: {
    width: 61,
    height: 57,
    borderRadius: theme.client.radius.md,
    backgroundColor: theme.client.colors.secondaryMuted,
    alignItems: 'center',
    justifyContent: 'center',
  },
  lineBody: {
    flex: 1,
    minWidth: 0,
    gap: theme.spacing[1],
  },
  lineTitle: {
    fontFamily: theme.client.typography.fontFamily,
    fontSize: theme.typography.fontSizes[4],
    fontWeight: '700',
    color: theme.client.colors.foreground,
  },
  lineMeta: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: theme.spacing[2],
  },
  linePrice: {
    fontFamily: theme.client.typography.fontFamily,
    fontSize: theme.typography.fontSizes[4],
    fontWeight: '700',
    color: theme.client.colors.foreground,
  },
  qty: {
    fontFamily: theme.client.typography.fontFamily,
    fontSize: theme.typography.fontSizes[3],
    color: theme.client.colors.mutedForeground,
  },
});
