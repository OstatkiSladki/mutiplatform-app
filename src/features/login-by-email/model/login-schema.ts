import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email({ message: 'Некорректный email адрес' }),
  password: z.string().min(6, { message: 'Пароль должен содержать минимум 6 символов' }),
});

export type LoginFormValues = z.infer<typeof loginSchema>;
