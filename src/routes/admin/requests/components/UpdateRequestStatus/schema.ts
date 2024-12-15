import { z } from 'zod';
import type { PreferredSchedule } from '$lib/types';

export const updateRequestStatusSchema = z.object({
	id: z.number(),
	status: z.string(),
	user_id: z.string(),
	newSched: z.any() as z.ZodType<PreferredSchedule | null>
});

export type UpdateRequestStatusSchema = typeof updateRequestStatusSchema;
