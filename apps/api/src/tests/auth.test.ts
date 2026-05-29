import { describe, it, expect, beforeEach } from 'vitest';
import { env } from 'cloudflare:test';
import { drizzle } from 'drizzle-orm/d1';
import * as schema from '../db/schema';
import app from '../index';

// The CF vitest pool provides a real in-memory D1 via `env.DB`
// We need to run migrations before each test suite in a real setup.
// For now, tests use `app.request()` with a mock env carrier.

function makeRequest(path: string, init?: RequestInit) {
  return app.request(path, init, env);
}

describe('POST /auth/register', () => {
  it('creates a user and returns a session token', async () => {
    const res = await makeRequest('/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'test@example.com',
        password: 'SecurePass1',
        name: 'Test User',
      }),
    });

    expect(res.status).toBe(201);
    const body = await res.json() as { user: { email: string }; token: string };
    expect(body.user.email).toBe('test@example.com');
    expect(body.token).toBeTruthy();
  });

  it('returns 409 when email already registered', async () => {
    const payload = {
      email: 'duplicate@example.com',
      password: 'SecurePass1',
      name: 'Dup User',
    };

    await makeRequest('/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const res2 = await makeRequest('/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    expect(res2.status).toBe(409);
  });

  it('returns 400 for invalid email', async () => {
    const res = await makeRequest('/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'not-an-email',
        password: 'SecurePass1',
        name: 'Bad Email',
      }),
    });

    expect(res.status).toBe(400);
  });
});

describe('POST /auth/login', () => {
  it('returns 401 with wrong password', async () => {
    // First register
    await makeRequest('/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'logintest@example.com',
        password: 'SecurePass1',
        name: 'Login Test',
      }),
    });

    const res = await makeRequest('/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'logintest@example.com',
        password: 'WrongPassword9',
      }),
    });

    expect(res.status).toBe(401);
    const body = await res.json() as { code: string };
    expect(body.code).toBe('UNAUTHORIZED');
  });

  it('returns token on successful login', async () => {
    await makeRequest('/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'goodlogin@example.com',
        password: 'SecurePass1',
        name: 'Good Login',
      }),
    });

    const res = await makeRequest('/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'goodlogin@example.com',
        password: 'SecurePass1',
      }),
    });

    expect(res.status).toBe(200);
    const body = await res.json() as { token: string; user: { email: string } };
    expect(body.token).toBeTruthy();
    expect(body.user.email).toBe('goodlogin@example.com');
  });
});

describe('GET /auth/me', () => {
  it('returns 401 without token', async () => {
    const res = await makeRequest('/auth/me');
    expect(res.status).toBe(401);
    const body = await res.json() as { code: string };
    expect(body.code).toBe('UNAUTHORIZED');
  });

  it('returns user profile with valid token', async () => {
    const registerRes = await makeRequest('/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'metest@example.com',
        password: 'SecurePass1',
        name: 'Me Test',
      }),
    });
    const { token } = await registerRes.json() as { token: string };

    const res = await makeRequest('/auth/me', {
      headers: { Authorization: `Bearer ${token}` },
    });

    expect(res.status).toBe(200);
    const body = await res.json() as { email: string; name: string };
    expect(body.email).toBe('metest@example.com');
    expect(body.name).toBe('Me Test');
  });
});
