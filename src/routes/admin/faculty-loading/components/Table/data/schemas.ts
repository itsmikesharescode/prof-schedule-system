import { z } from 'zod';

export const facultyLoadingSchema = z.object({
  id: z.number(),
  created_at: z.string(),
  professor_id: z.string(),
  department: z.string(),
  school_year: z.string(),
  semester: z.string(),
  year_level: z.string(),
  section: z.string(),
  subject: z.object({
    id: z.string(),
    name: z.string().min(1, { message: 'Subject is required.' }),
    startTime: z.string().min(1, { message: 'Start time is required.' }),
    endTime: z.string().min(1, { message: 'End time is required.' }),
    day: z.string().min(1, { message: 'Day is required.' }),
    room: z.string().min(1, { message: 'Room is required.' })
  })
});

export type FacultyLoadingPageTable = z.output<typeof facultyLoadingSchema>;
