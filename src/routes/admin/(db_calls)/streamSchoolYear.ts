import type { Database } from '$lib/database.types';
import type { PostgrestSingleResponse, SupabaseClient } from '@supabase/supabase-js';

interface PromiseTypes {
  SchoolYear: Database['public']['Tables']['school_years_tb']['Row'];
}

export const streamSchoolYear = async (
  supabase: SupabaseClient | undefined,
  params: string | null
) => {
  if (!supabase) return null;
  if (params) {
    const { data, error } = (await supabase
      .from('school_years_tb')
      .select('*')
      .order('created_at', {
        ascending: true
      })
      .eq('department', params)) as PostgrestSingleResponse<PromiseTypes['SchoolYear'][]>;

    if (error) return null;
    return data;
  }

  const { data, error } = (await supabase.from('school_years_tb').select('*').order('created_at', {
    ascending: true
  })) as PostgrestSingleResponse<PromiseTypes['SchoolYear'][]>;

  if (error) return null;
  return data;
};
