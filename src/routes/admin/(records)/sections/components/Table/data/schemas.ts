import { z } from 'zod';

export const sectionSchema = z.object({
  id: z.number(),
  created_at: z.string(),
  class: z.string(),
  section_code: z.string(),
  department: z.string()
});

export type SectionPageTable = z.output<typeof sectionSchema>;