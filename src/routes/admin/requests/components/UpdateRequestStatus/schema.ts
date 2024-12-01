import { z } from 'zod';

export const updateRequestStatusSchema = z.object({
  id: z.number(),
  status: z.string()
});

export type UpdateRequestStatusSchema = typeof updateRequestStatusSchema;
