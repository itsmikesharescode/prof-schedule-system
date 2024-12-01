import { departments } from '$lib/metadata';
import { z } from 'zod';

export const updateSubjectSchema = z.object({
  id: z.number(),
  subjectName: z.string().min(1, { message: 'Class is required' }),
  subjectCode: z.string().min(1, { message: 'Section code is required' }),
  unit: z.number().min(1, { message: 'Unit is required' }),
  department: z.string().min(1, { message: 'Department is required' })
});

export type UpdateSubjectSchema = typeof updateSubjectSchema;
