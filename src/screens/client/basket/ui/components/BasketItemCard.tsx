import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Image } from 'expo-image';
import type { DraftCartItem } from '../../../../../entities/order';
import { Icon } from '../../../../../shared/ui/icon';
import { Stepper } from '../../../../../shared/ui/stepper';
import { theme } from '../../../../../shared/config/theme';
import { formatPrice } from '../../../../../shared/lib/format';

export interface BasketItemCardProps {
  item: DraftCartItem;
  maxQuantity: number;
  weightLabel?: string;
  onQuantityChange: (next: number) => void;
}

export const BasketItemCard = ({
  item,
  maxQuantity,
  weightLabel,
  onQuantityChange,
}: BasketItemCardProps) => {
  const displayWeight = weightLabel ?? '130г';

  return (
    <View style={styles.card}>
      <View style={styles.thumb}>
        {item.imageUrl ? (
          <Image source={{ uri: item.imageUrl }} style={styles.thumbImg} contentFit="cover" />
        ) : (
          <View style={styles.thumbFallback}>
            <Icon name="gift" size={28} color={theme.client.colors.mutedForeground} />
          </View>
        )}
      </View>
      <View style={styles.body}>
        <Text style={styles.title} numberOfLines={2}>
          {item.name}
        </Text>
        <View style={styles.priceRow}>
          <Text style={styles.price}>{formatPrice(item.price)}</Text>
          {displayWeight ? <Text style={styles.weight}>{displayWeight}</Text> : null}
        </View>
      </View>
      <Stepper
        value={item.quantity}
        min={0}
        max={maxQuantity}
        size="lg"
        onChange={onQuantityChange}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing[2],
    padding: theme.spacing[2],
    borderRadius: theme.client.radius.card,
    backgroundColor: theme.client.colors.card,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: theme.colors.neutral[8],
  },
  thumb: {
    width: 61,
    height: 57,
    borderRadius: theme.client.radius.md,
    overflow: 'hidden',
    backgroundColor: theme.client.colors.secondaryMuted,
  },
  thumbImg: {
    width: '100%',
    height: '100%',
  },
  thumbFallback: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  body: {
    flex: 1,
    minWidth: 0,
    gap: theme.spacing[1],
    justifyContent: 'center',
  },
  title: {
    fontFamily: theme.client.typography.fontFamily,
    fontSize: theme.typography.fontSizes[4],
    lineHeight: theme.typography.fontSizes[4] * theme.typography.lineHeights.normal,
    fontWeight: '700',
    color: theme.client.colors.foreground,
  },
  priceRow: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
    alignItems: 'baseline',
    gap: theme.spacing[1],
  },
  price: {
    fontFamily: theme.client.typography.fontFamily,
    fontSize: theme.typography.fontSizes[6],
    lineHeight: theme.typography.fontSizes[6] * theme.typography.lineHeights.tight,
    fontWeight: '700',
    color: theme.client.colors.foreground,
    flexShrink: 0,
  },
  weight: {
    fontFamily: theme.client.typography.fontFamily,
    fontSize: theme.typography.fontSizes[3],
    lineHeight: theme.typography.fontSizes[3] * theme.typography.lineHeights.normal,
    fontWeight: '400',
    color: theme.client.colors.mutedForeground,
    flexShrink: 1,
  },
});
