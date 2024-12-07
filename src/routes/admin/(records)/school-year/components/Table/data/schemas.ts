import { z } from 'zod';

export const schoolYearSchema = z.object({
  id: z.number(),
  created_at: z.string(),
  year: z.string(),
  department: z.string(),
  department_id: z.number()
});

export type SchoolYearPageTable = z.output<typeof schoolYearSchema>;
