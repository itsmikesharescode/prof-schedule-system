import type { Database } from '$lib/database.types';
import type { PostgrestSingleResponse, SupabaseClient } from '@supabase/supabase-js';

interface PromiseTypes {
  Departments: {
    code: string;
    description: string;
  };
}

export const streamDepartments = async (supabase: SupabaseClient) => {
  if (!supabase) return null;
  const { data, error } = (await supabase
    .from('programs_tb')
    .select('code, description')
    .order('created_at', { ascending: true })) as PostgrestSingleResponse<
    PromiseTypes['Departments'][]
  >;

  if (error) return null;
  return data;
};
