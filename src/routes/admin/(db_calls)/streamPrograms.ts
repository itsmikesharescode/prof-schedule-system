import type { SupabaseClient } from '@supabase/supabase-js';

export const streamPrograms = async ({ supabase }: { supabase: SupabaseClient }) => {
  const { data, error } = await supabase
    .from('programs')
    .select('*')
    .order('created_at', { ascending: true });
  return { data, error };
};
