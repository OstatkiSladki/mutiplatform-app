import { ReactNode } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import type { Offer } from '../../../entities/offer';
import type { Product } from '../../../entities/product';
import { Icon } from '../../../shared/ui/icon';
import { formatPrice } from '../../../shared/lib/format';
import { theme } from '../../../shared/config/theme';
import { styles } from './styles';

export interface OfferCardProps {
  offer: Offer;
  product?: Product;
  onPressDetails: (offer: Offer, product?: Product) => void;
  quantitySlot: ReactNode;
}

const resolveWeight = (product?: Product): string | null => {
  if (!product) return null;
  const c = product.characteristics_json as Record<string, unknown> | undefined;
  const weight = c?.weight ?? c?.['вес'];
  return typeof weight === 'string' ? weight : null;
};

export const OfferCard = ({ offer, product, onPressDetails, quantitySlot }: OfferCardProps) => {
  const { t } = useTranslation('catalog');
  const price = parseFloat(offer.current_price) || 0;
  const name = product?.name ?? t('productDetails.fallbackName', { id: offer.id });
  const weight = resolveWeight(product);
  const imageUrl = product?.image_urls?.[0];
  const openDetails = () => onPressDetails(offer, product);

  return (
    <View style={styles.card}>
      <Text style={styles.name} numberOfLines={2}>
        {name}
      </Text>
      {weight ? <Text style={styles.weight}>{weight}</Text> : null}

      <TouchableOpacity
        style={styles.imageButton}
        activeOpacity={0.85}
        onPress={openDetails}
        accessibilityRole="button"
        accessibilityLabel={name}
      >
        {imageUrl ? (
          <Image source={{ uri: imageUrl }} style={styles.image} resizeMode="cover" />
        ) : (
          <View style={styles.imagePlaceholder}>
            <Icon name="gift" size={48} color={theme.client.colors.mutedForeground} />
          </View>
        )}
      </TouchableOpacity>

      <View style={styles.stepperRow}>{quantitySlot}</View>

      <View style={styles.priceRow}>
        <Text style={styles.price}>{formatPrice(price)}</Text>
        <TouchableOpacity
          style={styles.arrowButton}
          activeOpacity={0.85}
          onPress={openDetails}
          accessibilityRole="button"
          accessibilityLabel={name}
        >
          <Icon name="arrow-up-right" size={16} color={theme.client.colors.primaryForeground} />
        </TouchableOpacity>
      </View>
    </View>
  );
};
