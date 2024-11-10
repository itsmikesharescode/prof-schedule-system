import type { SupabaseClient } from '@supabase/supabase-js';

export const streamProfessors = async (supabase: SupabaseClient, searchQuery: string) => {
  const { data, error } = await supabase.rpc('query_admin_get_professors', {
    search_query: searchQuery
  });

  if (error) return null;
  return data;
};
