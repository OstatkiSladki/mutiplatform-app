import React from 'react';
import type { Venue } from '../../../../../entities/venue';
import { ClientVenueSummaryCard } from '../../../../../widgets/mobile-venue-summary';

export interface BasketVenueCardProps {
  venue?: Venue;
  isLoading?: boolean;
  variant?: 'standalone' | 'embedded';
}

/** Cart / orders venue row — thin wrapper over shared `ClientVenueSummaryCard`. */
export const BasketVenueCard = ({
  venue,
  isLoading,
  variant = 'standalone',
}: BasketVenueCardProps) => (
  <ClientVenueSummaryCard
    venue={venue}
    isLoading={isLoading}
    horizontalInset="flush"
    elevatedSurface={variant === 'standalone'}
  />
);
