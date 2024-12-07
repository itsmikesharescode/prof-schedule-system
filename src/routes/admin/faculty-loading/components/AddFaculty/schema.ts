import { z } from 'zod';

export const addFacultySchema = z.object({
  user_id: z.string().min(1, { message: 'Professor is required.' }),
  schedule_id: z.string().min(1, { message: 'Schedule is required.' }),
  start_time: z.string().min(1, { message: 'Start time is required.' }),
  end_time: z.string().min(1, { message: 'End time is required.' })
});

export type AddFacultySchema = typeof addFacultySchema;
