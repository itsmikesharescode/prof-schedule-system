import type { Database } from '$lib/database.types';
import type { PostgrestSingleResponse, SupabaseClient } from '@supabase/supabase-js';

interface PromiseTypes {
  YearLevels: Database['public']['Tables']['year_levels_tb']['Row'];
}

export const streamYearLevels = async (
  supabase: SupabaseClient | undefined,
  params: string | null
) => {
  if (!supabase) return null;
  if (params) {
    const { data, error } = (await supabase
      .from('year_levels_tb')
      .select('*')
      .order('created_at', {
        ascending: true
      })
      .eq('department', params)) as PostgrestSingleResponse<PromiseTypes['YearLevels'][]>;

    if (error) return null;
    return data;
  }

  const { data, error } = (await supabase.from('year_levels_tb').select('*').order('created_at', {
    ascending: true
  })) as PostgrestSingleResponse<PromiseTypes['YearLevels'][]>;

  if (error) return null;
  return data;
};
