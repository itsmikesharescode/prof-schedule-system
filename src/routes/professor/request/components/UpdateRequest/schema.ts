import { z } from 'zod';

export const updateRequestSchema = z.object({
  id: z.number(),
  start_time: z.string().min(1, { message: 'Start time is required' }),
  end_time: z.string().min(1, { message: 'End time is required' }),
  day: z.string().min(1, { message: 'Day is required' }),
  availability: z.string().min(1, { message: 'Availability is required' }),
  reason: z.string().min(1, { message: 'Reason is required' })
});

export type UpdateRequestSchema = typeof updateRequestSchema;
