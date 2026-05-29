-- Migration: 0001_initial
-- Creates all tables for meusocialmedia

CREATE TABLE IF NOT EXISTS `users` (
  `id`            TEXT PRIMARY KEY NOT NULL,
  `email`         TEXT NOT NULL UNIQUE,
  `name`          TEXT NOT NULL,
  `password_hash` TEXT NOT NULL,
  `avatar_url`    TEXT,
  `created_at`    TEXT NOT NULL DEFAULT (datetime('now')),
  `updated_at`    TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS `sessions` (
  `id`         TEXT PRIMARY KEY NOT NULL,
  `user_id`    TEXT NOT NULL REFERENCES `users`(`id`) ON DELETE CASCADE,
  `token`      TEXT NOT NULL UNIQUE,
  `expires_at` TEXT NOT NULL,
  `created_at` TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS `sessions_token_idx` ON `sessions` (`token`);
CREATE INDEX IF NOT EXISTS `sessions_user_id_idx` ON `sessions` (`user_id`);

CREATE TABLE IF NOT EXISTS `social_accounts` (
  `id`           TEXT PRIMARY KEY NOT NULL,
  `user_id`      TEXT NOT NULL REFERENCES `users`(`id`) ON DELETE CASCADE,
  `platform`     TEXT NOT NULL,
  `handle`       TEXT NOT NULL,
  `access_token` TEXT,
  `expires_at`   TEXT,
  `created_at`   TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS `social_accounts_user_id_idx` ON `social_accounts` (`user_id`);

CREATE TABLE IF NOT EXISTS `posts` (
  `id`           TEXT PRIMARY KEY NOT NULL,
  `user_id`      TEXT NOT NULL REFERENCES `users`(`id`) ON DELETE CASCADE,
  `account_id`   TEXT NOT NULL REFERENCES `social_accounts`(`id`),
  `content`      TEXT NOT NULL,
  `media_urls`   TEXT NOT NULL DEFAULT '[]',
  `scheduled_at` TEXT,
  `published_at` TEXT,
  `status`       TEXT NOT NULL DEFAULT 'draft',
  `platform`     TEXT NOT NULL,
  `created_at`   TEXT NOT NULL DEFAULT (datetime('now')),
  `updated_at`   TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS `posts_user_id_idx` ON `posts` (`user_id`);
CREATE INDEX IF NOT EXISTS `posts_status_idx` ON `posts` (`status`);
CREATE INDEX IF NOT EXISTS `posts_scheduled_at_idx` ON `posts` (`scheduled_at`);

CREATE TABLE IF NOT EXISTS `post_analytics` (
  `id`          TEXT PRIMARY KEY NOT NULL,
  `post_id`     TEXT NOT NULL REFERENCES `posts`(`id`) ON DELETE CASCADE,
  `impressions` INTEGER NOT NULL DEFAULT 0,
  `reach`       INTEGER NOT NULL DEFAULT 0,
  `likes`       INTEGER NOT NULL DEFAULT 0,
  `comments`    INTEGER NOT NULL DEFAULT 0,
  `shares`      INTEGER NOT NULL DEFAULT 0,
  `saves`       INTEGER NOT NULL DEFAULT 0,
  `clicks`      INTEGER NOT NULL DEFAULT 0,
  `recorded_at` TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS `post_analytics_post_id_idx` ON `post_analytics` (`post_id`);

CREATE TABLE IF NOT EXISTS `subscriptions` (
  `id`                    TEXT PRIMARY KEY NOT NULL,
  `user_id`               TEXT NOT NULL UNIQUE REFERENCES `users`(`id`) ON DELETE CASCADE,
  `plan_id`               TEXT NOT NULL DEFAULT 'standard',
  `status`                TEXT NOT NULL DEFAULT 'trialing',
  `current_period_start`  TEXT NOT NULL,
  `current_period_end`    TEXT NOT NULL,
  `cancel_at_period_end`  INTEGER NOT NULL DEFAULT 0,
  `stripe_subscription_id` TEXT,
  `stripe_customer_id`    TEXT
);

CREATE INDEX IF NOT EXISTS `subscriptions_user_id_idx` ON `subscriptions` (`user_id`);
