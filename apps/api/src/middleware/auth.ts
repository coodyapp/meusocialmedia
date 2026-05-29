import { createMiddleware } from 'hono/factory';
import { getCookie } from 'hono/cookie';
import { createDb } from '../db/client';
import type { Env, Variables } from '../types';

export const requireAuth = createMiddleware<{ Bindings: Env; Variables: Variables }>(
  async (c, next) => {
    const authHeader = c.req.header('Authorization');
    const token = authHeader?.replace('Bearer ', '') ?? getCookie(c, 'session');

    if (!token) {
      return c.json({ code: 'UNAUTHORIZED', message: 'Não autorizado' }, 401);
    }

    const db = createDb(c.env.DB);
    const session = await db.query.sessions.findFirst({
      where: (s, { eq, and, gt }) =>
        and(eq(s.token, token), gt(s.expiresAt, new Date().toISOString())),
    });

    if (!session) {
      return c.json({ code: 'UNAUTHORIZED', message: 'Sessão inválida ou expirada' }, 401);
    }

    c.set('userId', session.userId);
    await next();
  }
);
