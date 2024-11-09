import { classPeriods, days, departments, titles } from '$lib/metadata';
import { z } from 'zod';

export const addSectionSchema = z.object({
  class: z.string().refine((v) => classPeriods.map((c) => c.label).includes(v), {
    message: 'Must select a valid class period'
  }),
  sectionCode: z.string().min(1, { message: 'Section code is required' })
});

export type AddSectionSchema = typeof addSectionSchema;
