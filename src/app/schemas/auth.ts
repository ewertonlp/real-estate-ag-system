// schemas/auth.ts
import { z } from 'zod';

// Schema base para reutilização
const baseAuthSchema = z.object({
  email: z.string().email('E-mail inválido'),
});

// Schema de login (herda email e adiciona password)
export const loginSchema = baseAuthSchema.extend({
  password: z.string().min(6, 'Mínimo 6 caracteres'),
});

// Schema de registro (herda de login e adiciona campos)
export const registerSchema = baseAuthSchema.extend({
  name: z.string().min(3, 'Mínimo 3 caracteres'),
  password: z.string()
    .min(8, 'Mínimo 8 caracteres')
    .regex(/[A-Z]/, 'Pelo menos 1 letra maiúscula')
    .regex(/[0-9]/, 'Pelo menos 1 número'),
  confirmPassword: z.string(),
}).refine(data => data.password === data.confirmPassword, {
  message: 'Senhas não coincidem',
  path: ['confirmPassword'],
});

// Schema de senha para reuso em outras partes
export const passwordSchema = loginSchema.shape.password
  .min(8, 'Mínimo 8 caracteres')
  .regex(/[A-Z]/, 'Pelo menos 1 letra maiúscula')
  .regex(/[0-9]/, 'Pelo menos 1 número');