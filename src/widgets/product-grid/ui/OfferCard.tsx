import { ReactNode } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import type { Offer } from '../../../entities/offer';
import type { Product } from '../../../entities/product';
import { Icon } from '../../../shared/ui/icon';
import { formatPrice } from '../../../shared/lib/format';
import { theme } from '../../../shared/config/theme';
import { useBreakpoint } from '../../../shared/lib/responsive';
import { styles } from './styles';

export interface OfferCardProps {
  offer: Offer;
  product?: Product;
  onPressDetails: (offer: Offer, product?: Product) => void;
  quantitySlot: ReactNode;
}

const resolveDisplayName = (offer: Offer, product?: Product): string => {
  if (product) return product.name;
  return `Сюрприз бокс №${offer.id}`;
};

const resolveWeight = (product?: Product): string | null => {
  if (!product) return null;
  const c = product.characteristics_json as Record<string, unknown> | undefined;
  const weight = c?.weight ?? c?.['вес'];
  return typeof weight === 'string' ? weight : null;
};

export const OfferCard = ({ offer, product, onPressDetails, quantitySlot }: OfferCardProps) => {
  const price = parseFloat(offer.current_price) || 0;
  const name = resolveDisplayName(offer, product);
  const weight = resolveWeight(product);
  const { isWeb, isAtLeast } = useBreakpoint();
  const compact = isWeb && isAtLeast('md');

  return (
    <View style={[styles.card, compact && styles.cardCompact]}>
      <TouchableOpacity
        style={[styles.image, compact && styles.imageCompact]}
        activeOpacity={0.9}
        onPress={() => onPressDetails(offer, product)}
        accessibilityRole="button"
        accessibilityLabel={name}
      >
        <Icon name="gift" size={48} color={theme.colors.primary[100]} />
      </TouchableOpacity>
      <View style={styles.body}>
        <Text style={styles.name} numberOfLines={2}>
          {name}
        </Text>
        {weight ? <Text style={styles.meta}>{weight}</Text> : null}
        <View style={styles.footer}>
          <Text style={styles.price}>{formatPrice(price)}</Text>
          {quantitySlot}
        </View>
      </View>
    </View>
  );
};
