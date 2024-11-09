import { classPeriods, departments } from '$lib/metadata';
import { z } from 'zod';

export const addSectionSchema = z.object({
  class: z.string().refine((v) => classPeriods.map((c) => c.value).includes(v), {
    message: 'Must select a valid class period'
  }),
  sectionCode: z.string().min(1, { message: 'Section code is required' }),
  department: z.string().refine((v) => departments.find((d) => d.value === v), {
    message: 'Department is required'
  })
});

export type AddSectionSchema = typeof addSectionSchema;
