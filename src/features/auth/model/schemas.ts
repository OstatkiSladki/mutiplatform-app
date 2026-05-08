import { z } from 'zod';
import { ruErrors } from '../../../shared/i18n';

export const loginSchema = z.object({
  email: z.string().email(ruErrors.validation.email),
  password: z.string().min(8, ruErrors.validation.passwordMin),
});
export type LoginFormValues = z.infer<typeof loginSchema>;

export const registerSchema = z.object({
  first_name: z.string().min(1, ruErrors.validation.required),
  last_name: z.string().optional(),
  email: z.string().email(ruErrors.validation.email),
  phone: z.string().optional(),
  password: z.string().min(8, ruErrors.validation.passwordMin),
  privacy_policy_accepted: z.literal(true, {
    message: ruErrors.validation.privacyPolicy,
  }),
});
export type RegisterFormValues = z.infer<typeof registerSchema>;
