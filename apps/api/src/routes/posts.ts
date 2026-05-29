import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import { z } from 'zod';
import { eq, and, desc } from 'drizzle-orm';
import { createDb } from '../db/client';
import { posts } from '../db/schema';
import { requireAuth } from '../middleware/auth';
import { paginationSchema } from '@meusocialmedia/utils';
import type { Env, Variables } from '../types';

const PLATFORM_VALUES = ['instagram', 'twitter', 'linkedin', 'facebook', 'tiktok'] as const;
const STATUS_VALUES = ['draft', 'scheduled', 'published', 'failed'] as const;

const createPostSchema = z.object({
  accountId: z.string().uuid('ID de conta inválido'),
  content: z.string().min(1, 'Conteúdo é obrigatório').max(5000),
  mediaUrls: z.array(z.string().url()).optional().default([]),
  scheduledAt: z.string().datetime().optional(),
  platform: z.enum(PLATFORM_VALUES),
  status: z.enum(STATUS_VALUES).optional().default('draft'),
});

const updatePostSchema = createPostSchema.partial();

const listQuerySchema = paginationSchema.extend({
  status: z.enum(STATUS_VALUES).optional(),
});

export const postsRoutes = new Hono<{ Bindings: Env; Variables: Variables }>();

// All routes require authentication
postsRoutes.use('*', requireAuth);

// GET /posts
postsRoutes.get('/', zValidator('query', listQuerySchema), async (c) => {
  const { page, perPage, status } = c.req.valid('query');
  const userId = c.get('userId');
  const db = createDb(c.env.DB);

  const offset = (page - 1) * perPage;

  const conditions = [eq(posts.userId, userId)];
  if (status) {
    conditions.push(eq(posts.status, status));
  }

  const results = await db
    .select()
    .from(posts)
    .where(and(...conditions))
    .orderBy(desc(posts.createdAt))
    .limit(perPage)
    .offset(offset);

  const parsed = results.map((p) => ({
    ...p,
    mediaUrls: JSON.parse(p.mediaUrls) as string[],
  }));

  return c.json({
    data: parsed,
    pagination: { page, perPage, total: parsed.length },
  });
});

// POST /posts
postsRoutes.post('/', zValidator('json', createPostSchema), async (c) => {
  const body = c.req.valid('json');
  const userId = c.get('userId');
  const db = createDb(c.env.DB);

  const now = new Date().toISOString();
  const postId = crypto.randomUUID();

  await db.insert(posts).values({
    id: postId,
    userId,
    accountId: body.accountId,
    content: body.content,
    mediaUrls: JSON.stringify(body.mediaUrls),
    scheduledAt: body.scheduledAt ?? null,
    publishedAt: null,
    status: body.status,
    platform: body.platform,
    createdAt: now,
    updatedAt: now,
  });

  const post = await db.query.posts.findFirst({
    where: (p, { eq }) => eq(p.id, postId),
  });

  return c.json(
    {
      ...post,
      mediaUrls: JSON.parse(post!.mediaUrls) as string[],
    },
    201
  );
});

// GET /posts/:id
postsRoutes.get('/:id', async (c) => {
  const postId = c.req.param('id');
  const userId = c.get('userId');
  const db = createDb(c.env.DB);

  const post = await db.query.posts.findFirst({
    where: (p, { eq, and }) => and(eq(p.id, postId), eq(p.userId, userId)),
  });

  if (!post) {
    return c.json({ code: 'NOT_FOUND', message: 'Post não encontrado' }, 404);
  }

  return c.json({ ...post, mediaUrls: JSON.parse(post.mediaUrls) as string[] });
});

// PATCH /posts/:id
postsRoutes.patch('/:id', zValidator('json', updatePostSchema), async (c) => {
  const postId = c.req.param('id');
  const userId = c.get('userId');
  const body = c.req.valid('json');
  const db = createDb(c.env.DB);

  const existing = await db.query.posts.findFirst({
    where: (p, { eq, and }) => and(eq(p.id, postId), eq(p.userId, userId)),
  });

  if (!existing) {
    return c.json({ code: 'NOT_FOUND', message: 'Post não encontrado' }, 404);
  }

  const updateData: Partial<typeof posts.$inferInsert> = {
    updatedAt: new Date().toISOString(),
  };

  if (body.content !== undefined) updateData.content = body.content;
  if (body.mediaUrls !== undefined) updateData.mediaUrls = JSON.stringify(body.mediaUrls);
  if (body.scheduledAt !== undefined) updateData.scheduledAt = body.scheduledAt;
  if (body.status !== undefined) updateData.status = body.status;
  if (body.platform !== undefined) updateData.platform = body.platform;
  if (body.accountId !== undefined) updateData.accountId = body.accountId;

  await db.update(posts).set(updateData).where(eq(posts.id, postId));

  const updated = await db.query.posts.findFirst({
    where: (p, { eq }) => eq(p.id, postId),
  });

  return c.json({ ...updated, mediaUrls: JSON.parse(updated!.mediaUrls) as string[] });
});

// DELETE /posts/:id
postsRoutes.delete('/:id', async (c) => {
  const postId = c.req.param('id');
  const userId = c.get('userId');
  const db = createDb(c.env.DB);

  const existing = await db.query.posts.findFirst({
    where: (p, { eq, and }) => and(eq(p.id, postId), eq(p.userId, userId)),
  });

  if (!existing) {
    return c.json({ code: 'NOT_FOUND', message: 'Post não encontrado' }, 404);
  }

  await db.delete(posts).where(eq(posts.id, postId));
  return c.body(null, 204);
});
