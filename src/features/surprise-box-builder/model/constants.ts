export const SIZE_KEYS = ['S', 'M', 'L'] as const;
export type SizeKey = (typeof SIZE_KEYS)[number];

export const SIZE_MULTIPLIER: Record<SizeKey, number> = {
  S: 1,
  M: 1.5,
  L: 2,
};

export const FILLING_KEYS = ['sweet', 'savory', 'mixed'] as const;
export type FillingKey = (typeof FILLING_KEYS)[number];

export const RESTRICTION_KEYS = ['noFish', 'noMeat', 'noNuts'] as const;
export type RestrictionKey = (typeof RESTRICTION_KEYS)[number];

export const ADDITION_KEYS = ['drink', 'coffee', 'dessert'] as const;
export type AdditionKey = (typeof ADDITION_KEYS)[number];

export const TIME_SLOTS = ['19:00–20:00', '20:00–21:00', '21:00–22:00'] as const;
export type TimeSlot = (typeof TIME_SLOTS)[number];
