import { useCallback } from 'react';
import type { Offer } from '../../../entities/offer';
import { useCartStore, selectVenueCart } from '../../../entities/order';

export interface UseAddToCartArgs {
  venueId: number;
  venueName: string;
  offer: Offer;
  displayName?: string;
  imageUrl?: string;
}

export interface UseAddToCartResult {
  quantity: number;
  max: number;
  setQuantity: (quantity: number) => void;
  increment: () => void;
  decrement: () => void;
}

export const useAddToCart = ({
  venueId,
  venueName,
  offer,
  displayName,
  imageUrl,
}: UseAddToCartArgs): UseAddToCartResult => {
  const cart = useCartStore(selectVenueCart(venueId));
  const item = cart?.items.find((i) => i.productId === offer.id);
  const quantity = item?.quantity ?? 0;
  const max = offer.quantity_available;

  const addItem = useCartStore((s) => s.addItem);
  const setQty = useCartStore((s) => s.setQuantity);

  const setQuantity = useCallback(
    (next: number) => {
      const clamped = Math.max(0, Math.min(max, next));
      if (quantity === 0 && clamped > 0) {
        addItem(venueId, venueName, {
          productId: offer.id,
          offerId: offer.id,
          name: displayName ?? `Бокс №${offer.id}`,
          price: parseFloat(offer.current_price) || 0,
          imageUrl,
          maxQuantity: max,
          quantity: clamped,
        });
        return;
      }
      setQty(venueId, offer.id, clamped);
    },
    [addItem, setQty, venueId, venueName, offer.id, offer.current_price, displayName, imageUrl, max, quantity],
  );

  const increment = useCallback(() => setQuantity(quantity + 1), [setQuantity, quantity]);
  const decrement = useCallback(() => setQuantity(quantity - 1), [setQuantity, quantity]);

  return { quantity, max, setQuantity, increment, decrement };
};
