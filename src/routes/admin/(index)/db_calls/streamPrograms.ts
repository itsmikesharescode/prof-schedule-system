import type { Database } from '$lib/database.types';
import type { PostgrestSingleResponse, SupabaseClient } from '@supabase/supabase-js';

interface PromiseTypes {
  Program: Database['public']['Tables']['programs_tb']['Row'];
}

export const streamPrograms = async (supabase: SupabaseClient | undefined) => {
  if (!supabase) return null;
  const { data, error } = (await supabase.from('programs_tb').select('*').order('created_at', {
    ascending: true
  })) as PostgrestSingleResponse<PromiseTypes['Program'][]>;

  if (error) return null;
  return data;
};
