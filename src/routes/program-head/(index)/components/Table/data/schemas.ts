import { z } from 'zod';

export const facultyLoadingSchema = z.object({
  id: z.number(),
  created_at: z.string(),
  department: z.string(),
  semester: z.string(),
  section: z.string(),
  school_year: z.string(),
  year_level: z.string(),
  fullName: z.string(),
  professor_meta_data: z.any().nullable(),
  class_schedules_tb: z.any().nullable()
});

export type FacultyLoadingPageTable = z.output<typeof facultyLoadingSchema>;
