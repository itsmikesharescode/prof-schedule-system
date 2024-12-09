import { z } from 'zod';

export const roomsSchema = z.object({
  id: z.number(),
  created_at: z.string(),
  type: z.string(),
  number: z.number(),
  code: z.string(),
  department: z.string(),
  department_id: z.number()
});

export type RoomsPageTable = z.output<typeof roomsSchema>;
