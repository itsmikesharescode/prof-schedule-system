import type { Database } from '$lib/database.types';
import type { SupabaseClient } from '@supabase/supabase-js';

export const streamClassSchedules = async (
  supabase: SupabaseClient<Database>,
  params: string | null
) => {
  if (!supabase) return null;

  if (params) {
    const { data, error } = await supabase
      .from('class_schedules_tb')
      .select(
        '*, professors_tb(*), programs_tb(*), school_years_tb(*), year_levels_tb(*), sections_tb(*), subjects_tb(*), rooms_tb(*)'
      )
      .eq('department', params);

    if (error) return null;
    return data;
  }

  const { data, error } = await supabase
    .from('class_schedules_tb')
    .select(
      '*, professors_tb(*), programs_tb(*), school_years_tb(*), year_levels_tb(*), sections_tb(*), subjects_tb(*), rooms_tb(*)'
    )
    .order('created_at', {
      ascending: true
    });

  if (error) return null;
  return data;
};
