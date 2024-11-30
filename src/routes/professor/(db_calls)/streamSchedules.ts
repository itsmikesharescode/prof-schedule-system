import type { Database } from '$lib/database.types';
import type { SupabaseClient } from '@supabase/supabase-js';

const streamSchedules = async (supabase: SupabaseClient<Database>, userId: string | null) => {
  if (userId) {
    const { data, error } = await supabase
      .from('faculties_tb')
      .select('*, class_schedules_tb("*")')
      .eq('professor_id', userId);

    if (error) return null;
    return data;
  }

  const { data, error } = await supabase.from('faculties_tb').select('*, class_schedules_tb("*")');

  if (error) return null;
  return data;
};

export default streamSchedules;
