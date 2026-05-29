import { drizzle } from 'drizzle-orm/d1';
import type { D1Database } from '@cloudflare/workers-types';
import * as schema from './schema';
import * as relations from './relations';

const fullSchema = { ...schema, ...relations };

export function createDb(d1: D1Database) {
  return drizzle(d1, { schema: fullSchema });
}

export type Database = ReturnType<typeof createDb>;
