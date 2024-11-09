import type { Database } from '$lib/database.types';
import type { PostgrestSingleResponse, SupabaseClient } from '@supabase/supabase-js';

interface PromiseTypes {
  Section: Database['public']['Tables']['sections_tb']['Row'];
}

export const streamSections = async (
  supabase: SupabaseClient | undefined,
  params: string | null
) => {
  if (!supabase) return null;
  if (params) {
    const { data, error } = (await supabase
      .from('sections_tb')
      .select('*')
      .order('created_at', {
        ascending: true
      })
      .eq('department', params)) as PostgrestSingleResponse<PromiseTypes['Section'][]>;

    if (error) return null;
    return data;
  }

  const { data, error } = (await supabase.from('sections_tb').select('*').order('created_at', {
    ascending: true
  })) as PostgrestSingleResponse<PromiseTypes['Section'][]>;

  if (error) return null;
  return data;
};
