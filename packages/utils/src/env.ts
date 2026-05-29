import { z } from 'zod';

export function createEnv<T extends z.ZodRawShape>(schema: T, env: Record<string, unknown>) {
  const result = z.object(schema).safeParse(env);
  if (!result.success) {
    const missing = result.error.issues.map((i) => i.path.join('.')).join(', ');
    throw new Error(`Missing or invalid environment variables: ${missing}`);
  }
  return result.data as z.infer<z.ZodObject<T>>;
}
