import { departments } from '$lib/metadata';
import { z } from 'zod';

export const addYearLevelSchema = z.object({
  yearLevel: z.string().min(1, { message: 'Must enter year level.' }),
  department: z.string().refine((v) => departments.find((d) => d.value === v), {
    message: 'Department is required'
  })
});

export type AddYearLevelSchema = typeof addYearLevelSchema;
