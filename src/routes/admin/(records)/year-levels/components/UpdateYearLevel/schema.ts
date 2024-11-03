import { z } from 'zod';

export const updateYearLevelSchema = z.object({
  id: z.number(),
  yearLevel: z.string().min(1, { message: 'Must enter year level.' })
});

export type UpdateYearLevelSchema = typeof updateYearLevelSchema;
