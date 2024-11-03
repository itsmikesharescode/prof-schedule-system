import { z } from 'zod';

export const updateRoomSchema = z.object({
  id: z.number(),
  roomType: z.string().min(1, { message: 'Room type is required' }),
  roomNumber: z.string().min(1, { message: 'Room number is required' }),
  roomCode: z.number().min(1, { message: 'Room code is required' })
});

export type UpdateRoomSchema = typeof updateRoomSchema;
