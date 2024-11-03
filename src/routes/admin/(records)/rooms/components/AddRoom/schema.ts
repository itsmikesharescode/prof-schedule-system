import { days, departments, titles } from '$lib/metadata';
import { z } from 'zod';

export const addRoomSchema = z.object({
  roomType: z.string().min(1, { message: 'Room type is required' }),
  roomNumber: z.string().min(1, { message: 'Room number is required' }),
  roomCode: z.number().min(1, { message: 'Room code is required' })
});

export type AddRoomSchema = typeof addRoomSchema;
