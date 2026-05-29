import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';
import { prettyJSON } from 'hono/pretty-json';
import { authRoutes } from './routes/auth';
import { postsRoutes } from './routes/posts';
import { accountsRoutes } from './routes/accounts';
import { analyticsRoutes } from './routes/analytics';
import { usersRoutes } from './routes/users';
import type { Env } from './types';

const app = new Hono<{ Bindings: Env }>();

app.use('*', logger());
app.use('*', prettyJSON());
app.use(
  '*',
  cors({
    origin: ['https://www.meusocialmedia.com.br', 'https://app.meusocialmedia.com.br'],
    credentials: true,
    allowMethods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowHeaders: ['Content-Type', 'Authorization'],
  })
);

app.get('/health', (c) => c.json({ status: 'ok', version: '1.0.0' }));

app.route('/auth', authRoutes);
app.route('/users', usersRoutes);
app.route('/posts', postsRoutes);
app.route('/accounts', accountsRoutes);
app.route('/analytics', analyticsRoutes);

app.notFound((c) => c.json({ code: 'NOT_FOUND', message: 'Rota não encontrada' }, 404));
app.onError((err, c) => {
  console.error(err);
  return c.json({ code: 'INTERNAL_ERROR', message: 'Erro interno do servidor' }, 500);
});

export default app;
