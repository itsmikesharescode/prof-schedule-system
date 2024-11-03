import { z } from 'zod';

export const addYearLevelSchema = z.object({
  yearLevel: z.string().min(1, { message: 'Must enter year level.' })
});

export type AddYearLevelSchema = typeof addYearLevelSchema;
