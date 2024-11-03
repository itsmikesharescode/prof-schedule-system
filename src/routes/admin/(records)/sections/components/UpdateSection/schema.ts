import { days, departments, titles } from '$lib/metadata';
import { z } from 'zod';

export const updateSectionSchema = z.object({
  id: z.number(),
  class: z.string().min(1, { message: 'Class is required' }),
  sectionCode: z.string().min(1, { message: 'Section code is required' })
});

export type UpdateSectionSchema = typeof updateSectionSchema;
