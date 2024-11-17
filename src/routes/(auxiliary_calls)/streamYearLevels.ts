import type { Database } from '$lib/database.types';
import type { SupabaseClient } from '@supabase/supabase-js';

export const streamYearLevels = async (supabase: SupabaseClient<Database>) => {
  if (!supabase) return null;
  const { data, error } = await supabase
    .from('year_levels_tb')
    .select('*')
    .order('created_at', { ascending: true });

  if (error) return null;
  return data;
};
