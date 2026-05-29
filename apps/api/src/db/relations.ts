import { relations } from 'drizzle-orm';
import { users, sessions, socialAccounts, posts, postAnalytics, subscriptions } from './schema';

export const usersRelations = relations(users, ({ many, one }) => ({
  sessions: many(sessions),
  socialAccounts: many(socialAccounts),
  posts: many(posts),
  subscription: one(subscriptions, {
    fields: [users.id],
    references: [subscriptions.userId],
  }),
}));

export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, {
    fields: [sessions.userId],
    references: [users.id],
  }),
}));

export const socialAccountsRelations = relations(socialAccounts, ({ one, many }) => ({
  user: one(users, {
    fields: [socialAccounts.userId],
    references: [users.id],
  }),
  posts: many(posts),
}));

export const postsRelations = relations(posts, ({ one, many }) => ({
  user: one(users, {
    fields: [posts.userId],
    references: [users.id],
  }),
  socialAccount: one(socialAccounts, {
    fields: [posts.accountId],
    references: [socialAccounts.id],
  }),
  postAnalytics: many(postAnalytics),
}));

export const postAnalyticsRelations = relations(postAnalytics, ({ one }) => ({
  post: one(posts, {
    fields: [postAnalytics.postId],
    references: [posts.id],
  }),
}));

export const subscriptionsRelations = relations(subscriptions, ({ one }) => ({
  user: one(users, {
    fields: [subscriptions.userId],
    references: [users.id],
  }),
}));
