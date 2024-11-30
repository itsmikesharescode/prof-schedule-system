import type { PreferredSchedule } from '$lib/types';
import { z } from 'zod';

export const accountPageTable = z.object({
  user_id: z.string(),
  created_at: z.string(),
  role: z.string(),
  email: z.string().email(),
  title: z.string(),
  avatar: z.string(),
  approved: z.boolean(),
  firstName: z.string(),
  middleName: z.string(),
  lastName: z.string(),
  interests: z.array(z.string()),
  department: z.string(),
  previousSchool: z.string(),
  yearsOfTeaching: z.number(),
  schedule: z.custom<PreferredSchedule>()
});

export type AccountPageTable = z.output<typeof accountPageTable>;
