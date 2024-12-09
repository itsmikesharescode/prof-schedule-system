import { z } from 'zod';

export const yearLevelSchema = z.object({
  id: z.number(),
  created_at: z.string(),
  levels: z.array(
    z.object({
      id: z.string().uuid(),
      yearLevel: z.string()
    })
  ),
  department: z.string(),
  department_id: z.number()
});

export type YearLevelPageTable = z.output<typeof yearLevelSchema>;
