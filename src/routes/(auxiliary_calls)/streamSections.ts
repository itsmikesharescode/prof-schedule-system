import type { Database } from '$lib/database.types';
import type { SupabaseClient } from '@supabase/supabase-js';

export const streamSections = async (supabase: SupabaseClient<Database>) => {
  if (!supabase) return null;
  const { data, error } = await supabase
    .from('sections_tb')
    .select('*')
    .order('created_at', { ascending: true });

  if (error) return null;
  return data;
};
