import React from 'react';
import { PickupTimeSelector } from '../../../../../shared/ui/mobile/pickup-time-selector';

export interface SurpriseBoxPickupSectionProps {
  title: string;
  selectedLabel: string;
  onPress: () => void;
}

export const SurpriseBoxPickupSection = ({
  title,
  selectedLabel,
  onPress,
}: SurpriseBoxPickupSectionProps) => (
  <PickupTimeSelector title={title} value={selectedLabel} onPress={onPress} />
);
