import type { LayoutServerLoad } from './$types';
import { streamPrograms } from './(db_calls)/streamPrograms';

export const load: LayoutServerLoad = async ({ locals: { supabase }, depends, url }) => {
  return {
    streamPrograms: streamPrograms(supabase, url.searchParams.get('filter'))
  };
};
