import { z } from 'zod';

export const classScheduleSchema = z.object({
  id: z.number(),
  created_at: z.string(),
  department: z.string(),
  department_id: z.number(),
  school_year: z.string(),
  school_year_id: z.number(),
  year_level: z.string(),
  year_level_id: z.number(),
  section: z.string(),
  section_id: z.number(),
  subject: z.string(),
  subject_id: z.number(),
  room: z.string(),
  room_id: z.number(),
  semester: z.string(),
  day: z.string(),
  courseCode: z.string(),
  units: z.number(),
  time: z.string(),
  professor: z.string(),
  professor_id: z.string(),
  initial_time: z.string(),
  final_time: z.string()
});

export type ClassSchedulesPageTable = z.output<typeof classScheduleSchema>;
