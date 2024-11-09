import { departments } from '$lib/metadata';
import { z } from 'zod';

export const updateYearLevelSchema = z.object({
  id: z.number(),
  yearLevel: z.string().min(1, { message: 'Must enter year level.' }),
  department: z.string().refine((v) => departments.find((d) => d.value === v), {
    message: 'Department is required'
  })
});

export type UpdateYearLevelSchema = typeof updateYearLevelSchema;
