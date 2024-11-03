import { days, departments, titles } from '$lib/metadata';
import { z } from 'zod';

export const addSectionSchema = z.object({
  class: z.string().min(1, { message: 'Class is required' }),
  sectionCode: z.string().min(1, { message: 'Section code is required' })
});

export type AddSectionSchema = typeof addSectionSchema;
