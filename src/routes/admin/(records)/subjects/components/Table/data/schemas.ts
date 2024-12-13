import { z } from 'zod';

export const subjectsSchema = z.object({
  id: z.number(),
  created_at: z.string(),
  name: z.string(),
  code: z.string(),
  unit: z.number(),
  department: z.string(),
  department_id: z.number()
});

export type SubjectsPageTable = z.output<typeof subjectsSchema>;
