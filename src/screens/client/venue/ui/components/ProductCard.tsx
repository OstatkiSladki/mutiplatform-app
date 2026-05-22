import { Image, Text, TouchableOpacity, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import type { Offer } from '../../../../../entities/offer';
import type { Product } from '../../../../../entities/product';
import { useAddToCart } from '../../../../../features/add-to-cart';
import { Icon } from '../../../../../shared/ui/icon';
import { Stepper } from '../../../../../shared/ui/stepper';
import { formatPrice } from '../../../../../shared/lib/format';
import { theme } from '../../../../../shared/config/theme';
import { productCardStyles as styles } from './styles';

export interface ProductCardProps {
  venueId: number;
  venueName: string;
  offer: Offer;
  product?: Product;
  onPressDetails: (offer: Offer, product?: Product) => void;
}

const resolveWeight = (product?: Product): string | null => {
  if (!product) return null;
  const c = product.characteristics_json as Record<string, unknown> | undefined;
  const weight = c?.weight ?? c?.['вес'];
  if (typeof weight === 'string' && weight.trim()) return weight;
  if (typeof weight === 'number') return `${weight}г`;
  return null;
};

export const ProductCard = ({
  venueId,
  venueName,
  offer,
  product,
  onPressDetails,
}: ProductCardProps) => {
  const { t } = useTranslation('catalog');
  const price = parseFloat(offer.current_price) || 0;
  const name = product?.name ?? t('productDetails.fallbackName', { id: offer.id });
  const weight = resolveWeight(product);
  const imageUrl = product?.image_urls?.[0];
  const openDetails = () => onPressDetails(offer, product);

  const { quantity, max, setQuantity, increment } = useAddToCart({
    venueId,
    venueName,
    offer,
    displayName: name,
    imageUrl,
  });

  return (
    <View style={styles.card}>
      <View style={styles.titleBlock}>
        <Text style={styles.name} numberOfLines={2}>
          {name}
        </Text>
        <Text style={styles.weight} numberOfLines={1}>
          {weight ?? ''}
        </Text>
      </View>

      <TouchableOpacity
        style={styles.imageButton}
        activeOpacity={0.85}
        onPress={openDetails}
        accessibilityRole="button"
        accessibilityLabel={name}
      >
        {imageUrl ? (
          <Image source={{ uri: imageUrl }} style={styles.image} resizeMode="contain" />
        ) : (
          <View style={styles.imagePlaceholder}>
            <Icon name="gift" size={48} color={theme.client.colors.mutedForeground} />
          </View>
        )}
      </TouchableOpacity>

      <View style={styles.stepperSlot}>
        {quantity > 0 ? (
          <View style={styles.stepperWrap}>
            <Stepper
              value={quantity}
              onChange={setQuantity}
              min={0}
              max={max}
              size="sm"
              spread
            />
          </View>
        ) : null}
      </View>

      <View style={styles.priceRow}>
        <Text style={styles.price}>{formatPrice(price)}</Text>
        {quantity === 0 ? (
          <TouchableOpacity
            style={styles.arrowButton}
            activeOpacity={0.85}
            onPress={increment}
            accessibilityRole="button"
            accessibilityLabel={name}
          >
            <Icon
              name="arrow-up-right"
              size={20}
              color={theme.client.colors.primaryForeground}
            />
          </TouchableOpacity>
        ) : null}
      </View>
    </View>
  );
};
