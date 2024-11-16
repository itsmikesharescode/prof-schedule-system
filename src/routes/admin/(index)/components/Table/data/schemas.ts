import { z } from 'zod';

export const programPageTableSchema = z.object({
  id: z.number(),
  code: z.string(),
  description: z.string(),
  head: z.string(),
  created_at: z.string()
});

export type ProgramPageTable = z.output<typeof programPageTableSchema>;
