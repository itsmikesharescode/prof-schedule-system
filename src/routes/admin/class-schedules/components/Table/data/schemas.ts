import { z } from 'zod';

export const classScheduleSchema = z.object({
  id: z.number(),
  created_at: z.string(),
  department: z.string(),
  school_year: z.string(),
  semester: z.string(),
  year_level: z.string(),
  section: z.string(),
  subject: z.string(),
  start_time: z.string(),
  end_time: z.string(),
  room: z.string(),
  day: z.string(),
  day_time: z.string()
});

export type ClassSchedulesPageTable = z.output<typeof classScheduleSchema>;
