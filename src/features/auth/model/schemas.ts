import { z } from 'zod';
import { ruErrors } from '../../../shared/i18n';

const NAME_RE = /^[A-Za-zА-Яа-яЁё -]+$/;
const PASSWORD_COMPLEXITY_RE =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).+$/;
const isRuPhone = (value: string): boolean =>
  /^7\d{10}$/.test(value.replace(/\D/g, ''));

const passwordField = z
  .string()
  .min(8, ruErrors.validation.passwordMin)
  .regex(PASSWORD_COMPLEXITY_RE, ruErrors.validation.passwordComplexity);

export const loginSchema = z.object({
  email: z.string().email(ruErrors.validation.email),
  password: z.string().min(8, ruErrors.validation.passwordMin),
  rememberMe: z.boolean().optional(),
});
export type LoginFormValues = z.infer<typeof loginSchema>;

export const registerSchema = z.object({
  first_name: z
    .string()
    .min(1, ruErrors.validation.required)
    .regex(NAME_RE, ruErrors.validation.nameInvalid),
  last_name: z
    .string()
    .regex(NAME_RE, ruErrors.validation.nameInvalid)
    .optional()
    .or(z.literal('')),
  email: z.string().email(ruErrors.validation.email),
  phone: z
    .string()
    .min(1, ruErrors.validation.required)
    .refine(isRuPhone, ruErrors.validation.phoneInvalid),
  password: passwordField,
  privacy_policy_accepted: z.literal(true, {
    message: ruErrors.validation.privacyPolicy,
  }),
});
export type RegisterFormValues = z.infer<typeof registerSchema>;
