import type { Database } from '$lib/database.types';
import type { SupabaseClient } from '@supabase/supabase-js';

const streamRequest = async (supabase: SupabaseClient<Database>) => {
  if (!supabase) return null;

  const { data, error } = await supabase
    .from('requests_tb')
    .select('*, professors_tb(*)')
    .order('created_at', { ascending: false });

  if (error) return null;

  return data;
};

export default streamRequest;
