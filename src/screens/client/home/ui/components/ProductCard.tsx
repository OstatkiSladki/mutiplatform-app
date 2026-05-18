import React from 'react';
import type { DimensionValue } from 'react-native';
import type { Offer } from '../../../../../entities/offer';
import { CategoryProductCard } from '../../../../../widgets/category-product-card';

export interface ProductCardProps {
  offer: Offer;
  venueName: string;
  width: DimensionValue;
  weight?: string;
  onPress: () => void;
}

export const ProductCard = ({
  offer,
  venueName,
  width,
  weight = '130г',
  onPress,
}: ProductCardProps) => {
  return (
    <CategoryProductCard
      offer={offer}
      title={venueName}
      width={width}
      weight={weight}
      onPress={onPress}
    />
  );
};
