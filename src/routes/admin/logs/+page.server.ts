import type { PageServerLoad } from './$types';
import { streamLogs } from '../(db_calls)/streamLogs';

export const load: PageServerLoad = async ({ locals: { supabase } }) => {
  return {
    streamLogs: streamLogs(supabase)
  };
};
