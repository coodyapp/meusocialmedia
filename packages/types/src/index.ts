// User domain
export interface User {
  id: string;
  email: string;
  name: string;
  avatarUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Session {
  userId: string;
  token: string;
  expiresAt: string;
}

// Social media
export type SocialPlatform = 'instagram' | 'twitter' | 'linkedin' | 'facebook' | 'tiktok';

export interface SocialAccount {
  id: string;
  userId: string;
  platform: SocialPlatform;
  handle: string;
  accessToken?: string;
  expiresAt?: string;
}

export interface Post {
  id: string;
  userId: string;
  accountId: string;
  content: string;
  mediaUrls: string[];
  scheduledAt?: string;
  publishedAt?: string;
  status: 'draft' | 'scheduled' | 'published' | 'failed';
  platform: SocialPlatform;
  createdAt: string;
  updatedAt: string;
}

export interface PostAnalytics {
  postId: string;
  impressions: number;
  reach: number;
  likes: number;
  comments: number;
  shares: number;
  saves: number;
  clicks: number;
}

// Subscription / billing
export type PlanId = 'standard' | 'premium' | 'enterprise';

export interface Subscription {
  id: string;
  userId: string;
  planId: PlanId;
  status: 'active' | 'cancelled' | 'past_due' | 'trialing';
  currentPeriodStart: string;
  currentPeriodEnd: string;
  cancelAtPeriodEnd: boolean;
}

// AI agents
export interface AgentTask {
  id: string;
  userId: string;
  type: 'generate_post' | 'analyze_metrics' | 'schedule_posts' | 'reply_comments';
  status: 'pending' | 'running' | 'completed' | 'failed';
  input: Record<string, unknown>;
  output?: Record<string, unknown>;
  error?: string;
  createdAt: string;
  completedAt?: string;
}

// API response envelope
export interface ApiResponse<T> {
  data: T;
  meta?: {
    page?: number;
    perPage?: number;
    total?: number;
  };
}

export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, string[]>;
}
