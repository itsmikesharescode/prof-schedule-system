import { z } from 'zod';

export const addScheduleSchema = z.object({
  schoolYear: z.string().min(1, { message: 'School year is required.' }),
  semester: z.string().min(1, { message: 'Semester is required.' }),
  yearLevel: z.string().min(1, { message: 'Year level is required.' }),
  section: z.string().min(1, { message: 'Section is required.' }),
  subjects: z
    .array(
      z.object({
        name: z.string().min(1, { message: 'Subject is required.' }),
        startTime: z.string().min(1, { message: 'Start time is required.' }),
        endTime: z.string().min(1, { message: 'End time is required.' }),
        day: z.string().min(1, { message: 'Day is required.' }),
        room: z.string().min(1, { message: 'Room is required.' })
      })
    )
    .min(1, { message: 'At least one subject is required.' })
});

export type AddScheduleSchema = typeof addScheduleSchema;
