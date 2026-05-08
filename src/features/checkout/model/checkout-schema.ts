import { z } from 'zod';

export const PICKUP_SLOTS = ['19:00–20:00', '20:00–21:00', '21:00–22:00'] as const;
export type PickupSlot = (typeof PICKUP_SLOTS)[number];

export const SERVICE_FEE = 29;

export const checkoutSchema = z.object({
  slot: z.enum(PICKUP_SLOTS),
  promoCode: z.string().optional(),
});

export type CheckoutFormValues = z.infer<typeof checkoutSchema>;

export interface AppliedPromo {
  code: string;
  discountAmount: number;
  finalAmount: number;
}
