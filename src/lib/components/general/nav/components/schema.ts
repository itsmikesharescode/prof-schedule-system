import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string()
});

export const signupSchema = loginSchema.extend({
  name: z.string()
});

export type LoginSchema = typeof loginSchema;
export type SignupSchema = typeof signupSchema;
