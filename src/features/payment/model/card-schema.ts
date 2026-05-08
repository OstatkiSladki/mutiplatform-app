import { z } from 'zod';
import { luhn, notExpired } from '../../../shared/lib/payment';

const panRegex = /^\d{16}$/;
const expiryRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;
const cvcRegex = /^\d{3,4}$/;

export const cardSchema = z.object({
  pan: z
    .string()
    .transform((v) => v.replace(/\s/g, ''))
    .pipe(z.string().regex(panRegex, 'panInvalid').refine(luhn, 'panLuhn')),
  expiry: z
    .string()
    .regex(expiryRegex, 'expiryInvalid')
    .refine(notExpired, 'expiryPast'),
  cvc: z.string().regex(cvcRegex, 'cvcInvalid'),
  cardholder: z.string().min(2, 'cardholderShort').max(64),
});

export type CardFormValues = z.infer<typeof cardSchema>;
