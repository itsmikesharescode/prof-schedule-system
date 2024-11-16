import { z } from 'zod';

export const schoolYearSchema = z.object({
  id: z.string(),
  created_at: z.string(),
  schoolYear: z.string(),
  department: z.string()
});

export type SchoolYearPageTable = z.output<typeof schoolYearSchema>;
