import { departments } from '$lib/metadata';
import { z } from 'zod';

export const addYearLevelSchema = z.object({
  yearLevel: z.array(z.string()).min(1, { message: 'Must enter at least one year level.' }),
  department: z.string().refine((v) => departments.find((d) => d.value === v), {
    message: 'Department is required'
  })
});

export type AddYearLevelSchema = typeof addYearLevelSchema;
