import { z } from 'zod';

export const addScheduleSchema = z.object({
  schoolYear: z.string().min(1, { message: 'School year is required.' }),
  semester: z.string().min(1, { message: 'Semester is required.' }),
  yearLevel: z.string().min(1, { message: 'Year level is required.' }),
  section: z.string().min(1, { message: 'Section is required.' }),
  department: z.string().min(1, { message: 'Department is required.' }),
  subject: z.string().min(1, { message: 'Subject is required.' }),
  start_time: z.string().min(1, { message: 'Start time is required.' }),
  end_time: z.string().min(1, { message: 'End time is required.' }),
  day: z.string().min(1, { message: 'Day is required.' }),
  room: z.string().min(1, { message: 'Room is required.' })
});

export type AddScheduleSchema = typeof addScheduleSchema;
