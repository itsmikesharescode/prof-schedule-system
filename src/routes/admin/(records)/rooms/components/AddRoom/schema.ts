import { departments } from '$lib/metadata';
import { z } from 'zod';

export const addRoomSchema = z.object({
  roomType: z.string().min(1, { message: 'Room type is required' }),
  roomNumber: z.number().min(1, { message: 'Room number is required' }),
  roomCode: z.string().min(1, { message: 'Room code is required' }),
  department: z.string().refine((v) => departments.find((d) => d.value === v), {
    message: 'Department is required'
  })
});

export type AddRoomSchema = typeof addRoomSchema;
