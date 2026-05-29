import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import { setCookie, deleteCookie } from 'hono/cookie';
import { z } from 'zod';
import { eq } from 'drizzle-orm';
import { createDb } from '../db/client';
import { users, sessions } from '../db/schema';
import { requireAuth } from '../middleware/auth';
import { emailSchema, passwordSchema } from '@meusocialmedia/utils';
import type { Env, Variables } from '../types';

const SESSION_TTL_MS = 30 * 24 * 60 * 60 * 1000; // 30 days

// ---------------------------------------------------------------------------
// PBKDF2 helpers (Web Crypto — available in CF Workers)
// ---------------------------------------------------------------------------

async function hashPassword(password: string): Promise<string> {
  const enc = new TextEncoder();
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const keyMaterial = await crypto.subtle.importKey('raw', enc.encode(password), 'PBKDF2', false, [
    'deriveBits',
  ]);
  const bits = await crypto.subtle.deriveBits(
    { name: 'PBKDF2', salt, iterations: 310_000, hash: 'SHA-256' },
    keyMaterial,
    256
  );
  const hashArray = new Uint8Array(bits);
  const saltHex = Array.from(salt)
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
  const hashHex = Array.from(hashArray)
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
  return `pbkdf2:310000:${saltHex}:${hashHex}`;
}

async function verifyPassword(password: string, stored: string): Promise<boolean> {
  const parts = stored.split(':');
  if (parts.length !== 4 || parts[0] !== 'pbkdf2') return false;
  const iterations = parseInt(parts[1]!, 10);
  const saltBytes = parts[2]!.match(/.{2}/g)!.map((h) => parseInt(h, 16));
  const salt = new Uint8Array(saltBytes);
  const enc = new TextEncoder();
  const keyMaterial = await crypto.subtle.importKey('raw', enc.encode(password), 'PBKDF2', false, [
    'deriveBits',
  ]);
  const bits = await crypto.subtle.deriveBits(
    { name: 'PBKDF2', salt, iterations, hash: 'SHA-256' },
    keyMaterial,
    256
  );
  const hashHex = Array.from(new Uint8Array(bits))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
  return hashHex === parts[3];
}

function generateSessionToken(): string {
  const bytes = crypto.getRandomValues(new Uint8Array(32));
  return Array.from(bytes)
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

// ---------------------------------------------------------------------------
// Schemas
// ---------------------------------------------------------------------------

const registerSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
  name: z.string().min(2, 'Nome deve ter ao menos 2 caracteres').max(100).trim(),
});

const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, 'Senha é obrigatória'),
});

// ---------------------------------------------------------------------------
// Router
// ---------------------------------------------------------------------------

export const authRoutes = new Hono<{ Bindings: Env; Variables: Variables }>();

// POST /auth/register
authRoutes.post('/register', zValidator('json', registerSchema), async (c) => {
  const { email, password, name } = c.req.valid('json');
  const db = createDb(c.env.DB);

  const existing = await db.query.users.findFirst({
    where: (u, { eq }) => eq(u.email, email),
  });
  if (existing) {
    return c.json({ code: 'CONFLICT', message: 'E-mail já cadastrado' }, 409);
  }

  const passwordHash = await hashPassword(password);
  const userId = crypto.randomUUID();
  const now = new Date().toISOString();

  await db.insert(users).values({
    id: userId,
    email,
    name,
    passwordHash,
    createdAt: now,
    updatedAt: now,
  });

  const token = generateSessionToken();
  const expiresAt = new Date(Date.now() + SESSION_TTL_MS).toISOString();

  await db.insert(sessions).values({
    id: crypto.randomUUID(),
    userId,
    token,
    expiresAt,
    createdAt: now,
  });

  setCookie(c, 'session', token, {
    httpOnly: true,
    secure: true,
    sameSite: 'Lax',
    path: '/',
    expires: new Date(expiresAt),
  });

  return c.json(
    {
      user: { id: userId, email, name, createdAt: now, updatedAt: now },
      token,
      expiresAt,
    },
    201
  );
});

// POST /auth/login
authRoutes.post('/login', zValidator('json', loginSchema), async (c) => {
  const { email, password } = c.req.valid('json');
  const db = createDb(c.env.DB);

  const user = await db.query.users.findFirst({
    where: (u, { eq }) => eq(u.email, email),
  });

  if (!user) {
    return c.json({ code: 'UNAUTHORIZED', message: 'Credenciais inválidas' }, 401);
  }

  const valid = await verifyPassword(password, user.passwordHash);
  if (!valid) {
    return c.json({ code: 'UNAUTHORIZED', message: 'Credenciais inválidas' }, 401);
  }

  const token = generateSessionToken();
  const now = new Date().toISOString();
  const expiresAt = new Date(Date.now() + SESSION_TTL_MS).toISOString();

  await db.insert(sessions).values({
    id: crypto.randomUUID(),
    userId: user.id,
    token,
    expiresAt,
    createdAt: now,
  });

  setCookie(c, 'session', token, {
    httpOnly: true,
    secure: true,
    sameSite: 'Lax',
    path: '/',
    expires: new Date(expiresAt),
  });

  return c.json({
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      avatarUrl: user.avatarUrl,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    },
    token,
    expiresAt,
  });
});

// POST /auth/logout
authRoutes.post('/logout', requireAuth, async (c) => {
  const authHeader = c.req.header('Authorization');
  const token = authHeader?.replace('Bearer ', '');

  if (token) {
    const db = createDb(c.env.DB);
    await db.delete(sessions).where(eq(sessions.token, token));
  }

  deleteCookie(c, 'session', { path: '/' });
  return c.json({ message: 'Logout realizado com sucesso' });
});

// GET /auth/me
authRoutes.get('/me', requireAuth, async (c) => {
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
