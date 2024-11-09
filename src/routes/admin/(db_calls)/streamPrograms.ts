import type { Database } from '$lib/database.types';
import type { PostgrestSingleResponse, SupabaseClient } from '@supabase/supabase-js';

interface PromiseTypes {
  Program: Database['public']['Tables']['programs_tb']['Row'];
}

export const streamPrograms = async (
  supabase: SupabaseClient | undefined,
  params: string | null
) => {
  if (!supabase) return null;

  if (params) {
    const { data, error } = (await supabase
      .from('programs_tb')
      .select('*')
      .order('created_at', { ascending: true })
      .eq('name', params)) as PostgrestSingleResponse<PromiseTypes['Program'][]>;

    if (error) return null;
    return data;
  }

  const { data, error } = (await supabase.from('programs_tb').select('*').order('created_at', {
    ascending: true
  })) as PostgrestSingleResponse<PromiseTypes['Program'][]>;

  if (error) return null;
  return data;
};
