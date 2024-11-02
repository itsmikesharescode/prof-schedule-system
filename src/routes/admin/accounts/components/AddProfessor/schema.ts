import { z } from 'zod';

export const addProfessorSchema = z.object({
  department: z.string().min(1, { message: 'Department code is required' }),
  description: z.string().min(1, { message: 'Description is required' }),
  programHead: z.string().min(1, { message: 'Program head is required' })
});

export type AddProfessorSchema = typeof addProfessorSchema;
