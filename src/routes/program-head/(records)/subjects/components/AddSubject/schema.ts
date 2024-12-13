import { departments } from '$lib/metadata';
import { z } from 'zod';

export const addSubjectSchema = z.object({
  subjectName: z.string().min(1, { message: 'Class is required' }),
  subjectCode: z.string().min(1, { message: 'Section code is required' }),
  unit: z.number().min(1, { message: 'Unit is required' }),
  department: z.string().min(1, { message: 'Department is required' })
});

export type AddSubjectSchema = typeof addSubjectSchema;
