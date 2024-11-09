import type { Database } from '$lib/database.types';
import type { PostgrestSingleResponse, SupabaseClient } from '@supabase/supabase-js';

interface PromiseTypes {
  Subject: Database['public']['Tables']['subjects_tb']['Row'];
}

export const streamSubjects = async (
  supabase: SupabaseClient | undefined,
  params: string | null
) => {
  if (!supabase) return null;
  if (params) {
    const { data, error } = (await supabase
      .from('subjects_tb')
      .select('*')
      .order('created_at', {
        ascending: true
      })
      .eq('department', params)) as PostgrestSingleResponse<PromiseTypes['Subject'][]>;

    if (error) return null;
    return data;
  }

  const { data, error } = (await supabase.from('subjects_tb').select('*').order('created_at', {
    ascending: true
  })) as PostgrestSingleResponse<PromiseTypes['Subject'][]>;

  if (error) return null;
  return data;
};
