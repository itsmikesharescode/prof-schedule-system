import { departments } from '$lib/metadata';
import { z } from 'zod';

export const updateRoomSchema = z.object({
  id: z.number(),
  roomType: z.string().min(1, { message: 'Room type is required' }),
  roomNumber: z.number().min(1, { message: 'Room number is required' }),
  roomCode: z.string().min(1, { message: 'Room code is required' }),
  department: z.string().min(1, { message: 'Department is required' })
});

export type UpdateRoomSchema = typeof updateRoomSchema;
