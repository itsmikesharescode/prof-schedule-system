import { z } from 'zod';

export const addSchoolYearSchema = z.object({
  schoolYear: z
    .string()
    .regex(/^\d{4}-\d{4}$/, {
      message: 'School year must be in format YYYY-YYYY (e.g., 2023-2024)'
    })
    .refine(
      (val) => {
        const [start, end] = val.split('-').map(Number);
        return end === start + 1;
      },
      {
        message: 'End year must be exactly one year after start year'
      }
    ),
  department: z.string().min(1, { message: 'Department is required' })
});

export type AddSchoolYearSchema = typeof addSchoolYearSchema;
