import { z } from 'zod';

export const scheduleSchema = z.object({
  id: z.number(),
  created_at: z.string(),
  professor_id: z.string(),
  department: z.string(),
  semester: z.string(),
  section: z.string(),
  school_year: z.string(),
  year_level: z.string(),
  class_schedules_tb: z.any().nullable()
});

export type SchedulePageTable = z.output<typeof scheduleSchema>;
