import type { Database } from '$lib/database.types';
import type { PreferredSchedule } from '$lib/types';
import { z } from 'zod';

export const requestSchema = z.object({
  id: z.number(),
  created_at: z.string(),
  reference_id: z.string(),
  full_name: z.string(),
  professor_id: z.string(),
  schedule: z.custom<PreferredSchedule>(),
  reason: z.string(),
  status: z.string(),
  professors_tb: z.custom<Database['public']['Tables']['professors_tb']['Row']>().nullable()
});

export type RequestsPageTable = z.output<typeof requestSchema>;
