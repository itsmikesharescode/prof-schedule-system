import { days, departments, titles } from '$lib/metadata';
import { z } from 'zod';

export const addProfessorSchema = z
  .object({
    position: z.string().refine((v) => ['Professor', 'Program Head'].includes(v), {
      message: 'Must select position.'
    }),
    photo: z.instanceof(File),
    title: z
      .string()
      .refine((v) => titles.map((t) => t.value).includes(v), { message: 'Must select title.' }),
    firstName: z.string().min(1, { message: 'Must enter first name.' }),
    middleName: z.string().min(1, { message: 'Must enter middle name.' }),
    lastName: z.string().min(1, { message: 'Must enter last name.' }),
    email: z.string().email(),
    password: z.string().min(8, { message: 'Must enter a password.' }),
    confirmPassword: z.string(),
    previousSchool: z.string().min(1, { message: 'Must enter previous school.' }),
    yearsOfTeaching: z.number().min(1, { message: 'Must enter years of teaching.' }),
    department: z.string().min(1, { message: 'Must select department.' }),
    day: z.string().refine((v) => days.map((t) => t.value).includes(v), {
      message: 'Must select day.'
    }),
    startTime: z.string().min(1, { message: 'Must enter start time.' }),
    endTime: z.string().min(1, { message: 'Must enter end time.' }),
    availability: z.string().refine((v) => ['Part Time', 'Full Time'].includes(v), {
      message: 'Must select availability.'
    }),
    interests: z.array(z.string()).min(1, { message: 'Must select at least one interest.' })
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords do not match.'
  });

export type AddProfessorSchema = typeof addProfessorSchema;
