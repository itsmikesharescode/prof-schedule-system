import { z } from 'zod';

export const createRequestSchema = z.object({
  user_id: z.string(),
  start_time: z.string(),
  end_time: z.string(),
  day: z.string(),
  availability: z.string(),
  reason: z.string()
});

export type CreateRequestSchema = z.infer<typeof createRequestSchema>;
