import type { Database } from '$lib/database.types';
import type { SupabaseClient } from '@supabase/supabase-js';

export const streamFaculties = async (
  supabase: SupabaseClient<Database>,
  params: string | null
) => {
  if (!supabase) return null;
  if (params) {
    const { data, error } = await supabase
      .from('faculties_tb')
      .select('*, class_schedules_tb(*), professors_tb(*)');

    if (error) return null;
    return data;
  }

  const { data, error } = await supabase
    .from('faculties_tb')
    .select('*, class_schedules_tb(*), professors_tb(*)');

  if (error) return null;
  return data;
};
