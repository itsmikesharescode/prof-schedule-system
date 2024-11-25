import { z } from 'zod';

export const addFacultySchema = z.object({
  user_id: z.string().min(1, { message: 'Professor is required.' }),
  semester: z.string().min(1, { message: 'Semester is required.' }),
  yearLevel: z.string().min(1, { message: 'Year level is required.' }),
  subject: z.string().min(1, { message: 'Subject is required.' }),
  section: z.string().min(1, { message: 'Section is required.' }),
  subjectCode: z.string().min(1, { message: 'Subject code is required.' }),
  startTime: z.string().min(1, { message: 'Start time is required.' }),
  endTime: z.string().min(1, { message: 'End time is required.' }),
  days: z.string().min(1, { message: 'Days is required.' })
});

export type AddFacultySchema = typeof addFacultySchema;
