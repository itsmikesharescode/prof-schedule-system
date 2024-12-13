import { z } from 'zod';

export const addScheduleSchema = z.object({
  schoolYear: z.string().min(1, { message: 'School year is required.' }),
  semester: z.string().min(1, { message: 'Semester is required.' }),
  yearLevel: z.string().min(1, { message: 'Year level is required.' }),
  section: z.string().min(1, { message: 'Section is required.' }),
  department: z.string().min(1, { message: 'Department is required.' }),
  subject: z.string().min(1, { message: 'Subject is required.' }),
  day: z.string().min(1, { message: 'Day is required.' }),
  room: z.string().min(1, { message: 'Room is required.' }),
  initial_time: z.string().min(1, { message: 'Initial time is required.' }),
  final_time: z.string().min(1, { message: 'Final time is required.' }),
  professor_id: z.string().min(1, { message: 'Professor is required.' })
});

export type AddScheduleSchema = typeof addScheduleSchema;
