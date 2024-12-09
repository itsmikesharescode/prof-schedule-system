import type { Database } from '$lib/database.types';
import type { SupabaseClient } from '@supabase/supabase-js';

export const streamSections = async (
  supabase: SupabaseClient<Database> | undefined,
  params: string | null
) => {
  if (!supabase) return null;
  if (params) {
    const { data, error } = await supabase
      .from('sections_tb')
      .select('*, programs_tb(*)')
      .order('created_at', {
        ascending: true
      })
      .eq('department', params);

    if (error) return null;
    return data;
  }

  const { data, error } = await supabase
    .from('sections_tb')
    .select('*, programs_tb(*)')
    .order('created_at', {
      ascending: true
    });

  if (error) return null;
  return data;
};
