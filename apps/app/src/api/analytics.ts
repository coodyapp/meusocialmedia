import type { PostAnalytics } from '@meusocialmedia/types';
import { apiRequest } from './client';

export interface AnalyticsOverview {
  totalReach: number;
  totalImpressions: number;
  totalEngagement: number;
  followerGrowth: number;
  reachOverTime: { date: string; reach: number }[];
  engagementByPlatform: { platform: string; engagement: number }[];
}

export function getAnalytics(from?: string, to?: string): Promise<AnalyticsOverview> {
  const params = new URLSearchParams();
  if (from) params.set('from', from);
  if (to) params.set('to', to);
  const qs = params.toString() ? `?${params.toString()}` : '';
  return apiRequest<AnalyticsOverview>(`/analytics${qs}`);
}

export function getPostAnalytics(postId: string): Promise<PostAnalytics> {
  return apiRequest<PostAnalytics>(`/analytics/posts/${postId}`);
}
