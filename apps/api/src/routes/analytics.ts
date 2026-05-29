import { Hono } from 'hono';
import { createDb } from '../db/client';
import { requireAuth } from '../middleware/auth';
import type { Env, Variables } from '../types';

export const analyticsRoutes = new Hono<{ Bindings: Env; Variables: Variables }>();

analyticsRoutes.use('*', requireAuth);

// GET /analytics — aggregated analytics across all user posts
analyticsRoutes.get('/', async (c) => {
  const userId = c.get('userId');
  const db = createDb(c.env.DB);

  // Get all posts belonging to this user
  const userPosts = await db.query.posts.findMany({
    where: (p, { eq }) => eq(p.userId, userId),
    with: { postAnalytics: true },
  });

  const totals = {
    posts: userPosts.length,
    impressions: 0,
    reach: 0,
    likes: 0,
    comments: 0,
    shares: 0,
    saves: 0,
    clicks: 0,
  };

  for (const post of userPosts) {
    for (const analytics of post.postAnalytics) {
      totals.impressions += analytics.impressions;
      totals.reach += analytics.reach;
      totals.likes += analytics.likes;
      totals.comments += analytics.comments;
      totals.shares += analytics.shares;
      totals.saves += analytics.saves;
      totals.clicks += analytics.clicks;
    }
  }

  // Per-platform breakdown
  const byPlatform: Record<string, typeof totals> = {};
  for (const post of userPosts) {
    const platform = post.platform;
    if (!byPlatform[platform]) {
      byPlatform[platform] = { posts: 0, impressions: 0, reach: 0, likes: 0, comments: 0, shares: 0, saves: 0, clicks: 0 };
    }
    byPlatform[platform]!.posts += 1;
    for (const analytics of post.postAnalytics) {
      byPlatform[platform]!.impressions += analytics.impressions;
      byPlatform[platform]!.reach += analytics.reach;
      byPlatform[platform]!.likes += analytics.likes;
      byPlatform[platform]!.comments += analytics.comments;
      byPlatform[platform]!.shares += analytics.shares;
      byPlatform[platform]!.saves += analytics.saves;
      byPlatform[platform]!.clicks += analytics.clicks;
    }
  }

  return c.json({ totals, byPlatform });
});

// GET /analytics/posts/:id — analytics for a specific post
analyticsRoutes.get('/posts/:id', async (c) => {
  const postId = c.req.param('id');
  const userId = c.get('userId');
  const db = createDb(c.env.DB);

  // Verify post belongs to user
  const post = await db.query.posts.findFirst({
    where: (p, { eq, and }) => and(eq(p.id, postId), eq(p.userId, userId)),
  });

  if (!post) {
    return c.json({ code: 'NOT_FOUND', message: 'Post não encontrado' }, 404);
  }

  const analytics = await db.query.postAnalytics.findMany({
    where: (a, { eq }) => eq(a.postId, postId),
  });

  // Latest snapshot
  const latest = analytics[analytics.length - 1] ?? null;

  return c.json({
    postId,
    latest,
    history: analytics,
  });
});
