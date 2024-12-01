import type { Database } from '$lib/database.types';
import type { SupabaseClient } from '@supabase/supabase-js';

export const streamProfessors = async (
  supabase: SupabaseClient<Database>,
  params: string | null
) => {
  if (!supabase) return null;

  if (params) {
    const { data, error } = await supabase
      .from('professors_tb')
      .select('*')
      .eq('user_meta_data->>department', params);

    if (error) return null;
    return data;
  }

  const { data, error } = await supabase.from('professors_tb').select('*').order('created_at', {
    ascending: true
  });

  if (error) return null;
  return data;
};
