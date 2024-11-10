import type { Database } from '$lib/database.types';
import type { PostgrestSingleResponse, SupabaseClient } from '@supabase/supabase-js';

interface PromiseTypes {
  Professor: Database['public']['Tables']['professors_tb']['Row'];
}

export const streamProfessors = async (supabase: SupabaseClient, params: string | null) => {
  if (!supabase) return null;

  if (params) {
    const { data, error } = (await supabase
      .from('professors_tb')
      .select('*')
      .eq('user_meta_data->>department', params)) as PostgrestSingleResponse<
      PromiseTypes['Professor'][]
    >;

    if (error) return null;
    return data;
  }

  const { data, error } = (await supabase.from('professors_tb').select('*').order('created_at', {
    ascending: true
  })) as PostgrestSingleResponse<PromiseTypes['Professor'][]>;

  if (error) return null;
  return data;
};
