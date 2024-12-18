import { z } from 'zod';
import type { Database } from '$lib/database.types';

export const classScheduleSchema = z.object({
	id: z.number(),
	created_at: z.string(),
	programgs_tb: z.custom<Database['public']['Tables']['programs_tb']['Row'][]>(),
	department: z.string(),
	department_id: z.number(),
	school_years_tb: z.custom<Database['public']['Tables']['school_years_tb']['Row'][]>(),
	school_year: z.string(),
	school_year_id: z.number(),
	year_levels_tb: z.custom<Database['public']['Tables']['year_levels_tb']['Row'][]>(),
	year_level: z.string(),
	year_level_id: z.number(),
	section: z.string(),
	section_class: z.string(),
	sections_tb: z.custom<Database['public']['Tables']['sections_tb']['Row'][]>(),
	section_id: z.number(),
	subjects_tb: z.custom<Database['public']['Tables']['subjects_tb']['Row'][]>(),
	subject: z.string(),
	subject_id: z.number(),
	rooms_tb: z.custom<Database['public']['Tables']['rooms_tb']['Row'][]>(),
	room: z.string(),
	room_id: z.number(),
	semester: z.string(),
	day: z.string(),
	courseCode: z.string(),
	units: z.number(),
	time: z.string(),
	professors_tb: z.custom<Database['public']['Tables']['professors_tb']['Row'][]>(),
	professor: z.string(),
	professor_id: z.string(),
	initial_time: z.string(),
	final_time: z.string()
});

export type ClassSchedulesPageTable = z.output<typeof classScheduleSchema>;
