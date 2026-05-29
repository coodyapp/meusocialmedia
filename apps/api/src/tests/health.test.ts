import { describe, it, expect } from 'vitest';
import app from '../index';

describe('GET /health', () => {
  it('returns 200 with status ok', async () => {
    const res = await app.request('/health');
    expect(res.status).toBe(200);
    const body = await res.json() as { status: string; version: string };
    expect(body.status).toBe('ok');
  });

  it('returns version field', async () => {
    const res = await app.request('/health');
    const body = await res.json() as { status: string; version: string };
    expect(body.version).toBe('1.0.0');
  });
});
