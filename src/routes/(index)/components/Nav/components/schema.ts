import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, { message: 'Must enter a password.' })
});

export const signupSchema = loginSchema
  .extend({
    title: z
      .string()
      .refine((v) => ['Professor', 'Program Head'].includes(v), { message: 'Must select title.' }),
    firstName: z.string().min(1, { message: 'Must enter first name.' }),
    middleName: z.string().min(1, { message: 'Must enter middle name.' }),
    lastName: z.string().min(1, { message: 'Must enter last name.' }),
    email: z.string().email(),
    password: z.string().min(8, { message: 'Must enter a password.' }),
    confirmPassword: z.string()
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords do not match.'
  });

export type LoginSchema = typeof loginSchema;
export type SignupSchema = typeof signupSchema;
