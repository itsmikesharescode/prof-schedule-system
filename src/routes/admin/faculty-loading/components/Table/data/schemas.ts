import { z } from 'zod';

export const facultyLoadingSchema = z.object({
  id: z.number(),
  created_at: z.string(),
  professor_id: z.string(),
  department: z.string(),
  school_year: z.string(),
  semester: z.string(),
  year_level: z.string(),
  schedule: z.object({
    id: z.number(),
    created_at: z.string(),
    school_year: z.string(),
    semester: z.string(),
    year_level: z.string(),
    section: z.string(),
    subjects: z.array(z.string())
  })
});

export type FacultyLoadingPageTable = z.output<typeof facultyLoadingSchema>;
