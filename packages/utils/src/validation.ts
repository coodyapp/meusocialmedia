import { z } from 'zod';

export const emailSchema = z.string().email('E-mail inválido').toLowerCase().trim();

export const passwordSchema = z
  .string()
  .min(8, 'Senha deve ter no mínimo 8 caracteres')
  .regex(/[A-Z]/, 'Senha deve ter ao menos uma letra maiúscula')
  .regex(/[0-9]/, 'Senha deve ter ao menos um número');

export const phoneSchema = z
  .string()
  .regex(/^\+?[1-9]\d{1,14}$/, 'Telefone inválido')
  .trim();

export const urlSchema = z.string().url('URL inválida').trim();

export const paginationSchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  perPage: z.coerce.number().int().positive().max(100).default(20),
});

export type PaginationInput = z.infer<typeof paginationSchema>;
