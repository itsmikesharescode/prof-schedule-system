import { z } from 'zod';

export const updateProgramSchema = z.object({
  id: z.number(),
  department: z.string().min(1, { message: 'Department code is required' }),
  description: z.string().min(1, { message: 'Description is required' }),
  programHead: z.string().min(1, { message: 'Program head is required' })
});

export type UpdateProgramSchema = typeof updateProgramSchema;
