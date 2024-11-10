import { z } from 'zod';

export const updateStatusSchema = z.object({
  userId: z.string(),
  status: z.string().refine((v) => ['Active', 'In-Active'].includes(v), {
    message: 'Must be either Active or In-Active'
  })
});
export type UpdateStatusSchema = typeof updateStatusSchema;
