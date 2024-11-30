import { z } from 'zod';

export const updateProfileSchema = z.object({
  photoPath: z.string(),
  photo: z.instanceof(File)
});

export type UpdateProfileSchema = typeof updateProfileSchema;
