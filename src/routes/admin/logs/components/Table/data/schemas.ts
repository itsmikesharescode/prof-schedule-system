import { z } from 'zod';

export const logsSchema = z.object({
  id: z.number(),
  created_at: z.string(),
  type: z.string(),
  location_name: z.string(),
  user_id: z.string()
});

export type LogsPageTable = z.output<typeof logsSchema>;
