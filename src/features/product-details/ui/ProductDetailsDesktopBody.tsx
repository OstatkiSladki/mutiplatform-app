import React, { useMemo } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import type { Offer } from '../../../entities/offer';
import type { Product } from '../../../entities/product';
import { Icon } from '../../../shared/ui/icon';
import { DesktopQuantityStepper } from '../../../shared/ui/stepper';
import { formatPrice } from '../../../shared/lib/format';
import { theme } from '../../../shared/config/theme';
import { useAddToCart } from '../../add-to-cart';
import {
  formatNutritionValue,
  nutritionFromProduct,
} from '../lib/nutrition';
import { styles } from './product-details-desktop.styles';

export interface ProductDetailsDesktopBodyProps {
  venueId: number;
  venueName: string;
  offer: Offer;
  product?: Product;
}

const resolveWeight = (product?: Product): string | null => {
  if (!product) return null;
  const c = product.characteristics_json as Record<string, unknown> | undefined;
  const weight = c?.weight ?? c?.['вес'];
  if (typeof weight === 'string' && weight.trim()) return weight;
  if (typeof weight === 'number') return `${weight}г`;
  return null;
};

export const ProductDetailsDesktopBody = ({
  venueId,
  venueName,
  offer,
  product,
}: ProductDetailsDesktopBodyProps) => {
  const { t } = useTranslation('catalog');
  const displayName = product?.name ?? t('productDetails.fallbackName', { id: offer.id });
  const imageUrl = product?.image_urls?.[0];
  const price = parseFloat(offer.current_price) || 0;
  const weight = resolveWeight(product);
  const description =
    product?.description?.trim() || t('productDetails.ingredientsFallback');

  const { quantity, max, setQuantity } = useAddToCart({
    venueId,
    venueName,
    offer,
    displayName,
    imageUrl,
  });

  const nutrition = useMemo(() => nutritionFromProduct(product), [product]);
  const nutritionItems = useMemo(
    () => [
      { label: t('productDetails.nutrition.kcal'), value: formatNutritionValue(nutrition.kcal) },
      {
        label: t('productDetails.nutrition.protein'),
        value: formatNutritionValue(nutrition.protein),
      },
      { label: t('productDetails.nutrition.fat'), value: formatNutritionValue(nutrition.fat) },
      { label: t('productDetails.nutrition.carbs'), value: formatNutritionValue(nutrition.carbs) },
    ],
    [nutrition, t],
  );

  const handleAdd = () => {
    if (max === 0) return;
    setQuantity(quantity > 0 ? quantity : 1);
  };

  return (
    <View style={styles.body}>
      <View style={styles.imageColumn}>
        <View style={styles.imageWrap}>
          {imageUrl ? (
            <Image source={{ uri: imageUrl }} style={styles.image} resizeMode="contain" />
          ) : (
            <View style={styles.imagePlaceholder}>
              <Icon name="gift" size={72} color={theme.client.colors.mutedForeground} />
            </View>
          )}
        </View>
      </View>

      <View style={styles.contentColumn}>
        <View style={styles.titleRow}>
          <Text style={styles.name}>{displayName}</Text>
          {weight ? <Text style={styles.weight}>{weight}</Text> : null}
        </View>

        <View style={styles.actionRow}>
          <Text style={styles.price}>{formatPrice(price)}</Text>
          <DesktopQuantityStepper
            value={quantity}
            onChange={setQuantity}
            min={0}
            max={max}
          />
          <TouchableOpacity
            style={[styles.addButton, max === 0 && styles.addButtonDisabled]}
            onPress={handleAdd}
            disabled={max === 0}
            activeOpacity={0.85}
            accessibilityRole="button"
            accessibilityLabel={t('productDetails.addShort')}
          >
            <Text style={styles.addButtonText}>{t('productDetails.addShort')}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.textBlock}>
          <Text style={styles.description}>{description}</Text>
          <View style={styles.nutritionRow}>
            {nutritionItems.map((item) => (
              <View key={item.label} style={styles.nutritionCell}>
                <Text style={styles.nutritionLabel}>{item.label}</Text>
                <Text style={styles.nutritionValue}>{item.value}</Text>
              </View>
            ))}
          </View>
        </View>
      </View>
    </View>
  );
};
