import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import { z } from 'zod';
import { eq, and } from 'drizzle-orm';
import { createDb } from '../db/client';
import { socialAccounts } from '../db/schema';
import { requireAuth } from '../middleware/auth';
import type { Env, Variables } from '../types';

const PLATFORM_VALUES = ['instagram', 'twitter', 'linkedin', 'facebook', 'tiktok'] as const;

const connectAccountSchema = z.object({
  platform: z.enum(PLATFORM_VALUES),
  handle: z.string().min(1, 'Handle é obrigatório').max(100).trim(),
  accessToken: z.string().optional(),
  expiresAt: z.string().datetime().optional(),
});

export const accountsRoutes = new Hono<{ Bindings: Env; Variables: Variables }>();

accountsRoutes.use('*', requireAuth);

// GET /accounts
accountsRoutes.get('/', async (c) => {
  const userId = c.get('userId');
  const db = createDb(c.env.DB);

  const accounts = await db.query.socialAccounts.findMany({
    where: (a, { eq }) => eq(a.userId, userId),
  });

  // Never expose access tokens to the client
  return c.json(
    accounts.map(({ accessToken: _at, ...rest }) => rest)
  );
});

// POST /accounts
accountsRoutes.post('/', zValidator('json', connectAccountSchema), async (c) => {
  const body = c.req.valid('json');
  const userId = c.get('userId');
  const db = createDb(c.env.DB);

  // Check for duplicate handle + platform per user
  const existing = await db.query.socialAccounts.findFirst({
    where: (a, { eq, and }) =>
      and(eq(a.userId, userId), eq(a.platform, body.platform), eq(a.handle, body.handle)),
  });

  if (existing) {
    return c.json({ code: 'CONFLICT', message: 'Conta já conectada' }, 409);
  }

  const accountId = crypto.randomUUID();
  const now = new Date().toISOString();

  await db.insert(socialAccounts).values({
    id: accountId,
    userId,
    platform: body.platform,
    handle: body.handle,
    accessToken: body.accessToken ?? null,
    expiresAt: body.expiresAt ?? null,
    createdAt: now,
  });

  const account = await db.query.socialAccounts.findFirst({
    where: (a, { eq }) => eq(a.id, accountId),
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { accessToken: _at, ...safe } = account!;
  return c.json(safe, 201);
});

// DELETE /accounts/:id
accountsRoutes.delete('/:id', async (c) => {
  const accountId = c.req.param('id');
  const userId = c.get('userId');
  const db = createDb(c.env.DB);

  const existing = await db.query.socialAccounts.findFirst({
    where: (a, { eq, and }) => and(eq(a.id, accountId), eq(a.userId, userId)),
  });

  if (!existing) {
    return c.json({ code: 'NOT_FOUND', message: 'Conta não encontrada' }, 404);
  }

  await db
    .delete(socialAccounts)
    .where(and(eq(socialAccounts.id, accountId), eq(socialAccounts.userId, userId)));

  return c.body(null, 204);
});
