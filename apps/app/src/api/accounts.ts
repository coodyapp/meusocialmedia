import type { SocialAccount, SocialPlatform } from '@meusocialmedia/types';
import { apiRequest } from './client';

export function listAccounts(): Promise<SocialAccount[]> {
  return apiRequest<SocialAccount[]>('/accounts');
}

export function connectAccount(platform: SocialPlatform): Promise<{ redirectUrl: string }> {
  return apiRequest<{ redirectUrl: string }>('/accounts/connect', {
    method: 'POST',
    body: JSON.stringify({ platform }),
  });
}

export function disconnectAccount(id: string): Promise<void> {
  return apiRequest<void>(`/accounts/${id}`, { method: 'DELETE' });
}
