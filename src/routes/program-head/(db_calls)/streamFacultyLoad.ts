import type { Database } from '$lib/database.types';
import type { SupabaseClient } from '@supabase/supabase-js';

const streamFacultyLoad = async (supabase: SupabaseClient<Database>, professor_id: string) => {
  if (!supabase && !professor_id) return null;

  const { data, error } = await supabase
    .from('class_schedules_tb')
    .select(
      '*, rooms_tb(*), sections_tb(*), year_levels_tb(*), programs_tb(*), subjects_tb(*), school_years_tb(*)'
    )
    .eq('professor_id', professor_id);

  if (error) return null;

  return data;
};

export default streamFacultyLoad;
