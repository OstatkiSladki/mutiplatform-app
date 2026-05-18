import React from 'react';
import type { Venue } from '../../../../../entities/venue';
import { ClientVenueSummaryCard } from '../../../../../widgets/mobile-venue-summary';

interface VenueInfoProps {
  venue: Venue;
  contentInset?: 'default' | 'flush';
}

/** Venue header — uses shared `ClientVenueSummaryCard` (same as Cart / Surprise Box). */
export const VenueInfo = ({ venue, contentInset = 'default' }: VenueInfoProps) => (
  <ClientVenueSummaryCard
    venue={venue}
    horizontalInset={contentInset === 'flush' ? 'flush' : 'page'}
    elevatedSurface={false}
  />
);
