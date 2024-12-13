import { z } from 'zod';
import type { PreferredSchedule } from '$lib/types';

export const requestSchema = z.object({
  id: z.number(),
  created_at: z.string(),
  reference_id: z.string(),
  professor_id: z.string(),
  status: z.string(),
  days: z.array(z.string()),
  start_time: z.string(),
  end_time: z.string(),
  schedule: z.custom<PreferredSchedule>(),
  reason: z.string()
});

export type RequestPageTable = z.output<typeof requestSchema>;
