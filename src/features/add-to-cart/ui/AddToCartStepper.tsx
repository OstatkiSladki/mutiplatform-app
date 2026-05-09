import React from 'react';
import type { Offer } from '../../../entities/offer';
import { Stepper, type StepperSize } from '../../../shared/ui/stepper';
import { useAddToCart } from '../model/use-add-to-cart';

export interface AddToCartStepperProps {
  venueId: number;
  venueName: string;
  offer: Offer;
  displayName?: string;
  imageUrl?: string;
  size?: StepperSize;
  spread?: boolean;
}

export const AddToCartStepper = ({
  venueId,
  venueName,
  offer,
  displayName,
  imageUrl,
  size,
  spread,
}: AddToCartStepperProps) => {
  const { quantity, max, setQuantity } = useAddToCart({
    venueId,
    venueName,
    offer,
    displayName,
    imageUrl,
  });

  return (
    <Stepper
      value={quantity}
      onChange={setQuantity}
      min={0}
      max={max}
      size={size}
      spread={spread}
    />
  );
};
