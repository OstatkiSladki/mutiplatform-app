import { useMemo, useState } from 'react';
import {
  ADDITION_KEYS,
  AdditionKey,
  FILLING_KEYS,
  FillingKey,
  RESTRICTION_KEYS,
  RestrictionKey,
  SIZE_KEYS,
  SIZE_MULTIPLIER,
  SizeKey,
  TIME_SLOTS,
  TimeSlot,
} from './constants';

export interface SurpriseBoxConfig {
  size: SizeKey;
  filling: FillingKey;
  restriction: RestrictionKey;
  addition: AdditionKey;
  time: TimeSlot;
}

export interface UseSurpriseBoxBuilderResult {
  config: SurpriseBoxConfig;
  setSize: (size: SizeKey) => void;
  setFilling: (filling: FillingKey) => void;
  setRestriction: (restriction: RestrictionKey) => void;
  setAddition: (addition: AdditionKey) => void;
  setTime: (time: TimeSlot) => void;
  finalPrice: number;
}

export const useSurpriseBoxBuilder = (
  basePrice: number,
): UseSurpriseBoxBuilderResult => {
  const [size, setSize] = useState<SizeKey>(SIZE_KEYS[0]);
  const [filling, setFilling] = useState<FillingKey>(FILLING_KEYS[1]);
  const [restriction, setRestriction] = useState<RestrictionKey>(
    RESTRICTION_KEYS[0],
  );
  const [addition, setAddition] = useState<AdditionKey>(ADDITION_KEYS[2]);
  const [time, setTime] = useState<TimeSlot>(TIME_SLOTS[0]);

  const finalPrice = useMemo(
    () => Math.round(basePrice * SIZE_MULTIPLIER[size]),
    [basePrice, size],
  );

  return {
    config: { size, filling, restriction, addition, time },
    setSize,
    setFilling,
    setRestriction,
    setAddition,
    setTime,
    finalPrice,
  };
};
