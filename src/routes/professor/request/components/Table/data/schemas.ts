import { z } from 'zod';
import type { PreferredSchedule } from '$lib/types';

export const requestSchema = z.object({
  id: z.number(),
  created_at: z.string(),
  professor_id: z.string(),
  schedule: z.custom<PreferredSchedule>(),
  reason: z.string(),
  status: z.string()
});

export type RequestPageTable = z.output<typeof requestSchema>;
