import type { LayoutServerLoad } from './$types';
import { streamDepartments } from './(db_calls)/auxiliary_calls/streamDepartments';
export const load: LayoutServerLoad = async ({ locals: { supabase } }) => {
  return {
    streamDepartments: streamDepartments(supabase)
  };
};
