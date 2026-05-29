import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import { z } from 'zod';
import { eq } from 'drizzle-orm';
import { createDb } from '../db/client';
import { users, sessions } from '../db/schema';
import { requireAuth } from '../middleware/auth';
import type { Env, Variables } from '../types';

const updateProfileSchema = z.object({
  name: z.string().min(2, 'Nome deve ter ao menos 2 caracteres').max(100).trim().optional(),
  avatarUrl: z.string().url('URL de avatar inválida').optional().nullable(),
});

export const usersRoutes = new Hono<{ Bindings: Env; Variables: Variables }>();

usersRoutes.use('*', requireAuth);

// GET /users/me
usersRoutes.get('/me', async (c) => {
  const userId = c.get('userId');
  const db = createDb(c.env.DB);

  const user = await db.query.users.findFirst({
    where: (u, { eq }) => eq(u.id, userId),
  });

  if (!user) {
    return c.json({ code: 'NOT_FOUND', message: 'Usuário não encontrado' }, 404);
  }

  return c.json({
    id: user.id,
    email: user.email,
    name: user.name,
    avatarUrl: user.avatarUrl,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  });
});

// PATCH /users/me
usersRoutes.patch('/me', zValidator('json', updateProfileSchema), async (c) => {
  const userId = c.get('userId');
  const body = c.req.valid('json');
  const db = createDb(c.env.DB);

  const updateData: Partial<typeof users.$inferInsert> = {
    updatedAt: new Date().toISOString(),
  };

  if (body.name !== undefined) updateData.name = body.name;
  if (body.avatarUrl !== undefined) updateData.avatarUrl = body.avatarUrl ?? undefined;

  await db.update(users).set(updateData).where(eq(users.id, userId));

  const updated = await db.query.users.findFirst({
    where: (u, { eq }) => eq(u.id, userId),
  });

  return c.json({
    id: updated!.id,
    email: updated!.email,
    name: updated!.name,
    avatarUrl: updated!.avatarUrl,
    createdAt: updated!.createdAt,
    updatedAt: updated!.updatedAt,
  });
});

// DELETE /users/me — delete account and all associated data (cascade on DB)
usersRoutes.delete('/me', async (c) => {
  const userId = c.get('userId');
  const db = createDb(c.env.DB);

  // Invalidate all sessions first so the middleware doesn't hold a ref
  await db.delete(sessions).where(eq(sessions.userId, userId));
  await db.delete(users).where(eq(users.id, userId));

  return c.body(null, 204);
});
