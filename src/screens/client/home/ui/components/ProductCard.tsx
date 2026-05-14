import React from 'react';
import type { DimensionValue } from 'react-native';
import type { Offer } from '../../../../../entities/offer';
import { CategoryProductCard } from '../../../../../widgets/category-product-card';

export interface ProductCardProps {
  offer: Offer;
  venueName: string;
  width: DimensionValue;
  aspectRatio?: number;
  onPress: () => void;
}

export const ProductCard = ({
  offer,
  venueName,
  width,
  aspectRatio = 138 / 230,
  onPress,
}: ProductCardProps) => {
  return (
    <CategoryProductCard
      offer={offer}
      title={venueName}
      width={width}
      aspectRatio={aspectRatio}
      onPress={onPress}
    />
  );
};
