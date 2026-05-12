import React from 'react';
import { CartDock } from './CartDock';
import { CartSidebar } from './CartSidebar';

export type CartSummaryMode = 'sidebar' | 'dock';

export interface CartSummaryProps {
  venueId: number;
  onPressCheckout: () => void;
  mode?: CartSummaryMode;
  onPressBackToVenues?: () => void;
}

export const CartSummary = ({
  venueId,
  onPressCheckout,
  mode = 'dock',
  onPressBackToVenues,
}: CartSummaryProps) => {
  if (mode === 'sidebar') {
    return (
      <CartSidebar
        venueId={venueId}
        onPressCheckout={onPressCheckout}
        onPressBackToVenues={onPressBackToVenues}
      />
    );
  }
  return <CartDock venueId={venueId} onPressCheckout={onPressCheckout} />;
};
