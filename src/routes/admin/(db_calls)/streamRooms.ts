import type { Database } from '$lib/database.types';
import type { PostgrestSingleResponse, SupabaseClient } from '@supabase/supabase-js';

interface PromiseTypes {
  Room: Database['public']['Tables']['rooms_tb']['Row'];
}

export const streamRooms = async (supabase: SupabaseClient | undefined, params: string | null) => {
  if (!supabase) return null;

  if (params) {
    const { data, error } = (await supabase
      .from('rooms_tb')
      .select('*')
      .order('created_at', {
        ascending: true
      })
      .eq('department', params)) as PostgrestSingleResponse<PromiseTypes['Room'][]>;

    if (error) return null;
    return data;
  }

  const { data, error } = (await supabase.from('rooms_tb').select('*').order('created_at', {
    ascending: true
  })) as PostgrestSingleResponse<PromiseTypes['Room'][]>;

  if (error) return null;
  return data;
};
