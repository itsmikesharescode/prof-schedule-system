import type { Database } from '$lib/database.types';
import type { SupabaseClient } from '@supabase/supabase-js';

const streamClassSchedules = async (
  supabase: SupabaseClient<Database>,
  professor_id: string | null
) => {
  if (!supabase) return null;

  if (professor_id) {
    const { data, error } = await supabase
      .from('class_schedules_tb')
      .select(
        '*, programs_tb(*), school_years_tb(*), year_levels_tb(*), sections_tb(*), subjects_tb(*), rooms_tb(*)'
      )
      .eq('professor_id', professor_id);

    if (error) return null;
    return data;
  }

  return null;
};

export default streamClassSchedules;
