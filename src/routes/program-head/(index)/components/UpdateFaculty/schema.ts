import { z } from 'zod';

export const updateFacultySchema = z.object({
  id: z.number(),
  user_id: z.string().min(1, { message: 'Professor is required.' }),
  schedule_id: z.string().min(1, { message: 'Schedule is required.' })
});

export type UpdateFacultySchema = typeof updateFacultySchema;
