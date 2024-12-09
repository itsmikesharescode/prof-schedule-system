import { days, titles } from '$lib/metadata';
import { z } from 'zod';

export const updateInformationSchema = z.object({
  title: z
    .string()
    .refine((v) => titles.map((t) => t.value).includes(v), { message: 'Must select title.' }),
  firstName: z.string().min(1, { message: 'Must enter first name.' }),
  middleName: z.string().min(1, { message: 'Must enter middle name.' }),
  lastName: z.string().min(1, { message: 'Must enter last name.' }),
  previousSchool: z.string().min(1, { message: 'Must enter previous school.' }),
  yearsOfTeaching: z.number().min(1, { message: 'Must enter years of teaching.' }),
  department: z.string().min(1, { message: 'Must select department.' }),
  days: z.array(z.string()).min(1, { message: 'Must select at least one day.' }),
  startTime: z.string().min(1, { message: 'Must enter start time.' }),
  endTime: z.string().min(1, { message: 'Must enter end time.' }),
  availability: z.string().refine((v) => ['Part Time', 'Full Time'].includes(v), {
    message: 'Must select availability.'
  }),
  interests: z.array(z.string()).min(1, { message: 'Must select at least one interest.' })
});

export type UpdateInformationSchema = typeof updateInformationSchema;
