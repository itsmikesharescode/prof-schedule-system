import type { Database } from '$lib/database.types';
import type { SupabaseClient } from '@supabase/supabase-js';

export const streamRequest = async (supabase: SupabaseClient<Database>, userId: string | null) => {
  if (!supabase) return null;

  if (userId) {
    const { data, error } = await supabase
      .from('requests_tb')
      .select('*')
      .eq('professor_id', userId);

    if (error) return null;
    return data;
  }

  const { data, error } = await supabase.from('requests_tb').select('*');
  if (error) return null;
  return data;
};

export default streamRequest;
