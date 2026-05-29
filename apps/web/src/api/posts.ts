import type { Post } from '@meusocialmedia/types';
import { apiRequest } from './client';

export interface CreatePostInput {
  accountId: string;
  content: string;
  platform: Post['platform'];
  scheduledAt?: string;
  mediaUrls?: string[];
}

export function listPosts(status?: Post['status']): Promise<Post[]> {
  const qs = status ? `?status=${status}` : '';
  return apiRequest<Post[]>(`/posts${qs}`);
}

export function createPost(data: CreatePostInput): Promise<Post> {
  return apiRequest<Post>('/posts', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export function deletePost(id: string): Promise<void> {
  return apiRequest<void>(`/posts/${id}`, { method: 'DELETE' });
}
