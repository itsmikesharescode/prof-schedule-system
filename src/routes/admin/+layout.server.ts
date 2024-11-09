import type { LayoutServerLoad } from './$types';
import { streamPrograms } from './(db_calls)/streamPrograms';

export const load: LayoutServerLoad = async ({ locals: { supabase } }) => {
  return {
    streamPrograms: streamPrograms(supabase)
  };
};
