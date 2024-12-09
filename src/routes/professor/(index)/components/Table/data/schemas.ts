import { z } from 'zod';

export const scheduleSchema = z.object({
  id: z.number(),
  created_at: z.string(),
  department: z.string(),
  school_year: z.string(),
  year_level: z.string(),
  section: z.string(),
  subject: z.string(),
  room: z.number(),
  semester: z.string(),
  day: z.string(),
  courseCode: z.string(),
  units: z.number(),
  time: z.string()
});

export type SchedulePageTable = z.output<typeof scheduleSchema>;
