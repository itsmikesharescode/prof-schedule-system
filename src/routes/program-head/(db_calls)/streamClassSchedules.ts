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
      .select('*')
      .eq('department', params);

    if (error) return null;
    return data;
  }

  const { data, error } = await supabase
    .from('class_schedules_tb')
    .select('*')
    .order('created_at', {
      ascending: true
    });

  if (error) return null;
  return data;
};
